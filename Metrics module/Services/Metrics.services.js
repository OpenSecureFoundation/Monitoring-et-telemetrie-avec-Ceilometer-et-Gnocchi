// Importation des modules
import axios from "axios";

class MetricService {
  // constructeur de la classe MetricService
  constructor() {
    this.urlGnocchi = process.env.GNOCCHI_API_URL;
  }

  async getMetricLastValue(token, metricName, aggregation, projectId) {
    if (!token) throw new Error("Token Keystone manquant");
    const headers = { "X-Auth-Token": token };
    const url = `${this.urlGnocchi}/v1/aggregation/resource/generic?metric=${metricName}&aggregation=${aggregation}&project_id=${projectId}`;

    const res = await axios.get(url, { headers });
    if (!res.data || res.data.length === 0) return 0;
    const measures = res.data[0].measures;
    return measures && measures.length > 0
      ? measures[measures.length - 1][2]
      : 0;
  }

  async getProjectMetricSummary(token, projectId) {
    const metricConfigs = [
      {
        key: "cpu_avg",
        name: "cpu_util",
        aggregation: "mean",
      },
      {
        key: "ram_avg",
        name: "memory.usage",
        aggregation: "mean",
      },
      {
        key: "network_in_rate",
        name: "network.incoming.bytes.rate",
        aggregation: "sum",
      },
      {
        key: "disk_usage",
        name: "disk.usage",
        aggregation: "sum",
      },
    ];

    const promises = metricConfigs.map((cfg) =>
      this.getMetricLastValue(token, cfg.name, cfg.aggregation, projectId)
    );

    const results = await Promise.all(promises);

    const summary = {};
    metricConfigs.forEach((cfg, idx) => {
      summary[cfg.key] = results[idx];
    });
    summary.project_id = projectId;
    return summary;
  }
}

export default new MetricService();
