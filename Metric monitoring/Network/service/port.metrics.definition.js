export const PORT_METRIC_DEFINITIONS = {
  bandwidth: {
    inbound: "network.incoming.bytes.rate",
    outbound: "network.outgoing.bytes.rate",
  },

  packetRate: {
    inbound: "network.incoming.packets.rate",
    outbound: "network.outgoing.packets.rate",
  },

  packetLoss: {
    inbound: "network.incoming.packets.drop",
    outbound: "network.outgoing.packets.drop",
  },
};
