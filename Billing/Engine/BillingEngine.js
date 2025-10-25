// billingEngine.js
// Orchestrateur principal : génère invoices par projet

import fs from "node:fs";
import path from "node:path";
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
import pLimit from "p-limit";
import { getCachedKeystoneToken } from "../../Keystone module/Services/getCachedKeystoneToken.js";
import crypto from "node:crypto";

// --- Limites parallélisme ---
const projectLimit = pLimit(5); // max 5 projets simultanés
const resourceLimit = pLimit(5); // max 5 ressources simultanées par projet

// --- Facturation d’un projet pour une fenêtre ---
export async function billProjectForWindow(projectId, startISO, stopISO) {
  const windowHours = msBetweenISO(startISO, stopISO) / (1000 * 60 * 60);
  const token = await getCachedKeystoneToken();

  const resources = await listResources(projectId, token);
  const invoice = {
    project_id: projectId,
    period: { start: startISO, stop: stopISO },
    generated_at: toISO(new Date()),
    lines: [],
    total: 0,
  };

  // --- Facturation des ressources en parallèle ---
  const resourceResults = await Promise.all(
    resources.map((res) =>
      resourceLimit(async () => {
        const resId = res.id;
        const resName = res.name || resId;

        const metrics = await getMetrics(resId, token);
        const resourceMetricsMap = {};

        for (const metric of metrics) {
          const metricId = metric.id;
          const metricName = metric.name || metric.metric_name || metricId;

          const measures = await getMeasures(
            metricId,
            token,
            startISO,
            stopISO
          );
          const agg = aggregateMeasures(measures, {
            billingMode: metric.billingMode,
            unit: metric.unit,
          });
          if (!agg) continue;

          resourceMetricsMap[metricName] = agg;
        }

        const lines = [];
        let total = 0;
        for (const [metricName, agg] of Object.entries(resourceMetricsMap)) {
          const costObj = computeCostForMetric(
            agg,
            metricName,
            windowHours,
            resourceMetricsMap
          );
          lines.push({
            resource_id: resId,
            resource_name: resName,
            metric_name: metricName,
            metric_unit: agg.unit,
            aggregate: agg.aggregate,
            cost: Number(costObj.cost || 0),
            calc_details: costObj.breakdown || costObj.details,
          });
          total += Number(costObj.cost || 0);
        }

        return { lines, total };
      })
    )
  );

  // Fusion des résultats
  for (const r of resourceResults) {
    invoice.lines.push(...r.lines);
    invoice.total += r.total;
  }

  invoice.total = Math.round(invoice.total * 10000) / 10000;
  return invoice;
}

// --- Facturation mensuelle de tous les projets ---
export async function runMonthlyBillingForAllProjects(year, month) {
  const startISO = startOfMonthISO(year, month);
  const stopISO = addMonthsISO(startISO, 1);
  console.info(`Running billing for period ${startISO} - ${stopISO}`);

  const state = loadState();
  state.cycles = state.cycles || [];

  // --- Vérification idempotence ---
  const alreadyBilled = state.cycles.some(
    (c) => c.period_start === startISO && c.period_stop === stopISO
  );
  if (alreadyBilled) {
    console.info(`Period ${startISO} - ${stopISO} already billed. Skipping.`);
    return []; // ou renvoyer un tableau vide
  }

  const token = await getCachedKeystoneToken();
  const projects = await listProjects(token);
  const invoices = [];

  const results = await Promise.allSettled(
    projects.map((p) =>
      projectLimit(async () => {
        try {
          const invoice = await billProjectForWindow(p.id, startISO, stopISO);
          invoices.push(invoice);

          const outPath = path.resolve(
            INVOICE_DIR,
            `invoice_${p.id}_${startISO.substring(0, 7)}.json`
          );
          fs.mkdirSync(path.dirname(outPath), { recursive: true });
          fs.writeFileSync(outPath, JSON.stringify(invoice, null, 2));

          console.info(
            `✅ Invoice generated for project ${p.id} (${invoice.total} units)`
          );
        } catch (err) {
          console.error(`❌ Error billing project ${p.id}:`, err.message);
        }
      })
    )
  );

  // --- Hash SHA256 de toutes les factures pour audit trail ---
  const invoicesHash = crypto
    .createHash("sha256")
    .update(JSON.stringify(invoices))
    .digest("hex");

  // --- Mise à jour de l’état avec audit trail enrichi ---
  state.last_billing_date = startISO;
  state.cycles.push({
    period_start: startISO,
    period_stop: stopISO,
    generated_at: toISO(new Date()),
    invoice_count: invoices.length,
    initiator: "billing_service_admin",
    invoices_hash: invoicesHash,
    project_ids: projects.map((p) => p.id),
  });
  saveState(state);

  const successCount = results.filter((r) => r.status === "fulfilled").length;
  console.info(
    `Billing completed: ${successCount}/${projects.length} projects processed.`
  );

  return invoices;
}
