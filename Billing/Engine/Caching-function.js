import {
  getMetrics,
  getMeasures,
} from "../../Project module/Services/Project.services.js";

// 🧠 --- Caches internes pour réduire les appels API ---
const metricsCache = new Map();
const measuresCache = new Map();

// ➡️ --- Fonctions de cache --->
export async function getCachedMetrics(resourceId, token) {
  if (metricsCache.has(resourceId)) return metricsCache.get(resourceId);
  const metrics = await getMetrics(resourceId, token);
  metricsCache.set(resourceId, metrics);
  return metrics;
}

export async function getCachedMeasures(metricId, token, startISO, stopISO) {
  const key = `${metricId}_${startISO}_${stopISO}`;
  if (measuresCache.has(key)) return measuresCache.get(key);
  const result = await getMeasures(metricId, token, startISO, stopISO);
  measuresCache.set(key, result);
  return result;
}
