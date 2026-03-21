// ========== Utils/Sign.js ==========
import crypto from "node:crypto";

/**
 * Génère un hash SHA256 et une signature HMAC sur le contenu d'un objet
 * @param {object} params - Objet à signer
 * @returns {string} HMAC hexadécimal
 */

// Retourne un hash SHA256 et un HMAC pour un objet
export function generateHashes(params) {
  const jsonString = JSON.stringify(params);

  // Hash SHA256 simple
  const sha256 = crypto.createHash("sha256").update(jsonString).digest("hex");

  // HMAC (optionnel)
  const hmac = crypto
    .createHmac("sha256", process.env.HMAC_SECRET)
    .update(jsonString)
    .digest("hex");

  return { sha256, hmac };
}
