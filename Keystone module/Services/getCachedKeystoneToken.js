// getCachedKeystoneToken.js
import axios from "axios";
import { getKeystoneToken } from "./keystoneAuth.js";

// Axios avec timeout global
// const axiosInstance = axios.create({ timeout: 20000 });

// --- Retry automatique ---
async function withRetries(fn, retries = 3, delayMs = 1000) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < retries)
        await new Promise((r) => setTimeout(r, delayMs * (i + 1)));
    }
  }
  throw lastErr;
}

// --- Cache du token ---
let _cachedToken = null;
let _cachedTokenExpiry = 0;

export async function getCachedKeystoneToken() {
  const now = Date.now();
  // Token encore valide ? + marge 30s
  if (_cachedToken && now + 30000 < _cachedTokenExpiry) return _cachedToken;

  // Récupération avec retry
  const tokenObj = await withRetries(() => getKeystoneToken());

  // Gestion selon format
  if (typeof tokenObj === "string") {
    _cachedToken = tokenObj;
    _cachedTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 min par défaut
  } else if (tokenObj?.token) {
    _cachedToken = tokenObj.token;
    _cachedTokenExpiry = new Date(tokenObj.expires_at).getTime();
  } else {
    throw new Error("Token Keystone invalide");
  }

  return _cachedToken;
}
