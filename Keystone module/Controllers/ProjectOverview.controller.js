import catchAsync from "../../Utils/Catch-async.js";
import {
  KeystoneService,
  getScopedToken,
} from "../Services/Keystone.service.js";
import { NovaService } from "../Services/nova.service.js";
import { CinderService } from "../Services/cinder.service.js";
import { NeutronService } from "../Services/neutron.service.js";
import { getKeystoneToken } from "../Services/keystoneTokenStore.js";

export const getProjectOverview = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { username, password } = req.user;
  const scopedToken = await getScopedToken(username, password, projectId);

  console.log("projectId from request params: ", projectId);

  // ➡️ <--- Récupération du token Keystone depuis le cache --->
  const token = getKeystoneToken();

  const [
    projectInfo,
    users,
    instances,
    volumes,
    networks,
    novaQuotas,
    cinderQuotas,
    neutronQuotas,
  ] = await Promise.all([
    KeystoneService.getProject(projectId, scopedToken),
    KeystoneService.getProjectUsers(projectId, scopedToken),
    NovaService.getInstances(projectId, scopedToken),
    CinderService.getVolumes(projectId, scopedToken),
    NeutronService.getNetworks(projectId, token),
    NovaService.getQuotas(projectId, scopedToken),
    CinderService.getQuotas(projectId, scopedToken),
    NeutronService.getQuotas(projectId, token),
  ]);

  const quotas = {
    compute: novaQuotas,
    storage: cinderQuotas,
    network: neutronQuotas,
  };

  // ➡️ <--- Réponse au frontend --->
  res.status(200).json({
    message: "get project successfully",
    project: {
      projectInf: projectInfo,
      users,
      instances,
      volumes,
      networks,
      quotas,
      stats: {
        instances: instances.length,
        volumes: volumes.length,
        users: users.length,
        networks: networks.length,
      },
    },
  });
});
