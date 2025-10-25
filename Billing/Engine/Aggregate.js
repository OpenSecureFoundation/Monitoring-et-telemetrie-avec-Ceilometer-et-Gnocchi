// aggregate.js
// Fonctions pour agréger les mesures Gnocchi selon le type de métrique (activation/consommation)
// ========== Aggregate.js ==========

export function aggregateMeasures(measures, metricInfo) {
  if (!measures || measures.length === 0)
    return { aggregate: null, unit: metricInfo.unit, incomplete: true };

  measures.sort((a, b) => new Date(a[0]) - new Date(b[0]));
  let incomplete = false;

  // === Mode "activation" ===
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
        else {
          weight = 0;
          incomplete = true; // impossible d'estimer la durée
        }
      }

      weightedSum += value * weight;
      totalWeight += weight;
    }

    if (totalWeight === 0)
      return { aggregate: null, unit: metricInfo.unit, incomplete: true };

    return {
      aggregate: weightedSum / totalWeight,
      unit: metricInfo.unit,
      incomplete,
    };
  }

  // === Mode "consumption" ===
  if (metricInfo.billingMode === "consumption") {
    let isMonotonic = true;

    for (let i = 1; i < measures.length; i++) {
      if (Number(measures[i][2]) < Number(measures[i - 1][2])) {
        isMonotonic = false;
        break;
      }
    }

    // Vérifie s’il y a des trous temporels
    const expectedStep =
      measures.length > 1
        ? (new Date(measures[measures.length - 1][0]) -
            new Date(measures[0][0])) /
          (measures.length - 1)
        : null;

    if (expectedStep) {
      for (let i = 1; i < measures.length; i++) {
        const deltaT = new Date(measures[i][0]) - new Date(measures[i - 1][0]);
        // Si l'écart est 3× supérieur à la moyenne, on marque incomplet
        if (deltaT > expectedStep * 3) {
          incomplete = true;
          break;
        }
      }
    }

    if (isMonotonic) {
      let sumDeltas = 0;
      for (let i = 1; i < measures.length; i++) {
        const delta =
          Number(measures[i][2] || 0) - Number(measures[i - 1][2] || 0);
        if (delta > 0) sumDeltas += delta;
      }
      return { aggregate: sumDeltas, unit: metricInfo.unit, incomplete };
    } else {
      const sum = measures.reduce((s, m) => s + Number(m[2] || 0), 0);
      return { aggregate: sum, unit: metricInfo.unit, incomplete };
    }
  }

  return { aggregate: null, unit: metricInfo.unit, incomplete: true };
}
