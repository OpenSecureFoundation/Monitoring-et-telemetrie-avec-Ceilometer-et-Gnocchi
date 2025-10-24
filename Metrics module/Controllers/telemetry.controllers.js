const gnocchiService = require("../services/gnocchiService");

exports.getProjectResources = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;

    // Récupération complète + assignation dynamique
    const resources = await gnocchiService.getResourcesWithMetrics(projectId);

    res.status(200).json({
      success: true,
      projectId,
      resources,
    });
  } catch (error) {
    console.error("[TelemetryController] Error:", error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: "Erreur lors de la récupération des ressources du projet",
      error: error.message,
    });
  }
};
