/**
 * Resume download URL — served from the first PDF in the repo-root `Resume/` folder
 * (see `lib/resume.server.ts` and `app/api/resume/route.ts`).
 */
export const RESUME_PATH = "/api/resume" as const;
export const RESUME_DOWNLOAD_FILENAME = "Taha-S-Awan-Resume.pdf";
