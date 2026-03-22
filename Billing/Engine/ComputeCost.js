// ➡️ <--- Import des constantes et des outils --->
import { METRIC_MAP } from "../../Config/Constant.js";

// ➡️ <--- Import des fonctions de calcul --->
import {
  computeActivationCost,
  computeConsumptionCost,
  inferMetricInfoFromName,
} from "../../Utils/shared-functions.js";

/**
 * Calcule le coût d'un métrique donné selon son mode de facturation.
 *
 * Cette fonction sélectionne dynamiquement le mode de calcul approprié
 * (activation, consommation, etc.) en fonction des métadonnées du métrique.
 * Elle gère également les métriques incomplètes ou non prises en charge.
 *
 * @function computeCostForMetric
 * @param {Object} agg - Agrégats de mesures du métrique (moyennes, sommes, etc.).
 * @param {string} metricName - Nom du métrique à facturer (ex: "disk.usage" ou "instance.uptime").
 * @param {number} windowHours - Durée de la fenêtre de facturation en heures.
 * @param {Object} [resourceContext={}] - Contexte facultatif du resource (ex: type, région, tags...).
 *
 * @returns {Object} Un objet contenant :
 * - `cost` {number} : coût calculé pour le métrique. 💯
 * - `breakdown` {Object} : détails du calcul, incluant le motif si non pris en charge.
 * - (optionnel) `details` {string} : message si le métrique est inconnu.
 *
 * @example
 * Exemple pour un métrique de type activation :
 * const result = computeCostForMetric(agg, "instance.uptime", 720);
 * console.log(result.cost); // => 12.5
 *
 * @example
 * Exemple pour un métrique de type consommation (bytes) :
 * const result = computeCostForMetric(agg, "disk.usage.bytes", 720);
 * console.log(result.breakdown);
 */

// ➡️ <--- Fonction principale (refactorisée) --->
export function computeCostForMetric(
  agg,
  metricname,
  windowHours,
  resourceContext = {}
) {
  // ➡️ <--- Validation runtime --->
  if (!agg || typeof agg !== "object")
    throw new TypeError("Invalid 'agg' object.");

  if (typeof metricname !== "string" || !metricname.length)
    throw new TypeError("Invalid 'metricName'.");

  if (
    typeof windowHours !== "number" ||
    !Number.isFinite(windowHours) ||
    windowHours <= 0
  )
    throw new TypeError(`Invalid 'windowHours': ${windowHours}`);

  if (typeof resourceContext !== "object")
    throw new TypeError("Invalid 'resourceContext' (expected object).");

  if (Object.keys(resourceContext).length > 0) {
    console.log("resourceContext cpu percent", resourceContext);
  } else {
    console.log("resourceContext empty", resourceContext);
  }
  const map = METRIC_MAP[metricname] || inferMetricInfoFromName(metricname);
  if (!map) {
    return { cost: 0, details: `unknown metric ${metricname}` };
  }

  let result;

  switch (map.billingMode) {
    case "activation":
      result = computeActivationCost(
        map,
        metricname,
        agg,
        windowHours,
        resourceContext
      );
      break;

    case "consumption":
      if (map.unit === "bytes") {
        result = computeConsumptionCost(metricname, agg);
      } else {
        result = { cost: 0, breakdown: { reason: "unsupported metric unit" } };
      }
      break;

    default:
      result = { cost: 0, breakdown: { reason: "unsupported billing mode" } };
      break;
  }

  if (agg.incomplete) {
    console.warn(`🟡 Mesures incomplètes pour ${metricname}`);
    result.breakdown.incomplete = true;
  }

  return result;
}
