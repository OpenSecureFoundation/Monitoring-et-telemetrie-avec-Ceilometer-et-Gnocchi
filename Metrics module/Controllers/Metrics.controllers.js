// Importation des modules
import { catchAsync } from "../../Utils/Catch-async.util.js";
import { getKeystoneToken } from "../../Keystone module/Services/keystoneTokenStore.js";
import metricService from "../Services/Metrics.services.js";

export const getProjectMetricSummary = catchAsync(async (req, res, next) => {
  // Récupèration du projectId dans les paramètres de la requête
  const { projectId } = req.params;
  // Récupèration du token Keystone
  const token = getKeystoneToken();
  // Appel du service Keystone pour récupérer les métriques globales du projet
  const summary = await metricService.getProjectMetricSummary(token, projectId);
  // Renvoyez la réponse au frontend
  res.status(200).json({
    success: true,
    app_token: req.appToken,
    data: summary,
  });
});
