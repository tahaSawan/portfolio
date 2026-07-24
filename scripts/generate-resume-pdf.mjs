import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const resumeDir = path.join(root, "Resume");

/** @type {{ html: string; pdf: string; margin: { top: string; right: string; bottom: string; left: string } }[]} */
const targets = [
  {
    html: "resume.html",
    pdf: "resume.pdf",
    margin: { top: "0.4in", right: "0.5in", bottom: "0.4in", left: "0.5in" },
  },
  {
    html: "resume-data-analyst.html",
    pdf: "resume-data-analyst.pdf",
    margin: { top: "0.38in", right: "0.48in", bottom: "0.38in", left: "0.48in" },
  },
];

const browser = await puppeteer.launch({
  headless: true,
  protocolTimeout: 120_000,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const target of targets) {
    const htmlPath = path.join(resumeDir, target.html);
    const outPath = path.join(resumeDir, target.pdf);

    if (!fs.existsSync(htmlPath)) {
      console.error(`Missing ${htmlPath}`);
      process.exit(1);
    }

    const html = fs.readFileSync(htmlPath, "utf8");
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.emulateMediaType("print");
    await page.pdf({
      path: outPath,
      format: "Letter",
      printBackground: true,
      margin: target.margin,
    });
    await page.close();
    console.log(`Wrote ${outPath}`);
  }
} finally {
  await browser.close();
}
