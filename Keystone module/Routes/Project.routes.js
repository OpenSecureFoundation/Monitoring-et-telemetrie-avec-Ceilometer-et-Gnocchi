// Importation des modules
import express from "express";

// Importation des controllers
import { getProjects } from "../Controllers/Project.controllers.js";

// Importation des middlewares
import authMidll from "../../Middlewares/Auth.middl.js";

// Création du routeur
const router = express.Router();

// Route pour récupérer les projets
router.get("/projects", authMidll, getProjects);

// Exportation du routeur
export default router;
