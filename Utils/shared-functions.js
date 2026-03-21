// ➡️ <--- Fonction de gestion des erreurs --->
import catchSync from "./Catch-sync.js";

// ➡️ <--- Import des constantes et des outils --->
import { TARIFFS } from "../Config/Constant.js";

// ➡️ <--- Fonction de conversion en ISO --->
export function toISO(dt) {
  return new Date(dt).toISOString();
}

// ➡️ <--- Obtenir le premier jour du mois --->
export function startOfMonthISO(year, month) {
  return new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)).toISOString();
}

// ➡️ <--- Fonction d'ajout de mois à une date --->
export function addMonthsISO(iso, months) {
  const d = new Date(iso);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d.toISOString();
}

// ➡️ <--- Calculer le nombre de ms entre deux dates --->
export function msBetweenISO(a, b) {
  return new Date(b).getTime() - new Date(a).getTime();
}

// ➡️ <--- Fonction de conversion des bytes en Go --->
export function bytesToGb(bytes) {
  return Number(bytes) / 1024 ** 3;
}

// ➡️ <--- Fonction de calcul de moyenne --->
export function safeAvg(numbers) {
  if (!numbers || numbers.length === 0) return null;
  return numbers.reduce((s, x) => s + x, 0) / numbers.length;
}

// ➡️ <--- Fonction de formatage de période --->
/**
 * Formate la période d’une facture (ex: { start: "2025-10-01", end: "2025-10-31" })
 * @param {{ start: string, end: string }} period
 * @returns {string}
 */
export const formatPeriod = catchSync(
  (period) => {
    if (!period) return "Période non spécifiée";

    const start = period.start
      ? new Date(period.start).toLocaleDateString("fr-FR")
      : "?";
    const end = period.stop
      ? new Date(period.stop).toLocaleDateString("fr-FR")
      : "?";

    return `${start} - ${end}`;
  },
  { exitOnError: true }
);

/**
 * Calcule le coût d'utilisation des vCPU sur une période donnée.
 *
 * @function computeVcpuCost
 * @param {Object} agg - Agrégats de mesures liés au nombre de vCPU (par ex. moyenne ou somme).
 * @param {number} windowHours - Durée de la fenêtre de facturation en heures.
 *
 * @returns {Object} Un objet contenant :
 * - `cost` {number} : coût total des vCPU pour la période.
 * - `breakdown` {Object} : détails du calcul (vcpus, windowHours, tarif appliqué).
 *
 * @example
 * const result = computeVcpuCost({ aggregate: 4 }, 720);
 * console.log(result.cost); // => coût mensuel pour 4 vCPU
 */

// ➡️ <--- Fonction de calcul de coût de vCPU --->
export function computeVcpuCost(agg, windowHours) {
  // ➡️ <--- Validation runtime --->
  if (
    !agg ||
    typeof agg.aggregate !== "number" ||
    !Number.isFinite(agg.aggregate)
  ) {
    return { cost: 0, breakdown: { reason: "invalid aggregate" } };
  }
  if (typeof windowHours !== "number" || !Number.isFinite(windowHours)) {
    return { cost: 0, breakdown: { reason: "invalid windowHours" } };
  }

  const vcpus = Number(agg.aggregate || 0);
  const cost = vcpus * TARIFFS.cpu_vcpu_h * windowHours;
  return {
    cost,
    breakdown: { vcpus, windowHours, tariff: TARIFFS.cpu_vcpu_h },
  };
}

/**
 * Calcule le coût basé sur le pourcentage d’utilisation CPU (en %).
 *
 * Le coût dépend du nombre de vCPU du resource et du temps d’utilisation.
 *
 * @function computeCpuPercentCost
 * @param {Object} agg - Agrégats contenant le pourcentage moyen d’utilisation CPU.
 * @param {number} windowHours - Durée de la fenêtre de facturation en heures.
 * @param {Object} resourceContext - Contexte du resource (ex: { vcpus: { aggregate: 2 } }).
 *
 * @returns {Object} Un objet contenant :
 * - `cost` {number} : coût total calculé pour la période.
 * - `breakdown` {Object} : détails du calcul (cpu_util_pct, vcpusCount, vcpu_hours, tarif).
 *
 * @example
 * const result = computeCpuPercentCost({ aggregate: 50 }, 720, { vcpus: { aggregate: 4 } });
 * console.log(result.cost); // => coût pour 50% d’utilisation sur 4 vCPU
 */

// ➡️ <--- Fonction de calcul de coût de pourcentage de CPU --->
export function computeCpuPercentCost(agg, windowHours, resourceContext = {}) {
  // ➡️ <--- Validation ciblée --->
  if (!agg || typeof agg !== "object") {
    return { cost: 0, breakdown: { reason: "invalid agg object" } };
  }

  const cpu_util_pct = Number(agg.aggregate);
  if (!Number.isFinite(cpu_util_pct) || cpu_util_pct < 0) {
    return { cost: 0, breakdown: { reason: "invalid cpu_util_pct" } };
  }

  if (
    typeof windowHours !== "number" ||
    !Number.isFinite(windowHours) ||
    windowHours <= 0
  ) {
    return { cost: 0, breakdown: { reason: "invalid windowHours" } };
  }

  const vcpusCount = Number.isFinite(
    Number(resourceContext?.cpu?.vcpus?.aggregate)
  )
    ? Number(resourceContext.cpu.vcpus.aggregate)
    : 1;

  // ➡️ <--- Calculs principaux --->
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

/**
 * Calcule le coût d’utilisation mémoire ou stockage (en Go-heures).
 *
 * @function computeGbCost
 * @param {string} metricName - Nom du métrique pour déterminer le type (RAM ou stockage).
 * @param {Object} agg - Agrégats de mesures (valeur moyenne du Go utilisé).
 * @param {number} windowHours - Durée de la fenêtre de facturation en heures.
 *
 * @returns {Object} Un objet contenant :
 * - `cost` {number} : coût total calculé.
 * - `breakdown` {Object} : détails du calcul (gb_avg, gb_h, tarif).
 *
 * @example
 * const result = computeGbCost("ram.usage", { aggregate: 8 }, 720);
 * console.log(result.cost); // => coût pour 8 Go utilisés sur un mois
 */

// ➡️ <--- Fonction de calcul de coût de Go --->
export function computeGbCost(metricName, agg, windowHours) {
  // ➡️ <--- Validation ciblée --->
  if (typeof metricName !== "string" || !metricName.length) {
    return { cost: 0, breakdown: { reason: "invalid metricName" } };
  }

  if (!agg || typeof agg !== "object") {
    return { cost: 0, breakdown: { reason: "invalid agg object" } };
  }

  const gb_avg = Number(agg.aggregate);
  if (!Number.isFinite(gb_avg) || gb_avg < 0) {
    return { cost: 0, breakdown: { reason: "invalid gb_avg" } };
  }

  if (
    typeof windowHours !== "number" ||
    !Number.isFinite(windowHours) ||
    windowHours <= 0
  ) {
    return { cost: 0, breakdown: { reason: "invalid windowHours" } };
  }

  // ➡️ <--- Calculs principaux --->
  const gb_h = gb_avg * windowHours;
  const isStorageMetric =
    metricName.includes("disk") ||
    metricName.includes("volume") ||
    metricName.includes("storage");

  const tariff = isStorageMetric ? TARIFFS.storage_gb_h : TARIFFS.ram_gb_h;
  const cost = gb_h * tariff;

  return { cost, breakdown: { gb_avg, gb_h, tariff } };
}

/**
 * Calcule le coût de consommation pour un métrique de type "bytes" (réseau, I/O, stockage...).
 *
 * @function computeConsumptionCost
 * @param {string} metricName - Nom du métrique (ex: "network.outgoing.bytes", "storage.read.bytes").
 * @param {Object} agg - Agrégats contenant le total de bytes consommés.
 *
 * @returns {Object} Un objet contenant :
 * - `cost` {number} : coût calculé selon le type de métrique.
 * - `breakdown` {Object} : détails du calcul (totalBytes, gb, tarif).
 *
 * @example
 * const result = computeConsumptionCost("network.outgoing.bytes", { aggregate: 10737418240 });
 * console.log(result.cost); // => coût pour 10 Go transférés
 */

// ➡️ <--- Fonction de calcul de coût de consommation --->
export function computeConsumptionCost(metricName, agg) {
  console.log("computeConsumptionCost est lancé");

  // ➡️ <--- Validation ciblée --->
  if (typeof metricName !== "string" || !metricName.length) {
    return { cost: 0, breakdown: { reason: "invalid metricName" } };
  }

  if (!agg || typeof agg !== "object") {
    return { cost: 0, breakdown: { reason: "invalid agg object" } };
  }

  const totalBytes = Number(agg.aggregate);
  if (!Number.isFinite(totalBytes) || totalBytes < 0) {
    return { cost: 0, breakdown: { reason: "invalid totalBytes" } };
  }

  // ➡️ <--- Conversion --->
  const gb = bytesToGb(totalBytes);
  if (!Number.isFinite(gb)) {
    return { cost: 0, breakdown: { reason: "conversion error bytesToGb" } };
  }

  // ➡️ <--- Sélection du tarif --->
  let tariff = TARIFFS.network_gb;
  if (
    metricName.includes("read") ||
    metricName.includes("write") ||
    metricName.includes("io")
  ) {
    tariff = TARIFFS.io_gb;
  } else if (metricName.includes("storage")) {
    tariff = TARIFFS.storage_gb_h;
  }

  // ➡️ <--- Calcul principal --->
  const cost = gb * tariff;

  return {
    cost,
    breakdown: {
      totalBytes,
      gb,
      tariff,
    },
  };
}

/**
 * Déduit les informations de facturation (mode et unité) à partir du nom du métrique.
 *
 * @function inferMetricInfoFromName
 * @param {string} metricName - Nom brut du métrique (ex: "cpu.util", "network.outgoing.bytes").
 *
 * @returns {?Object} Un objet { billingMode, unit } si reconnu, sinon `null`.
 *
 * @example
 * inferMetricInfoFromName("cpu.util"); // => { billingMode: "activation", unit: "percent" }
 */

// ➡️ <--- Fonction de détection de la métrique --->
export function inferMetricInfoFromName(metricname) {
  const name = metricname.toLowerCase();

  const rules = [
    {
      keywords: ["vcpus", "cpu.vcpus"],
      billingMode: "activation",
      unit: "vcpu",
    },
    {
      keywords: ["cpu.util", "utilization"],
      billingMode: "activation",
      unit: "percent",
    },
    {
      keywords: ["memory", "ram"],
      billingMode: "activation",
      unit: "gb",
    },
    {
      keywords: ["disk.volume", "volume.size"],
      billingMode: "activation",
      unit: "gb",
    },
    {
      keywords: ["network.incoming", "network.outgoing"],
      billingMode: "consumption",
      unit: "bytes",
    },
    {
      keywords: ["disk.io", "read.bytes", "write.bytes"],
      billingMode: "consumption",
      unit: "bytes",
    },
  ];

  const match = rules.find((rule) =>
    rule.keywords.some((keyword) => name.includes(keyword))
  );

  return match ? { billingMode: match.billingMode, unit: match.unit } : null;
}

/**
 * Calcule le coût d’activation selon l’unité du métrique (vCPU, %, Go...).
 *
 * Redirige automatiquement vers la fonction de calcul appropriée.
 *
 * @function computeActivationCost
 * @param {Object} map - Informations sur le métrique (billingMode, unit...).
 * @param {string} metricName - Nom du métrique.
 * @param {Object} agg - Agrégats des mesures.
 * @param {number} windowHours - Durée de la fenêtre de facturation en heures.
 * @param {Object} resourceContext - Contexte du resource (vCPU, RAM, etc.).
 *
 * @returns {Object} Un objet contenant :
 * - `cost` {number} : coût total calculé.
 * - `breakdown` {Object} : détails du calcul ou motif d’erreur.
 *
 * @example
 * const result = computeActivationCost({ unit: "vcpu" }, "instance.vcpu", agg, 720, {});
 */

// ➡️ <--- Fonction de calcul de coût d'activation --->
export function computeActivationCost(
  map,
  metricName,
  agg,
  windowHours,
  resourceContext
) {
  // ➡️ <--- Validation runtime --->
  if (!map || typeof map !== "object")
    throw new TypeError("Invalid 'map' object.");

  if (typeof metricName !== "string" || !metricName.length) {
    return { cost: 0, breakdown: { reason: "invalid metricName" } };
  }

  if (!agg || typeof agg !== "object") {
    return { cost: 0, breakdown: { reason: "invalid agg object" } };
  }

  if (
    typeof windowHours !== "number" ||
    !Number.isFinite(windowHours) ||
    windowHours <= 0
  ) {
    return { cost: 0, breakdown: { reason: "invalid windowHours" } };
  }

  if (typeof resourceContext !== "object") {
    return { cost: 0, breakdown: { reason: "invalid resourceContext" } };
  }

  // ➡️ <--- Log des paramètres --->
  if (Object.keys(resourceContext).length > 0) {
    console.log("🧩 computeActivationCost input:", {
      metricName,
      agg,
      resourceContext,
    });
  } else {
    console.log("🧩 computeActivationCost input:", {
      metricName,
      agg,
    });
  }

  switch (map.unit) {
    case "vcpu":
      return computeVcpuCost(agg, windowHours);
    case "percent":
      return computeCpuPercentCost(agg, windowHours, resourceContext);
    case "gb":
      return computeGbCost(metricName, agg, windowHours);
    default:
      return { cost: 0, breakdown: { reason: "unknown activation unit" } };
  }
}
