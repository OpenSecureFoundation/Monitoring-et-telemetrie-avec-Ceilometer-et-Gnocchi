// services/openstack/gnocchi.service.js
import axios from "axios";

export const getMetricMeasures = async (
  instanceId,
  metricName,
  token,
  start,
  stop,
  granularity,
) => {
  const response = await axios.get(
    `${process.env.GNOCCHI_ENDPOINT}/resource/instance/${instanceId}/metric/${metricName}/measures`,
    {
      headers: {
        "X-Auth-Token": token,
      },
      params: {
        start,
        stop,
        granularity,
        aggregation: "mean",
      },
    },
  );

  return response.data;
};

// Récupérer les métriques d'une instance_disk spécifique
export const getDiskMetrics = async (
  diskResourceId,
  metricName,
  token,
  start,
  stop,
  granularity,
) => {
  try {
    const response = await axios.get(
      `${process.env.GNOCCHI_ENDPOINT}/resource/instance_disk/${diskResourceId}/metric/${metricName}/measures`,
      {
        headers: {
          "X-Auth-Token": token,
        },
        params: {
          start,
          stop,
          granularity,
          aggregation: "mean",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(`❗Erreur disk métrique ${metricName}:`, error.message);
    return [];
  }
};

// Récupérer tous les disks d'une instance
export const getInstanceDisks = async (instanceId, token) => {
  try {
    const response = await axios.get(
      `${process.env.GNOCCHI_ENDPOINT}/resource/instance_disk`,
      {
        headers: {
          "X-Auth-Token": token,
        },
        params: {
          instance_id: instanceId,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(`❗Erreur listing disks:`, error.message);
    return [];
  }
};
