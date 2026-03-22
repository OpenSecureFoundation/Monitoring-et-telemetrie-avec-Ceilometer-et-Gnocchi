import { AodhService } from "../Services/aodh.service.js";
import { mapAodhAlarmToAlert } from "../Services/alert.mapper.js";
import {
  KeystoneProject,
  getScopedTokenSystem,
} from "../../Keystone module/Services/Keystone.service.js";
// ➡️ <--- Importation de setKeystoneToken, getKeystoneToken --->
import { getKeystoneToken } from "../../Keystone module/Services/keystoneTokenStore.js";

export const getAlertOverview = async (req, res, next) => {
  const { username, password } = req.user;
  const token = await getScopedTokenSystem(username, password);
  console.log("token scoped system: ", token);

  const [alarms, projects] = await Promise.all([
    AodhService.getAlarms(token),
    KeystoneProject.getProjects(token),
  ]);

  console.log("projects: ", projects);

  if (Array.isArray(alarms)) {
    console.log("C'est un tableau, tu peux utiliser .map()");
    console.log("alarms: ", alarms);
  } else {
    console.error("Alarms n'est pas un tableau. Reçu :", alarms);
  }

  // const projectMap = Object.fromEntries(projects.map((p) => [p.id, p.name]));
  const projectMap = projects.map((p) => ({ id: p.id, name: p.name }));
  console.log("projectMap: ", projectMap);

  const alerts = alarms.map((alarm) => mapAodhAlarmToAlert(alarm, projectMap));

  const stats = {
    critical: alerts.filter((a) => a.severity === "critical").length,
    warning: alerts.filter((a) => a.severity === "warning").length,
    ok: alerts.filter((a) => a.severity === "ok").length,
  };

  res.status(200).json({
    message: "get alerts overview successfully",
    stats,
    alerts,
    projectMap,
  });
};
