import axios from "axios";

export const getInstanceById = async (instanceId, token) => {
  const response = await axios.get(
    `${process.env.NOVA_ENDPOINT}/servers/${instanceId}`,
    {
      headers: {
        "X-Auth-Token": token,
      },
    },
  );

  const server = response.data.server;
  console.log("instance monitoré:", {
    id: server.id,
    name: server.name,
    status: server.status,
    created: server.created,
    addresses: Object.entries(server.addresses).flatMap(([network, ips]) =>
      ips.map((ip) => ({
        network,
        ip: ip.addr,
        type: ip["OS-EXT-IPS:type"],
      })),
    ),
    flavor: server.flavor.id,
    uptime: computeUptime(server.created),
  });

  return {
    id: server.id,
    name: server.name,
    status: server.status,
    created: server.created,
    addresses: Object.entries(server.addresses).flatMap(([network, ips]) =>
      ips.map((ip) => ({
        network,
        ip: ip.addr,
        type: ip["OS-EXT-IPS:type"],
      })),
    ),
    flavor: server.flavor.id,
    uptime: computeUptime(server.created),
  };
};

const computeUptime = (createdAt) => {
  const created = new Date(createdAt);
  const now = new Date();
  const diff = now - created;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return `${days}d ${hours}h ${minutes}m`;
};

/**
 * Récupère un flavor OpenStack par son ID
 * Utilisé pour normaliser CPU (%) et RAM (%)
 */
export const getFlavorById = async (flavorId, token) => {
  try {
    console.log("params for flavor: ", flavorId, token);
    const response = await axios.get(
      `${process.env.NOVA_ENDPOINT}/flavors/${flavorId}`,
      {
        headers: {
          "X-Auth-Token": token,
        },
      },
    );

    const flavor = response.data.flavor;
    console.log("Flavor:", flavor);
    console.log("Flavor RAM (MB):", flavor.ram);

    return {
      id: flavor.id,
      name: flavor.name,
      vcpus: flavor.vcpus,
      ram: flavor.ram, // en MB
      disk: flavor.disk, // en GB
      ephemeral: flavor["OS-FLV-EXT-DATA:ephemeral"] ?? 0,
    };
  } catch (error) {
    console.error("❌ Error fetching flavor:", error.message);
    throw new Error("Unable to fetch flavor");
  }
};
