import fs from "node:fs";
import { NextRequest, NextResponse } from "next/server";
import {
  RESUME_VARIANTS,
  type ResumeVariant,
} from "@/lib/resumeDownload";
import { resolveResumeAbsolutePath } from "@/lib/resume.server";

export const runtime = "nodejs";

function parseVariant(raw: string | null): ResumeVariant {
  if (raw === "data-analyst") return "data-analyst";
  return "default";
}

export async function GET(request: NextRequest) {
  const variant = parseVariant(request.nextUrl.searchParams.get("variant"));
  const abs = resolveResumeAbsolutePath(variant);
  if (!abs) {
    return new NextResponse("Resume PDF not found.", { status: 404 });
  }

  const body = fs.readFileSync(abs);
  const downloadName = RESUME_VARIANTS[variant].downloadName;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${downloadName}"`,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
