/**
 * Case-study entries for the Projects section.
 *
 * Optional:
 * - `liveDemoUrl` — external link (product site, demo, etc.).
 * - `liveDemoLabel` — button text (default “Live demo”; use “Website” for production URLs).
 * - `screenshots` — `{ src, alt, caption? }` under `/public/…`, or place files in `images/<slug>/` (e.g. `images/prepxpert/`, `images/legalconnect/`; see `lib/projectDiskScreenshots.ts`).
 * - `projectPreviewStem` — with disk images, filename **without extension** (case-insensitive) to use first for project preview + grid thumb (e.g. `PrepXpert-home` → `PrepXpert-home.webp`).
 * - `architecture.imageSrc` — diagram asset; without it, `caption` renders inside a dashed frame.
 * - `highlights` — engineering highlight cards under “Architecture & engineering”.
 */
export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectHighlight = {
  title: string;
  description: string;
};

export type ProjectArchitecture = {
  /** Path under `/public`, e.g. `/projects/prepxpert-arch.png` */
  imageSrc?: string;
  alt?: string;
  caption?: string;
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  /** Short executive summary */
  overview: string;
  features: readonly string[];
  technologies: readonly string[];
  challenges: readonly string[];
  /** Diagram / narrative + optional highlight cards in the UI */
  architecture?: ProjectArchitecture;
  highlights?: readonly ProjectHighlight[];
  screenshots?: readonly ProjectScreenshot[];
  futureImprovements: readonly string[];
  githubUrl: string;
  liveDemoUrl?: string;
  liveDemoLabel?: string;
  /**
   * With disk images under `images/<slug>/`, match this **filename without extension**
   * (case-insensitive) and use it as the first screenshot — project preview + grid thumb.
   */
  projectPreviewStem?: string;
};

export const caseStudies: readonly ProjectCaseStudy[] = [
  {
    slug: "prepxpert",
    title: "PrepXpert — AI-powered test preparation",
    overview:
      "End-to-end platform for MDCAT and university entry tests in Pakistan: secure accounts, structured question banks, and AI-assisted practice tuned for high-stakes admissions workflows.",
    features: [
      "Adaptive practice flows with streaks, milestones, and lightweight gamification",
      "JWT-backed authentication with role-aware surfaces for students and admins",
      "OpenAI-backed explanations and weak-area signals layered into study sessions",
      "PostgreSQL + Prisma schema oriented toward analytics and long-term growth",
      "Next.js App Router shell with cohesive UX across marketing and application areas",
    ],
    challenges: [
      "Keeping AI calls responsive and cost-aware under concurrent practice traffic",
      "Modeling secure, multi-role access without slowing down the student experience",
      "Unifying product, content, and progress data behind a maintainable service boundary",
    ],
    technologies: [
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "JWT",
      "OpenAI APIs",
    ],
    architecture: {
      caption:
        "Edge-aware routing into authenticated handlers, Prisma-backed Postgres for domain state, and a thin AI boundary so prompts and model calls stay isolated from core business logic.",
    },
    highlights: [
      {
        title: "Adaptive practice",
        description:
          "Structured sessions that emphasize weak topics while preserving predictable latency for users on everyday networks.",
      },
      {
        title: "Retention design",
        description:
          "Progress and streak mechanics aligned with exam timelines so motivation stays tied to measurable outcomes.",
      },
      {
        title: "Operational clarity",
        description:
          "Schema and API choices that make it straightforward to extend question types and reporting as the product grows.",
      },
    ],
    futureImprovements: [
      "Deeper analytics on question-level difficulty calibration across cohorts",
      "Offline-tolerant practice packs with sync when connectivity returns",
      "Expanded localization for regional syllabi beyond the current entry-test set",
    ],
    githubUrl: "https://github.com/tahaSawan/prepxpert",
    liveDemoUrl: "https://www.myprepxpert.com",
    liveDemoLabel: "Website",
    projectPreviewStem: "PrepXpert-home",
  },
  {
    slug: "legalconnect",
    title: "LegalConnect — AI legal consultation",
    overview:
      "Full-stack legal consultation experience with OpenAI-assisted intake, role-based dashboards for clients and counsel, and HD-ready session flows built on scalable REST APIs.",
    features: [
      "OpenAI integration for guided intake, drafting assistance, and session context",
      "OAuth-aware identity with role-separated dashboards and audit-friendly flows",
      "REST APIs designed for consultation scheduling, documents, and messaging",
      "Foundations for secure HD video sessions alongside asynchronous messaging",
      "Next.js surface with emphasis on trust, clarity, and low-friction onboarding",
    ],
    challenges: [
      "Balancing rich AI assistance with strict expectations around privacy and consent",
      "Designing APIs that stay evolvable as compliance and billing rules change",
      "Keeping consultation state consistent across chat, documents, and session metadata",
    ],
    technologies: [
      "Next.js",
      "PostgreSQL",
      "OpenAI APIs",
      "OAuth",
      "REST APIs",
    ],
    architecture: {
      caption:
        "Service-oriented modules for identity, scheduling, and AI orchestration, with Postgres as the system of record for cases and entitlements.",
    },
    highlights: [
      {
        title: "Trusted intake",
        description:
          "Assistant flows that collect structured matter data without overwhelming users unfamiliar with legal tooling.",
      },
      {
        title: "Counsel-ready context",
        description:
          "Dashboards that surface the right history before a live session so time on video stays focused.",
      },
    ],
    futureImprovements: [
      "Hardened retention policies for documents with jurisdiction-specific controls",
      "Billing hooks for time-boxed consults and subscription counsel plans",
      "Formalized evaluation harnesses for prompt changes tied to intake quality metrics",
    ],
    githubUrl: "https://github.com/tahaSawan/legalconnect",
    liveDemoUrl: "https://www.legalconnectpk.com",
    liveDemoLabel: "Website",
    projectPreviewStem: "Legalconnect-home",
  },
  {
    slug: "precision-farming-robot",
    title: "Precision farming robot",
    overview:
      "Autonomous field prototype for weed detection and targeted response, combining lightweight vision models with robotics constraints suitable for real agricultural environments.",
    features: [
      "YOLOv8n pipelines tuned for field imagery and edge-friendly inference budgets",
      "Dataset curation and augmentation oriented toward crop and weed diversity",
      "Control paths that pair detections with actuation logic for safe field trials",
      "Python tooling for training, evaluation, and reproducible experiment tracking",
    ],
    challenges: [
      "Operating under variable lighting, dust, and occlusions common in outdoor rows",
      "Trading off model accuracy against latency on compute-limited robot hardware",
      "Grounding detections in reliable spatial frames for safe mechanical response",
    ],
    technologies: ["Python", "YOLOv8", "Computer Vision", "Robotics"],
    architecture: {
      caption:
        "Sense–decide–act loop: camera frames through a vision stack, fused with motion state, before commands reach the elimination mechanism.",
    },
    highlights: [
      {
        title: "Edge-first vision",
        description:
          "Model choices and input resolutions aimed at dependable inference where cloud offload is not guaranteed.",
      },
      {
        title: "Field realism",
        description:
          "Training signals that reflect messy outdoor conditions instead of idealized lab captures alone.",
      },
    ],
    futureImprovements: [
      "Sensor fusion with IMU/GPS for tighter row following under drift",
      "Hardware-in-the-loop tests before expanding to taller crop canopies",
      "Telemetry pipeline for fleet-level weed pressure maps over a season",
    ],
    githubUrl: "https://github.com/tahaSawan/precision-farming-robot",
  },
  {
    slug: "australian-apparel-sales",
    title: "Australian apparel — sales intelligence",
    overview:
      "Analytics case study on regional apparel performance: exploratory analysis, KPI framing, and dashboards that highlight revenue drivers and underperforming segments.",
    features: [
      "Exploratory analysis with Pandas to profile regions, categories, and seasonality",
      "Tableau dashboards for executives and operators with consistent metric definitions",
      "Matplotlib and Seaborn visuals for publication-ready narrative charts",
      "Clear documentation of assumptions, joins, and data quality checks",
    ],
    challenges: [
      "Reconciling sparse regional data with headline revenue trends without misleading cuts",
      "Keeping visual language consistent across exploratory and executive-facing views",
      "Surfacing actionable next steps instead of static historical reporting alone",
    ],
    technologies: ["Python", "Pandas", "Tableau", "Matplotlib"],
    architecture: {
      caption:
        "Notebook-first EDA feeding curated datasets into Tableau extracts; chart semantics stay aligned to a single KPI dictionary shared with stakeholders.",
    },
    highlights: [
      {
        title: "Metric discipline",
        description:
          "One source of truth for revenue and margin definitions before any regional comparison ships to leadership.",
      },
      {
        title: "Narrative visuals",
        description:
          "Matplotlib/Seaborn for analyst review, Tableau for recurring operational monitoring with the same cuts.",
      },
    ],
    futureImprovements: [
      "Scheduled data quality checks before extract refresh",
      "Scenario models for discount and seasonality stress tests",
      "Lightweight API layer if live dashboards need embedding outside Tableau",
    ],
    githubUrl: "https://github.com/tahaSawan/australian-apparel-sales-analysis",
  },
];

export function getProjectBySlug(
  slug: string,
): ProjectCaseStudy | undefined {
  return caseStudies.find((p) => p.slug === slug);
}

export function listProjectSlugs(): readonly string[] {
  return caseStudies.map((p) => p.slug);
}
