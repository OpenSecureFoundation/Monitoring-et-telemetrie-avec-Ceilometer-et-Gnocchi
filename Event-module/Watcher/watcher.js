// EventModule/watcher/watcher.js
import chokidar from "chokidar";
import { runAuditCollector } from "../Audit/auditCollector.js";

const AUDIT_LOG = process.env.AUDIT_LOG;
const DEBOUNCE_DELAY_MS = 50; // délai court et sûr

let debounceTimer = null;
let isRunning = false; // ➡️ verrou d'exécution

/**
 * Fonction de déclenchement contrôlé (débounce + verrou)
 */
function debounceRunCollector() {
  if (isRunning) return;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    isRunning = true; // 🚧 verrou actif
    try {
      console.log("🔍 Lecture des nouveaux événements d’audit...");
      await runAuditCollector();
    } catch (err) {
      console.error("🔴 Erreur lors de l'exécution du collecteur :", err);
    } finally {
      isRunning = false; // 🎉 verrou libéré
    }
  }, DEBOUNCE_DELAY_MS);
}

/**
 * Démarre le watcher de logs d’audit Keystone
 */
export async function startAuditWatcher() {
  try {
    console.log("👀 Surveillance du log d’audit Keystone:", AUDIT_LOG);

    if (process.env.NODE_ENV !== "production") {
      console.log("ℹ️ Audit watcher désactivé en mode développement");
      return;
    }

    // ➡️ Instanciation du watcher
    const watcher = chokidar.watch(AUDIT_LOG, {
      // ➡️ Assurez-vous de rester dans le répertoire de travail.
      cwd: process.cwd(),
      // ➡️ Ignorez le fichier DumpStack.log.tmp
      ignored: [],
      persistent: true,
    });
    // ➡️ Déclenche le collecteur sur modification
    watcher.on("change", debounceRunCollector);

    // ➡️ Lecture initiale
    await runAuditCollector();

    console.log("🟢 Audit Watcher démarré avec succès !");
  } catch (error) {
    console.error("🔴 Erreur lors du démarrage du watcher :", error);
  }
}
