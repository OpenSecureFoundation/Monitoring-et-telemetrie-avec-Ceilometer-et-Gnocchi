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

  const unit = map.unit;

  if (map.billingMode === "activation") {
    if (unit === "vcpu") {
      const vcpus = Number(agg.aggregate || 0);
      const cost = vcpus * TARIFFS.cpu_vcpu_h * windowHours;
      return {
        cost,
        breakdown: { vcpus, windowHours, tariff: TARIFFS.cpu_vcpu_h },
      };
    }

    if (unit === "percent") {
      const cpu_util_pct = Number(agg.aggregate || 0);
      const vcpusCount = resourceContext["vcpus"]
        ? Number(resourceContext["vcpus"].aggregate || 1)
        : 1;
      const vcpu_hours = (cpu_util_pct / 100) * vcpusCount * windowHours;
      const cost = vcpu_hours * TARIFFS.cpu_vcpu_h;
      return {
        cost,
        breakdown: {
          cpu_util_pct,
          vcpusCount,
          vcpu_hours,
          tariff: TARIFFS.cpu_vcpu_h,
        },
      };
    }

    if (unit === "gb") {
      const gb_avg = Number(agg.aggregate || 0);
      const gb_h = gb_avg * windowHours;
      const isStorageMetric =
        metricName.includes("disk") ||
        metricName.includes("volume") ||
        metricName.includes("storage");
      const tariff = isStorageMetric ? TARIFFS.storage_gb_h : TARIFFS.ram_gb_h;
      const cost = gb_h * tariff;
      return { cost, breakdown: { gb_avg, gb_h, tariff } };
    }
  }

  if (map.billingMode === "consumption" && unit === "bytes") {
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

    const cost = gb * tariff;
    return { cost, breakdown: { totalBytes, gb, tariff } };
  }

  return { cost: 0, details: "no rule matched" };
}
