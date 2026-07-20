import { caseStudies } from "./caseStudies";
import { certificationLabels } from "./certifications";
import {
  RESUME_DATA_ANALYST_DOWNLOAD_FILENAME,
  RESUME_DATA_ANALYST_PATH,
  RESUME_DOWNLOAD_FILENAME,
  RESUME_PATH,
} from "./resumeDownload";

export const site = {
  name: "Taha S Awan",
  navBrand: "Taha S Awan",
  title: "AI Engineer • Data Science Enthusiast • Full Stack Developer",
  description:
    "Taha S Awan — AI engineer, data science enthusiast, and full-stack developer building AI-powered platforms, ML systems, and scalable backends.",
  heroDescription:
    "FAST NUCES graduate and gold medalist — Data Scientist and AI Engineer with hands-on experience building AI-powered full-stack platforms, machine learning systems, analytics solutions, and scalable backend applications.",
  resumeUrl: RESUME_PATH,
  resumeDownloadFileName: RESUME_DOWNLOAD_FILENAME,
  resumeDataAnalystUrl: RESUME_DATA_ANALYST_PATH,
  resumeDataAnalystDownloadFileName: RESUME_DATA_ANALYST_DOWNLOAD_FILENAME,
  nav: [
    { href: "/#top", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/#job-fit", label: "Fit Check" },
    { href: "/#education", label: "Education" },
    { href: "/#contact", label: "Contact" },
  ],
  aboutTitle: "About",
  aboutParagraphs: [
    "I recently graduated from FAST NUCES Islamabad with a BS in Computer Science (Robotics specialization), earning a gold medal for academic excellence. I am passionate about Artificial Intelligence, Machine Learning, Data Science, Robotics, and Full Stack Development.",
    "I enjoy building intelligent systems, AI-powered platforms, analytics solutions, and scalable software products that combine engineering with impactful real-world applications.",
    "I focus on AI systems, intelligent automation, machine learning workflows, and production-ready software architectures — turning ideas into reliable, production-grade software.",
  ],
  educationTitle: "Education & Certifications",
  educationSchool: "FAST NUCES Islamabad",
  educationDegree:
    "BS Computer Science (Specialization in Robotics) — Graduate",
  certificationsHeading: "Certifications",
  certifications: certificationLabels,
  achievementsHeading: "Achievements",
  achievements: [
    "Gold Medalist – IGCSE North Region",
    "Silver Medalist – A Levels",
    "Gold Medalist – BS Computer Science, FAST NUCES Islamabad",
    "Founder of an AI-focused startup currently in development phase",
  ],
  skillsTitle: "Skills",
  skillGroups: [
    {
      title: "Programming",
      items: ["Python", "SQL", "JavaScript", "TypeScript"],
    },
    {
      title: "Data Science & Machine Learning",
      items: [
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "EDA",
        "Feature Engineering",
        "Supervised Learning",
        "Ensemble Methods",
        "Clustering",
        "Cross-Validation",
        "Class Imbalance (SMOTE)",
      ],
    },
    {
      title: "Visualization",
      items: ["Tableau", "Matplotlib", "Seaborn"],
    },
    {
      title: "Web Development",
      items: [
        "Next.js",
        "React",
        "React Native",
        "Expo",
        "Node.js",
        "Express.js",
        "REST APIs",
      ],
    },
    {
      title: "Databases",
      items: ["PostgreSQL", "Prisma ORM", "NeonDB"],
    },
    {
      title: "Tools",
      items: ["Git", "GitHub", "Jupyter Notebook", "Vercel"],
    },
    {
      title: "AI & LLMs",
      items: [
        "OpenAI APIs",
        "Google Gemini",
        "RAG",
        "Prompt Engineering",
        "Generative AI",
        "Multi-Agent Orchestration",
        "YOLOv8",
        "Computer Vision",
        "JWT Authentication",
        "OAuth",
      ],
    },
  ],
  projectsTitle: "Projects",
  projects: caseStudies,
  footerTagline:
    "Building intelligent systems and scalable AI-powered applications.",
  contactTitle: "Contact",
  contact: {
    email: "taha.awan2k3@gmail.com",
    phone: "+1 (469) 785-8260",
    linkedIn: "https://www.linkedin.com/in/taha-s-awan-30b278330",
    github: "https://github.com/tahaSawan",
    linkedInDisplay: "linkedin.com/in/taha-s-awan-30b278330",
    githubDisplay: "github.com/tahaSawan",
  },
} as const;

/**
 * Canonical public URL with no trailing slash.
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. `https://yoursite.com`) so Open Graph and Twitter cards resolve absolute image URLs.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Default `<title>` and social card title (LinkedIn, Slack, iMessage, etc.). */
export const seoDefaultTitle =
  "Taha S Awan — AI Engineer, Data Science Enthusiast, Full Stack Developer";

export const seoKeywords = [
  "Taha S Awan",
  "AI Engineer",
  "Data Science",
  "Full Stack Developer",
  "Machine Learning",
  "FAST NUCES",
  "Portfolio",
  "Python",
  "Next.js",
] as const;
