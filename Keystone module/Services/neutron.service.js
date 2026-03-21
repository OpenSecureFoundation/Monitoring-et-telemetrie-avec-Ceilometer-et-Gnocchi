// ➡️ <--- Importation des modules --->
import axios from "axios";

export const NeutronService = {
  getNetworks: async (projectId, token) => {
    const [netRes, subRes, portRes] = await Promise.all([
      axios.get(
        `${process.env.NEUTRON_ENDPOINT}/networks?project_id=${projectId}`,
        {
          headers: { "X-Auth-Token": token },
        }
      ),
      axios.get(
        `${process.env.NEUTRON_ENDPOINT}/subnets?project_id=${projectId}`,
        {
          headers: { "X-Auth-Token": token },
        }
      ),
      axios.get(
        `${process.env.NEUTRON_ENDPOINT}/ports?project_id=${projectId}`,
        {
          headers: { "X-Auth-Token": token },
        }
      ),
    ]);

    return netRes.data.networks.map((net) => ({
      id: net.id,
      name: net.name,
      status: net.status,
      external: net["router:external"],
      shared: net.shared,
      subnets: subRes.data.subnets
        .filter((s) => net.subnets.includes(s.id))
        .map((s) => ({
          id: s.id,
          cidr: s.cidr,
          gateway: s.gateway_ip,
          ipVersion: s.ip_version,
        })),
      ports: portRes.data.ports
        .filter((p) => p.network_id === net.id)
        .map((p) => ({
          id: p.id,
          deviceId: p.device_id,
          deviceType: p.device_owner,
          fixedIps: p.fixed_ips.map((f) => f.ip_address),
          status: p.status,
        })),
    }));
  },

  getQuotas: async (projectId, token) => {
    const res = await axios.get(
      `${process.env.NEUTRON_ENDPOINT}/quotas/${projectId}`,
      { headers: { "X-Auth-Token": token } }
    );

    const q = res.data.quota;

    return {
      networks: { limit: q.network },
      ports: { limit: q.port },
      routers: { limit: q.router },
      subnets: { limit: q.subnet },
    };
  },
};
