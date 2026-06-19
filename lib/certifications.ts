export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageFile: string;
  verifyUrl?: string;
};

export function certificateImageUrl(file: string): string {
  return `/api/certificate-assets/${encodeURIComponent(file)}`;
}

/** Verified credentials — images served from `images/certificates/`. */
export const certifications: readonly Certification[] = [
  {
    id: "ai-engineer-masters",
    title: "Artificial Intelligence Engineer — Masters Program",
    issuer: "Simplilearn",
    date: "Feb 2026",
    imageFile: "ai-engineer-masters-program.png",
    verifyUrl:
      "https://success.simplilearn.com/078c4b5e-4da0-4bec-8299-a22bd39eddc1",
  },
  {
    id: "machine-learning-python",
    title: "Machine Learning using Python",
    issuer: "Simplilearn",
    date: "Jun 2026",
    imageFile: "machine-learning-python.png",
  },
  {
    id: "applied-data-science-python",
    title: "Applied Data Science with Python",
    issuer: "Simplilearn",
    date: "Feb 2026",
    imageFile: "applied-data-science-python.png",
  },
  {
    id: "generative-ai-essentials",
    title: "Essentials of Generative AI, Prompt Engineering & ChatGPT",
    issuer: "Simplilearn",
    date: "Mar 2026",
    imageFile: "generative-ai-essentials.png",
  },
  {
    id: "advanced-statistics",
    title: "Advanced Statistics for Data Science",
    issuer: "Simplilearn",
    date: "May 2026",
    imageFile: "advanced-statistics.png",
  },
  {
    id: "python-101-ibm",
    title: "Python 101 for Data Science",
    issuer: "IBM · Simplilearn",
    date: "Oct 2025",
    imageFile: "python-101-data-science-ibm.png",
    verifyUrl:
      "https://courses.skillsnet.simplilearn.com/certificates/d2b2a7531ada4f0fabbbfbcdbbf35ba8",
  },
  {
    id: "programming-essentials",
    title: "Programming Essentials",
    issuer: "Simplilearn",
    date: "Oct 2025",
    imageFile: "programming-essentials.png",
  },
] as const;

/** Short labels for lists and SEO (derived from structured data). */
export const certificationLabels: readonly string[] = certifications.map(
  (c) => `${c.title} (${c.issuer})`,
);
