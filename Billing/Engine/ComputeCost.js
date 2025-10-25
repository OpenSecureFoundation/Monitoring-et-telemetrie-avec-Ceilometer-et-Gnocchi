// computeCost.js
// Calcul du coût par métrique selon le type (activation ou consommation)

// ========== ComputeCost.js ==========

import { METRIC_MAP, TARIFFS } from "./Constant.js";
import { bytesToGb } from "./Utils.js";

function inferMetricInfoFromName(metricName) {
  const name = metricName.toLowerCase();
  if (name.includes("cpu"))
    return { billingMode: "activation", unit: "percent" };
  if (name.includes("vcpus"))
    return { billingMode: "activation", unit: "vcpu" };
  if (name.includes("memory") || name.includes("ram"))
    return { billingMode: "activation", unit: "gb" };
  if (name.includes("disk") || name.includes("volume"))
    return { billingMode: "activation", unit: "gb" };
  if (
    name.includes("network") ||
    name.includes("incoming") ||
    name.includes("outgoing")
  )
    return { billingMode: "consumption", unit: "bytes" };
  if (name.includes("read") || name.includes("write"))
    return { billingMode: "consumption", unit: "bytes" };
  return null;
}

export function computeCostForMetric(
  agg,
  metricName,
  windowHours,
  resourceContext = {}
) {
  const map = METRIC_MAP[metricName] || inferMetricInfoFromName(metricName);
  if (!map) return { cost: 0, details: `unknown metric ${metricName}` };

  let cost = 0;
  let breakdown = {};

  // === Calcul existant ===
  if (map.billingMode === "activation") {
    if (map.unit === "vcpu") {
      const vcpus = Number(agg.aggregate || 0);
      cost = vcpus * TARIFFS.cpu_vcpu_h * windowHours;
      breakdown = { vcpus, windowHours, tariff: TARIFFS.cpu_vcpu_h };
    } else if (map.unit === "percent") {
      const cpu_util_pct = Number(agg.aggregate || 0);
      const vcpusCount = resourceContext["vcpus"]
        ? Number(resourceContext["vcpus"].aggregate || 1)
        : 1;
      const vcpu_hours = (cpu_util_pct / 100) * vcpusCount * windowHours;
      cost = vcpu_hours * TARIFFS.cpu_vcpu_h;
      breakdown = {
        cpu_util_pct,
        vcpusCount,
        vcpu_hours,
        tariff: TARIFFS.cpu_vcpu_h,
      };
    } else if (map.unit === "gb") {
      const gb_avg = Number(agg.aggregate || 0);
      const gb_h = gb_avg * windowHours;
      const isStorageMetric =
        metricName.includes("disk") ||
        metricName.includes("volume") ||
        metricName.includes("storage");
      const tariff = isStorageMetric ? TARIFFS.storage_gb_h : TARIFFS.ram_gb_h;
      cost = gb_h * tariff;
      breakdown = { gb_avg, gb_h, tariff };
    }
  } else if (map.billingMode === "consumption" && map.unit === "bytes") {
    const totalBytes = Number(agg.aggregate || 0);
    const gb = bytesToGb(totalBytes);
    let tariff = TARIFFS.network_gb;

    if (
      metricName.includes("read") ||
      metricName.includes("write") ||
      metricName.includes("io")
    )
      tariff = TARIFFS.io_gb;
    if (metricName.includes("storage")) tariff = TARIFFS.storage_gb_h;

    cost = gb * tariff;
    breakdown = { totalBytes, gb, tariff };
  }

  // === Option A : informer si incomplet ===
  if (agg.incomplete) {
    console.warn(`⚠️ Mesures incomplètes pour ${metricName}`);
    breakdown.incomplete = true; // tag dans la facture
  }

  return { cost, breakdown };
}
