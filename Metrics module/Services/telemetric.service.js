import axios from "axios";
import { assignArchivePolicy } from "./assign-policy.service";
import { getKeystoneToken } from "../../Keystone module/Services/keystoneTokenStore";

// --- Lister les ressources d’un projet ---
async function getResourcesByProject(projectId) {
  const token = getKeystoneToken;
  const res = await axios.get(
    `${process.env.GNOCCHI_URL}/v1/resource/instance`,
    {
      headers: { "X-Auth-Token": token },
      params: { project_id: projectId },
    }
  );
  return res.data;
}

// --- Récupérer les métriques d’une ressource ---
async function getResourceMetrics(resourceId) {
  const token = getKeystoneToken;
  const res = await axios.get(
    `${process.env.GNOCCHI_URL}/v1/resource/instance/${resourceId}`,
    {
      headers: { "X-Auth-Token": token },
    }
  );
  return res.data.metrics;
}

// --- Lister les archive policies existantes ---
async function getArchivePolicies() {
  const token = getKeystoneToken;
  const res = await axios.get(`${process.env.GNOCCHI_URL}/v1/archive_policy`, {
    headers: { "X-Auth-Token": token },
  });
  return res.data;
}

// --- Appliquer PATCH si nécessaire ---
async function patchMetricPolicy(metricId, newPolicy) {
  try {
    const token = getKeystoneToken;
    await axios.patch(
      `${process.env.GNOCCHI_URL}/v1/metric/${metricId}`,
      { archive_policy_name: newPolicy },
      { headers: { "X-Auth-Token": token } }
    );
  } catch (err) {
    console.error(
      `[PATCH ERROR] Metric ${metricId}:`,
      err.response?.data || err.message
    );
  }
}

// --- Récupérer les ressources enrichies et appliquer dynamiquement les policies ---
async function getResourcesWithMetrics(projectId) {
  const resources = await getResourcesByProject(projectId);
  const archivePolicies = await getArchivePolicies();

  const enrichedResources = await Promise.all(
    resources.map(async (resource) => {
      const metrics = await getResourceMetrics(resource.id);

      const enrichedMetrics = await Promise.all(
        Object.entries(metrics).map(async ([metricName, metricId]) => {
          // 1️⃣ Calcul de la policy dynamique
          const dynamicPolicy = assignArchivePolicy(
            resource.type || "instance",
            { ...resource, metrics }
          )[metricName];

          // 2️⃣ Trouver la policy actuelle (optionnel si Gnocchi fournit déjà l'info)
          const policyDetails = archivePolicies.find(
            (p) => p.name === dynamicPolicy
          );

          // 3️⃣ PATCH si différent
          if (
            policyDetails &&
            resource.metrics?.[metricName] !== dynamicPolicy
          ) {
            await patchMetricPolicy(metricId, dynamicPolicy);
          }

          return {
            name: metricName,
            id: metricId,
            assigned_policy: dynamicPolicy,
            policy_details: policyDetails || {},
          };
        })
      );

      return {
        id: resource.id,
        type: resource.type || "instance",
        name: resource.display_name || resource.id,
        status: resource.status,
        metrics: enrichedMetrics,
      };
    })
  );

  return enrichedResources;
}

module.exports = {
  getResourcesWithMetrics,
};
