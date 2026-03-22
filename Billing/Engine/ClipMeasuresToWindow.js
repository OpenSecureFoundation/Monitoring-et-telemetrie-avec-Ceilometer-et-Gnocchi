// clipMeasuresToWindow.js
// Pré-filtrage temporel des mesures pour éviter les dépassements de fenêtre
// et garantir des bornes correctes pour l'agrégation

/**
 * Coupe les mesures à l'intérieur d'une fenêtre temporelle [start, stop].
 * - Exclut les points hors fenêtre
 * - Interpole un point au début/à la fin si nécessaire
 * - Marque la fenêtre comme partielle si des données manquent
 *
 * @param {Array} measures - Mesures au format [[timestamp, granularity, value]]
 * @param {string|Date} startISO - Début ISO de la fenêtre
 * @param {string|Date} stopISO - Fin ISO de la fenêtre
 * @returns {{ measures: Array, partial: boolean }}
 */
export function clipMeasuresToWindow(measures, startISO, stopISO) {
  if (!Array.isArray(measures) || measures.length === 0)
    return { measures: [], partial: true };

  const start = new Date(startISO);
  const stop = new Date(stopISO);

  // 1️⃣ Tri chronologique
  const sorted = [...measures]
    .filter((m) => Array.isArray(m) && m.length >= 3)
    .map(([ts, gran, val]) => [
      new Date(ts),
      Number(gran) || 0,
      Number(val) || 0,
    ])
    .sort((a, b) => a[0] - b[0]);

  let partial = false;
  const clipped = [];

  // 2️⃣ Ignorer les mesures hors fenêtre
  for (const [ts, gran, val] of sorted) {
    if (ts >= start && ts <= stop) clipped.push([ts, gran, val]);
  }

  // 3️⃣ Interpolation au début si nécessaire
  const first = sorted[0];
  const last = sorted.at(-1);

  const interpolated = []; // ← Tracker les interpolations

  if (first && first[0] > start) {
    // Interpolation linéaire avec la première mesure dans la fenêtre
    const next = clipped[0] || first;
    const interpolatedVal = next[2];
    clipped.unshift([start, next[1], interpolatedVal]);
    interpolated.push("start"); // ← Marquer
    partial = true;
  }

  // 4️⃣ Interpolation à la fin si nécessaire
  if (last && last[0] < stop) {
    const prev = clipped.at(-1) || last;
    const interpolatedVal = prev[2];
    clipped.push([stop, prev[1], interpolatedVal]);
    interpolated.push("end"); // ← Marquer
    partial = true;
  }

  return { measures: clipped, partial, interpolated };
}
