import { site } from "@/lib/site";
import { CertificateGallery } from "@/components/CertificateGallery";
import { cn } from "@/lib/cn";
import {
  afterSectionHeading,
  cardSurfaceTransition,
  labelOverlineAccent,
  proseBody,
  sectionHeading,
} from "@/lib/ui";

const card = cn(
  "rounded-lg border border-border-muted/85 bg-surface-raised p-5 sm:p-7 md:p-8 lg:p-9",
  cardSurfaceTransition,
  "hover:border-accent/32 hover:bg-card motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
);

const timelineList =
  "mt-5 space-y-4 border-l border-accent/14 pl-5 sm:mt-6 sm:pl-6";

const timelineItem = cn(
  "text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-[1.68]",
);

export function Education() {
  return (
    <div className="text-left">
      <h2 className={sectionHeading}>{site.educationTitle}</h2>
      <div className={cn(afterSectionHeading, "space-y-6 sm:space-y-7 md:space-y-8")}>
        <article className={card}>
          <h3 className={labelOverlineAccent}>Education</h3>
          <p className="mt-5 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
            {site.educationSchool}
          </p>
          <p className={cn("mt-3.5", proseBody)}>
            {site.educationDegree}
          </p>
        </article>

        <article className={card}>
          <h3 className={labelOverlineAccent}>{site.certificationsHeading}</h3>
          <CertificateGallery />
        </article>

        <article className={card}>
          <h3 className={labelOverlineAccent}>{site.achievementsHeading}</h3>
          <ul className={timelineList}>
            {site.achievements.map((item) => (
              <li key={item} className={timelineItem}>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
