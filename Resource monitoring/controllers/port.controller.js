import { getScopedToken } from "../../Keystone module/Services/Keystone.service.js";
import { PortService } from "../services/port/port.service.js";

export const getInstancePorts = async (req, res, next) => {
  try {
    const { projectId, instanceId } = req.params;
    // 🔎 Validation
    if (!projectId || !instanceId) {
      return res.status(400).json({
        success: false,
        message: "Missing projectId or instanceId",
      });
    }

    const { username, password } = req.user;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing username or password",
      });
    }

    const token = await getScopedToken(username, password, projectId);
    console.log("token used in neutron ports: ", token);
    // 🔎 Validation
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unable to retrieve scoped token",
      });
    }

    const ports = await PortService.getInstancePorts(instanceId, token);
    res.json({
      success: true,
      message: "get instance port successfully",
      instanceId,
      ports,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur récupération ports instance",
    });
  }
};
