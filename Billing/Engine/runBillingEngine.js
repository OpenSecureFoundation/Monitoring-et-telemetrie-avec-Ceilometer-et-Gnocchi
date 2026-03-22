import express from "express";
import { processProjectBilling } from "./BillingEngine.js";
import { toGnocchiUTC } from "./ResourceContext.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const project = req.body;
  console.log(project);

  // Utilisation
  const start = toGnocchiUTC("2026-03-08T01:00:00"); // → "2026-03-08T00:00:00.000Z"
  const stop = toGnocchiUTC("2026-03-08T05:00:00"); // → "2026-03-08T04:00:00.000Z"

  try {
    console.log(1);
    const invoice = await processProjectBilling(project, start, stop);

    console.log("✅ Facture générée :", invoice);

    res.json({
      message: "Facturation exécutée",
      invoice,
    });
  } catch (err) {
    console.error("🔴 Erreur :", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
