// ========== Constant.js ==========

import path from "node:path";
import { fileURLToPath } from "node:url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url)); // ✅ pour les modules ESM tests

const __dirname = path.resolve(); // ou path.dirname(process.argv[1])

// Dossier pour les factures JSON
export const INVOICE_JSON_DIR = path.resolve(__dirname, "invoice-json");

// Dossier pour les résumés JSON
export const SUMMARY_DIR = path.resolve(__dirname, "summary-json");

// Dossier pour les factures PDF
export const PDF_DIR = path.resolve(__dirname, "invoice-pdf");

// Dossier pour les projets échoués
export const LS = path.resolve(__dirname, "ls");

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
  // === CPU ===
  "cpu.vcpus": {
    billingMode: "activation",
    unit: "vcpu",
  },
  "cpu.utilization": {
    billingMode: "activation",
    unit: "percent",
  },

  // === RAM ===
  "memory.usage": {
    billingMode: "activation",
    unit: "gb",
  },
  "memory.resident": {
    billingMode: "activation",
    unit: "gb",
  },

  // === Stockage disque / volume ===
  "disk.volume.size": {
    billingMode: "activation",
    unit: "gb",
  },
  "volume.size": {
    billingMode: "activation",
    unit: "gb",
  },

  // === Réseau ===
  "network.incoming.bytes": {
    billingMode: "consumption",
    unit: "B",
  },
  "network.outgoing.bytes": {
    billingMode: "consumption",
    unit: "B",
  },

  // === Disque I/O ===
  "disk.io.bytes": {
    billingMode: "consumption",
    unit: "B",
  },
  "disk.read.bytes": {
    billingMode: "consumption",
    unit: "B",
  },
  "disk.write.bytes": {
    billingMode: "consumption",
    unit: "B",
  },

  // === Stockage objets ===
  "storage.objects.size": {
    billingMode: "consumption",
    unit: "B",
  },
};

export const BILLING_CONFIG = {
  GRANULARITY: 300, // 1 heure (standard industrie)
  AGGREGATION: "mean", // Par défaut
};
