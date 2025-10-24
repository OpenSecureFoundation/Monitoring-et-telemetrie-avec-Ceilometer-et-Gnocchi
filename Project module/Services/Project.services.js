import axios from "axios";
import { getKeystoneAuth } from "./keystoneTokenStore";

// Export de la fonction listProjects
export async function listProjects() {
  // Récupération du token Keystone depuis le store
  const token = getKeystoneAuth();
  // Appel à Keystone pour lister tous les projets
  const res = await axios.get(process.env.OS_AUTH_URL + "/projects", {
    headers: { "X-Auth-Token": token },
  });
  return res.data.projects;
}

// Export de la fonction listResources
export async function listResources(projectId, token) {
  const res = await axios.get(
    `${process.env.OS_GNOCCHI_URL}/resource/instance`,
    {
      headers: { "X-Auth-Token": token },
      params: { project_id: projectId },
    }
  );
  return res.data.resources;
}

// Export de la fonction getMetrics
export async function getMetrics(resourceId, token) {
  const res = await axios.get(`${process.env.OS_GNOCCHI_URL}/metric`, {
    headers: { "X-Auth-Token": token },
    params: { resource_id: resourceId },
  });
  return res.data.metrics;
}

// Export de la fonction getMeasures
export async function getMeasures(metricId, token, start, stop) {
  const res = await axios.get(
    `${process.env.OS_GNOCCHI_URL}/metric/${metricId}/measures`,
    {
      headers: { "X-Auth-Token": token },
      params: { start, stop },
    }
  );
  return res.data;
}
