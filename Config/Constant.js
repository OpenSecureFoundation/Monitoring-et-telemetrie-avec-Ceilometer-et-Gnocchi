// ========== Constant.js ==========

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Dossier pour les factures
export const INVOICE_DIR = path.resolve(__dirname, "invoices");

// Dossier pour l’audit / état
export const STATE_DIR = path.resolve(__dirname, "audit");
export const STATE_FILE = path.resolve(STATE_DIR, "billing_state.json");

export const TARIFFS = {
  cpu_vcpu_h: 0.02, // € per vCPU-hour
  ram_gb_h: 0.01, // € per GB-hour
  storage_gb_h: 0.005, // € per GB-hour (allocated)
  network_gb: 0.0005, // € per GB transferred
  io_gb: 0.001, // € per GB IO
};

export const METRIC_MAP = {
  vcpus: { billingMode: "activation", unit: "vcpu" },
  cpu_util: { billingMode: "activation", unit: "percent" },
  "memory.usage": { billingMode: "activation", unit: "gb" },
  "memory.resident": { billingMode: "activation", unit: "gb" },
  "disk.size": { billingMode: "activation", unit: "gb" },
  "volume.size": { billingMode: "activation", unit: "gb" },
  "network.incoming.bytes": { billingMode: "consumption", unit: "bytes" },
  "network.outgoing.bytes": { billingMode: "consumption", unit: "bytes" },
  "disk.read.bytes": { billingMode: "consumption", unit: "bytes" },
  "disk.write.bytes": { billingMode: "consumption", unit: "bytes" },
  "storage.objects.size": { billingMode: "consumption", unit: "bytes" },
};
