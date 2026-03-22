import { normalizeUnit } from "../../Utils/units.js";
/**
 * Agrège les mesures d’un indicateur (activation ou consommation).
 * @param {Array} measures - Liste de mesures [timestamp, granularité, valeur] 🔥
 * @param {Object} metricInfo - { billingMode: "activation"|"consumption", unit: string }
 * @returns {{aggregate: number|null, unit: string, incomplete: boolean}}
 */

export function aggregateMeasures(measures, metricInfo) {
  console.log("aggregateMeasures", measures, metricInfo);
  if (!isValidMeasures(measures)) {
    return makeResult(null, metricInfo.unit, true);
  }

  // Normalisation et tri
  measures = measures
    .filter((m) => Array.isArray(m) && m.length >= 3)
    .map(([ts, gran, val]) => [
      ts instanceof Date ? ts : new Date(ts), // ← Évite double conversion
      Number(gran) || 0,
      Number(val) || 0,
      normalizeUnit(
        val,
        metricInfo.fromUnit || metricInfo.unit,
        metricInfo.unit
      ),
    ])
    .sort((a, b) => a[0] - b[0]);

  if (measures.length === 0) {
    return makeResult(null, metricInfo.unit, true);
  }

  switch (metricInfo.billingMode) {
    case "activation":
      return aggregateActivation(measures, metricInfo);
    case "consumption":
      return aggregateConsumption(measures, metricInfo);
    default:
      console.warn(`Unknown billingMode: ${metricInfo.billingMode}`);
      return makeResult(null, metricInfo.unit, true);
  }
}

// === Utils ===
function isValidMeasures(measures) {
  return Array.isArray(measures) && measures.length > 0;
}

function makeResult(aggregate, unit, incomplete = false) {
  return { aggregate, unit, incomplete };
}

// === Mode activation ===
// === Mode activation (pondération temporelle sur base horaire) ===
function aggregateActivation(measures, metricInfo) {
  let weightedSum = 0;
  let totalWeight = 0;
  let incomplete = false;

  for (let i = 0; i < measures.length; i++) {
    const [ts, gran, rawVal, normalizedVal] = measures[i]; // ← Ajouter 4ème élément

    console.info(
      `🔵 Processing measure ${i}: timeStamp: ${ts} | granularity: ${gran}
      | rawValue: ${rawVal} | normalizedvalue: ${normalizedVal}`
    );

    const { weightHours, incompleteFlag } = computeWeight(
      measures,
      i,
      ts,
      gran
    );

    incomplete ||= incompleteFlag;
    weightedSum += Number(normalizedVal || 0) * weightHours; // ← Utiliser normalizedVal !
    totalWeight += weightHours;
  }

  if (totalWeight === 0) {
    return makeResult(null, metricInfo.unit, true);
  }

  // Retourne la moyenne pondérée en unité de facturation horaire
  return makeResult(weightedSum / totalWeight, metricInfo.unit, incomplete);
}

/**
 * Calcule le poids d'une mesure.
 * @param {Array} measures - Liste des mesures
 * @param {number} i - Index de la mesure
 * @param {Date} ts - Timestamp de la mesure
 * @param {number} gran - Granularité de la mesure
 * @returns {{weight: number, incompleteFlag: boolean}}
 */

// === Calcul de la durée (poids) entre deux mesures ===
// Retourne le poids en heures (au lieu de secondes)
function computeWeight(measures, i, ts, gran) {
  let weightSeconds = Number(gran || 0);
  let incomplete = false;

  if (!weightSeconds || weightSeconds <= 0) {
    const prev = measures[i - 1];
    const next = measures[i + 1];

    if (next) {
      weightSeconds = (new Date(next[0]) - new Date(ts)) / 1000;
      incomplete = true; // ← Marquer comme incomplet si calculé
    } else if (prev) {
      weightSeconds = (new Date(ts) - new Date(prev[0])) / 1000;
      incomplete = true; // ← Idem
    } else {
      weightSeconds = 0;
      incomplete = true;
    }
  }

  const weightHours = weightSeconds / 3600;
  return { weightHours, incompleteFlag: incomplete };
}

// === Mode consumption ===
function aggregateConsumption(measures, metricInfo) {
  const isMonotonic = checkMonotonic(measures);
  const incomplete = hasTemporalGaps(measures);

  const aggregate = isMonotonic
    ? sumMonotonicDeltas(measures)
    : sumAllValues(measures);

  return makeResult(aggregate, metricInfo.unit, incomplete);
}

function checkMonotonic(measures) {
  for (let i = 1; i < measures.length; i++) {
    if (Number(measures[i][2]) < Number(measures[i - 1][2])) {
      return false;
    }
  }
  return true;
}

/**
 * Détecte les trous temporels significatifs.
 * @param {Array} measures - Liste des mesures
 * @returns {boolean}
 */

function hasTemporalGaps(measures) {
  if (measures.length <= 1) return false;

  const expectedStep =
    (new Date(measures.at(-1)[0]) - new Date(measures[0][0])) /
    (measures.length - 1);

  for (let i = 1; i < measures.length; i++) {
    const deltaT = new Date(measures[i][0]) - new Date(measures[i - 1][0]);
    if (deltaT > expectedStep * 3) return true;
  }
  return false;
}

function sumMonotonicDeltas(measures) {
  let total = 0;
  for (let i = 1; i < measures.length; i++) {
    const delta = Number(measures[i][2] || 0) - Number(measures[i - 1][2] || 0);
    if (delta > 0) total += delta;
  }
  return total;
}

function sumAllValues(measures) {
  return measures.reduce((sum, [, , val]) => sum + Number(val || 0), 0);
}
