// Importation des modules
import express from "express";
// import validateRequest from "../../Middlewares/Validate.middl.js";
// import userJoiSchema from "../Validations/User.validation.js";

import { login } from "../Controllers/User.controllers.js";

// Création du routeur
const router = express.Router();

// Route pour la connexion
router.post("/login", validateRequest(userJoiSchema, "body"), login);

// Exportation du routeur
export default router;
