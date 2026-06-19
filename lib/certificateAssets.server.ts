import fs from "node:fs";
import path from "node:path";
import { certifications } from "@/lib/certifications";

const IMAGE_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".avif",
]);

const certificatesDir = () => path.join(process.cwd(), "images", "certificates");

const allowedFiles = () =>
  new Set(certifications.map((c) => c.imageFile));

export function resolveCertificateAbsolutePath(
  file: string,
): string | null {
  if (!allowedFiles().has(file)) return null;

  const dir = certificatesDir();
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return null;

  const abs = path.resolve(dir, file);
  const rel = path.relative(path.resolve(dir), abs);
  if (rel.startsWith("..") || path.isAbsolute(rel)) return null;
  if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return null;

  const ext = path.extname(file).toLowerCase();
  if (!IMAGE_EXT.has(ext)) return null;

  return abs;
}
