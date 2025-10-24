// state.js
// Lecture / écriture de l'état des cycles de facturation

// ========== State.js ==========

import fs from "node:fs";
import { STATE_FILE } from "./Constant.js";

export function loadState() {
  try {
    if (!fs.existsSync(STATE_FILE))
      return { last_billing_date: null, cycles: [] };

    return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  } catch (err) {
    console.error("Error loading billing state:", err.message);
    return { last_billing_date: null, cycles: [] };
  }
}

export function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}
