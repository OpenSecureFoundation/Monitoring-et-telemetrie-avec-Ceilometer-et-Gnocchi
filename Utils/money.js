// === utils/money.js ===
export function toFixedMoney(value, decimals = 4) {
  return (
    Math.round((Number(value) + Number.EPSILON) * 10 ** decimals) /
    10 ** decimals
  );
}
