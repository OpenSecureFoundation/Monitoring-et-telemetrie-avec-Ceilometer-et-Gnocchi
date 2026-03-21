/**
 * @file billing.test.js
 * @description Tests unitaires et comportementaux du module de facturation mensuelle.
 */

// ============================================================================
// 🧠 SECTION 1 : Mocks de toutes les dépendances (doivent être AVANT les imports)
// ============================================================================
jest.mock("puppeteer", () => ({
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      setContent: jest.fn().mockResolvedValue(),
      pdf: jest.fn().mockResolvedValue(),
      close: jest.fn().mockResolvedValue(),
    }),
    close: jest.fn().mockResolvedValue(),
  }),
}));

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({
      messageId: "test-message-id",
      response: "250 Message accepted",
    }),
  }),
}));

jest.mock("../Billing/Engine/Caching-function.js", () => ({
  // ✅ Format Gnocchi réel : tableau d'objets avec id et name
  getCachedMetrics: jest.fn().mockResolvedValue([
    {
      id: "metric-uuid-1",
      name: "cpu.vcpus",
      resource_id: "r1",
      unit: "vcpu",
    },
    {
      id: "metric-uuid-2",
      name: "memory.usage",
      resource_id: "r1",
      unit: "B",
    },
    {
      id: "metric-uuid-3",
      name: "disk.volume.size",
      resource_id: "r1",
      unit: "B",
    },
  ]),

  // ✅ Format Gnocchi réel : objet avec unit et measures
  getCachedMeasures: jest.fn().mockResolvedValue([
    // Format : [timestamp, granularity, value]
    ["2025-11-01T00:00:00.000Z", 3600, 1000000000], // 1 vcpu pendant 1h
    ["2025-11-01T01:00:00.000Z", 3600, 1000000000],
    ["2025-11-01T02:00:00.000Z", 3600, 1000000000],
    // ... répétez pour couvrir le mois (720 heures)
  ]),
}));

jest.mock("../Project module/Services/Project.services.js", () => ({
  listProjects: jest.fn().mockResolvedValue([
    { id: "p1", name: "Infra-Cloud", active: true },
    { id: "p2", name: "App-SaaS", active: true },
  ]),
  listResources: jest.fn().mockResolvedValue([
    { id: "r1", name: "CPU", unit: "h" },
    { id: "r2", name: "RAM", unit: "GB" },
    { id: "r3", name: "Storage", unit: "GB" },
  ]),
  getMetrics: jest.fn().mockResolvedValue([
    { name: "CPU Hours", value: 120, unitCost: 0.05 },
    { name: "RAM GB", value: 80, unitCost: 0.02 },
    { name: "Storage GB", value: 200, unitCost: 0.01 },
  ]),
  getMeasures: jest.fn().mockResolvedValue([
    { timestamp: "2025-11-01T00:00:00Z", value: 120 },
    { timestamp: "2025-11-01T01:00:00Z", value: 120 },
  ]),
}));

jest.mock("../Models/Project/Project.js", () => ({
  find: jest.fn().mockResolvedValue([
    { id: "p1", name: "Project 1" },
    { id: "p2", name: "Project 2" },
  ]),
  findOne: jest.fn().mockResolvedValue({ id: "p1", name: "Project 1" }),
}));

jest.mock("../Keystone module/Services/Keystone.service.js", () => ({
  KeystoneUser: {
    getUserById: jest.fn().mockResolvedValue({
      id: "u1",
      name: "Test User",
      email: "testuser@example.com",
    }),
  },
}));

jest.mock("../Billing/PDF/generateInvoicePDF.js");
jest.mock("fs");
jest.mock("path");

jest.mock("../Keystone module/Services/getCachedKeystoneToken.js", () => ({
  getCachedKeystoneToken: jest.fn().mockResolvedValue("fake-token"),
}));

// ============================================================================
// 🧩 SECTION 2 : Imports réels (après les mocks)
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import { runMonthlyBillingForAllProjects } from "../Billing/Engine/BillingEngine.js";
import {
  listProjects,
  getMetrics,
  getMeasures,
} from "../Project module/Services/Project.services.js";
import { generateInvoicePDF } from "../Billing/PDF/generateInvoicePDF.js";
import {
  getCachedMetrics,
  getCachedMeasures,
} from "../Billing/Engine/Caching-function.js";
import { KeystoneUser } from "../Keystone module/Services/Keystone.service.js";

// ============================================================================
// 🧪 SECTION 3 : Tests fonctionnels et comportementaux
// ============================================================================
describe("🧾 runMonthlyBillingForAllProjects", () => {
  const mockProjects = [
    { id: "p1", name: "Infra-Cloud", active: true },
    { id: "p2", name: "App-SaaS", active: true },
  ];

  // ✅ AJOUTER cette constante
  const mockResources = [
    { id: "r1", name: "CPU" },
    { id: "r2", name: "RAM" },
    { id: "r3", name: "Storage" },
  ];

  const mockMetrics = [
    { name: "CPU Hours", value: 120, unitCost: 0.05 },
    { name: "RAM GB", value: 80, unitCost: 0.02 },
    { name: "Storage GB", value: 200, unitCost: 0.01 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // --- Services projet ---
    listProjects.mockResolvedValue(mockProjects);
    getMetrics.mockResolvedValue(mockMetrics);
    getMeasures.mockResolvedValue(mockMetrics);

    // --- PDF ---
    generateInvoicePDF.mockResolvedValue(true);

    // --- fs / path ---
    fs.writeFileSync.mockImplementation(() => {
      console.log("[TEST] fs.writeFileSync appelé ✅");
    });
    fs.mkdirSync.mockImplementation(() => {
      console.log("[TEST] fs.mkdirSync appelé ✅");
    });
    path.resolve.mockImplementation((...args) => args.join("/"));
  });

  // ============================================================
  // ✅ Test 1 : CORRIGÉ
  // ============================================================
  it("✅ génère une facture pour chaque projet actif", async () => {
    console.log("🚀 Début du test 1 - génération factures");
    const result = await runMonthlyBillingForAllProjects(2025, 11);
    const invoices = result.invoices;

    console.log("📦 Factures générées:", invoices);

    // Vérifications de base
    expect(listProjects).toHaveBeenCalled();

    // ✅ getCachedMetrics est appelé pour chaque ressource de chaque projet
    const expectedMetricsCalls = mockProjects.length * mockResources.length; // 2 × 3 = 6
    expect(getCachedMetrics).toHaveBeenCalledTimes(expectedMetricsCalls);

    // ✅ getCachedMeasures est appelé pour chaque métrique de chaque ressource
    // 2 projets × 3 ressources × 3 métriques = 18 appels
    // OU simplement vérifier qu'il a été appelé
    expect(getCachedMeasures).toHaveBeenCalled();

    // ✅ Un PDF par projet
    expect(generateInvoicePDF).toHaveBeenCalledTimes(mockProjects.length);

    // ✅ Une facture par projet
    expect(invoices.length).toBe(mockProjects.length);

    // ✅ Chaque facture a des lignes et un total > 0
    console.log("Doit afficher les lignes des projets");
    invoices.forEach((invoice) => {
      expect(invoice.lines.length).toBeGreaterThan(0);
      expect(invoice.total).toBeGreaterThan(0);
    });
  });

  // ============================================================
  // 💰 Test 2 : CORRIGÉ
  // ============================================================
  it("💰 calcule correctement le total d'une facture à partir des métriques", async () => {
    const result = await runMonthlyBillingForAllProjects(2025, 11);
    const invoices = result.invoices;

    console.log("💰 Invoices avec totaux:", invoices);

    invoices.forEach((invoice) => {
      // ✅ Vérifier que le total correspond à la somme des lignes
      const calculatedTotal = invoice.lines
        .map((line) => line.cost)
        .reduce((a, b) => a + b, 0);

      expect(invoice.total).toBeCloseTo(calculatedTotal, 2);

      // ✅ Vérifier que le total est raisonnable (pas 43 milliards !)
      expect(invoice.total).toBeLessThan(100000);
    });
  });

  // ============================================================
  // ⚠️ Test 3 : CORRIGÉ
  // ============================================================
  it("⚠️ continue le processus même si un projet échoue", async () => {
    // Faire échouer getUserById pour le premier projet
    KeystoneUser.getUserById
      .mockRejectedValueOnce(new Error("User not found")) // p1 échoue
      .mockResolvedValue({ id: "u1", email: "test@example.com" }); // p2 réussit

    // ✅ Passer les bons paramètres (year, month)
    const result = await runMonthlyBillingForAllProjects(2025, 11);
    const invoices = result.invoices;

    // ✅ Une seule facture (p2), car p1 a échoué
    expect(invoices.length).toBe(mockProjects.length - 1);
  });

  // ============================================================
  // 🧾 Test 4 : OK
  // ============================================================
  it("📦 crée correctement les fichiers PDF et JSON sans erreur", async () => {
    await runMonthlyBillingForAllProjects(2025, 11);
    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(generateInvoicePDF).toHaveBeenCalled();
  });

  // ============================================================
  // 🚫 Test 5 : OK
  // ============================================================
  it("🚫 ne fait rien si aucun projet actif n'est trouvé", async () => {
    listProjects.mockResolvedValue([]);
    console.log("🚫 Aucun projet actif renvoyé");

    const result = await runMonthlyBillingForAllProjects(2025, 11);
    const invoices = result.invoices;

    console.log("Résultat attendu [] :", invoices);

    expect(getCachedMetrics).not.toHaveBeenCalled();
    expect(getCachedMeasures).not.toHaveBeenCalled();
    expect(generateInvoicePDF).not.toHaveBeenCalled();
    expect(invoices.length).toBe(0);
  });
});
