import type { Metadata } from "next";
import { CircuitGlowLines } from "@/components/CircuitGlowLines";
import { ProjectPreviewCard } from "@/components/ProjectPreviewCard";
import { site } from "@/lib/site";
import { withDiskScreenshotsAll } from "@/lib/projectDiskScreenshots";
import { cn } from "@/lib/cn";
import { afterSectionHeading, proseBody, sectionHeading } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies and technical write-ups for AI platforms, data systems, and full-stack work.",
};

export default async function ProjectsPage() {
  const projects = withDiskScreenshotsAll(site.projects);

  return (
    <main className="pb-28 sm:pb-36 md:pb-40">
      <section className="relative scroll-mt-24 overflow-hidden border-b border-border-muted/85 py-14 sm:scroll-mt-28 sm:py-20 lg:py-[6.75rem]">
        <CircuitGlowLines
          instanceId="projects-index"
          pathSet="section-b"
          variant="section"
          showScan={false}
          showVignette={false}
        />
        <div className="relative z-10">
        <h1 className={sectionHeading}>{site.projectsTitle}</h1>
        <p className={cn(afterSectionHeading, proseBody, "max-w-[62ch]")}>
          Each entry opens a full case study: architecture notes, stack,
          challenges, and what I would improve next.
        </p>
        <ul className="mt-10 grid list-none gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.slug} className="min-w-0">
              <ProjectPreviewCard project={project} index={i + 1} />
            </li>
          ))}
        </ul>
        </div>
      </section>
    </main>
  );
}
