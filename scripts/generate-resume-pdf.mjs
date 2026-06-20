import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "Resume", "resume.html");
const outPath = path.join(root, "Resume", "resume.pdf");

if (!fs.existsSync(htmlPath)) {
  console.error("Missing Resume/resume.html");
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, "utf8");

const browser = await puppeteer.launch({
  headless: true,
  protocolTimeout: 120_000,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.emulateMediaType("print");
  await page.pdf({
    path: outPath,
    format: "Letter",
    printBackground: true,
    margin: { top: "0.42in", right: "0.48in", bottom: "0.42in", left: "0.48in" },
  });
  console.log(`Wrote ${outPath}`);
} finally {
  await browser.close();
}
