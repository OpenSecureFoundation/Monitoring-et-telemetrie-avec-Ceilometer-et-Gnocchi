// utils/metrics.util.js

/**
 * Calcule le débit réseau en Kbps à partir des compteurs cumulatifs d'octets.
 * @param {Array} measures - Tableau d'objets [{x: timestamp, y: total_bytes}, ...]
 * @param {boolean} toKbps - Si vrai, convertit en Kbps. Sinon, reste en Bytes/sec.
 */
export function computeDeltaRate(measures, toKbps = true) {
  const result = [];

  // Il faut au moins deux points pour calculer un delta (différence)
  if (!measures || measures.length < 2) return result;

  for (let i = 1; i < measures.length; i++) {
    const prev = measures[i - 1];
    const curr = measures[i];

    const prevValue = prev.y;
    const currValue = curr.y;

    const prevTimestamp = prev.x;
    const currTimestamp = curr.x;

    // 1. Calcul de la différence d'octets (Delta)
    const deltaValue = currValue - prevValue;

    // 2. Calcul du temps écoulé en secondes (Timestamps en ms)
    const deltaTimeSec = (currTimestamp - prevTimestamp) / 1000;

    // Sécurité : éviter division par zéro ou deltas négatifs (reset de compteur)
    if (deltaTimeSec <= 0 || deltaValue < 0) continue;

    // 3. Calcul du débit de base (Bytes/sec)
    let rate = deltaValue / deltaTimeSec;

    // 4. Conversion en Kilobits par seconde (Kbps)
    // (Bytes * 8 = bits) / 1000 = Kbps
    if (toKbps) {
      rate = (rate * 8) / 1000;
    }

    result.push({
      x: currTimestamp,
      y: Number(rate.toFixed(3)), // 2 décimales suffisent largement pour du Kbps
    });
  }

  return result;
}

// export function computeDeltaRate(measures, toMbps = false) {
//   const result = [];

//   if (!measures || measures.length < 2) return result;

//   for (let i = 1; i < measures.length; i++) {
//     const prev = measures[i - 1];
//     const curr = measures[i];

//     const prevValue = prev.y;
//     const currValue = curr.y;

//     const prevTimestamp = prev.x;
//     const currTimestamp = curr.x;

//     const deltaValue = currValue - prevValue;
//     const deltaTimeSec = (currTimestamp - prevTimestamp) / 1000;

//     if (deltaTimeSec <= 0 || deltaValue < 0) continue;

//     let rate = deltaValue / deltaTimeSec;

// Bytes/sec → Mbps
//     if (toMbps) {
//       rate = (rate * 8) / 1_000_000;
//     }

//     result.push({
//       x: currTimestamp,
//       y: Number(rate.toFixed(4)),
//     });
//   }

//   return result;
// }

// export function computePacketLoss(packets, drops) {
//   const result = [];

//   if (!packets || packets.length < 2) return result;

//   for (let i = 1; i < packets.length; i++) {
//     const prevPackets = packets[i - 1][2];
//     const currPackets = packets[i][2];

//     const prevDrops = drops[i - 1][2];
//     const currDrops = drops[i][2];

//     const timestamp = new Date(packets[i][0]).getTime();

//     const deltaPackets = currPackets - prevPackets;
//     const deltaDrops = currDrops - prevDrops;

//     if (deltaPackets <= 0 || deltaDrops < 0) continue;

//     const loss = (deltaDrops / deltaPackets) * 100;

//     result.push({
//       x: timestamp,
//       y: Number(loss.toFixed(2)),
//     });
//   }

//   return result;
// }

export function computePacketLoss(packets, drops) {
  const result = [];

  if (!packets || packets.length < 2 || !drops || drops.length < 2) {
    return result;
  }

  for (let i = 1; i < packets.length; i++) {
    const prevPackets = packets[i - 1].y;
    const currPackets = packets[i].y;

    const prevDrops = drops[i - 1].y;
    const currDrops = drops[i].y;

    const timestamp = packets[i].x;

    const deltaPackets = currPackets - prevPackets;
    const deltaDrops = currDrops - prevDrops;

    if (deltaPackets < 0 || deltaDrops < 0) continue;

    let loss = 0;

    if (deltaPackets > 0) {
      loss = (deltaDrops / deltaPackets) * 100;
    }

    result.push({
      x: timestamp,
      y: Number(loss.toFixed(2)),
    });
  }

  return result;
}
