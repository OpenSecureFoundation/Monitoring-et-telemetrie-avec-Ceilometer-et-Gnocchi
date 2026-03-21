import { getInstanceById, getFlavorById } from "./nova.service.js";
import { getMiniMetricsForInstance } from "./metrics.service.js";

export const buildInstanceOverview = async (instanceId, token) => {
  // Récupérer l'instance
  const instance = await getInstanceById(instanceId, token);

  // Flavor (pour RAM + vCPU)
  const flavor = await getFlavorById(instance.flavor, token);
  console.log("ronice flavor: ", flavor);

  const miniMetrics = await getMiniMetricsForInstance(
    instanceId,
    token,
    flavor,
  );

  return {
    instance: {
      id: instance.id,
      name: instance.name,
      status: instance.status,
      created: instance.created,
      addresses: instance.addresses,
      flavor: flavor.name,
      uptime: instance.uptime,
    },
    miniMetrics,
  };
};
