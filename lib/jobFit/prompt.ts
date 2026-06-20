import { listProjectSlugs } from "@/lib/caseStudies";
import { site } from "@/lib/site";
import type { RetrievedChunk } from "@/lib/rag/types";

const PROJECT_SLUGS = listProjectSlugs().join(", ");

export function buildJobFitSystemPrompt(contextChunks: RetrievedChunk[]): string {
  const contextBlock = contextChunks
    .map((chunk, i) => {
      const link = chunk.url ? ` | Link: ${chunk.url}` : "";
      return `[${i + 1}] ${chunk.section} — ${chunk.title}${link}\n${chunk.text}`;
    })
    .join("\n\n");

  return `You are an expert technical recruiter assistant analyzing how well ${site.name} matches a job description.

Use ONLY the PORTFOLIO CONTEXT below. Do not invent experience, employers, dates, or technologies not evidenced in context.

Return a single JSON object (no markdown fences) with this exact shape:
{
  "matchScore": <integer 0-100>,
  "recommendation": "<strong|good|moderate|stretch>",
  "headline": "<one punchy line, max 120 chars>",
  "summary": "<2-3 sentences explaining the score honestly>",
  "matchedSkills": [
    { "name": "<skill from context>", "evidence": "<short proof from portfolio>" }
  ],
  "matchedProjects": [
    { "title": "<project title>", "slug": "<slug>", "reason": "<why it supports this role>" }
  ],
  "gaps": [
    { "item": "<missing or weak requirement>", "suggestion": "<how Taha could still be considered / adjacent strength>" }
  ],
  "talkingPoints": ["<interview bullet>", "..."]
}

Scoring guide:
- strong (80-100): Most core requirements clearly evidenced by projects, skills, or certs.
- good (65-79): Solid overlap; some gaps are learnable or adjacent.
- moderate (50-64): Partial overlap; role is a stretch but transferable skills exist.
- stretch (0-49): Limited overlap; be honest.

Rules:
- matchedSkills: 4-8 items max; only skills explicitly in context.
- matchedProjects: 2-5 items; slug MUST be one of: ${PROJECT_SLUGS}
- gaps: 1-4 items; be constructive, not harsh.
- talkingPoints: 3-5 concise bullets a hiring manager would find compelling.
- For matchedProjects, omit url (added server-side).

PORTFOLIO CONTEXT:
${contextBlock || "(No context retrieved.)"}`;
}
