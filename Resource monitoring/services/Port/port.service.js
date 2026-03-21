import axios from "axios";

export const PortService = {
  async getInstancePorts(instanceId, token) {
    // 1️⃣ récupérer interfaces de l'instance
    const interfaceResponse = await axios.get(
      `${process.env.NOVA_ENDPOINT}/servers/${instanceId}/os-interface`,
      {
        headers: {
          "X-Auth-Token": token,
          "Content-Type": "application/json",
        },
      },
    );

    const interfaces = interfaceResponse.data.interfaceAttachments;

    const ports = [];

    // 2️⃣ récupérer détails de chaque port
    for (const iface of interfaces) {
      const portId = iface.port_id;

      const portResponse = await axios.get(
        `${process.env.NEUTRON_ENDPOINT}/ports/${portId}`,
        {
          headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
          },
        },
      );

      ports.push(portResponse.data.port);
    }

    return ports;
  },
};
