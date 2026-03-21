// ➡️ <--- Importation des modules --->
import axios from "axios";

export const NovaService = {
  getInstances: async (projectId, scopedToken) => {
    const res = await axios.get(
      `${process.env.NOVA_ENDPOINT}/servers/detail?all_tenants=true&project_id=${projectId}`,
      { headers: { "X-Auth-Token": scopedToken } }
    );

    return res.data.servers.map((s) => ({
      id: s.id,
      name: s.name,
      status: s.status,
      flavor: s.flavor.id,
      keyName: s.key_name,
      addresses: Object.entries(s.addresses).flatMap(([network, ips]) =>
        ips.map((ip) => ({
          network,
          ip: ip.addr,
          type: ip["OS-EXT-IPS:type"],
        }))
      ),
    }));
  },

  getQuotas: async (projectId, scopedToken) => {
    const res = await axios.get(
      `${process.env.NOVA_ENDPOINT}/os-quota-sets/${projectId}/detail`,
      { headers: { "X-Auth-Token": scopedToken } }
    );

    const q = res.data.quota_set;

    return {
      cores: { used: q.cores.in_use, limit: q.cores.limit },
      ram: { used: q.ram.in_use, limit: q.ram.limit },
      instances: { used: q.instances.in_use, limit: q.instances.limit },
    };
  },
};
