import { buildInstanceMetricView } from "../services/metric.instance.service.js";
import { getScopedToken } from "../../Keystone module/Services/Keystone.service.js";
import { formatRange } from "../../Resource monitoring/utils-resources/time.utils.js";
import { getFlavorById } from "../../Resource monitoring/services/Instance/nova.service.js";
import { getInstanceById } from "../../Resource monitoring/services/Instance/nova.service.js";

export const getInstanceMetrics = async (req, res, next) => {
  try {
    // 1. Récupérer les paramètres de la requête
    const { projectId, instanceId } = req.params;

    // 🔎 Validation
    if (!projectId || !instanceId) {
      return res.status(400).json({
        success: false,
        message: "Missing projectId or instanceId",
      });
    }

    // 2. Récupérer les paramètres dd'authentification
    const { username, password } = req.user;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing username or password",
      });
    }

    // 3. Récupérer le body de  la requête
    const { from, to, granularity } = req.body;
    // 🔎 Validation
    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Missing date range (from, to)",
      });
    }

    // 4. Générer le token scopé projet
    const token = await getScopedToken(username, password, projectId);
    // 🔎 Validation
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unable to retrieve scoped token",
      });
    }

    // Récuprer l'instance
    const instance = await getInstanceById(instanceId, token);

    // 5. Récupérer le flavor de l'instance
    const flavor = await getFlavorById(instance.flavor, token);
    console.log("my flavor: ", flavor);

    // 5. format range
    const range = formatRange(from, to, granularity);
    console.log("range formated: ", range.from, range.to, granularity);

    // 5. Buld la vue sur les métrics de l'instance
    const metrics = await buildInstanceMetricView(
      instanceId,
      token,
      range,
      flavor,
    );

    return res.status(200).json({
      sucess: true,
      message: "Get instance metric successfully",
      instance: { resourceType: "instance", id: instanceId },
      timeSeries: metrics,
    });
  } catch (error) {
    console.error("Instance metrics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve instance metrics",
    });
  }
};
