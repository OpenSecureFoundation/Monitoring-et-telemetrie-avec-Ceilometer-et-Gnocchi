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
