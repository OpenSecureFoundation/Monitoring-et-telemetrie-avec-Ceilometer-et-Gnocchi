// ========== generateInvoicePDF.js ==========
import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = path.join(__dirname, "invoiceTemplate.html");

export async function generateInvoicePDF(invoiceData, outputPath) {
  const template = await fs.readFile(TEMPLATE_PATH, "utf-8");

  // Génération des lignes HTML
  const rowsHtml = invoiceData.items
    .map(
      (it) =>
        `<tr><td>${it.resource}</td><td>${it.metric}</td><td>${it.cost.toFixed(
          2
        )}</td></tr>`
    )
    .join("\n");

  // Remplacement des variables du template
  const html = template
    .replace("{{invoiceId}}", invoiceData.id)
    .replace("{{projectName}}", invoiceData.projectName)
    .replace("{{period}}", invoiceData.period)
    .replace("{{rows}}", rowsHtml)
    .replace("{{total}}", invoiceData.total.toFixed(2))
    .replace("{{signature}}", invoiceData.signature)
    .replace("{{date}}", new Date().toLocaleString());

  // Lancement du navigateur headless
  const browser = await puppeteer.launch({
    headless: "new", // recommandé
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Génération du PDF
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: { top: "40px", bottom: "60px" },
  });

  await browser.close();
  console.log(`✅ PDF généré : ${outputPath}`);
}
