import {
  computeDeltaRate,
  computePacketLoss,
} from "../utils/utilsmetrics.util.js";
import { mapMetricSeries } from "./port.metrics.mapper.js";
import { getResource, getMeasures } from "./gnocchi.client.js";
import { PORT_METRIC_DEFINITIONS } from "./port.metrics.definition.js";

/**
 * Construire les métriques du port (optimisé)
 */
export const buildPortMetrics = async ({
  instanceId,
  portId,
  from,
  to,
  granularity,
  token,
}) => {
  console.log(
    "build port metrics params: ",
    instanceId,
    portId,
    from,
    to,
    granularity,
    token,
  );
  const metricsResult = {};

  // 🔹 1️⃣ Récupérer la resource et tous les metric_id
  const resource = await getResource(token, portId, instanceId);
  if (!resource || !resource.metrics) return metricsResult;

  const metricNames = [
    "network.incoming.bytes",
    "network.outgoing.bytes",
    "network.incoming.packets",
    "network.outgoing.packets",
    "network.incoming.packets.drop",
    "network.outgoing.packets.drop",
  ];

  // 🔹 2️⃣ Récupérer toutes les mesures en parallèle
  const requests = metricNames.map((name) =>
    getMeasures(token, resource.metrics[name], from, to, granularity),
  );

  const [
    incomingBytes,
    outgoingBytes,
    incomingPackets,
    outgoingPackets,
    incomingDrops,
    outgoingDrops,
  ] = await Promise.all(requests);

  console.log("incomingPackets:", incomingPackets);

  console.log("incomingBytes:", incomingBytes);

  console.log("outgoingBytes: ", outgoingBytes);

  // 🔹 3️⃣ Calculer le delta / taux et packet loss
  const inboundBandwidth = computeDeltaRate(incomingBytes, true);
  const outboundBandwidth = computeDeltaRate(outgoingBytes, true);

  console.log("outboundBandwidth: ", outboundBandwidth);

  console.log("inboundBandwidth: ", inboundBandwidth);

  const inboundPacketRate = computeDeltaRate(incomingPackets, true);
  const outboundPacketRate = computeDeltaRate(outgoingPackets, true);

  const inboundLoss = computePacketLoss(incomingPackets, incomingDrops);
  const outboundLoss = computePacketLoss(outgoingPackets, outgoingDrops);

  console.log("inboundLoss: ", inboundLoss);
  console.log("outboundLoss: ", outboundLoss);

  // 🔹 4️⃣ Mapper en format front ready avec couleurs, séries, thresholds
  metricsResult.bandwidth = mapMetricSeries(
    "bandwidth",
    inboundBandwidth,
    // [],
    outboundBandwidth,
  );
  metricsResult.packetRate = mapMetricSeries(
    "packetRate",
    inboundPacketRate,
    outboundPacketRate,
  );
  metricsResult.packetLoss = mapMetricSeries(
    "packetLoss",
    inboundLoss,
    outboundLoss,
  );

  // 🔹 5️⃣ Retour structuré
  return {
    range: { from, to },
    interval: granularity,
    metrics: metricsResult,
  };
};
