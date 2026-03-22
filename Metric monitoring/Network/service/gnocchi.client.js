import axios from "axios";

/**
 * Récupère la resource port de Gnocchi
 */
export const getResource = async (token, instanceId, portId) => {
  try {
    const response = await axios.get(
      `${process.env.GNOCCHI_ENDPOINT}/resource/instance_network_interface`,
      {
        headers: { "X-Auth-Token": token },
        params: { instance_id: instanceId },
      },
    );

    const resources = response.data;

    if (!resources.length) return null;

    // Extraire les 8 premiers caractères du port neutron
    const shortPortId = portId.replace(/-/g, "").slice(0, 8);

    const resource = resources.find((r) =>
      r.original_resource_id.includes(shortPortId),
    );

    return resource || null;
  } catch (error) {
    console.error("Failed to fetch instance interfaces:", error.message);
    return null;
  }
};

/**
 * Récupère les mesures Gnocchi pour un metric_id donné
 */
export const getMeasures = async (token, metricId, from, to, step) => {
  if (!metricId) return [];

  try {
    console.log("metric id: ", metricId);
    const response = await axios.get(
      `${process.env.GNOCCHI_ENDPOINT}/metric/${metricId}/measures`,
      {
        headers: { "X-Auth-Token": token },
        params: { start: from, stop: to, granularity: step },
      },
    );

    console.log("metric response: ", response);

    const newResponse = response.data.map(([timestamp, _gran, value]) => ({
      x: new Date(timestamp).getTime(),
      y: Number(value),
    }));

    console.log("new response: ", newResponse);

    return newResponse;
  } catch (error) {
    console.error(`Failed to fetch metric ${metricId}:`, error.message);
    return [];
  }
};
