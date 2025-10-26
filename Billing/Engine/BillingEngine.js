// billingEngine.js
// Orchestrateur principal : génère invoices par projet

import fs from "node:fs";
import path from "node:path";
import {
  listProjects,
  listResources,
  getMetrics,
  getMeasures,
} from "../../Project module/Services/Project.services.js";
import { aggregateMeasures } from "./Aggregate.js";
import { computeCostForMetric } from "./ComputeCost.js";
import { loadState, saveState } from "./State.js";
import {
  toISO,
  startOfMonthISO,
  addMonthsISO,
  msBetweenISO,
} from "../../Utils/Helpers.js";
import {
  INVOICE_JSON_DIR,
  PDF_DIR,
  SUMMARY_DIR,
  LS,
} from "../../Config/constant.js";
import pLimit from "p-limit";
import { getCachedKeystoneToken } from "../../Keystone module/Services/getCachedKeystoneToken.js";
import { generateHashes } from "../../Utils/Sign.js";
import { generateInvoicePDF } from "../PDF/generateInvoicePDF.js";
import { sendInvoiceEmail } from "../Mail/sendInvoiceEmail.js";
import { Project } from "../../Models/Project/Project.js";
import { KeystoneUser } from "../../Keystone module/Services/Keystone.service.js";

// --- Limites parallélisme ---
const projectLimit = pLimit(5); // max 5 projets simultanés
const resourceLimit = pLimit(5); // max 5 ressources simultanées par projet

// --- Facturation d’un projet pour une fenêtre ---
export async function billProjectForWindow(projectId, startISO, stopISO) {
  const windowHours = msBetweenISO(startISO, stopISO) / (1000 * 60 * 60);
  const token = await getCachedKeystoneToken();

  const resources = await listResources(projectId, token);
  const invoice = {
    project_id: projectId,
    period: { start: startISO, stop: stopISO },
    generated_at: toISO(new Date()),
    lines: [],
    total: 0,
    hmac_signature: null,
  };

  // --- Facturation des ressources en parallèle ---
  const resourceResults = await Promise.all(
    resources.map((res) =>
      resourceLimit(async () => {
        const resId = res.id;
        const resName = res.name || resId;

        const metrics = await getMetrics(resId, token);
        const resourceMetricsMap = {};

        for (const metric of metrics) {
          const metricId = metric.id;
          const metricName = metric.name || metric.metric_name || metricId;

          const measures = await getMeasures(
            metricId,
            token,
            startISO,
            stopISO
          );
          const agg = aggregateMeasures(measures, {
            billingMode: metric.billingMode,
            unit: metric.unit,
          });
          if (!agg) continue;

          resourceMetricsMap[metricName] = agg;
        }

        const lines = [];
        let total = 0;
        for (const [metricName, agg] of Object.entries(resourceMetricsMap)) {
          const costObj = computeCostForMetric(
            agg,
            metricName,
            windowHours,
            resourceMetricsMap
          );
          lines.push({
            resource_id: resId,
            resource_name: resName,
            metric_name: metricName,
            metric_unit: agg.unit,
            aggregate: agg.aggregate,
            cost: Number(costObj.cost || 0),
            calc_details: costObj.breakdown || costObj.details,
          });
          total += Number(costObj.cost || 0);
        }

        return { lines, total };
      })
    )
  );

  // Fusion des résultats
  for (const r of resourceResults) {
    invoice.lines.push(...r.lines);
    invoice.total += r.total;
  }

  invoice.total = Math.round(invoice.total * 10000) / 10000;
  return invoice;
}

// --- Facturation mensuelle de tous les projets ---
export async function runMonthlyBillingForAllProjects(year, month) {
  const startISO = startOfMonthISO(year, month);
  const stopISO = addMonthsISO(startISO, 1);
  console.info(`Running billing for period ${startISO} - ${stopISO}`);

  const state = loadState();
  state.cycles = state.cycles || [];

  // --- Vérification idempotence ---
  const alreadyBilled = state.cycles.some(
    (c) => c.period_start === startISO && c.period_stop === stopISO
  );
  if (alreadyBilled) {
    console.info(`Period ${startISO} - ${stopISO} already billed. Skipping.`);
    return []; // ou renvoyer un tableau vide
  }

  const token = await getCachedKeystoneToken();
  const projects = await listProjects(token);
  const invoices = [];

  const results = await Promise.allSettled(
    projects.map((p) =>
      projectLimit(async () => {
        try {
          // --- Facturation d’un projet ---
          const invoice = await billProjectForWindow(p.id, startISO, stopISO);

          // --- Signature HMAC de la facture ---
          invoice.hmac_signature = generateHashes(invoice).hmac;

          // --- Enregistrement de la facture JSON dans le dossier invoice-json ---
          const invoicePath = path.resolve(
            INVOICE_JSON_DIR,
            `invoice_${p.id}_${startISO.substring(0, 7)}.json`
          );
          fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
          fs.writeFileSync(invoicePath, JSON.stringify(invoice, null, 2));

          // --- Enregistrement de la facture PDF dans le dossier invoice-pdf et Génération du PDF ---
          const pdfPath = path.resolve(
            PDF_DIR,
            `invoice_${p.id}_${startISO.substring(0, 7)}.pdf`
          );
          await generateInvoicePDF(invoice, pdfPath);

          // --- Récupération du projet courant ---
          const project = await Project.findById(p.id);
          // --- Récupération du propriétaire du projet ---
          const creator = project?.creator_id;
          // Récupération de l'utilisateur
          const user = await KeystoneUser.getUserById(creator);

          // Envoi du PDF
          if (user?.email) {
            await sendInvoiceEmail(
              user.email,
              pdfPath,
              `Facture ${invoice.period.start} → ${invoice.period.stop}`,
              `Bonjour ${
                user.name || "utilisateur"
              },\n\nVeuillez trouver ci-joint la facture du projet ${p.name}.`
            );
          } else {
            console.warn(
              `⚠️ Aucun email pour l'utilisateur ${creator}, facture non envoyée.`
            );
          }

          // --- Ajout de la facture au tableau d'invoices ---
          invoices.push(invoice);
          console.info(
            `✅ Invoice generated for project ${p.id} (${invoice.total} units)`
          );
        } catch (err) {
          console.error(`❌ Error billing project ${p.id}:`, err.message);
        }
      })
    )
  );

  // --- Gestion des erreurs projet par projet (Liste des projets n'ayant pas été facturé (échec facturation)) ---
  const errors = results
    .map((r, i) => ({ project_id: projects[i].id, error: r.reason?.message }))
    .filter((e) => e.error);

  if (errors.length > 0) {
    const errorsPath = path.resolve(
      LS,
      `errors_${startISO.substring(0, 7)}.json`
    );
    fs.writeFileSync(errorsPath, JSON.stringify(errors, null, 2));
    console.warn(
      `⚠️ ${errors.length} projets ont échoué, détails dans ${errorsPath}`
    );
  }

  // --- Hash SHA256 de toutes les factures pour audit trail ---
  const invoicesHash = generateHashes(invoices).sha256;

  // --- Génération et signature du résumé global ---
  const summary = {
    period_start: startISO,
    period_stop: stopISO,
    invoice_count: invoices.length,
    total_amount: invoices.reduce((sum, inv) => sum + inv.total, 0),
    invoices_hash: invoicesHash, // Hash global des factures
    hash: null, // SHA256 du résumé
    hmac: null, // HMAC du résumé
    generated_at: toISO(new Date()),
  };

  // --- Génération du hash et HMAC du résumé ---
  const { sha256, hmac } = generateHashes(summary);
  summary.hash = sha256;
  summary.hmac = hmac;

  // --- Mise à jour de l’état avec audit trail complet (Résumé de chaque cycle
  // facturation réussi dans lequel nous pouvons observer les projets facturés ---
  state.cycles.push({
    period_start: startISO,
    period_stop: stopISO,
    generated_at: toISO(new Date()),
    invoice_count: invoices.length,
    initiator: "ADMIN",
    invoices_hash: invoicesHash,
    hash: summary.hash,
    hmac: summary.hmac,
    project_ids: projects.map((p) => p.id),
    invoices_info: invoices.map((inv) => ({
      project_id: inv.project_id,
      generated_at: inv.generated_at, // timestamp précis
      hmac_signature: inv.hmac_signature,
    })),
  });
  saveState(state);

  // --- Enregistrement du résumé JSON sur disque ---
  fs.mkdirSync(SUMMARY_DIR, { recursive: true });
  fs.writeFileSync(
    path.resolve(SUMMARY_DIR, `summary_${startISO.substring(0, 7)}.json`),
    JSON.stringify(summary, null, 2)
  );

  // Résultats
  const successCount = results.filter((r) => r.status === "fulfilled").length;
  console.info(
    `Billing completed: ${successCount}/${projects.length} projects processed.`
  );

  return invoices;
}
