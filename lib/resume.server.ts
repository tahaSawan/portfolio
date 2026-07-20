import fs from "node:fs";
import path from "node:path";
import {
  RESUME_VARIANTS,
  type ResumeVariant,
} from "./resumeDownload";

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

function resolveByPreferredNames(dir: string): string | null {
  let pdfs: string[];
  try {
    pdfs = fs
      .readdirSync(dir)
      .filter(
        (f) => isSafeBasename(f) && f.toLowerCase().endsWith(".pdf"),
      );
  } catch {
    return null;
  }

  if (pdfs.length === 0) return null;

  const lower = (f: string) => f.toLowerCase();
  const pick =
    pdfs.find((f) => lower(f) === "resume.pdf") ??
    pdfs.find((f) => lower(f).includes("taha") && !lower(f).includes("data-analyst")) ??
    [...pdfs].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    )[0];

  return pick ? path.join(dir, pick) : null;
}

/** Resolve a resume PDF by variant (`default` | `data-analyst`). */
export function resolveResumeAbsolutePath(
  variant: ResumeVariant = "default",
): string | null {
  const dir = resolveResumeDir();
  if (!dir) return null;

  const config = RESUME_VARIANTS[variant];
  if (config) {
    const preferred = path.join(dir, config.file);
    if (fs.existsSync(preferred) && fs.statSync(preferred).isFile()) {
      return preferred;
    }
  }

  if (variant === "default") {
    return resolveByPreferredNames(dir);
  }

  return null;
}
