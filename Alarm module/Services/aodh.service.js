import axios from "axios";
import { searchResources } from "./searchResource.js";
import {
  getAlarms,
  // getAlarmsByFilter,
  // getAlarmsByMetrics,
} from "./getAlarmsByFilter.js";

export const AodhService = {
  getAlarms: async (token) => {
    const response = await axios.get(
      `${process.env.AODH_ENDPOINT}/alarms?q.field=all_projects&q.value=true`,
      {
        headers: {
          "X-Auth-Token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    console.log("response.data: ", response.data);
    return response.data;
  },

  createAlarm: async (token, alarmData) => {
    const response = await axios.post(
      `${process.env.AODH_ENDPOINT}/alarms`,
      alarmData,
      {
        headers: {
          "X-Auth-Token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    console.log("response.data: ", response.data);
    return response.data;
  },

  getAlarm: async (token, alarmId) => {
    const response = await axios.get(
      `${process.env.AODH_ENDPOINT}/alarms/${alarmId}`,
      {
        headers: {
          "X-Auth-Token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    console.log("alarm received: ", response.data);
    return response.data;
  },
};

export const getInstanceAlarms = async (instanceId, token) => {
  // Récupérer les ressources liées à la VM
  const [instances, disks, interfaces] = await Promise.all([
    searchResources("instance", token, {
      "=": { original_resource_id: instanceId },
    }),
    searchResources("instance_disk", token, {
      like: { original_resource_id: `%${instanceId}%` },
    }),
    searchResources("instance_network_interface", token, {
      like: { original_resource_id: `%${instanceId}%` },
    }),
  ]);

  // Collecter tous les resource_id liés à cette instance
  const resourceIds = new Set();

  const collect = (resources) => {
    for (const res of resources) {
      if (res.id) resourceIds.add(res.id);
    }
  };

  collect(instances);
  collect(disks);
  collect(interfaces);

  const alarms = await getAlarms(token);

  const result = [];

  for (const alarm of alarms) {
    if (alarm.type === "gnocchi_resources_threshold") {
      const rule = alarm.gnocchi_resources_threshold_rule;
      if (rule && resourceIds.has(rule.resource_id)) {
        result.push(alarm);
      }
    } else if (alarm.type === "gnocchi_aggregation_by_metrics_threshold") {
      // Garder la logique UUID pour ce type si tu l'utilises un jour
      const rule = alarm.gnocchi_aggregation_by_metrics_threshold_rule;
      if (rule?.metrics?.some((id) => metricIds.has(id))) {
        result.push(alarm);
      }
    }
    // Les autres types (event, etc.) sont ignorés
  }

  return result;
};
