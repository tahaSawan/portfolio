import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircuitGlowLines } from "@/components/CircuitGlowLines";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import {
  caseStudies,
  getProjectBySlug,
  listProjectSlugs,
} from "@/lib/caseStudies";
import { withDiskScreenshots } from "@/lib/projectDiskScreenshots";
import { cn } from "@/lib/cn";
import { btnTransition, focusRing } from "@/lib/ui";

const backLinkClass = cn(
  "mb-8 inline-flex text-[13px] font-semibold text-accent transition-colors duration-200 ease-out",
  "hover:text-accent-hover",
  btnTransition,
  focusRing,
  "rounded-sm",
);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: project.title,
    description: project.overview,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectRaw = getProjectBySlug(slug);
  if (!projectRaw) notFound();
  const project = withDiskScreenshots(projectRaw);

  const index = caseStudies.findIndex((p) => p.slug === slug) + 1;

  return (
    <main className="pb-28 sm:pb-36 md:pb-40">
      <section className="relative scroll-mt-24 overflow-hidden border-b border-border-muted/85 py-10 sm:scroll-mt-28 sm:py-14 lg:py-16">
        <CircuitGlowLines
          instanceId={`project-${slug}`}
          pathSet="section-a"
          variant="section"
          showScan={false}
          showVignette={false}
        />
        <div className="relative z-10">
          <Link href="/projects" className={backLinkClass}>
            ← All projects
          </Link>
          <ProjectCaseStudy project={project} index={index} />
        </div>
      </section>
    </main>
  );
}
