export type JobFitRecommendation = "strong" | "good" | "moderate" | "stretch";

export type JobFitMatchedSkill = {
  name: string;
  evidence: string;
};

export type JobFitMatchedProject = {
  title: string;
  slug: string;
  reason: string;
  url: string;
};

export type JobFitGap = {
  item: string;
  suggestion: string;
};

export type JobFitResult = {
  matchScore: number;
  recommendation: JobFitRecommendation;
  headline: string;
  summary: string;
  matchedSkills: JobFitMatchedSkill[];
  matchedProjects: JobFitMatchedProject[];
  gaps: JobFitGap[];
  talkingPoints: string[];
};

export type JobFitSource = {
  id: string;
  title: string;
  section: string;
  url?: string;
};

export type JobFitApiResponse = {
  result: JobFitResult;
  sources: JobFitSource[];
};
