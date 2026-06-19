import Link from "next/link";
import type { ProjectCaseStudy } from "@/lib/caseStudies";
import { site } from "@/lib/site";
import { ProjectPreviewCard } from "@/components/ProjectPreviewCard";
import { afterSectionHeading, sectionHeading, touchTextLink } from "@/lib/ui";
import { cn } from "@/lib/cn";

const viewAllClass = cn(
  touchTextLink,
  "shrink-0 text-[13px] font-semibold text-accent hover:text-accent-hover",
);

type ProjectsProps = {
  projects: readonly ProjectCaseStudy[];
};

export function Projects({ projects }: ProjectsProps) {
  return (
    <div className="text-left">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <h2 className={sectionHeading}>{site.projectsTitle}</h2>
        <Link href="/projects" className={viewAllClass}>
          View all projects →
        </Link>
      </div>
      <ul
        className={cn(
          afterSectionHeading,
          "grid list-none gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2",
        )}
      >
        {projects.map((project, i) => (
          <li key={project.slug} className="min-w-0">
            <ProjectPreviewCard project={project} index={i + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
}
