// Importation des modules
import express from "express";
// Importation de authentification Midlleware
import authMidll from "../../Middlewares/Auth.middl.js";
// Importation de node-cron
import cron from "node-cron";
// Importation de runBillingCycle
import { runBillingCycle } from "./billingEngine.js";

// Création du routeur express
const router = express.Router();

// Route : récupérer les métriques d’un projet
router.get(
  "/projects/:projectId/metrics/summary",
  authMidll,
  getProjectMetricSummary
);

// Route manuelle pour tester
router.get("/billing/run", async (req, res) => {
  await runBillingCycle();
  res.send("Cycle de facturation terminé !");
});

// Cron pour exécution automatique tous les jours à minuit
cron.schedule("0 0 * * *", async () => {
  console.log("Début du cycle automatique...");
  await runBillingCycle();
  console.log("Cycle terminé !");
});

// Route pour lancer le cycle de facturation
router.get("/billing/start", async (req, res) => {
  cron.schedule("*/5 * * * *", async () => {
    await runBillingCycle();
  });
  res.send("Cycle de facturation lancé !");
});

// Route pour arrêter le cycle de facturation
router.get("/billing/stop", async (req, res) => {
  cron.stop();
  res.send("Cycle de facturation arrêté !");
});

// Cron pour exécution automatique tous les jours à minuit
router.get("/billing/automatic", async (req, res) => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Début du cycle automatique...");
    await runBillingCycle();
    console.log("Cycle terminé !");
  });
  res.send("Cycle de facturation lancé automatiquement !");
});

// Cron exécuté tous les 30 jours à minuit
router.get("/billing/automatic", async (req, res) => {
  cron.schedule("0 0 */30 * *", async () => {
    console.log("Début du cycle automatique...");
    await runBillingCycle();
    console.log("Cycle terminé !");
  });
  res.send("Cycle de facturation lancé automatiquement !");
});

// --- Scheduler de facturation ---
cron.schedule(
  "0 0 1 * *",
  async () => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth(); // pour facturer le mois précédent

    try {
      console.log(
        `[${new Date().toISOString()}] Début facturation automatique pour ${year}-${month}`
      );
      const invoices = await runMonthlyBillingForAllProjects(year, month);
      console.log(
        `[${new Date().toISOString()}] Facturation terminée : ${
          invoices.length
        } invoices générées`
      );
    } catch (err) {
      console.error(
        `[${new Date().toISOString()}] Erreur facturation automatique :`,
        err
      );
    }
  },
  { timezone: "UTC" }
);

console.log(
  "Scheduler de facturation intégré et activé (1er du mois à minuit UTC)."
);

console.log("⏰ Tâche CRON de facturation planifiée");

// Exportation du routeur
export default router;
