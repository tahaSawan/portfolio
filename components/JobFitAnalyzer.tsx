"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import {
  btnTransition,
  cardSurfaceTransition,
  chipMatte,
  focusRing,
  labelOverline,
  proseBody,
  sectionHeading,
  transitionField,
} from "@/lib/ui";
import type {
  JobFitApiResponse,
  JobFitRecommendation,
  JobFitResult,
} from "@/lib/jobFit/types";
import {
  MAX_JOB_DESCRIPTION_CHARS,
  MIN_JOB_DESCRIPTION_CHARS,
} from "@/lib/jobFit/config";

type ResultTab = "overview" | "skills" | "projects" | "more";

const SAMPLE_JOBS = [
  {
    label: "ML Engineer",
    text: `Machine Learning Engineer — Python, scikit-learn, model evaluation, feature engineering, and deploying ML pipelines. Experience with classification, clustering, cross-validation, and handling class imbalance. Jupyter notebooks, pandas, NumPy. Bonus: ensemble methods, HR analytics, or computer vision (YOLO). Collaborate with product teams to ship data-driven features.`,
  },
  {
    label: "Full-Stack AI",
    text: `Full-Stack AI Engineer — Build production web apps with Next.js, React, TypeScript, Node.js, and REST APIs. Integrate OpenAI or Gemini APIs, RAG systems, prompt engineering, and multi-agent workflows. PostgreSQL, Prisma, JWT/OAuth auth. Ship user-facing AI products end-to-end from prototype to deployment on Vercel.`,
  },
  {
    label: "Data Scientist",
    text: `Data Scientist — Exploratory data analysis, statistical modeling, visualization (Matplotlib, Seaborn, Tableau), and business insights from structured datasets. Python, pandas, SQL. Communicate findings via dashboards and executive summaries. Experience with time series, segmentation, and recommendation-ready analytics.`,
  },
] as const;

const RECOMMENDATION_META: Record<
  JobFitRecommendation,
  { label: string; ring: string; badge: string }
> = {
  strong: {
    label: "Strong fit",
    ring: "text-accent",
    badge: "border-accent/40 bg-accent/10 text-accent",
  },
  good: {
    label: "Good fit",
    ring: "text-accent/90",
    badge: "border-accent/30 bg-accent/[0.08] text-accent-hover",
  },
  moderate: {
    label: "Moderate fit",
    ring: "text-foreground-secondary",
    badge: "border-border-muted bg-surface-input text-foreground-secondary",
  },
  stretch: {
    label: "Stretch role",
    ring: "text-muted-foreground",
    badge: "border-border-muted/80 bg-surface-input/80 text-muted-foreground",
  },
};

const TAB_LABELS: { id: ResultTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "more", label: "Gaps & pitch" },
];

function MatchRing({
  score,
  tone,
  compact,
}: {
  score: number;
  tone: JobFitRecommendation;
  compact?: boolean;
}) {
  const viewSize = 112;
  const center = viewSize / 2;
  const radius = compact ? 42 : 46;
  const stroke = 7;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className={cn(
        "relative shrink-0 aspect-square",
        compact ? "h-[5.75rem] w-[5.75rem]" : "h-[6.5rem] w-[6.5rem]",
      )}
    >
      <svg
        viewBox={`0 0 ${viewSize} ${viewSize}`}
        className="block h-full w-full -rotate-90"
        aria-hidden
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-border-muted/70"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            "transition-[stroke-dashoffset] duration-700 ease-out",
            RECOMMENDATION_META[tone].ring,
          )}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center justify-center text-center leading-none">
          <span
            className={cn(
              "tabular-nums font-semibold tracking-tight text-foreground",
              compact ? "text-2xl" : "text-[1.65rem]",
            )}
          >
            {score}
          </span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
            Match
          </span>
        </div>
      </div>
    </div>
  );
}

function AnalyzeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <path
        d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
        strokeLinecap="round"
      />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ResultTabs({
  active,
  onChange,
  counts,
}: {
  active: ResultTab;
  onChange: (tab: ResultTab) => void;
  counts: Record<ResultTab, number | null>;
}) {
  return (
    <div
      className="flex gap-1 overflow-x-auto rounded-lg border border-border-muted/70 bg-surface-input/40 p-1"
      role="tablist"
      aria-label="Fit report sections"
    >
      {TAB_LABELS.map((tab) => {
        const count = counts[tab.id];
        const selected = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex min-h-9 shrink-0 touch-manipulation items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold sm:text-xs",
              btnTransition,
              focusRing,
              selected
                ? "bg-card text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                : "text-muted-foreground hover:text-foreground-secondary",
            )}
          >
            {tab.label}
            {count !== null && count > 0 ? (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
                  selected ? "bg-accent/15 text-accent" : "bg-border-muted/60 text-muted-foreground",
                )}
              >
                {count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function FitResultPanel({
  result,
  meta,
  activeTab,
  onTabChange,
}: {
  result: JobFitResult;
  meta: (typeof RECOMMENDATION_META)[JobFitRecommendation];
  activeTab: ResultTab;
  onTabChange: (tab: ResultTab) => void;
}) {
  const tabCounts = useMemo(
    () => ({
      overview: null,
      skills: result.matchedSkills.length,
      projects: result.matchedProjects.length,
      more: result.gaps.length + result.talkingPoints.length,
    }),
    [result],
  );

  const ctaRow = (
    <div className="flex flex-wrap gap-2 pt-1">
      <Link
        href={site.resumeUrl}
        download={site.resumeDownloadFileName}
        className={cn(
          "inline-flex min-h-10 touch-manipulation items-center justify-center rounded-lg border border-border-muted px-3.5 text-xs font-semibold sm:text-sm",
          btnTransition,
          "hover:border-accent/35 hover:text-accent-hover",
          focusRing,
        )}
      >
        Download resume
      </Link>
      <Link
        href="/#contact"
        className={cn(
          "inline-flex min-h-10 touch-manipulation items-center justify-center rounded-lg border border-accent/35 bg-accent/[0.08] px-3.5 text-xs font-semibold text-accent sm:text-sm",
          btnTransition,
          "hover:border-accent/55 hover:bg-accent/[0.12]",
          focusRing,
        )}
      >
        Get in touch
      </Link>
    </div>
  );

  return (
    <div className="flex min-h-0 flex-col gap-4">
      <div className="flex items-start gap-3 sm:gap-4">
        <MatchRing score={result.matchScore} tone={result.recommendation} compact />
        <div className="min-w-0 flex-1 pt-0.5">
          <span
            className={cn(
              "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
              meta.badge,
            )}
          >
            {meta.label}
          </span>
          <h3 className="mt-2 line-clamp-2 text-pretty text-sm font-semibold leading-snug text-foreground sm:text-base">
            {result.headline}
          </h3>
        </div>
      </div>

      <ResultTabs active={activeTab} onChange={onTabChange} counts={tabCounts} />

      <div
        className="min-h-[11rem] max-h-[min(22rem,42vh)] overflow-y-auto overscroll-contain pr-0.5 sm:max-h-[min(24rem,38vh)]"
        role="tabpanel"
      >
        {activeTab === "overview" ? (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {result.summary}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Skills", value: result.matchedSkills.length },
                { label: "Projects", value: result.matchedProjects.length },
                { label: "Gaps", value: result.gaps.length },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border-muted/70 bg-surface-input/40 px-2 py-2 text-center"
                >
                  <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            {ctaRow}
          </div>
        ) : null}

        {activeTab === "skills" ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {result.matchedSkills.map((skill) => (
              <li
                key={skill.name}
                className="rounded-lg border border-border-muted/70 bg-surface-input/35 px-2.5 py-2"
              >
                <p className="text-[13px] font-semibold text-foreground">{skill.name}</p>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                  {skill.evidence}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        {activeTab === "projects" ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {result.matchedProjects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={project.url}
                  className={cn(
                    "block h-full rounded-lg border border-border-muted/70 bg-surface-input/35 px-2.5 py-2",
                    btnTransition,
                    "hover:border-accent/30 hover:bg-accent/[0.05]",
                    focusRing,
                  )}
                >
                  <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-accent">
                    {project.title}
                  </p>
                  <p className="mt-1 line-clamp-3 text-[11px] leading-snug text-muted-foreground">
                    {project.reason}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {activeTab === "more" ? (
          <div className="space-y-4">
            {result.gaps.length > 0 ? (
              <div>
                <p className={labelOverline}>Gaps & framing</p>
                <ul className="mt-2 space-y-2">
                  {result.gaps.map((gap) => (
                    <li
                      key={gap.item}
                      className="rounded-lg border border-border-muted/70 px-2.5 py-2"
                    >
                      <p className="text-[13px] font-medium text-foreground-secondary">
                        {gap.item}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                        {gap.suggestion}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {result.talkingPoints.length > 0 ? (
              <div>
                <p className={labelOverline}>Talking points</p>
                <ul className="mt-2 space-y-1.5">
                  {result.talkingPoints.map((point, i) => (
                    <li
                      key={point}
                      className="flex gap-2 text-[12px] leading-snug text-muted-foreground"
                    >
                      <span className="shrink-0 font-semibold text-accent/80">{i + 1}.</span>
                      <span className="min-w-0 text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {ctaRow}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function JobFitAnalyzer() {
  const [jobText, setJobText] = useState("");
  const [inputExpanded, setInputExpanded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<JobFitResult | null>(null);
  const [activeTab, setActiveTab] = useState<ResultTab>("overview");

  const charCount = jobText.length;
  const canSubmit =
    charCount >= MIN_JOB_DESCRIPTION_CHARS &&
    charCount <= MAX_JOB_DESCRIPTION_CHARS &&
    !loading;

  const analyze = useCallback(async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setActiveTab("overview");

    try {
      const res = await fetch("/api/job-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jobText }),
      });

      const data = (await res.json()) as JobFitApiResponse & { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Analysis failed.");
      }

      setResult(data.result);
      setInputExpanded(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed.");
    } finally {
      setLoading(false);
    }
  }, [canSubmit, jobText]);

  const meta = useMemo(
    () => (result ? RECOMMENDATION_META[result.recommendation] : null),
    [result],
  );

  const card = cn(
    "rounded-xl border border-border-muted/85 bg-card p-4 sm:p-5",
    cardSurfaceTransition,
  );

  const showResults = Boolean(result || loading);

  return (
    <div className="text-left">
      <div className="max-w-3xl">
        <h2 className={sectionHeading}>Job Fit Analyzer</h2>
        <p className={cn("mt-5 sm:mt-7", proseBody)}>
          Paste a job description and get an AI-powered fit score grounded in{" "}
          {site.name.split(" ")[0]}&apos;s real projects, skills, and certifications.
        </p>
      </div>

      <div
        className={cn(
          "mt-8 grid gap-5",
          showResults
            ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start"
            : "lg:grid-cols-2 lg:items-start",
        )}
      >
        <div className={card}>
          <div className="flex items-center justify-between gap-3">
            <p className={labelOverline}>Job description</p>
            {result && !inputExpanded ? (
              <button
                type="button"
                onClick={() => setInputExpanded(true)}
                className={cn(
                  "text-[11px] font-medium text-accent hover:underline",
                  focusRing,
                  "rounded-sm",
                )}
              >
                Edit
              </button>
            ) : null}
          </div>

          {result && !inputExpanded ? (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {jobText}
            </p>
          ) : (
            <>
              <textarea
                value={jobText}
                onChange={(e) => {
                  setJobText(e.target.value.slice(0, MAX_JOB_DESCRIPTION_CHARS));
                  setError(null);
                }}
                rows={showResults ? 6 : 9}
                placeholder="Paste the job posting — requirements, stack, responsibilities..."
                className={cn(
                  "mt-3 w-full resize-y rounded-lg border border-border-muted bg-surface-input px-3 py-2.5",
                  "text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70",
                  showResults ? "min-h-[7.5rem]" : "min-h-[10rem] sm:min-h-[12rem]",
                  transitionField,
                  "focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/25",
                )}
                aria-describedby="job-fit-char-count"
              />
              <div
                id="job-fit-char-count"
                className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground"
              >
                <span>
                  {charCount.toLocaleString()} / {MAX_JOB_DESCRIPTION_CHARS.toLocaleString()}
                  {charCount > 0 && charCount < MIN_JOB_DESCRIPTION_CHARS
                    ? ` · need ${MIN_JOB_DESCRIPTION_CHARS - charCount} more`
                    : null}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SAMPLE_JOBS.map((sample) => (
                  <button
                    key={sample.label}
                    type="button"
                    onClick={() => {
                      setJobText(sample.text);
                      setError(null);
                      setResult(null);
                      setInputExpanded(true);
                    }}
                    className={cn(chipMatte, "cursor-pointer text-[11px] sm:text-xs")}
                  >
                    Try {sample.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => void analyze()}
            disabled={!canSubmit}
            className={cn(
              "mt-4 inline-flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-lg",
              "border border-accent/35 bg-matte-raised px-4 text-sm font-semibold text-foreground",
              btnTransition,
              "hover:border-accent/55 hover:bg-accent/[0.12]",
              "disabled:cursor-not-allowed disabled:opacity-45",
              focusRing,
            )}
          >
            <AnalyzeIcon className="h-4 w-4 text-accent" />
            {loading ? "Analyzing…" : result ? "Re-analyze" : "Analyze fit"}
          </button>

          {error ? (
            <p className="mt-2 text-sm text-red-400/90" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div
          className={cn(
            card,
            !showResults && "flex min-h-[14rem] flex-col items-center justify-center text-center",
          )}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-8">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
              <p className="text-sm text-muted-foreground">Matching to portfolio…</p>
            </div>
          ) : null}

          {!loading && !result ? (
            <div className="px-2 py-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/25 bg-accent/[0.06]">
                <AnalyzeIcon className="h-5 w-5 text-accent/80" />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground-secondary">
                Fit report appears here
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Tabbed breakdown — skills, projects, gaps, and talking points.
              </p>
            </div>
          ) : null}

          {result && meta ? (
            <FitResultPanel
              result={result}
              meta={meta}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
