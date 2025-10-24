// Importation de l'utilitaire catchAsync
import { catchAsync } from "../../Utils/Catch-async.util.js";
// Importation de KeystoneProject
import { KeystoneProject } from "../Services/Keystone.service.js";

// Export de la fonction getProjects
export const getProjects = catchAsync(async (req, res, next) => {
  // Récupération des projets depuis Keystone
  const projects = await KeystoneProject.getProjects();

  // Affichage des projets dans la console
  console.log("projects", projects);

  // Réponse au frontend
  res.status(200).json({
    status: "success",
    results: projects.length,
    data: projects,
  });
});
