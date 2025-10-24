// assignArchivePolicy.js

export function assignArchivePolicy(resourceType, resource) {
  const { status, metrics } = resource;
  const assignedPolicies = {};

  // -------------------------------
  // 🔹 1. INSTANCE (VM)
  // -------------------------------
  if (resourceType === "instance") {
    for (const metricName in metrics) {
      const value = metrics[metricName];

      if (metricName.startsWith("cpu")) {
        if (value > 70) assignedPolicies[metricName] = "high_precision";
        else if (value >= 30) assignedPolicies[metricName] = "medium_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName.startsWith("memory")) {
        if (value > 80) assignedPolicies[metricName] = "high_precision";
        else if (value >= 50) assignedPolicies[metricName] = "medium_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName.startsWith("disk")) {
        if (value > 10_000_000)
          assignedPolicies[metricName] = "medium_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName.startsWith("network")) {
        if (value > 100_000_000)
          assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName === "status") {
        if (status === "ACTIVE")
          assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "very_low_precision";
      } else assignedPolicies[metricName] = "default_policy";
    }
  }

  // -------------------------------
  // 🔹 2. VOLUME (Cinder)
  // -------------------------------
  else if (resourceType === "volume") {
    for (const metricName in metrics) {
      const value = metrics[metricName];

      if (metricName === "volume.size") {
        assignedPolicies[metricName] = "very_low_precision";
      } else if (metricName.includes("read")) {
        if (resource.attached) assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName.includes("write")) {
        if (resource.attached) assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName === "volume.status") {
        if (resource.status === "error" || resource.status === "degraded")
          assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else assignedPolicies[metricName] = "default_policy";
    }
  }

  // -------------------------------
  // 🔹 3. NETWORK / PORT (Neutron)
  // -------------------------------
  else if (resourceType === "network") {
    for (const metricName in metrics) {
      const value = metrics[metricName];

      if (metricName.includes("incoming") || metricName.includes("outgoing")) {
        if (value > 100_000_000)
          assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName === "port.status") {
        if (resource.status === "DOWN")
          assignedPolicies[metricName] = "very_low_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else assignedPolicies[metricName] = "default_policy";
    }
  }

  // -------------------------------
  // 🔹 4. IMAGE (Glance)
  // -------------------------------
  else if (resourceType === "image") {
    for (const metricName in metrics) {
      const value = metrics[metricName];

      if (metricName === "image.size") {
        assignedPolicies[metricName] = "very_low_precision";
      } else if (metricName.includes("download")) {
        if (value > 100) assignedPolicies[metricName] = "high_precision";
        // téléchargements fréquents
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName === "image.count") {
        if (value > 10) assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "very_low_precision";
      } else assignedPolicies[metricName] = "default_policy";
    }
  }

  // -------------------------------
  // 🔹 5. HOST / COMPUTE NODE
  // -------------------------------
  else if (resourceType === "host") {
    for (const metricName in metrics) {
      const value = metrics[metricName];

      if (metricName.startsWith("cpu")) {
        if (value > 70) assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName.startsWith("memory")) {
        if (value > 80) assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName.startsWith("disk")) {
        if (value > 10_000_000) assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "low_precision";
      } else if (metricName.startsWith("sensor.temp")) {
        if (value > 70) assignedPolicies[metricName] = "high_precision";
        else assignedPolicies[metricName] = "very_low_precision";
      } else assignedPolicies[metricName] = "default_policy";
    }
  }

  // -------------------------------
  // 🔹 Cas non géré
  // -------------------------------
  else {
    for (const metricName in metrics) {
      assignedPolicies[metricName] = "default_policy";
    }
  }

  return assignedPolicies;
}
