import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { resolveCertificateAbsolutePath } from "@/lib/certificateAssets.server";

export const runtime = "nodejs";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

type RouteParams = { params: Promise<{ file: string }> };

export async function GET(_request: Request, context: RouteParams) {
  const { file } = await context.params;
  const decoded = decodeURIComponent(file);

  if (!decoded || decoded !== decoded.replace(/[/\\]/g, "") || decoded.includes("..")) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const abs = resolveCertificateAbsolutePath(decoded);
  if (!abs) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(decoded).toLowerCase();
  const body = fs.readFileSync(abs);

  return new NextResponse(body, {
    headers: {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
