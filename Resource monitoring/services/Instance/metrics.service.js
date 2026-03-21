import { getMetricMeasures, getDiskMetrics } from "./gnocchi.service.js";
import { getInstanceDisks } from "./gnocchi.service.js";

const ONE_HOUR = 60 * 60 * 1000;
const FIVE_MIN = 300;

export const getMiniMetricsForInstance = async (instanceId, token, flavor) => {
  const now = new Date();
  const stop = now.toISOString();
  const start = new Date(now.getTime() - ONE_HOUR).toISOString();

  console.log("start hour: ", start);
  console.log("stop hour: ", stop);

  const disks = await getInstanceDisks(instanceId, token);
  console.log("Disks found:", disks.length);

  // 2. Récupérer les métriques CPU et RAM de l'instance
  const [cpuRaw, ramRaw] = await Promise.all([
    getMetricMeasures(instanceId, "cpu", token, start, stop, FIVE_MIN),
    getMetricMeasures(instanceId, "memory.usage", token, start, stop, FIVE_MIN),
  ]);

  const cpuMeasures = normalizeCpu(cpuRaw, flavor.vcpus);

  // 3. Récupérer les métriques disk pour CHAQUE disk
  const diskMetrics = await Promise.all(
    disks.map(async (disk) => {
      const [readBytes, writeBytes] = await Promise.all([
        getDiskMetrics(
          disk.id,
          "disk.device.read.bytes",
          token,
          start,
          stop,
          FIVE_MIN,
        ),
        getDiskMetrics(
          disk.id,
          "disk.device.write.bytes",
          token,
          start,
          stop,
          FIVE_MIN,
        ),
      ]);

      return {
        name: disk.name, // "vda" ou "vdb"
        readBytes,
        writeBytes,
      };
    }),
  );

  // 4. Agréger tous les disks (vda + vdb)
  const diskRead = aggregateDiskMetrics(diskMetrics.map((d) => d.readBytes));
  const diskWrite = aggregateDiskMetrics(diskMetrics.map((d) => d.writeBytes));

  return {
    range: "last_1h",
    interval: "5m",
    metrics: [
      buildMetric("CPU", "%", "#3B82F6", cpuMeasures),
      buildRamMetric(ramRaw, flavor),
      // ram: buildMetric("RAM", "%", "#10B981", ramMeasures),
      buildDiskMetrics(diskRead, diskWrite),
    ],
  };
};

export const buildMetric = (label, unit, color, measures) => {
  const series = measures.map(([timestamp, , value]) => ({
    x: new Date(timestamp).getTime(),
    y: Number(value.toFixed(1)),
  }));

  return {
    label,
    unit,
    color,
    currentValue: series.at(-1)?.y ?? 0,
    thresholds: {
      warning: 70,
      critical: 90,
    },
    timeSeries: series,
  };
};

export const buildDiskMetrics = (readMeasures, writeMeasures) => {
  const series = [];

  for (let i = 1; i < readMeasures.length; i++) {
    const [ts, g, read] = readMeasures[i];
    const prevRead = readMeasures[i - 1][2] ?? 0;
    const write = writeMeasures[i]?.[2] ?? 0;
    const prevWrite = writeMeasures[i - 1]?.[2] ?? 0;

    const deltaBytes = read - prevRead + (write - prevWrite);
    const mbPerSec = deltaBytes / (g * 1024 * 1024);

    series.push({
      x: new Date(ts).getTime(),
      y: Number(Math.max(mbPerSec, 0).toFixed(1)),
    });
  }

  return {
    label: "Disk I/O",
    unit: "MB/s",
    color: "#F59E0B",
    currentValue: series.at(-1)?.y ?? 0,
    thresholds: {
      warning: 50,
      critical: 100,
    },
    timeSeries: series,
  };
};

// Fonction helper pour agréger les métriques de plusieurs disks

export const aggregateDiskMetrics = (metricsArray) => {
  if (metricsArray.length === 0) return [];
  if (metricsArray.length === 1) return metricsArray[0];

  // Fusionner les timestamps et additionner les valeurs
  const timestamps = new Set();
  metricsArray.forEach((metrics) => {
    metrics.forEach(([timestamp]) => timestamps.add(timestamp));
  });

  return Array.from(timestamps)
    .sort()
    .map((timestamp) => {
      let totalValue = 0;
      let granularity = 300;

      metricsArray.forEach((metrics) => {
        const point = metrics.find(([ts]) => ts === timestamp);
        if (point) {
          totalValue += point[2];
          granularity = point[1];
        }
      });

      return [timestamp, granularity, totalValue];
    });
};

// ---- NORMALISATIONS ----

export const normalizeCpu = (measures, vcpus) => {
  return measures.map(([ts, g, val], i, arr) => {
    if (i === 0) return [ts, g, 0];
    const delta = val - arr[i - 1][2];
    const cpu = ((delta / (g * 1e9)) * 100) / vcpus;
    return [ts, g, Math.min(cpu, 100)];
  });
};

const normalizeRam = (measures, ramMb) =>
  measures.map(([ts, g, val]) => [ts, g, (val / (ramMb * 1024 * 1024)) * 100]);

export const buildRamMetric = (measures, flavor) => {
  const totalRamMb = flavor.ram;

  const series = measures.map(([timestamp, , usedMb]) => {
    const percent = totalRamMb ? (usedMb / totalRamMb) * 100 : 0;

    return {
      x: new Date(timestamp).getTime(),
      y: Number(percent.toFixed(1)),
    };
  });

  return {
    label: "RAM",
    unit: "%",
    color: "#10B981",
    currentValue: series.at(-1)?.y ?? 0,
    thresholds: {
      warning: 70,
      critical: 90,
    },
    timeSeries: series,
  };
};

export const buildDiskMetric = (readMeasures, writeMeasures) => {
  const readSeries = [];
  const writeSeries = [];

  for (let i = 1; i < readMeasures.length; i++) {
    const [ts, g, read] = readMeasures[i];
    const prevRead = readMeasures[i - 1][2] ?? 0;
    const write = writeMeasures[i]?.[2] ?? 0;
    const prevWrite = writeMeasures[i - 1]?.[2] ?? 0;

    const x = new Date(ts).getTime();

    readSeries.push({
      x,
      y: Number(Math.max((read - prevRead) / (g * 1024 * 1024), 0).toFixed(1)),
    });
    writeSeries.push({
      x,
      y: Number(
        Math.max((write - prevWrite) / (g * 1024 * 1024), 0).toFixed(1),
      ),
    });
  }

  return {
    label: "Disk I/O",
    unit: "MB/s",
    color: "#F59E0B",
    currentValue: readSeries.at(-1)?.y ?? 0,
    thresholds: { warning: 50, critical: 100 },
    read: { label: "Read", timeSeries: readSeries },
    write: { label: "Write", timeSeries: writeSeries },
  };
};
