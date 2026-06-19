import Image from "next/image";
import { site } from "@/lib/site";
import { profilePhotoPublicUrl } from "@/lib/profilePhoto.server";
import { cn } from "@/lib/cn";
import {
  afterSectionHeading,
  proseBody,
  proseLead,
  sectionHeading,
  cardSurfaceTransition,
} from "@/lib/ui";

const photoFrame = cn(
  "overflow-hidden rounded-lg border border-border-muted bg-surface-input",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]",
  cardSurfaceTransition,
);

export async function About() {
  const photoSrc = profilePhotoPublicUrl();

  return (
    <div className="text-left">
      <h2 className={sectionHeading}>{site.aboutTitle}</h2>
      <div
        className={cn(
          afterSectionHeading,
          "grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,17.5rem)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,19rem)] xl:gap-14",
        )}
      >
        {photoSrc ? (
          <figure
            className={cn(
              "order-first mx-auto w-full max-w-[14rem] shrink-0 sm:max-w-[17.5rem] lg:order-none lg:mx-0 lg:max-w-none",
              "lg:justify-self-end",
            )}
          >
            <div className={cn(photoFrame, "relative aspect-[3/4] w-full")}>
              <Image
                src={photoSrc}
                alt={`Portrait of ${site.name}`}
                fill
                className="object-cover object-[center_15%]"
                sizes="(min-width: 1024px) 304px, (min-width: 640px) 280px, 100vw"
                priority
                unoptimized
              />
            </div>
          </figure>
        ) : null}

        <div className="min-w-0 space-y-5 sm:space-y-7 md:space-y-8">
          {site.aboutParagraphs.map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? proseLead : proseBody}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
