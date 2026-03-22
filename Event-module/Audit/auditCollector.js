// EventModule/audit/auditCollector.js
import fs from "node:fs";
import readline from "node:readline";
import path from "node:path";
import Project from "../../Models/Project/Project.js"; // modèle MongoDB (project_id, creator_id, etc.)

const OFFSET_FILE = path.resolve("Event-module/state/audit_offset.json");
const OFFSET_DIR = path.dirname(OFFSET_FILE);

/**
 * Charge le dernier offset lu (en octets)
 */
function loadOffset() {
  try {
    const data = JSON.parse(fs.readFileSync(OFFSET_FILE, "utf8"));
    return data.offset || 0;
  } catch {
    return 0;
  }
}

/**
 * Sauvegarde le nouvel offset
 */

// Dans la fonction saveOffset
function saveOffset(offset) {
  // 🟡 AJOUT : Vérifie et crée le répertoire si nécessaire
  if (!fs.existsSync(OFFSET_DIR)) {
    fs.mkdirSync(OFFSET_DIR, { recursive: true });
  }
  fs.writeFileSync(OFFSET_FILE, JSON.stringify({ offset }), "utf8");
}

/**
 * Traite une ligne d'audit Keystone
 */
async function processAuditLine(line) {
  if (!line.trim()) return;

  try {
    const event = JSON.parse(line);

    // Vérifie si c’est un événement de création de projet
    if (
      event.typeURI?.includes("project") &&
      event.action === "create/project" &&
      event.outcome === "success" &&
      event.initiator?.id
    ) {
      const projectId = event.target?.id;
      const projectname = event.target?.name;
      const creatorId = event.initiator.id;
      const timestamp = event.eventTime;

      console.log(
        `🟢 Nouveau projet détecté : ${projectId} par ${creatorId} (${timestamp})`
      );

      // Met à jour ou crée l’enregistrement en base
      await Project.updateOne(
        { projectId },
        {
          $set: {
            projectname: projectname,
            creatorId: creatorId,
            createdAt: timestamp,
          },
        },
        { upsert: true }
      );
    }
  } catch (err) {
    console.error(
      " 🔴 Erreur parsing ligne audit (ligne ignorée) :",
      err.message,
      `Ligne défectueuse : "${line.substring(0, 100)}..."`
    );
  }
}

/**
 * Lecture du log Keystone à partir du dernier offset
 */
export async function runAuditCollector() {
  const offset = loadOffset();
  let fileHandle = null; // pour garantir la fermeture en finally

  try {
    fileHandle = await fs.promises.open(process.env.AUDIT_LOG, "r");
    const stats = await fileHandle.stat();

    // Aucun nouveau contenu à lire
    if (offset >= stats.size) {
      console.log("🟢 Aucun nouvel événement à traiter");
      return;
    }

    const stream = fs.createReadStream(process.env.AUDIT_LOG, {
      start: offset,
      encoding: "utf8",
    });
    const rl = readline.createInterface({ input: stream });

    let bytesRead = offset;
    for await (const line of rl) {
      bytesRead += Buffer.byteLength(line, "utf8") + 1;
      await processAuditLine(line);
    }

    saveOffset(bytesRead);
    console.log("🟢 Offset mis à jour :", bytesRead);
  } catch (error) {
    console.error("🔴 Erreur critique dans le collecteur d'audit:", error);
    // Ne pas sauvegarder l'offset ici pour éviter toute perte d'événements
  } finally {
    if (fileHandle) {
      await fileHandle.close();
      console.log("🔒 Fichier d’audit fermé proprement");
    }
  }
}
