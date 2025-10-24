// Importation des modules
import express from "express";
import authMidll from "../../Middlewares/Auth.middl.js";
import { getProjectMetricSummary } from "../Controllers/Metrics.controllers.js";
// Création du routeur express
const router = express.Router();

// Route : récupérer les métriques d’un projet
router.get(
  "/projects/:projectId/metrics/summary",
  authMidll,
  getProjectMetricSummary
);

// Exportation du router
module.exports = router;
