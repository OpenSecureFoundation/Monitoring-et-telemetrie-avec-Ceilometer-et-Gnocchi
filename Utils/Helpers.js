// ========== Utils.js ==========

export function toISO(dt) {
  return new Date(dt).toISOString();
}

export function startOfMonthISO(year, month) {
  return new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)).toISOString();
}

export function addMonthsISO(iso, months) {
  const d = new Date(iso);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d.toISOString();
}

export function msBetweenISO(a, b) {
  return new Date(b).getTime() - new Date(a).getTime();
}

export function bytesToGb(bytes) {
  return Number(bytes) / 1024 ** 3;
}

export function safeAvg(numbers) {
  if (!numbers || numbers.length === 0) return null;
  return numbers.reduce((s, x) => s + x, 0) / numbers.length;
}
