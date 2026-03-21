// ➡️ <--- Importation des modules --->
import axios from "axios";

export const CinderService = {
  getVolumes: async (projectId, scopedToken) => {
    const res = await axios.get(
      `${process.env.CINDER_ENDPOINT}/${projectId}/volumes/detail`,
      { headers: { "X-Auth-Token": scopedToken } }
    );

    return res.data.volumes.map((v) => ({
      id: v.id,
      name: v.name,
      size: v.size,
      status: v.status,
      bootable: v.bootable === "true",
      attachments: v.attachments.map((a) => ({
        serverId: a.server_id,
        device: a.device,
      })),
    }));
  },

  getQuotas: async (projectId, scopedToken) => {
    const res = await axios.get(
      `${process.env.CINDER_ENDPOINT}/os-quota-sets/${projectId}?usage=true`,
      { headers: { "X-Auth-Token": scopedToken } }
    );

    const q = res.data.quota_set;

    return {
      gigabytes: {
        used: q.gigabytes.in_use,
        limit: q.gigabytes.limit,
      },
      volumes: {
        used: q.volumes.in_use,
        limit: q.volumes.limit,
      },
    };
  },
};
