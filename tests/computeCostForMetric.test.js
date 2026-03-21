/**
 * @file computeCostForMetric.test.js
 * @description Tests unitaires complets de la fonction computeCostForMetric et ses sous-fonctions
 * import { TARIFFS } from "../Config/Constant.js";
 * import * as Constant from "../Config/Constant.js";
 */

import { computeCostForMetric } from "../Billing/Engine/ComputeCost.js";
import { TARIFFS } from "../Config/Constant.js";

describe("🧮 computeCostForMetric - Tests fonctionnels et comportementaux", () => {
  const windowHours = 24;

  // --- Tests fonctionnels (besoin métier) ---
  describe("✅ Cas normaux : respect du besoin métier", () => {
    test("Doit calculer correctement un coût CPU (vCPU)", () => {
      console.log("---- ici débute le premier test ----");
      const agg = { aggregate: 4 }; // 4 vCPUs
      const result = computeCostForMetric(agg, "cpu.vcpus", windowHours);
      const expectedCost = 4 * TARIFFS.cpu_vcpu_h * windowHours;

      expect(result.cost).toBeCloseTo(expectedCost, 5);
      expect(result.breakdown).toMatchObject({
        vcpus: 4,
        windowHours,
        tariff: TARIFFS.cpu_vcpu_h,
      });
    });

    test("Doit calculer correctement un coût CPU (%) avec vCPUs contextuels", () => {
      console.log("---- ici débute le deuxième test ----");
      const agg = { aggregate: 50 }; // 50% d’utilisation
      const resourceContext = { cpu: { vcpus: { aggregate: 2 } } };
      const result = computeCostForMetric(
        agg,
        "cpu.utilization",
        windowHours,
        resourceContext
      );
      const expectedVcpuH = (50 / 100) * 2 * windowHours;
      const expectedCost = expectedVcpuH * TARIFFS.cpu_vcpu_h;

      expect(result.cost).toBeCloseTo(expectedCost, 5);
      expect(result.breakdown.vcpu_hours).toBeCloseTo(expectedVcpuH, 5);
    });

    test("Doit calculer correctement un coût mémoire (RAM)", () => {
      console.log("---- ici débute le troisième test ----");
      const agg = { aggregate: 8 }; // 8 Go
      const result = computeCostForMetric(agg, "memory.usage", windowHours);
      const expectedCost = 8 * windowHours * TARIFFS.ram_gb_h;

      expect(result.cost).toBeCloseTo(expectedCost, 5);
      expect(result.breakdown.tariff).toBe(TARIFFS.ram_gb_h);
    });

    test("Doit calculer correctement un coût disque (volume)", () => {
      console.log("---- ici débute le quatrième test ----");
      const agg = { aggregate: 100 }; // 100 Go
      const result = computeCostForMetric(agg, "disk.volume.size", windowHours);
      const expectedCost = 100 * windowHours * TARIFFS.storage_gb_h;

      expect(result.cost).toBeCloseTo(expectedCost, 5);
      expect(result.breakdown.tariff).toBe(TARIFFS.storage_gb_h);
    });

    test("Doit calculer correctement un coût réseau (bytes)", () => {
      console.log("---- ici débute le cinquième test ----");
      const agg = { aggregate: 10 * 1024 ** 3 }; // 10 Go
      const result = computeCostForMetric(
        agg,
        "network.outgoing.bytes",
        windowHours
      );
      const expectedCost = 10 * TARIFFS.network_gb;

      expect(result.cost).toBeCloseTo(expectedCost, 5);
      expect(result.breakdown.gb).toBeCloseTo(10, 5);
    });
  });

  // --- Tests comportementaux ---
  describe("⚙️ Cas limites et comportementaux", () => {
    test("Doit gérer une métrique inconnue proprement", () => {
      console.log("---- ici débute le sixième test ----");
      const agg = { aggregate: 10 };
      const result = computeCostForMetric(agg, "unknown.metric", windowHours);
      expect(result.cost).toBe(0);
      expect(result.details).toMatch(/unknown metric/i);
    });

    test("Doit marquer les mesures incomplètes avec un warning", () => {
      console.log("---- ici débute le septième test ----");
      console.warn = jest.fn();
      const agg = { aggregate: 10, incomplete: true };
      const result = computeCostForMetric(agg, "cpu.vcpus", windowHours);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("incomplètes")
      );
      expect(result.breakdown.incomplete).toBe(true);
    });

    test("Doit renvoyer un coût 0 pour un agrégat null ou invalide", () => {
      console.log("---- ici débute le huitième test ----");
      const agg = { aggregate: null };
      const result = computeCostForMetric(agg, "cpu.vcpus", windowHours);
      expect(result.cost).toBe(0);
    });

    test("Doit calculer correctement un coût I/O (consommation d’E/S)", () => {
      console.log("---- ici débute le neuvième test ----");
      const bytes = 5 * 1024 ** 3; // 5 Go
      const agg = { aggregate: bytes };
      const result = computeCostForMetric(agg, "disk.io.bytes", windowHours);
      const expectedCost = 5 * TARIFFS.io_gb;

      expect(result.cost).toBeCloseTo(expectedCost, 5);
      expect(result.breakdown.gb).toBeCloseTo(5, 5);
    });
  });
});
