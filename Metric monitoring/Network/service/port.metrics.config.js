export const PORT_METRICS_CONFIG = {
  bandwidth: {
    label: "Bandwidth",
    unit: "Mbps",
    thresholds: {
      warning: 70,
      critical: 90,
    },
    colors: {
      inbound: "#2563eb", // blue
      outbound: "#16a34a", // green
    },
  },

  packetRate: {
    label: "Packet Rate",
    unit: "packets/sec",
    thresholds: {
      warning: 75,
      critical: 90,
    },
    colors: {
      inbound: "#7c3aed", // violet
      outbound: "#f97316", // orange
    },
  },

  packetLoss: {
    label: "Packet Loss",
    unit: "%",
    thresholds: {
      warning: 1,
      critical: 5,
    },
    colors: {
      inbound: "#dc2626", // red
      outbound: "#0ea5e9", // sky
    },
  },
};
