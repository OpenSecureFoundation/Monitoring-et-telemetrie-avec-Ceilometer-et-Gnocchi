// Importation des modules
import express from "express";

// Importation des controllers
import { getProjects } from "../Controllers/Project.controllers.js";
import { getProjectOverview } from "../Controllers/ProjectOverview.controller.js";

// Importation des middlewares
import { authMidll } from "../../Middlewares/Auth.middl.js";

// Création du routeur
const router = express.Router();

// Route pour récupérer les projets
router.get("/projects", authMidll, getProjects);

// Route pour recupérer les détails d'un projet
router.get("/projects/:projectId/overview", authMidll, getProjectOverview);

// Exportation du routeur
export default router;
