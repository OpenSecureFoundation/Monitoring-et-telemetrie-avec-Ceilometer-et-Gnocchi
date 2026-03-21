import axios from "axios";
import { getKeystoneToken } from "../../Keystone module/Services/keystoneAuth.js";
import { BILLING_CONFIG } from "../../Config/Constant.js";

// Export de la fonction listProjects
export async function listProjects() {
  // Récupération du token Keystone depuis le store
  const token = await getKeystoneToken();
  // Appel à Keystone pour lister tous les projets
  const res = await axios.get(process.env.OS_AUTH_URL + "/projects", {
    headers: { "X-Auth-Token": token },
  });
  return res.data.projects;
}

// Export de la fonction listResources
export async function listResources(projectId, token) {
  console.log("to see params:", projectId, token);
  const res = await axios.get(
    `${process.env.GNOCCHI_ENDPOINT}/resource/instance`,
    {
      headers: { "X-Auth-Token": token },
      params: { project_id: projectId },
    },
  );
  return res.data;
}

// Export de la fonction getMetrics
export async function getMetrics(resourceId, token) {
  const res = await axios.get(`${process.env.GNOCCHI_ENDPOINT}/metric`, {
    headers: { "X-Auth-Token": token },
    params: { resource_id: resourceId },
  });
  return res.data;
}

// Export de la fonction getMeasures
export async function getMeasures(metricId, token, start, stop) {
  const res = await axios.get(
    `${process.env.GNOCCHI_ENDPOINT}/metric/${metricId}/measures`,
    {
      headers: { "X-Auth-Token": token },
      params: { start, stop, granularity: BILLING_CONFIG.GRANULARITY },
    },
  );
  return res.data;
}
