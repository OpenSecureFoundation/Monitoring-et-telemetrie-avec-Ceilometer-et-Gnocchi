// ========== generateInvoicePDF.js ==========
import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import { formatPeriod } from "../../Utils/shared-functions.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = path.join(__dirname, "invoiceTemplate.html");

export async function generateInvoicePDF(invoiceData, outputPath) {
  const template = await fs.readFile(TEMPLATE_PATH, "utf-8");

  // Génération des lignes HTML
  const rowsHtml = invoiceData.lines
    .map(
      (it) =>
        `<tr><td>${it.resourcename}</td><td>${
          it.metricname
        }</td><td>${it.cost.toFixed(2)}</td></tr>`
    )
    .join("\n");

  // Remplacement des variables du template
  const html = template
    .replace("{{invoiceId}}", invoiceData.projectId)
    .replace("{{projectName}}", invoiceData.projectname)
    .replace("{{period}}", formatPeriod(invoiceData.period))
    .replace("{{rows}}", rowsHtml)
    .replace("{{total}}", invoiceData.total.toFixed(2))
    .replace("{{signature}}", invoiceData.hmacSignature)
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
