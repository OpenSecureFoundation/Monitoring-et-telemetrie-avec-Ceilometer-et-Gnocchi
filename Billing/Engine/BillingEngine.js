// billingEngine.js
// Orchestrateur principal : génère invoices par projet 🟡🟢🔵❓🔄 🔜 🔹 ✅ ➡️

import fs from "node:fs";
import path from "node:path";
import { listProjects } from "../../Project module/Services/Project.services.js";
import { loadState, saveState } from "./State.js";
import {
  toISO,
  startOfMonthISO,
  addMonthsISO,
} from "../../Utils/shared-functions.js";
import {
  INVOICE_JSON_DIR,
  PDF_DIR,
  SUMMARY_DIR,
  LS,
} from "../../Config/Constant.js";
import pLimit from "p-limit";
import { getCachedKeystoneToken } from "../../Keystone module/Services/getCachedKeystoneToken.js";
import { generateHashes } from "../../Utils/Sign.js";
import { generateInvoicePDF } from "../PDF/generateInvoicePDF.js";
import { sendInvoiceEmail } from "../Mail/sendInvoiceEmail.js";
import { KeystoneUser } from "../../Keystone module/Services/Keystone.service.js";
import { billProjectForWindow } from "./BillProjectForWindow.js";
import Project from "../../Models/Project/Project.js";

// ➡️ <--- Limite de parallélisme --->
const projectLimit = pLimit(5);

/**
 * @typedef {Object} Invoice
 * @property {string} projectId - Identifiant unique du projet
 * @property {string} projectname - Nom du projet facturé
 * @property {Object} period - Période de facturation { start, stop }
 * @property {string} period.start - Date ISO de début
 * @property {string} period.stop - Date ISO de fin
 * @property {number} total - Montant total facturé
 * @property {string} hmacSignature - Signature HMAC de la facture
 * @property {string} generatedAt - Date ISO de génération
 */

/**
 * @typedef {Object} BillingSummary
 * @property {string} periodStart - Début de la période
 * @property {string} periodStop - Fin de la période
 * @property {number} invoiceCount - Nombre de factures générées
 * @property {number} totalAmount - Somme totale facturée
 * @property {string} invoicesHash - Hash SHA256 global des factures
 * @property {string} hash - Hash SHA256 du résumé
 * @property {string} hmac - HMAC du résumé
 * @property {string} generatedAt - Date ISO de génération du résumé
 */

/**
 * @typedef {Object} BillingError
 * @property {string} projectId - Identifiant du projet concerné
 * @property {string} error - Message d’erreur
 */

/**
 * ➡️ Traite la facturation d’un seul projet
 * @param {{ id: string, name: string }} project - Projet à facturer
 * @param {string} startISO - Début de la période ISO
 * @param {string} stopISO - Fin de la période ISO
 * @returns {Promise<Invoice>} - La facture générée et signée
 */
export async function processProjectBilling(project, startISO, stopISO) {
  const invoice = await billProjectForWindow(project.id, startISO, stopISO);
  invoice.projectId = project.id;
  invoice.projectname = project.name;

  console.log("invoice: ", invoice.projectId);

  // ➡️ <--- Signature HMAC --->
  invoice.hmacSignature = generateHashes(invoice).hmac;

  console.log("hmac: ", invoice.hmacSignature);

  // ➡️ <--- Sauvegarde JSON --->
  const invoicePath = path.resolve(
    INVOICE_JSON_DIR,
    `invoice_${project.id}_${startISO.substring(0, 7)}.json`,
  );
  fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
  fs.writeFileSync(invoicePath, JSON.stringify(invoice, null, 2));

  // ➡️ <--- Génération PDF --->
  const pdfPath = path.resolve(
    PDF_DIR,
    `invoice_${project.id}_${startISO.substring(0, 7)}.pdf`,
  );
  await generateInvoicePDF(invoice, pdfPath);

  // ➡️ <--- Envoi email --->
  const dbproject = await Project.findOne({ projectId: project.id });
  const creator = dbproject?.creatorId;
  const user = await KeystoneUser.getUserById(creator);
  console.log("Keystone user", user);

  if (user?.email) {
    await sendInvoiceEmail(
      user.email,
      pdfPath,
      `Facture ${invoice.period.start} → ${invoice.period.stop}`,
      `Bonjour ${
        user.name || "utilisateur"
      },\n\nVeuillez trouver ci-joint la facture du projet ${project.name}.`,
    );
  } else {
    console.warn(
      `🟡 Aucun email pour l'utilisateur ${creator}, facture non envoyée.`,
    );
  }

  invoice.generatedAt = toISO(new Date());
  return invoice;
}

/**
 * ➡️ Exécute la facturation mensuelle de tous les projets.
 * @param {number} year - Année de facturation (ex: 2025)
 * @param {number} month - Mois de facturation (1–12)
 * @returns {Promise<{ invoices: Invoice[], errors: BillingError[], summary: BillingSummary | null }>}
 */
export async function runMonthlyBillingForAllProjects(year, month) {
  // ➡️ <--- Validation des paramètres --->
  if (!Number.isInteger(year) || !Number.isInteger(month))
    throw new Error("🔴 Invalid year or month for billing period");

  // ➡️ <--- Fenêtre temporelle --->
  const startISO = startOfMonthISO(year, month);
  const stopISO = addMonthsISO(startISO, 1);
  console.info(
    `🔵 Running monthly billing for ${year}-${month}: ${startISO} → ${stopISO}`,
  );

  // ➡️ <--- État global --->
  const state = loadState();
  state.cycles = state.cycles || [];

  // ➡️ <--- Vérification idempotence --->
  const alreadyBilled = state.cycles.some(
    (c) => c.periodStart === startISO && c.periodStop === stopISO,
  );
  if (alreadyBilled) {
    console.info(
      `🔵 Period ${startISO} - ${stopISO} already billed. Skipping.`,
    );
    return { invoices: [], errors: [], summary: null };
  }

  // ➡️ <--- Chargement projets --->
  const token = await getCachedKeystoneToken();
  const projects = await listProjects(token);

  /** @type {Invoice[]} */
  const invoices = [];
  /** @type {BillingError[]} */
  const errors = [];

  // ➡️ <--- Traitement parallèle --->
  const results = await Promise.allSettled(
    projects.map((p) =>
      projectLimit(async () => {
        try {
          const invoice = await processProjectBilling(p, startISO, stopISO);
          invoices.push(invoice);
          console.info(
            `🔵 Invoice generated for project ${p.id} (${invoice.total} units)`,
          );
        } catch (err) {
          console.error(`🔴 Error billing project ${p.id}: ${err.message}`);
          errors.push({ projectId: p.id, error: err.message });
        }
      }),
    ),
  );

  // ➡️ <--- Sauvegarde erreurs --->
  if (errors.length > 0) {
    const errorsPath = path.resolve(
      LS,
      `errors_${startISO.substring(0, 7)}.json`,
    );
    fs.writeFileSync(errorsPath, JSON.stringify(errors, null, 2));
    console.warn(
      `🟡 ${errors.length} projets ont échoué, détails dans ${errorsPath}`,
    );
  }

  // ➡️ <--- Hash global des factures --->
  const invoicesHash = generateHashes(invoices).sha256;

  /** @type {BillingSummary} */
  const summary = {
    periodStart: startISO,
    periodStop: stopISO,
    invoiceCount: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),
    invoicesHash,
    hash: "",
    hmac: "",
    generatedAt: toISO(new Date()),
  };

  const { sha256, hmac } = generateHashes(summary);
  summary.hash = sha256;
  summary.hmac = hmac;

  // ➡️ <--- Mise à jour de l’état --->
  state.cycles.push({
    periodStart: summary.periodStart,
    periodStop: summary.periodStop,
    generatedAt: summary.generatedAt,
    invoiceCount: summary.invoiceCount,
    initiator: "[BILLING SERVICE]",
    invoicesHash: summary.invoicesHash,
    hash: summary.hash,
    hmac: summary.hmac,
    projectIds: invoices.map((inv) => inv.projectId),
    invoicesInfo: invoices.map((inv) => ({
      projectId: inv.projectId,
      generatedAt: inv.generatedAt,
      hmacSignature: inv.hmacSignature,
    })),
  });
  saveState(state);

  // ➡️ <--- Sauvegarde résumé --->
  fs.mkdirSync(SUMMARY_DIR, { recursive: true });
  fs.writeFileSync(
    path.resolve(SUMMARY_DIR, `summary_${startISO.substring(0, 7)}.json`),
    JSON.stringify(summary, null, 2),
  );

  // ➡️ <--- Rapport final --->
  const successCount = results.filter((r) => r.status === "fulfilled").length;
  console.info(
    `Billing completed: ${successCount}/${projects.length} projects processed.`,
  );

  // ➡️ <--- Retour structuré --->
  return { invoices, errors, summary };
}
