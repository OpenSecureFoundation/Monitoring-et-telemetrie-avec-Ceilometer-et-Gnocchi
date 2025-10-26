// EventModule/watcher/watcher.js
import chokidar from "chokidar";
import { runAuditCollector } from "../Audit/auditCollector.js";

const AUDIT_LOG = "/var/log/keystone/keystone-audit.log";
const DEBOUNCE_DELAY_MS = 50; // délai court et sûr

let debounceTimer = null;
let isRunning = false; // verrou d'exécution

/**
 * Fonction de déclenchement contrôlé (débounce + verrou)
 */
function debounceRunCollector() {
  if (isRunning) return;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    isRunning = true;
    try {
      console.log("🔍 Lecture des nouveaux événements d’audit...");
      await runAuditCollector();
    } catch (err) {
      console.error("🔴 Erreur lors de l'exécution du collecteur :", err);
    } finally {
      isRunning = false;
    }
  }, DEBOUNCE_DELAY_MS);
}

/**
 * Démarre le watcher de logs d’audit Keystone
 */
export async function startAuditWatcher() {
  try {
    console.log("👀 Surveillance du log d’audit Keystone :", AUDIT_LOG);

    // Instanciation du watcher
    const watcher = chokidar.watch(AUDIT_LOG, { persistent: true });
    watcher.on("change", debounceRunCollector);

    // Lecture initiale
    await runAuditCollector();

    console.log("🟢 Audit Watcher démarré avec succès !");
  } catch (error) {
    console.error("🔴 Erreur lors du démarrage du watcher :", error);
  }
}
