import { caseStudies } from "@/lib/caseStudies";
import { certifications } from "@/lib/certifications";
import { site } from "@/lib/site";
import type { KnowledgeChunk } from "@/lib/rag/types";

function chunk(
  partial: Omit<KnowledgeChunk, "text"> & { text: string },
): KnowledgeChunk {
  return {
    id: partial.id,
    title: partial.title,
    section: partial.section,
    url: partial.url,
    text: partial.text.trim(),
  };
}

/** Structured corpus derived from site content — no scraping required. */
export function buildKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  chunks.push(
    chunk({
      id: "profile",
      title: site.name,
      section: "Profile",
      url: "/#top",
      text: [
        `${site.name} — ${site.title}.`,
        site.description,
        site.heroDescription,
      ].join(" "),
    }),
  );

  site.aboutParagraphs.forEach((paragraph, i) => {
    chunks.push(
      chunk({
        id: `about-${i}`,
        title: site.aboutTitle,
        section: "About",
        url: "/#about",
        text: paragraph,
      }),
    );
  });

  site.skillGroups.forEach((group) => {
    chunks.push(
      chunk({
        id: `skills-${group.title.toLowerCase().replace(/\s+/g, "-")}`,
        title: group.title,
        section: site.skillsTitle,
        url: "/#skills",
        text: `${group.title}: ${group.items.join(", ")}.`,
      }),
    );
  });

  chunks.push(
    chunk({
      id: "education",
      title: site.educationTitle,
      section: "Education",
      url: "/#education",
      text: [
        `${site.educationDegree} at ${site.educationSchool}.`,
        `${site.certificationsHeading}: ${certifications.map((c) => `${c.title} (${c.issuer}, ${c.date})`).join("; ")}.`,
        `${site.achievementsHeading}: ${site.achievements.join("; ")}.`,
      ].join(" "),
    }),
  );

  chunks.push(
    chunk({
      id: "contact",
      title: site.contactTitle,
      section: "Contact",
      url: "/#contact",
      text: [
        `Email: ${site.contact.email}.`,
        `Phone: ${site.contact.phone}.`,
        `LinkedIn: ${site.contact.linkedIn}.`,
        `GitHub: ${site.contact.github}.`,
        `Location: ${site.educationSchool}, Pakistan.`,
        `Resume download: ${site.resumeUrl}.`,
      ].join(" "),
    }),
  );

  chunks.push(
    chunk({
      id: "projects-index",
      title: site.projectsTitle,
      section: "Projects",
      url: "/projects",
      text: [
        `Projects portfolio with full case studies at /projects.`,
        caseStudies
          .map((p) => `${p.title} (${p.slug}) — ${p.overview}`)
          .join(" "),
      ].join(" "),
    }),
  );

  for (const project of caseStudies) {
    const projectUrl = `/projects/${project.slug}`;

    chunks.push(
      chunk({
        id: `project-${project.slug}-overview`,
        title: project.title,
        section: "Project overview",
        url: projectUrl,
        text: [
          project.title,
          project.overview,
          project.liveDemoUrl
            ? `Live site: ${project.liveDemoUrl} (${project.liveDemoLabel ?? "Live demo"}).`
            : null,
          project.githubUrl ? `GitHub: ${project.githubUrl}.` : null,
        ]
          .filter(Boolean)
          .join(" "),
      }),
    );

    chunks.push(
      chunk({
        id: `project-${project.slug}-stack`,
        title: project.title,
        section: "Technologies & features",
        url: projectUrl,
        text: [
          `Technologies: ${project.technologies.join(", ")}.`,
          `Key features: ${project.features.join("; ")}.`,
          `Challenges solved: ${project.challenges.join("; ")}.`,
        ].join(" "),
      }),
    );

    if (project.architecture?.caption) {
      chunks.push(
        chunk({
          id: `project-${project.slug}-architecture`,
          title: project.title,
          section: "Architecture",
          url: projectUrl,
          text: `Architecture: ${project.architecture.caption}`,
        }),
      );
    }

    if (project.highlights?.length) {
      chunks.push(
        chunk({
          id: `project-${project.slug}-highlights`,
          title: project.title,
          section: "Engineering highlights",
          url: projectUrl,
          text: project.highlights
            .map((h) => `${h.title}: ${h.description}`)
            .join(" "),
        }),
      );
    }

    chunks.push(
      chunk({
        id: `project-${project.slug}-future`,
        title: project.title,
        section: "Future improvements",
        url: projectUrl,
        text: `Future improvements for ${project.title}: ${project.futureImprovements.join("; ")}.`,
      }),
    );
  }

  return chunks;
}
