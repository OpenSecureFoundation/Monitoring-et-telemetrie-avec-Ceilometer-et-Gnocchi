import { computeCostForMetric } from "./ComputeCost.js";
import { msBetweenISO, toISO } from "../../Utils/shared-functions.js";
import { getCachedKeystoneToken } from "../../Keystone module/Services/getCachedKeystoneToken.js";
import { listResources } from "../../Project module/Services/Project.services.js";
import { aggregateMeasures } from "./Aggregate.js";
import { clipMeasuresToWindow } from "./ClipMeasuresToWindow.js";
import { METRIC_MAP } from "../../Config/Constant.js";
import { toFixedMoney } from "../../Utils/money.js";
import { buildResourceContext } from "./ResourceContext.js";
import { getCachedMetrics, getCachedMeasures } from "./Caching-function.js";
import pLimit from "p-limit";
import { getKeystoneToken } from "../../Keystone module/Services/keystoneAuth.js";

// ➡️ --- Limites parallélisme --->
const resourceLimit = pLimit(5); // ➡️ --- max 5 ressources simultanées par projet --->

// ➡️ <--- Sous-fonction 1 : traite les métriques d’une ressource --->
async function processResourceMetrics(
  resourceId,
  metrics,
  token,
  startISO,
  stopISO,
) {
  const resourceMetricsMap = {};

  console.log("avant d'entere dans le for");
  for (const metric of metrics) {
    console.log("dans le for");
    const metricId = metric.id;
    const metricname = metric.name;
    const metricUnit = metric.unit; // ← Récupérer l'unité ici

    console.log("metricId", metricId);
    console.log("metricname", metricname);
    console.log("metricUnit", metricUnit);

    // ➡️ <--- Sécurisation des appels aux mesures avec cache --->
    let rawMeasures;
    try {
      console.log(`🔍 About to call getCachedMeasures with:`, {
        metricId,
        metricname,
        token: token ? "present" : "missing",
        startISO,
        stopISO,
      });
      rawMeasures = await getCachedMeasures(metricId, token, startISO, stopISO);
      console.log("rawMeasures", rawMeasures);
    } catch (err) {
      console.log("err", err);
      console.warn(
        `🔵 [BILLING] Failed to get measures for ${metricname}:`,
        err.message,
      );
      continue;
    }

    // ✅ rawMeasures est TOUJOURS un tableau simple
    if (!Array.isArray(rawMeasures) || rawMeasures.length === 0) continue;

    // ➡️ <--- Unité d’origine venant de Gnocchi --->
    const {
      measures: windowedMeasures,
      partial,
      interpolated,
    } = clipMeasuresToWindow(
      rawMeasures, // Pas de .flat() nécessaire !
      startISO,
      stopISO,
    );

    if (windowedMeasures.length === 0) continue;

    // ➡️ <--- Détermination du mode et de l’unité de facturation --->
    const mapEntry = METRIC_MAP[metricname];
    if (!mapEntry) {
      console.warn(`[BILLING] Unknown metric: ${metricname}`);
      continue;
    }

    // ➡️ <--- Informations sur la métrique --->
    const metricInfo = {
      billingMode: mapEntry.billingMode,
      toUnit: mapEntry.unit, // ➡️ <--- unité de facturation --->
      fromUnit: metricUnit, // ➡️ <--- unité réelle observée (Gnocchi) --->
    };

    // ➡️ <--- Log en cas de conversion d’unité --->
    if (partial) {
      console.info(
        `🔵 [BILLING] ${metricname}: Partial data detected (interpolated: ${interpolated.join(
          ", ",
        )})`,
      );
    }

    // ➡️ <--- Agrégation propre des mesures --->
    const agg = aggregateMeasures(windowedMeasures, metricInfo);
    if (!agg) continue;
    if (partial) agg.incomplete = true;

    resourceMetricsMap[metricname] = agg;
  }

  return resourceMetricsMap;
}

// ➡️ <--- Sous-fonction 2 : calcule les coûts d’une ressource --->
function computeResourceCosts(
  resourceId,
  resourcename,
  resourceMetricsMap,
  windowHours,
) {
  const lines = [];
  let total = 0;

  // ➡️ <--- Création du contexte de la ressource --->
  const resourceContext = buildResourceContext(resourceMetricsMap);

  // ➡️ <--- Calcul des coûts pour chaque métrique --->
  for (const [metricname, agg] of Object.entries(resourceMetricsMap)) {
    let costObj;
    try {
      costObj = computeCostForMetric(
        agg,
        metricname,
        windowHours,
        resourceContext,
      );
    } catch (err) {
      console.warn(
        `🔵 [BILLING] Failed to compute cost for ${metricname}:`,
        err.message,
      );
      continue;
    }

    // ➡️ <--- Ajout de la ligne de facture --->
    lines.push({
      resourceId,
      resourcename,
      metricname,
      metricUnit: agg.unit,
      aggregate: agg.aggregate,
      cost: Number(costObj?.cost || 0),
      calcDetails: costObj?.breakdown || costObj?.details,
    });

    total += Number(costObj?.cost || 0);
  }

  return { lines, total };
}

// ➡️ <--- Fonction principale --->
export async function billProjectForWindow(projectId, startISO, stopISO) {
  console.log(
    "Billing project window",
    projectId,
    "for",
    startISO,
    "to",
    stopISO,
  );
  if (!projectId || typeof projectId !== "string") {
    console.log(1);
    throw new Error("🔴 Invalid projectId");
  }
  if (!startISO || !stopISO)
    throw new Error("🔴 Missing billing window period");

  const windowHours = msBetweenISO(startISO, stopISO) / (1000 * 60 * 60);
  if (!Number.isFinite(windowHours) || windowHours <= 0)
    throw new Error("🔴 Invalid billing window duration");

  console.info(
    `🧾 Billing project ${projectId} for ${windowHours.toFixed(2)}h`,
  );

  const token = await getKeystoneToken();
  // const token = await getCachedKeystoneToken();
  console.log("Keystone token value ", token);
  const resources = await listResources(projectId, token);
  console.log("Resources for project", projectId, "are", resources);

  const invoice = {
    projectId,
    projectname: null,
    period: { start: startISO, stop: stopISO },
    generatedAt: toISO(new Date()),
    lines: [],
    total: 0,
    hmacSignature: null,
  };

  const resourceResults = await Promise.all(
    resources.map((resource) =>
      resourceLimit(async () => {
        try {
          const resourceId = resource.id;
          const resourcename = resource.name || resourceId;

          const metrics = await getCachedMetrics(resourceId, token);
          console.log(
            "metrics values for resource ",
            resourceId,
            "are",
            metrics,
          );
          const resourceMetricsMap = await processResourceMetrics(
            resourceId,
            metrics,
            token,
            startISO,
            stopISO,
          );

          const { lines, total } = computeResourceCosts(
            resourceId,
            resourcename,
            resourceMetricsMap,
            windowHours,
          );

          return { lines, total };
        } catch (error) {
          console.error(
            `[BILLING] Error processing resource: ${error.message}`,
          );
          return { lines: [], total: 0 };
        }
      }),
    ),
  );

  // ➡️ <--- Fusion des résultats des ressources --->
  for (const result of resourceResults) {
    invoice.lines.push(...(result?.lines || []));
    invoice.total += Number(result?.total || 0);
  }

  // ➡️ <--- Précision monétaire --->
  invoice.total = toFixedMoney(invoice.total);
  invoice.lines = invoice.lines.map((line) => ({
    ...line,
    cost: toFixedMoney(line.cost),
  }));

  console.info(
    `🟢 Billing completed for project ${projectId} (${invoice.lines.length} lines, total = ${invoice.total})`,
  );

  return invoice;
}
