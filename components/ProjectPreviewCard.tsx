import Image from "next/image";
import Link from "next/link";
import type { ProjectCaseStudy } from "@/lib/caseStudies";
import { cn } from "@/lib/cn";
import { cardSurfaceTransition, chipMatte, labelOverline } from "@/lib/ui";

type ProjectPreviewCardProps = {
  project: ProjectCaseStudy;
  /** 1-based index for label */
  index: number;
};

export function ProjectPreviewCard({ project, index }: ProjectPreviewCardProps) {
  const { slug, title, overview, technologies } = project;
  const thumb = project.screenshots?.[0];
  const techPreview = technologies.slice(0, 4);

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border-muted bg-card",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]",
        cardSurfaceTransition,
        "outline-none transition-[transform,border-color,background-color] duration-200 ease-out",
        "hover:border-accent/32 hover:bg-card-hover",
        "motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-border-muted/80 bg-surface-input",
        )}
      >
        {thumb ? (
          <Image
            src={thumb.src}
            alt={thumb.alt || `${title} preview`}
            fill
            className="object-cover object-top transition duration-300 ease-out group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
            unoptimized={thumb.src.startsWith("/api/")}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1 px-4 py-8 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/50">
              Preview
            </span>
            <span className="max-w-[18ch] text-[11px] leading-snug text-muted-foreground">
              Image coming soon
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className={labelOverline}>
          Case study · {String(index).padStart(2, "0")}
        </p>
        <h3 className="mt-2 line-clamp-2 text-pretty text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-pretty text-[13px] leading-relaxed text-muted-foreground sm:text-sm sm:leading-relaxed">
          {overview}
        </p>
        <ul
          className="mt-3 flex flex-wrap gap-1.5"
          aria-label="Technologies preview"
        >
          {techPreview.map((tech) => (
            <li key={tech}>
              <span className={cn(chipMatte, "px-2 py-1 text-[11px]")}>
                {tech}
              </span>
            </li>
          ))}
        </ul>
        <span className="mt-4 text-[12px] font-semibold text-accent transition-colors group-hover:text-accent-hover">
          View case study →
        </span>
      </div>
    </Link>
  );
}
