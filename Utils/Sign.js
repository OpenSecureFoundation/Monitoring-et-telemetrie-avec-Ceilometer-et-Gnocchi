// ========== Utils/Sign.js ==========
import crypto from "node:crypto";
import { BILLING_SECRET_KEY } from "../Config/security.js";

/**
 * Génère une signature HMAC SHA256 sur le contenu d'une facture
 * @param {object} invoice - Objet facture à signer
 * @returns {string} HMAC hexadécimal
 */
export function signInvoice(invoice) {
  const hmac = crypto.createHmac("sha256", BILLING_SECRET_KEY);
  // On exclut la signature si elle existe déjà
  const clone = { ...invoice };
  delete clone.hmac_signature;
  hmac.update(JSON.stringify(clone));
  return hmac.digest("hex");
}

/**
 * Vérifie la validité d'une signature
 */
export function verifyInvoiceSignature(invoice) {
  if (!invoice.hmac_signature) return false;
  const expected = signInvoice(invoice);
  return expected === invoice.hmac_signature;
}
