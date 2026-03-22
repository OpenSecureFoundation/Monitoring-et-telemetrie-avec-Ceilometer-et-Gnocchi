// services/aodh.service.js
import axios from "axios";

// export const getAlarmsByFilter = async (filters = {}, token) => {
//   console.log(1);
//   try {
//     console.log(2);
//     const response = await axios.get(`${process.env.AODH_ENDPOINT}/alarms`, {
//       headers: {
//         "X-Auth-Token": token,
//         "Content-Type": "application/json",
//       },
//       params: filters, // 🔥 Axios gère automatiquement la query string
//     });

//     console.log("filters in params:", params);

//     consolelog("response in getalarm by filter:", response.data);
//     return response.data;
//   } catch (error) {
//     console.log("error:", error);
//     if (error.response) {
//       throw new Error(
//         `Aodh getAlarms error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
//       );
//     }

//     throw new Error(`Aodh getAlarms error: ${error.message}`);
//   }
// };

export const getAlarms = async (token) => {
  console.log("get all alarms of project");
  const response = await axios.get(`${process.env.AODH_ENDPOINT}/alarms`, {
    headers: {
      "X-Auth-Token": token,
      Accept: "application/json",
    },
  });

  console.log("project alarms:", response.data);

  return response.data;
};

// export const getAlarmsByMetrics = async (metricIds = [], token) => {
//   if (!metricIds.length) return [];

//   // 🔹 1. tentative optimisée
//   try {
//     const queryBody = {
//       filter: {
//         and: [
//           { "=": { type: "gnocchi_aggregation_by_metrics_threshold" } },
//           {
//             or: metricIds.slice(0, 20).map((id) => ({
//               // ⚠️ limiter le nombre !
//               contains: {
//                 "gnocchi_aggregation_by_metrics_threshold_rule.metrics": id,
//               },
//             })),
//           },
//         ],
//       },
//     };

//     const response = await axios.post(
//       `${process.env.AODH_ENDPOINT}/query/alarms`,
//       queryBody,
//       {
//         headers: {
//           "X-Auth-Token": token,
//         },
//       },
//     );

//     console.log("response:", response);

//     if (Array.isArray(response.data) && response.data.length > 0) {
//       consolelog("response data:", response.dataate);
//       return response.data;
//     }
//   } catch (e) {
//     console.log("e:", e);
//     console.warn("Aodh query POST failed, fallback to GET");
//   }

//   // 🔹 2. fallback fiable
//   const response = await axios.get(`${process.env.AODH_ENDPOINT}/v2/alarms`, {
//     headers: {
//       "X-Auth-Token": token,
//     },
//   });

//   const alarms = response.data;

//   // 🔹 3. filtrage backend fiable
//   return alarms.filter((alarm) => {
//     if (alarm.type !== "gnocchi_aggregation_by_metrics_threshold") {
//       return false;
//     }

//     const rule = alarm.gnocchi_aggregation_by_metrics_threshold_rule;

//     if (!rule || !rule.metrics) return false;

//     return rule.metrics.some((id) => metricIds.includes(id));
//   });
// };
