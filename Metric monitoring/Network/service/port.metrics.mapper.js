import { PORT_METRICS_CONFIG } from "./port.metrics.config.js";

export const mapMetricSeries = (type, inboundData, outboundData) => {
  const config = PORT_METRICS_CONFIG[type];

  return {
    label: config.label,
    unit: config.unit,
    thresholds: config.thresholds,

    currentValue: {
      inbound: inboundData.at(-1)?.y ?? 0,
      outbound: outboundData.at(-1)?.y ?? 0,
    },

    series: [
      {
        name: "Inbound",
        color: config.colors.inbound,
        data: inboundData,
      },
      {
        name: "Outbound",
        color: config.colors.outbound,
        data: outboundData,
      },
    ],
  };
};
