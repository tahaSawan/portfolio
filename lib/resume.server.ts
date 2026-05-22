import fs from "node:fs";
import path from "node:path";

function isSafeBasename(name: string): boolean {
  if (!name || name !== path.basename(name)) return false;
  if (name.includes("..")) return false;
  return true;
}

function resolveResumeDir(): string | null {
  const cwd = process.cwd();
  const exact = path.join(cwd, "Resume");
  if (fs.existsSync(exact) && fs.statSync(exact).isDirectory()) {
    return exact;
  }
  try {
    const match = fs.readdirSync(cwd).find((n) => {
      const full = path.join(cwd, n);
      try {
        return (
          n.toLowerCase() === "resume" &&
          fs.statSync(full).isDirectory()
        );
      } catch {
        return false;
      }
    });
    return match ? path.join(cwd, match) : null;
  } catch {
    return null;
  }
}

/** First PDF in `Resume/` (case-insensitive folder name), preferring obvious names. */
export function resolveResumeAbsolutePath(): string | null {
  const dir = resolveResumeDir();
  if (!dir) return null;

  let pdfs: string[];
  try {
    pdfs = fs
      .readdirSync(dir)
      .filter(
        (f) =>
          isSafeBasename(f) && f.toLowerCase().endsWith(".pdf"),
      );
  } catch {
    return null;
  }

  if (pdfs.length === 0) return null;

  const lower = (f: string) => f.toLowerCase();
  const pick =
    pdfs.find((f) => lower(f) === "resume.pdf") ??
    pdfs.find((f) => lower(f).includes("taha")) ??
    [...pdfs].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))[0];

  return pick ? path.join(dir, pick) : null;
}
