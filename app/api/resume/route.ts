import fs from "node:fs";
import { NextResponse } from "next/server";
import { RESUME_DOWNLOAD_FILENAME } from "@/lib/resumeDownload";
import { resolveResumeAbsolutePath } from "@/lib/resume.server";

export const runtime = "nodejs";

export async function GET() {
  const abs = resolveResumeAbsolutePath();
  if (!abs) {
    return new NextResponse("Resume PDF not found.", { status: 404 });
  }

  const body = fs.readFileSync(abs);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${RESUME_DOWNLOAD_FILENAME}"`,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
