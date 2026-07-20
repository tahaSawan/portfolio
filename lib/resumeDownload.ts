/**
 * Resume download URLs — PDFs in repo-root `Resume/`
 * (see `lib/resume.server.ts` and `app/api/resume/route.ts`).
 */
export const RESUME_PATH = "/api/resume" as const;
export const RESUME_DOWNLOAD_FILENAME = "Taha-S-Awan-Resume.pdf";

export const RESUME_DATA_ANALYST_PATH = "/api/resume?variant=data-analyst" as const;
export const RESUME_DATA_ANALYST_DOWNLOAD_FILENAME =
  "Taha-S-Awan-Data-Analyst-Resume.pdf";

export const RESUME_VARIANTS = {
  default: {
    file: "resume.pdf",
    downloadName: RESUME_DOWNLOAD_FILENAME,
  },
  "data-analyst": {
    file: "resume-data-analyst.pdf",
    downloadName: RESUME_DATA_ANALYST_DOWNLOAD_FILENAME,
  },
} as const;

export type ResumeVariant = keyof typeof RESUME_VARIANTS;
