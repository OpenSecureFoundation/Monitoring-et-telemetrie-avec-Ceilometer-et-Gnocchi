// billingEngine.js
// Orchestrateur principal : génère invoices par projet

import fs from "node:fs";
import path from "node:path";
import { getKeystoneToken } from "../../Keystone module/Services/keystoneAuth.js";
import {
  listProjects,
  listResources,
  getMetrics,
  getMeasures,
} from "../../Project module/Services/Project.services.js";
import { aggregateMeasures } from "./Aggregate.js";
import { computeCostForMetric } from "./ComputeCost.js";
import { loadState, saveState } from "./State.js";
import {
  toISO,
  startOfMonthISO,
  addMonthsISO,
  msBetweenISO,
} from "../../Utils/Helpers.js";
import { INVOICE_DIR } from "../../Config/constant.js";

export async function billProjectForWindow(projectId, startISO, stopISO) {
  const windowHours = msBetweenISO(startISO, stopISO) / (1000 * 60 * 60);
  const resources = await listResources(projectId, await getKeystoneToken());

  const invoice = {
    project_id: projectId,
    period: { start: startISO, stop: stopISO },
    generated_at: toISO(new Date()),
    lines: [],
    total: 0,
  };

  for (const res of resources) {
    const metrics = await getMetrics(res.id, await getKeystoneToken());
    const resourceMetricsMap = {};

    for (const metric of metrics) {
      const measures = await getMeasures(
        metric.id,
        await getKeystoneToken(),
        startISO,
        stopISO
      );
      const agg = aggregateMeasures(measures, {
        billingMode: metric.billingMode,
        unit: metric.unit,
      });
      if (!agg) continue;
      resourceMetricsMap[metric.name] = agg;
    }

    for (const [metricName, agg] of Object.entries(resourceMetricsMap)) {
      const costObj = computeCostForMetric(
        agg,
        metricName,
        windowHours,
        resourceMetricsMap
      );

      invoice.lines.push({
        resource_id: res.id,
        resource_name: res.name,
        metric_name: metricName,
        metric_unit: agg.unit,
        aggregate: agg.aggregate,
        cost: Number(costObj.cost || 0),
        calc_details: costObj.breakdown || costObj.details,
      });

      invoice.total += Number(costObj.cost || 0);
    }
  }

  invoice.total = Math.round(invoice.total * 10000) / 10000;
  return invoice;
}

export async function runMonthlyBillingForAllProjects(year, month) {
  const startISO = startOfMonthISO(year, month);
  const stopISO = addMonthsISO(startISO, 1);
  console.info(`Running billing for period ${startISO} - ${stopISO}`);

  const projects = await listProjects(await getKeystoneToken());

  const invoices = [];
  for (const p of projects) {
    try {
      const invoice = await billProjectForWindow(p.id, startISO, stopISO);
      invoices.push(invoice);

      const outPath = path.resolve(
        INVOICE_DIR,
        `invoice_${p.id}_${startISO.substring(0, 7)}.json`
      );
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, JSON.stringify(invoice, null, 2));

      console.info(`Invoice generated for project ${p.id} -> ${outPath}`);
    } catch (err) {
      console.error(`Error billing project ${p.id}:`, err.message);
    }
  }

  const state = loadState();
  state.last_billing_date = startISO;
  state.cycles = state.cycles || [];
  state.cycles.push({
    period_start: startISO,
    period_stop: stopISO,
    generated_at: toISO(new Date()),
    invoice_count: invoices.length,
  });
  saveState(state);

  return invoices;
}
