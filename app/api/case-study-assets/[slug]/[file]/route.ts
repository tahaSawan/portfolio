import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { listProjectSlugs } from "@/lib/caseStudies";
import { resolveProjectImagesDir } from "@/lib/projectDiskScreenshots";

export const runtime = "nodejs";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

type RouteParams = { params: Promise<{ slug: string; file: string }> };

export async function GET(_request: Request, context: RouteParams) {
  const { slug, file } = await context.params;
  const allowed = new Set(listProjectSlugs());
  if (!allowed.has(slug)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const decoded = decodeURIComponent(file);
  if (!decoded || decoded !== path.basename(decoded) || decoded.includes("..")) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const dir = resolveProjectImagesDir(slug);
  if (!dir) {
    return new NextResponse("Not found", { status: 404 });
  }

  const rootResolved = path.resolve(dir);
  const absResolved = path.resolve(rootResolved, decoded);
  const rel = path.relative(rootResolved, absResolved);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    return new NextResponse("Bad request", { status: 400 });
  }

  if (!fs.existsSync(absResolved) || !fs.statSync(absResolved).isFile()) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(decoded).toLowerCase();
  const body = fs.readFileSync(absResolved);
  return new NextResponse(body, {
    headers: {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
