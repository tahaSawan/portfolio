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
  githubUrl?: string;
  liveDemoUrl?: string;
  liveDemoLabel?: string;
  /**
   * With disk images under `images/<slug>/`, match this **filename without extension**
   * (case-insensitive) and use it as the first screenshot — project preview + grid thumb.
   */
  projectPreviewStem?: string;
  /**
   * Folder name under `images/` when it differs from `slug`
   * (e.g. `Employee-Turnover` for slug `employee-turnover-analytics`).
   */
  imagesFolder?: string;
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
    slug: "jobgpt",
    title: "JobGPT — AI job search & application copilot",
    overview:
      "Chat-first job search platform that finds roles across major boards, ranks every listing against your resume, evaluates fit with apply/skip guidance, tailors ATS-ready documents, and tracks your pipeline — without leaving the conversation.",
    features: [
      "Natural-language search across Greenhouse, Lever, Ashby, Workable, YC, RemoteOK, USAJobs, and more",
      "Resume-aware match scores on every result — skills, gaps, and ranked fit instead of keyword noise",
      "Per-role evaluation with strengths, gaps, compensation signals, and clear apply/skip recommendations",
      "One-click resume tailoring saved to Documents; evaluation reports and cover-letter workflows from Chat",
      "Synced surfaces: Job Search board, Reports, Applications pipeline, and Documents library update from chat",
      "Conversation history, saved searches, and pipeline status (Saved → Applied → Interview) in one workflow",
      "Built on Career-Ops — open-source job search engine indexing 27k+ listings across 12+ boards",
    ],
    challenges: [
      "Keeping multi-board ingestion reliable when APIs and HTML layouts differ per source",
      "Scoring fit against a real CV without overfitting to keyword overlap or missing transferable skills",
      "Syncing chat-driven actions with structured dashboards so users never repeat work across views",
      "Designing evaluation outputs recruiters and candidates both trust — actionable, not generic LLM prose",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "OpenAI APIs",
      "Career-Ops",
      "RAG",
      "REST APIs",
    ],
    architecture: {
      caption:
        "Chat orchestrates search, evaluation, tailoring, and tracking. Career-Ops aggregates listings; resume embeddings and LLM tools score fit, generate documents, and write pipeline state to dashboards (Job Search, Reports, Applications, Documents) in real time.",
    },
    highlights: [
      {
        title: "Search → score → act",
        description:
          "A single prompt like “remote data analyst jobs, 80%+ match” returns ranked cards with match %, skill overlap, gaps, and actions to evaluate, save, or tailor.",
      },
      {
        title: "Resume-grounded ranking",
        description:
          "Every listing is scored against the uploaded CV — surfacing ~94% fits with explicit matched skills (Python, SQL, R) and missing items (e.g. Go).",
      },
      {
        title: "Full pipeline in one product",
        description:
          "From first search through tailored HTML resumes, evaluation reports, and application tracking — four modules stay in sync with Chat as the control plane.",
      },
    ],
    futureImprovements: [
      "Public deployment with auth and persistent user workspaces",
      "Browser extension to evaluate listings from any job board URL",
      "Interview prep packs generated from evaluation gaps per role",
      "Team/recruiter view for shared pipelines and hiring manager handoff",
    ],
    imagesFolder: "JobGPT",
    projectPreviewStem: "02-chat-ranked-matches",
  },
  {
    slug: "insight-flow-ai",
    title: "InsightFlow AI — autonomous report-to-action agent",
    overview:
      "Mobile-first executive copilot that turns messy business reports into one prioritized decision — multi-agent Gemini analysis, leadership alerts, consequence paths, and simulated Slack/email/CRM execution, deployed on web via Expo.",
    features: [
      "Five-agent pipeline (Reader → Main Points → Problems → Next Steps → Results) with live trace on Analysis",
      "Quick mode: single Gemini pass (~20s) with the same structured output for demos",
      "Document ingest via paste, .txt upload, or PDF text extraction through Gemini",
      "Executive dashboard: leadership alerts, autonomous decision, consequence paths, and action commander",
      "AI debate mode — Growth, Risk, and Finance advisors reconcile to a final recommendation",
      "Decision scorecard across confidence, urgency, financial impact, operational risk, and complexity",
      "Industry and use-case framing (Finance, Healthcare, Technology; board, crisis, weekly ops)",
      "History, share/copy export, executive voice brief with TTS, and onboarding flow",
    ],
    challenges: [
      "Orchestrating five sequential LLM calls with visible progress without losing user trust on latency",
      "Keeping outputs executive-grade — one primary action, quantified stakes, not generic summaries",
      "Designing simulated integrations that feel real while clearly scoped as demo-safe",
      "Shipping a polished mobile + web experience from one Expo codebase for hackathon timelines",
    ],
    technologies: [
      "Expo",
      "React Native",
      "TypeScript",
      "Google Gemini",
      "Expo Router",
      "React Native Reanimated",
    ],
    architecture: {
      caption:
        "Document ingest → full orchestrator (5 Gemini agents) or fast single-call path → structured AnalysisResult in AppContext → Results UI with alerts, debate, scorecard, and simulated execution; history persisted via AsyncStorage.",
    },
    highlights: [
      {
        title: "Information → decision",
        description:
          "Upload a quarterly report and get a leadership alert, 95% confidence recommendation, and do-nothing vs act-now consequence paths in under a minute.",
      },
      {
        title: "Transparent agent trace",
        description:
          "Step-by-step UI shows each helper’s status, timestamps, and outputs — from reading 144 words to scoring seriousness at 85/100.",
      },
      {
        title: "Demo-ready execution",
        description:
          "Action commander simulates Slack, email, and CRM steps; debate mode surfaces conflicting advisor perspectives before the final pick.",
      },
    ],
    futureImprovements: [
      "Live Slack, email, and CRM connectors behind user-approved OAuth",
      "Team workspaces with shared history and role-based report access",
      "SHAP-style attribution tying each recommendation to source sentences in the report",
      "Scheduled re-analysis when new documents arrive in connected drives",
    ],
    githubUrl: "https://github.com/tahaSawan/Insight-Flow-AI",
    liveDemoUrl: "https://insight-flow-ai-xi.vercel.app/",
    liveDemoLabel: "Live app",
    imagesFolder: "Insight-Flow-AI",
    projectPreviewStem: "01-hero",
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
  {
    slug: "employee-turnover-analytics",
    title: "Employee turnover analytics — HR retention ML",
    overview:
      "End-to-end machine learning pipeline for Portobello Tech that predicts employee attrition, surfaces drivers of turnover, and maps each employee to actionable HR risk zones — optimized for high recall so at-risk staff are caught before they resign.",
    features: [
      "Seven-step notebook pipeline: data quality, EDA, clustering, SMOTE, training, evaluation, and retention playbooks",
      "K-Means segmentation of leavers into burnout, disengagement, and external-opportunity profiles",
      "Stratified train/test split with SMOTE applied only on training data to avoid leakage",
      "Three-model comparison (Logistic Regression, Random Forest, Gradient Boosting) with 5-fold CV",
      "Risk-zone scoring (Safe / Low / Medium / High) with tailored retention strategies per band",
      "11,991 employee records after deduplication; ~16.6% baseline turnover rate",
    ],
    challenges: [
      "Severe class imbalance (~16.6% leavers) without leaking synthetic samples into the test set",
      "Choosing recall over precision — false negatives cost far more than false alarms in HR retention",
      "Translating model outputs into interpretable risk zones HR teams can act on immediately",
      "Separating distinct leaver personas so retention tactics are not one-size-fits-all",
    ],
    technologies: [
      "Python",
      "pandas",
      "NumPy",
      "scikit-learn",
      "imbalanced-learn",
      "Matplotlib",
      "Seaborn",
      "Jupyter Notebook",
    ],
    architecture: {
      caption:
        "Notebook-driven workflow: CSV ingest → EDA and clustering insights → encoded features with SMOTE on train only → ensemble classifiers → Gradient Boosting selected for production scoring → probability thresholds mapped to four HR risk zones.",
    },
    highlights: [
      {
        title: "Recall-first selection",
        description:
          "Gradient Boosting chosen for 91.7% recall on leavers and 0.979 AUC — prioritizing catching at-risk employees over minimizing false alarms.",
      },
      {
        title: "Actionable risk zones",
        description:
          "Turnover probability buckets (Safe, Low, Medium, High) with specific HR interventions from check-ins to urgent retention packages.",
      },
      {
        title: "Driver clarity",
        description:
          "EDA tied satisfaction, workload extremes, and tenure to attrition — satisfaction level showed the strongest negative correlation with leaving (−0.39).",
      },
    ],
    futureImprovements: [
      "Hyperparameter tuning with GridSearchCV or Optuna",
      "SHAP-based feature importance for explainability with HR stakeholders",
      "REST API or Streamlit dashboard for real-time turnover risk scoring",
      "A/B testing retention interventions and measuring impact over time",
    ],
    githubUrl: "https://github.com/tahaSawan/employee-turnover-analytics",
    imagesFolder: "Employee-Turnover",
    projectPreviewStem: "07_cv_f1_comparison",
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
