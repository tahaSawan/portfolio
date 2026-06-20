import { listProjectSlugs } from "@/lib/caseStudies";
import type {
  JobFitGap,
  JobFitMatchedProject,
  JobFitMatchedSkill,
  JobFitRecommendation,
  JobFitResult,
} from "@/lib/jobFit/types";

const ALLOWED_SLUGS = new Set(listProjectSlugs());
const RECOMMENDATIONS = new Set<JobFitRecommendation>([
  "strong",
  "good",
  "moderate",
  "stretch",
]);

function asString(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function parseSkills(raw: unknown): JobFitMatchedSkill[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, 8)
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const name = asString((item as JobFitMatchedSkill).name, 80);
      const evidence = asString((item as JobFitMatchedSkill).evidence, 220);
      if (!name) return null;
      return { name, evidence: evidence || name };
    })
    .filter((x): x is JobFitMatchedSkill => Boolean(x));
}

function parseProjects(raw: unknown): Omit<JobFitMatchedProject, "url">[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, 5)
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const slug = asString((item as JobFitMatchedProject).slug, 80);
      const title = asString((item as JobFitMatchedProject).title, 120);
      const reason = asString((item as JobFitMatchedProject).reason, 280);
      if (!slug || !ALLOWED_SLUGS.has(slug) || !title) return null;
      return { slug, title, reason: reason || title };
    })
    .filter((x): x is Omit<JobFitMatchedProject, "url"> => Boolean(x));
}

function parseGaps(raw: unknown): JobFitGap[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, 4)
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const gapItem = asString((item as JobFitGap).item, 160);
      const suggestion = asString((item as JobFitGap).suggestion, 220);
      if (!gapItem) return null;
      return { item: gapItem, suggestion: suggestion || gapItem };
    })
    .filter((x): x is JobFitGap => Boolean(x));
}

function parseTalkingPoints(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => asString(item, 220))
    .filter(Boolean)
    .slice(0, 5);
}

function scoreToRecommendation(score: number): JobFitRecommendation {
  if (score >= 80) return "strong";
  if (score >= 65) return "good";
  if (score >= 50) return "moderate";
  return "stretch";
}

export function parseJobFitResponse(raw: string): JobFitResult | null {
  try {
    const cleaned = raw
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "");
    const data = JSON.parse(cleaned) as Record<string, unknown>;

    let matchScore = Number(data.matchScore);
    if (!Number.isFinite(matchScore)) matchScore = 50;
    matchScore = Math.max(0, Math.min(100, Math.round(matchScore)));

    let recommendation = asString(data.recommendation, 20) as JobFitRecommendation;
    if (!RECOMMENDATIONS.has(recommendation)) {
      recommendation = scoreToRecommendation(matchScore);
    }

    const headline = asString(data.headline, 120);
    const summary = asString(data.summary, 900);
    if (!headline || !summary) return null;

    const matchedProjects = parseProjects(data.matchedProjects).map((p) => ({
      ...p,
      url: `/projects/${p.slug}`,
    }));

    return {
      matchScore,
      recommendation,
      headline,
      summary,
      matchedSkills: parseSkills(data.matchedSkills),
      matchedProjects,
      gaps: parseGaps(data.gaps),
      talkingPoints: parseTalkingPoints(data.talkingPoints),
    };
  } catch {
    return null;
  }
}
