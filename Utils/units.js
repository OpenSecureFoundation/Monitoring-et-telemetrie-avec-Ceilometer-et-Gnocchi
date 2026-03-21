// === utils/units.js ===
export function normalizeUnit(value, fromUnit, toUnit) {
  if (value == null || Number.isNaN(value)) return 0;

  const conversions = {
    // Capacité
    B: 1 / 1024 ** 3,
    KB: 1 / 1024 ** 2,
    MB: 1 / 1024,
    GB: 1,
    TB: 1024,
  };

  const base = conversions[fromUnit] ?? 1;
  const target = conversions[toUnit] ?? 1;
  return value * (base / target);
}
