import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { resolveProfilePhotoAbsolutePath } from "@/lib/profilePhoto.server";

export const runtime = "nodejs";

const MIME: Record<string, string> = {
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

export async function GET() {
  const abs = resolveProfilePhotoAbsolutePath();
  if (!abs) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(abs).toLowerCase();
  const body = fs.readFileSync(abs);
  return new NextResponse(body, {
    headers: {
      "Content-Type": MIME[ext] ?? "image/jpeg",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
