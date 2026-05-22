import Image from "next/image";
import type { ProjectCaseStudy } from "@/lib/caseStudies";
import { cn } from "@/lib/cn";
import {
  afterCardLabel,
  buttonCaseStudyOutline,
  buttonCompact,
  cardSurfaceTransition,
  caseStudySectionTop,
  chipMatte,
  labelOverline,
} from "@/lib/ui";

const SCREENSHOT_SLOTS = 3;

const mediaFrame = cn(
  "overflow-hidden rounded-md border border-border-muted bg-surface-input",
  "transition-[border-color,background-color] duration-200 ease-out",
  "hover:border-accent/30",
);

const dashedMediaFrame = cn(
  "rounded-md border border-dashed border-accent/18 bg-surface-input/30 px-6 py-10 sm:px-10 sm:py-12",
  "transition-[border-color,background-color] duration-200 ease-out",
  "hover:border-accent/24 hover:bg-surface-input/40",
);

const highlightTile = cn(
  "rounded-md border border-border-muted bg-surface-input/35 p-5 sm:p-6",
  "transition-[border-color,background-color] duration-200 ease-out",
  "hover:border-accent/26 hover:bg-surface-input/45",
);

const bulletRow =
  "flex gap-3 text-[14px] leading-snug text-muted-foreground sm:text-[15px] sm:leading-relaxed";

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className={bulletRow}>
          <span
            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70"
            aria-hidden
          />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MediaPlaceholder({
  label,
  hint,
  aspect = "16/10",
}: {
  label: string;
  hint?: string;
  aspect?: "16/10" | "video";
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-md border border-dashed border-accent/16 bg-surface-input/30 px-4 py-8 text-center sm:px-8 sm:py-12 md:py-14",
        "transition-[border-color,background-color] duration-200 ease-out",
        "hover:border-accent/22 hover:bg-surface-input/38",
        aspect === "video" ? "aspect-video" : "aspect-[16/10]",
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/55">
        {label}
      </span>
      {hint ? (
        <span className="mt-2 max-w-sm text-[12px] leading-relaxed text-faint-foreground">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

type ProjectCaseStudyProps = {
  project: ProjectCaseStudy;
  /** 1-based index for hierarchy / scan */
  index: number;
};

export function ProjectCaseStudy({ project, index }: ProjectCaseStudyProps) {
  const {
    slug,
    title,
    overview,
    features,
    technologies,
    challenges,
    githubUrl,
    liveDemoUrl,
    liveDemoLabel,
    screenshots,
    architecture,
    highlights,
    futureImprovements,
  } = project;

  const shots = screenshots ?? [];
  const showArchitectureBlock =
    architecture &&
    (Boolean(architecture.imageSrc) ||
      Boolean(architecture.caption?.trim()));

  return (
    <article
      id={`project-${slug}`}
      className={cn(
        "scroll-mt-24 sm:scroll-mt-28",
        "rounded-lg border border-border-muted bg-card",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]",
        cardSurfaceTransition,
        "p-6 sm:p-8 lg:p-12 xl:p-14",
        "hover:border-accent/32 hover:bg-card-hover",
        "motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
      )}
    >
      <header className="border-b border-border-muted/80 pb-8 sm:pb-10 md:pb-11">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/60 sm:text-[11px]">
          Case study · {String(index).padStart(2, "0")}
        </p>
        <h3 className="mt-2.5 max-w-4xl text-pretty text-lg font-semibold tracking-[-0.022em] text-foreground sm:mt-3 sm:text-2xl sm:tracking-[-0.026em] md:text-[1.65rem] md:leading-[1.2] lg:text-[1.85rem] lg:leading-[1.18]">
          {title}
        </h3>
      </header>

      <div className="mt-9 space-y-11 sm:mt-10 sm:space-y-12 md:mt-11 md:space-y-14">
        {/* Overview */}
        <section aria-labelledby={`${slug}-overview-h`}>
          <h4 id={`${slug}-overview-h`} className={labelOverline}>
            Overview
          </h4>
          <p
            className={cn(
              afterCardLabel,
              "max-w-3xl text-pretty text-[14px] font-normal leading-[1.76] text-muted-foreground sm:text-[15px] sm:leading-[1.78] md:text-base md:leading-[1.8]",
            )}
          >
            {overview}
          </p>
        </section>

        {/* Project preview placeholder */}
        <section aria-labelledby={`${slug}-preview-h`}>
          <h4 id={`${slug}-preview-h`} className={labelOverline}>
            Project preview
          </h4>
          <div className={afterCardLabel}>
            {shots[0] ? (
              <figure className={mediaFrame}>
                <div className="relative aspect-video w-full sm:aspect-[16/9]">
                  <Image
                    src={shots[0].src}
                    alt={shots[0].alt}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width:1024px) 900px, 100vw"
                    unoptimized={shots[0].src.startsWith("/api/")}
                  />
                </div>
                {shots[0].caption ? (
                  <figcaption className="border-t border-border-muted px-4 py-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {shots[0].caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : (
              <MediaPlaceholder
                label="Preview"
                hint="Reserved for a hero capture, product walkthrough, or marketing frame."
                aspect="video"
              />
            )}
          </div>
        </section>

        {/* Technologies */}
        <section
          className={caseStudySectionTop}
          aria-labelledby={`${slug}-tech-h`}
        >
          <h4 id={`${slug}-tech-h`} className={labelOverline}>
            Technologies used
          </h4>
          <ul
            className={cn(
              afterCardLabel,
              "flex flex-wrap gap-2.5",
            )}
            aria-label="Technologies used"
          >
            {technologies.map((tech) => (
              <li key={tech}>
                <span className={chipMatte}>{tech}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Features + challenges */}
        <div
          className={cn(
            caseStudySectionTop,
            "grid gap-9 sm:grid-cols-2 sm:gap-10 md:gap-11 lg:gap-14",
          )}
        >
          <section aria-labelledby={`${slug}-features-h`}>
            <h4 id={`${slug}-features-h`} className={labelOverline}>
              Key features
            </h4>
            <div className={afterCardLabel}>
              <BulletList items={features} />
            </div>
          </section>
          <section aria-labelledby={`${slug}-challenges-h`}>
            <h4 id={`${slug}-challenges-h`} className={labelOverline}>
              Challenges solved
            </h4>
            <div className={afterCardLabel}>
              <BulletList items={challenges} />
            </div>
          </section>
        </div>

        {/* Architecture & engineering highlights */}
        <section
          className={caseStudySectionTop}
          aria-labelledby={`${slug}-arch-h`}
        >
          <h4 id={`${slug}-arch-h`} className={labelOverline}>
            Architecture & engineering highlights
          </h4>

          <div className="mt-5 space-y-9 sm:mt-6 sm:space-y-10">
            {showArchitectureBlock ? (
              <div>
                {architecture!.imageSrc ? (
                  <figure className={mediaFrame}>
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={architecture!.imageSrc}
                        alt={
                          architecture!.alt?.trim() ||
                          "Architecture diagram for this project"
                        }
                        fill
                        className="object-contain bg-surface-input p-3 sm:p-5"
                        sizes="(min-width:1024px) 900px, 100vw"
                      />
                    </div>
                    {architecture!.caption ? (
                      <figcaption className="border-t border-border-muted px-4 py-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                        {architecture!.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : (
                  <figure className={dashedMediaFrame}>
                    <div className="mx-auto max-w-3xl text-center">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/50">
                        Diagram
                      </span>
                      {architecture!.caption ? (
                        <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                          {architecture!.caption}
                        </p>
                      ) : null}
                    </div>
                  </figure>
                )}
              </div>
            ) : (
              <MediaPlaceholder
                label="Architecture diagram"
                hint="Add `architecture.imageSrc` or a `caption` in case study data."
                aspect="16/10"
              />
            )}

            {highlights && highlights.length > 0 ? (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-faint-foreground">
                  Engineering highlights
                </p>
                <ul className={cn(afterCardLabel, "grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5")}>
                  {highlights.map((h) => (
                    <li
                      key={h.title}
                      className={highlightTile}
                    >
                      <p className="text-sm font-semibold tracking-tight text-foreground">
                        {h.title}
                      </p>
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                        {h.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        {/* Screenshots — real assets merge into fixed slots; remainder stay placeholders */}
        <section
          className={caseStudySectionTop}
          aria-labelledby={`${slug}-shots-h`}
        >
          <h4 id={`${slug}-shots-h`} className={labelOverline}>
            Screenshots
          </h4>
          <ul
            className={cn(
              afterCardLabel,
              "grid list-none gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6",
            )}
          >
            {Array.from({ length: SCREENSHOT_SLOTS }, (_, i) => {
              const s = shots[i];
              if (s) {
                return (
                  <li key={s.src}>
                    <figure className={mediaFrame}>
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={s.src}
                          alt={s.alt}
                          fill
                          className="object-cover object-top"
                          sizes="(min-width:1024px) 320px, (min-width:640px) 45vw, 100vw"
                          unoptimized={s.src.startsWith("/api/")}
                        />
                      </div>
                      {s.caption ? (
                        <figcaption className="border-t border-border-muted px-3 py-2.5 text-pretty text-[12px] leading-relaxed text-muted-foreground">
                          {s.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  </li>
                );
              }
              return (
                <li key={`${slug}-shot-slot-${i}`}>
                  <MediaPlaceholder
                    label={`Frame ${String(i + 1).padStart(2, "0")}`}
                    hint="Wire `screenshots` in caseStudies.ts when captures are ready."
                    aspect="16/10"
                  />
                </li>
              );
            })}
          </ul>
        </section>

        {/* Future improvements */}
        <section
          className={caseStudySectionTop}
          aria-labelledby={`${slug}-future-h`}
        >
          <h4 id={`${slug}-future-h`} className={labelOverline}>
            Future improvements
          </h4>
          <div className={cn(afterCardLabel, "max-w-3xl")}>
            <BulletList items={futureImprovements} />
          </div>
        </section>

        <footer
          className={cn(
            caseStudySectionTop,
            "flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-3",
          )}
        >
          <a
            href={githubUrl}
            className={buttonCompact}
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          {liveDemoUrl ? (
            <a
              href={liveDemoUrl}
              className={buttonCaseStudyOutline}
              rel="noopener noreferrer"
              target="_blank"
            >
              {liveDemoLabel ?? "Live demo"}
            </a>
          ) : null}
        </footer>
      </div>
    </article>
  );
}
