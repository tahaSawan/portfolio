"use client";

import Image from "next/image";
import type { Certification } from "@/lib/certifications";
import { certificateImageUrl } from "@/lib/certifications";
import { cn } from "@/lib/cn";
import { btnTransition, cardSurfaceTransition, focusRing, labelOverline } from "@/lib/ui";

type CertificateCardProps = {
  cert: Certification;
  onImageClick: () => void;
};

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden
    >
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CertificateCard({ cert, onImageClick }: CertificateCardProps) {
  const imageSrc = certificateImageUrl(cert.imageFile);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border-muted/85 bg-surface-raised",
        cardSurfaceTransition,
        "hover:border-accent/32 hover:bg-card motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
      )}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onImageClick();
        }}
        className={cn(
          "relative block aspect-[4/3] w-full overflow-hidden border-b border-border-muted/80 bg-surface-input",
          "cursor-zoom-in touch-manipulation outline-none",
          focusRing,
        )}
        aria-label={`View ${cert.title} certificate`}
      >
        <Image
          src={imageSrc}
          alt={`${cert.title} certificate from ${cert.issuer}`}
          fill
          draggable={false}
          className="pointer-events-none object-contain p-2 transition duration-300 ease-out group-hover:scale-[1.01] motion-reduce:group-hover:scale-100"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
          unoptimized
        />
        <span
          className={cn(
            "absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md border border-border-muted/70",
            "bg-surface-raised/90 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-sm",
            btnTransition,
            "group-hover:border-accent/30 group-hover:text-foreground-secondary sm:text-[11px]",
          )}
        >
          <ExpandIcon />
          <span className="hidden sm:inline">View</span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className={labelOverline}>{cert.issuer}</p>
        <h4 className="mt-2 text-pretty text-sm font-semibold leading-snug tracking-tight text-foreground sm:text-[15px]">
          {cert.title}
        </h4>
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{cert.date}</p>
        {cert.verifyUrl ? (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-auto inline-flex min-h-11 touch-manipulation items-center pt-3 text-xs font-medium text-accent hover:underline sm:text-sm"
          >
            Verify credential
          </a>
        ) : null}
      </div>
    </article>
  );
}
