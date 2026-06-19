import { caseStudies } from "./caseStudies";
import { certificationLabels } from "./certifications";
import { RESUME_DOWNLOAD_FILENAME, RESUME_PATH } from "./resumeDownload";

export const site = {
  name: "Taha S Awan",
  navBrand: "Taha S Awan",
  title: "AI Engineer • Data Science Enthusiast • Full Stack Developer",
  description:
    "Taha S Awan — AI engineer, data science enthusiast, and full-stack developer building AI-powered platforms, ML systems, and scalable backends.",
  heroDescription:
    "Aspiring Data Scientist and AI Engineer with hands-on experience building AI-powered full-stack platforms, machine learning systems, analytics solutions, and scalable backend applications.",
  resumeUrl: RESUME_PATH,
  resumeDownloadFileName: RESUME_DOWNLOAD_FILENAME,
  nav: [
    { href: "/#top", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/#education", label: "Education" },
    { href: "/#contact", label: "Contact" },
  ],
  aboutTitle: "About",
  aboutParagraphs: [
    "I am a Computer Science student at FAST NUCES Islamabad specializing in Robotics. I am passionate about Artificial Intelligence, Machine Learning, Data Science, Robotics, and Full Stack Development.",
    "I enjoy building intelligent systems, AI-powered platforms, analytics solutions, and scalable software products that combine engineering with impactful real-world applications.",
    "I am currently exploring AI systems, intelligent automation, machine learning workflows, and production-ready software architectures.",
  ],
  educationTitle: "Education & Certifications",
  educationSchool: "FAST NUCES Islamabad",
  educationDegree: "BS Computer Science (Specialization in Robotics)",
  certificationsHeading: "Certifications",
  certifications: certificationLabels,
  achievementsHeading: "Achievements",
  achievements: [
    "Gold Medalist – IGCSE North Region",
    "Silver Medalist – A Levels",
    "Gold Medalist – 1st Semester BS Computer Science",
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
        "Data Visualization",
        "Machine Learning Fundamentals",
      ],
    },
    {
      title: "Visualization",
      items: ["Tableau", "Matplotlib", "Seaborn"],
    },
    {
      title: "Web Development",
      items: ["Next.js", "React", "Node.js", "Express.js", "REST APIs"],
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
      title: "AI & Other",
      items: [
        "OpenAI APIs",
        "YOLOv8",
        "JWT Authentication",
        "Generative AI Fundamentals",
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
    phone: "+92 3079655594",
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
