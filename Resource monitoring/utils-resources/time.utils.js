/**
 * Transforme un intervalle de temps en un objet normalisé.
 * @param {number|string} from - Le début de l'intervalle (Timestamp ou chaîne)
 * @param {number|string} to - La fin de l'intervalle (Timestamp ou chaîne)
 * @param {number|string} step - La granularité
 * @returns {Object} Un objet contenant les dates ISO et la granularité numérique
 */
export const formatRange = (from, to, step) => {
  return {
    from: new Date(Number(from)).toISOString(),
    to: new Date(Number(to)).toISOString(),
    granularity: Number(step),
  };
};
