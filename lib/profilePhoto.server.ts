import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".avif",
]);

/** Prefer smaller / modern formats first when multiple exist. */
const EXT_RANK: Record<string, number> = {
  ".webp": 0,
  ".avif": 1,
  ".jpeg": 2,
  ".jpg": 3,
  ".png": 4,
  ".gif": 5,
};

function isSafeBasename(name: string): boolean {
  if (!name || name !== path.basename(name)) return false;
  if (name.includes("..")) return false;
  return true;
}

/** Normalize for comparison: spaces/underscores → single hyphen, lowercase. */
function normalizeStem(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const WANT_STEM = normalizeStem("Taha-image");
const EXCLUDE_STEM = normalizeStem("Taha-Profile-Image");

function resolveTahaImageDir(): string | null {
  const imagesRoot = path.join(process.cwd(), "images");
  if (!fs.existsSync(imagesRoot) || !fs.statSync(imagesRoot).isDirectory()) {
    return null;
  }
  const exact = path.join(imagesRoot, "Taha");
  if (fs.existsSync(exact) && fs.statSync(exact).isDirectory()) {
    return exact;
  }
  const match = fs.readdirSync(imagesRoot).find((n) => {
    if (n.toLowerCase() !== "taha") return false;
    try {
      return fs.statSync(path.join(imagesRoot, n)).isDirectory();
    } catch {
      return false;
    }
  });
  return match ? path.join(imagesRoot, match) : null;
}

export function resolveProfilePhotoAbsolutePath(): string | null {
  const base = resolveTahaImageDir();
  if (!base) return null;

  let names: string[];
  try {
    names = fs.readdirSync(base);
  } catch {
    return null;
  }

  const matches = names.filter((n) => {
    if (!isSafeBasename(n)) return false;
    const ext = path.extname(n).toLowerCase();
    if (!IMAGE_EXT.has(ext)) return false;
    const stem = normalizeStem(path.basename(n, path.extname(n)));
    if (stem === EXCLUDE_STEM) return false;
    return stem === WANT_STEM;
  });

  if (matches.length === 0) return null;

  matches.sort((a, b) => {
    const ra = EXT_RANK[path.extname(a).toLowerCase()] ?? 99;
    const rb = EXT_RANK[path.extname(b).toLowerCase()] ?? 99;
    if (ra !== rb) return ra - rb;
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  });

  return path.join(base, matches[0]);
}

/** Public URL including `t=` mtime so browsers refetch after you replace the file. */
export function profilePhotoPublicUrl(): string | null {
  const abs = resolveProfilePhotoAbsolutePath();
  if (!abs) return null;
  let mtime = 0;
  try {
    mtime = Math.floor(fs.statSync(abs).mtimeMs);
  } catch {
    mtime = Date.now();
  }
  return `/api/profile-photo?t=${mtime}`;
}
