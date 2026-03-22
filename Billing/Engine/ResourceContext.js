/**
 * Transforme le resourceMetricsMap en un contexte lisible par toutes les sous-fonctions
 * @param {Object} resourceMetricsMap - Map des métriques de la ressource
 * @returns {Object} resourceContext simplifié
 */
export function buildResourceContext(resourceMetricsMap) {
  return {
    cpu: {
      vcpus: resourceMetricsMap["cpu.vcpus"] || { aggregate: 0 },
      utilization: resourceMetricsMap["cpu.utilization"] || { aggregate: 0 },
    },
    memory: {
      usage: resourceMetricsMap["memory.usage"] || { aggregate: 0 },
      resident: resourceMetricsMap["memory.resident"] || { aggregate: 0 },
    },
    disk: {
      volume: resourceMetricsMap["disk.volume.size"] || { aggregate: 0 },
      io: resourceMetricsMap["disk.io.bytes"] || { aggregate: 0 },
    },
    network: {
      incoming: resourceMetricsMap["network.incoming.bytes"] || {
        aggregate: 0,
      },
      outgoing: resourceMetricsMap["network.outgoing.bytes"] || {
        aggregate: 0,
      },
    },
    storage: {
      objects: resourceMetricsMap["storage.objects.size"] || { aggregate: 0 },
    },
    // ➡️ <--- Possibilité d’ajouter d’autres métriques ou contexte métier ici --->
  };
}

// Fonction utilitaire de conversion
export function toGnocchiUTC(localDatetimeStr, offsetHours = 1) {
  // localDatetimeStr : "2026-03-08T01:00:00" (heure WAT saisie par l'user)
  const date = new Date(localDatetimeStr + `+0${offsetHours}:00`);
  return date.toISOString(); // Gnocchi accepte le format ISO 8601 UTC
}
