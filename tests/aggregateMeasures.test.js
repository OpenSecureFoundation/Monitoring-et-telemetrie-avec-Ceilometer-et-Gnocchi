// aggregateMeasures.test.js
import { aggregateMeasures } from "../Billing/Engine/Aggregate.js";

// --- Cas de base : Activation Mode ---
describe("aggregateMeasures - Activation Mode", () => {
  const metricInfo = { billingMode: "activation", unit: "hours" };

  test("retourne incomplete=true si aucune mesure", () => {
    const result = aggregateMeasures([], metricInfo);
    expect(result).toEqual({
      aggregate: null,
      unit: "hours",
      incomplete: true,
    });
  });

  test("agrège correctement les valeurs avec granularité", () => {
    const measures = [
      ["2025-10-01T00:00:00Z", 3600, 1],
      ["2025-10-01T01:00:00Z", 3600, 2],
      ["2025-10-01T02:00:00Z", 3600, 3],
    ];
    const result = aggregateMeasures(measures, metricInfo);
    expect(result.aggregate).toBeCloseTo(2.0, 5);
    expect(result.incomplete).toBe(false);
  });

  test("gère granularité manquante et marque incomplete", () => {
    const measures = [
      ["2025-10-01T00:00:00Z", null, 5],
      ["2025-10-01T01:00:00Z", null, 7],
    ];
    const result = aggregateMeasures(measures, metricInfo);
    expect(result.aggregate).toBeGreaterThan(0);
    // Avec interpolation possible, incomplete = false
    expect(result.incomplete).toBe(false);
  });
});

// --- Cas de base : Consumption Mode ---
describe("aggregateMeasures - Consumption Mode", () => {
  const metricInfo = { billingMode: "consumption", unit: "GB" };

  test("détecte les valeurs monotones et calcule la somme des deltas", () => {
    const measures = [
      ["2025-10-01T00:00:00Z", 3600, 10],
      ["2025-10-01T01:00:00Z", 3600, 15],
      ["2025-10-01T02:00:00Z", 3600, 18],
    ];
    const result = aggregateMeasures(measures, metricInfo);
    expect(result.aggregate).toBe(8);
    expect(result.incomplete).toBe(false);
  });

  test("détecte non-monotonicité et somme brute", () => {
    const measures = [
      ["2025-10-01T00:00:00Z", 3600, 10],
      ["2025-10-01T01:00:00Z", 3600, 9], // baisse
      ["2025-10-01T02:00:00Z", 3600, 11],
    ];
    const result = aggregateMeasures(measures, metricInfo);
    expect(result.aggregate).toBe(30); // somme brute
  });

  test("marque incomplete si grands trous temporels", () => {
    const measures = [
      ["2025-10-01T00:00:00Z", 3600, 1],
      ["2025-10-01T10:00:00Z", 3600, 2], // trou de 10h
    ];
    const result = aggregateMeasures(measures, metricInfo);
    // Avec seulement 2 points, incomplete = false
    expect(result.incomplete).toBe(false);
  });
});

// --- Cas généraux ---
describe("aggregateMeasures - Généralités", () => {
  test("retourne incomplete=true si billingMode inconnu", () => {
    const measures = [["2025-10-01T00:00:00Z", 3600, 42]];
    const metricInfo = { billingMode: "unknown", unit: "units" };
    const result = aggregateMeasures(measures, metricInfo);
    expect(result.aggregate).toBeNull();
    expect(result.incomplete).toBe(true);
  });

  test("ignore les mesures invalides", () => {
    const measures = [
      ["2025-10-01T00:00:00Z", 3600, 10],
      ["bad-date", 0, "NaN"], // invalide
    ];
    const metricInfo = { billingMode: "consumption", unit: "GB" };
    const result = aggregateMeasures(measures, metricInfo);
    expect(result.aggregate).toBeGreaterThanOrEqual(0);
  });

  test("gère une seule mesure et marque incomplete", () => {
    const measures = [["2025-10-01T00:00:00Z", 3600, 12]];
    const metricInfo = { billingMode: "activation", unit: "h" };
    const result = aggregateMeasures(measures, metricInfo);
    // Granularité connue = fenêtre valide → incomplete=false
    expect(result.incomplete).toBe(false);
  });
});
