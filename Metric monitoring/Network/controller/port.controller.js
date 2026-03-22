import { buildPortMetrics } from "../service/port.service.js";
import { getScopedToken } from "../../../Keystone module/Services/Keystone.service.js";

export const getPortMetrics = async (req, res) => {
  try {
    const { projectId, instanceId } = req.params;
    console.log("params ofr get port metrics: ", req.params);

    const { from, to, granularity, portId } = req.body;
    console.log("body data: ", from, to, granularity, portId);
    const { username, password } = req.user;

    // 🔎 Validation
    if (!projectId || !instanceId) {
      return res.status(400).json({
        success: false,
        message: "Missing projectId or instanceId",
      });
    }

    if (!portId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing portId" });
    }

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Missing date range (from, to)",
      });
    }

    // 🔐 1️⃣ Récupération du token scoped via Keystone
    const token = await getScopedToken(username, password, projectId);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unable to retrieve scoped token",
      });
    }

    const start = new Date(Number(from)).toISOString();
    const stop = new Date(Number(to)).toISOString();
    const step = Number(granularity); // on impose secondes

    console.log("start: ", start);
    console.log("stop: ", stop);
    console.log("granularity: ", granularity);

    // 📊 2️⃣ Construction métrique (Gnocchi / Ceilometer)
    const result = await buildPortMetrics({
      instanceId,
      portId,
      from: start,
      to: stop,
      granularity: step,
      token,
    });

    return res.status(200).json({
      success: true,
      message: "Metrics retrieved successfully",
      trafic: result,
    });
  } catch (error) {
    console.error("Network metrics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve port metrics",
    });
  }
};
