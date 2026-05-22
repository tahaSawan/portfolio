import fs from "node:fs";
import path from "node:path";
import type { ProjectCaseStudy, ProjectScreenshot } from "@/lib/caseStudies";
import { listProjectSlugs } from "@/lib/caseStudies";

const IMAGE_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".avif",
]);

function isSafeBasename(name: string): boolean {
  if (!name || name !== path.basename(name)) return false;
  if (name.includes("..")) return false;
  return true;
}

const imagesRoot = () => path.join(process.cwd(), "images");

/**
 * Absolute path to `images/<slug>/`, matching folder name case-insensitively
 * (e.g. `LegalConnect` on disk for slug `legalconnect`).
 */
export function resolveProjectImagesDir(slug: string): string | null {
  const allowed = new Set(listProjectSlugs());
  if (!allowed.has(slug)) return null;

  const root = imagesRoot();
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) return null;

  const exact = path.join(root, slug);
  if (fs.existsSync(exact) && fs.statSync(exact).isDirectory()) {
    return exact;
  }

  const match = fs.readdirSync(root).find((name) => {
    const full = path.join(root, name);
    try {
      return (
        fs.statSync(full).isDirectory() &&
        name.toLowerCase() === slug.toLowerCase()
      );
    } catch {
      return false;
    }
  });

  return match ? path.join(root, match) : null;
}

/** Sorted image basenames under the resolved `images/<slug>/` folder. */
export function listDiskScreenshotFilenames(
  slug: string,
  preferStem?: string,
): string[] {
  const dir = resolveProjectImagesDir(slug);
  if (!dir) return [];
  const files = fs
    .readdirSync(dir)
    .filter(
      (n) => isSafeBasename(n) && IMAGE_EXT.has(path.extname(n).toLowerCase()),
    )
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const stem = preferStem?.trim();
  if (!stem) return files;

  const stemLower = stem.toLowerCase();
  const idx = files.findIndex(
    (f) => path.basename(f, path.extname(f)).toLowerCase() === stemLower,
  );
  if (idx <= 0) return files;

  const copy = [...files];
  const [preferred] = copy.splice(idx, 1);
  return [preferred, ...copy];
}

/** Up to three screenshots sourced from `images/<slug>/` for the case-study UI. */
export function diskScreenshotsForProject(
  slug: string,
  title: string,
  preferStem?: string,
): readonly ProjectScreenshot[] | undefined {
  const files = listDiskScreenshotFilenames(slug, preferStem);
  if (files.length === 0) return undefined;
  return files.slice(0, 3).map((file) => ({
    src: `/api/case-study-assets/${slug}/${encodeURIComponent(file)}`,
    alt: `${title} — product screenshot`,
  }));
}

/** When `images/<slug>/` has image files, they replace any `screenshots` from data. */
export function withDiskScreenshots(project: ProjectCaseStudy): ProjectCaseStudy {
  const fromDisk = diskScreenshotsForProject(
    project.slug,
    project.title,
    project.projectPreviewStem,
  );
  if (!fromDisk || fromDisk.length === 0) return project;
  return { ...project, screenshots: fromDisk };
}

export function withDiskScreenshotsAll(
  projects: readonly ProjectCaseStudy[],
): ProjectCaseStudy[] {
  return projects.map(withDiskScreenshots);
}
