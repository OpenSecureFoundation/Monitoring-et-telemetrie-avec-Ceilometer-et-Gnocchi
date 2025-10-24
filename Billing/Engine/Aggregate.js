// aggregate.js
// Fonctions pour agréger les mesures Gnocchi selon le type de métrique (activation/consommation)
// ========== Aggregate.js ==========

export function aggregateMeasures(measures, metricInfo) {
  if (!measures || measures.length === 0) return null;
  measures.sort((a, b) => new Date(a[0]) - new Date(b[0]));

  if (metricInfo.billingMode === "activation") {
    let weightedSum = 0,
      totalWeight = 0;

    for (let i = 0; i < measures.length; i++) {
      const [ts, gran, val] = measures[i];
      const value = Number(val || 0);
      let weight = Number(gran || 0);

      if (!weight || weight <= 0) {
        if (i < measures.length - 1)
          weight = (new Date(measures[i + 1][0]) - new Date(ts)) / 1000;
        else if (i > 0)
          weight = (new Date(ts) - new Date(measures[i - 1][0])) / 1000;
        else weight = 0;
      }

      weightedSum += value * weight;
      totalWeight += weight;
    }

    if (totalWeight === 0) return null;
    return { aggregate: weightedSum / totalWeight, unit: metricInfo.unit };
  }

  if (metricInfo.billingMode === "consumption") {
    let isMonotonic = true;
    for (let i = 1; i < measures.length; i++) {
      if (Number(measures[i][2]) < Number(measures[i - 1][2])) {
        isMonotonic = false;
        break;
      }
    }

    if (isMonotonic) {
      let sumDeltas = 0;
      for (let i = 1; i < measures.length; i++) {
        const delta =
          Number(measures[i][2] || 0) - Number(measures[i - 1][2] || 0);
        if (delta > 0) sumDeltas += delta;
      }
      return { aggregate: sumDeltas, unit: metricInfo.unit };
    } else {
      const sum = measures.reduce((s, m) => s + Number(m[2] || 0), 0);
      return { aggregate: sum, unit: metricInfo.unit };
    }
  }

  return null;
}
