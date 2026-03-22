import {
  getMetricMeasures,
  getDiskMetrics,
  getInstanceDisks,
} from "../../Resource monitoring/services/Instance/gnocchi.service.js";
import {
  normalizeCpu,
  buildDiskMetric,
  buildRamMetric,
  buildMetric,
  aggregateDiskMetrics,
} from "../../Resource monitoring/services/Instance/metrics.service.js";
import { getFlavorById } from "../../Resource monitoring/services/Instance/nova.service.js";
import { formatRange } from "../../Resource monitoring/utils-resources/time.utils.js";

export const buildInstanceMetricView = async (
  instanceId,
  token,
  range,
  flavor,
) => {
  // 1. Récupérer le flavor de l'instance
  // const flavor = await getFlavorById(instanceId, token);

  // 2. format range
  // const range = formatRange(from, to, granularity);
  // console.log("range formated: ", range.from, range.to, granularity);

  // 3. Récupérer les métriques CPU et RAM de l'instance
  const [cpuRaw, ramRaw, disks] = await Promise.all([
    getMetricMeasures(
      instanceId,
      "cpu",
      token,
      range.from,
      range.to,
      range.granularity,
    ),
    getMetricMeasures(
      instanceId,
      "memory.usage",
      token,
      range.from,
      range.to,
      range.granularity,
    ),
    getInstanceDisks(instanceId, token),
  ]);

  // 3. Normaliser les métriques CPU et RAM
  const cpuMeasures = normalizeCpu(cpuRaw, flavor.vcpus);

  console.log("cpu measures: ", cpuMeasures);

  // 4. Récupérer les métriques disk pour CHAQUE disk
  const diskMetrics = await Promise.all(
    disks.map(async (disk) => {
      const [read, write] = await Promise.all([
        getDiskMetrics(
          disk.id,
          "disk.device.read.bytes",
          token,
          range.from,
          range.to,
          range.granularity,
        ),
        getDiskMetrics(
          disk.id,
          "disk.device.write.bytes",
          token,
          range.from,
          range.to,
          range.granularity,
        ),
      ]);
      return {
        name: disk.name, // "vda" ou "vdb"
        read,
        write,
      };
    }),
  );

  return {
    cpu: buildMetric("CPU", "%", "#3B82F6", cpuMeasures),
    ram: buildRamMetric(ramRaw, flavor),
    disk: buildDiskMetric(
      aggregateDiskMetrics(diskMetrics.map((d) => d.read)),
      aggregateDiskMetrics(diskMetrics.map((d) => d.write)),
    ),
  };
};
