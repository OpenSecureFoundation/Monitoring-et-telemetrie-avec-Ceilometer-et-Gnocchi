// ➡️ <--- Importation de l'utilitaire catchAsync --->
import catchAsync from "../../Utils/Catch-async.js";

// ➡️ <--- Importation de KeystoneProject --->
import { KeystoneProject } from "../Services/Keystone.service.js";

// ➡️ <--- Export de la fonction getProjects --->
export const getProjects = catchAsync(async (req, res, next) => {
  // ➡️ Récupération des projets depuis Keystone
  const projects = await KeystoneProject.getProjects();

  // ➡️ Initialisation des stats
  const stats = {
    totalProjects: projects.length,
    activeProjects: 0,
    inactiveProjects: 0,
    totalDomains: 0,
  };

  // ➡️ Set pour stocker les domaines uniques
  const uniqueDomains = new Set();

  // ➡️ Parcours des projets
  projects.forEach((project) => {
    // Actif / Inactif
    if (project.enabled === true) {
      stats.activeProjects++;
    } else {
      stats.inactiveProjects++;
    }

    // Domaine (domain_id ou domain.name selon l'API Keystone)
    if (project.domain_id) {
      uniqueDomains.add(project.domain_id);
    } else if (project.domain?.name) {
      uniqueDomains.add(project.domain.name);
    }
  });

  // ➡️ Nombre total de domaines uniques
  stats.totalDomains = uniqueDomains.size;

  // ➡️ Logs utiles pour debug
  console.log("Projects:", projects.length);
  console.log("Stats:", stats);

  // ➡️ Réponse au frontend
  res.status(200).json({
    message: "get projects successfully",
    stats,
    projects,
  });
});
