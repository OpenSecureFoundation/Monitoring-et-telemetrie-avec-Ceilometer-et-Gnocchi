import nodemailer from "nodemailer";
import { SMTP_CONFIG } from "../../Config/email.js"; // configuration SMTP sécurisée

/**
 * Envoie un PDF de facture à l'utilisateur
 * @param {string} toEmail - email du destinataire
 * @param {string} pdfPath - chemin du PDF à joindre
 * @param {string} subject - objet du mail
 * @param {string} text - corps du mail
 */
export async function sendInvoiceEmail(toEmail, pdfPath, subject, text) {
  const transporter = nodemailer.createTransport(SMTP_CONFIG);

  await transporter.sendMail({
    from: `"Billing Service" <${SMTP_CONFIG.auth.user}>`,
    to: toEmail,
    subject,
    text,
    attachments: [
      {
        filename: pdfPath.split("/").pop(),
        path: pdfPath,
        contentType: "application/pdf",
      },
    ],
  });

  console.info(`✉️  Invoice sent to ${toEmail}`);
}

// ─── Alarme Aodh (nouveau) ─────────────────────────────────────────────────
export async function sendAlarmEmail(toEmail, alarmData, currentState, reason) {
  const transporter = nodemailer.createTransport(SMTP_CONFIG);

  const {
    name,
    severity,
    state,
    gnocchi_resources_threshold_rule: { threshold, metric },
  } = alarmData;

  // currentState vient du webhook (état au moment du déclenchement)
  // state vient de Aodh (état actuel stocké)
  const triggerState = currentState || state;

  const subject =
    triggerState === "alarm"
      ? `🚨 [ALERTE] ${name} — seuil dépassé`
      : triggerState === "ok"
        ? `✅ [RETOUR NORMAL] ${name}`
        : `ℹ️ [DONNÉES INSUFFISANTES] ${name}`;

  const text = `
Bonjour,

Une alarme a été déclenchée sur votre infrastructure.

  Alarme     : ${name}
  Métrique   : ${metric}
  Sévérité   : ${severity}
  État       : ${triggerState}
  Seuil      : ${threshold}
  Raison     : ${reason || "Non spécifiée"}

Connectez-vous à votre espace pour plus de détails.
  `.trim();

  await transporter.sendMail({
    from: `"Monitoring Service" <${SMTP_CONFIG.auth.user}>`,
    to: toEmail,
    subject,
    text,
  });

  console.info(`🚨 Alarm email sent to ${toEmail} [${name} - ${triggerState}]`);
}
