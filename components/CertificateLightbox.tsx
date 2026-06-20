"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Certification } from "@/lib/certifications";
import { certificateImageUrl } from "@/lib/certifications";
import { cn } from "@/lib/cn";
import { btnTransition, focusRing } from "@/lib/ui";

type CertificateLightboxProps = {
  cert: Certification;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
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
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const iconBtn = cn(
  "inline-flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center rounded-md",
  "border border-border-muted/80 text-muted-foreground",
  btnTransition,
  "hover:border-accent/35 hover:text-accent-hover",
  focusRing,
);

export function CertificateLightbox({
  cert,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: CertificateLightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const imageSrc = certificateImageUrl(cert.imageFile);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      html.style.overflow = prev;
    };
  }, [cert.id]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] grid place-items-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default border-0 bg-black/55 p-0 backdrop-blur-[2px] motion-reduce:backdrop-blur-none"
        aria-label="Close certificate preview"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative z-10 w-[min(88vw,22rem)] sm:w-[min(82vw,25rem)] md:w-[min(72vw,27rem)]",
          "max-h-[min(85dvh,36rem)] overflow-hidden rounded-xl border border-border-muted/80 bg-card",
          "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
          "motion-safe:animate-[cert-lightbox-in_220ms_ease-out]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-2 border-b border-border-muted/75 px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent/80">
              {cert.issuer}
            </p>
            <h3
              id={titleId}
              className="mt-0.5 line-clamp-2 text-pretty text-[13px] font-semibold leading-snug text-foreground sm:text-sm"
            >
              {cert.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={iconBtn}
            aria-label="Close certificate preview"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="relative aspect-[3/2] w-full bg-surface-input">
          <Image
            key={cert.id}
            src={imageSrc}
            alt={`${cert.title} certificate from ${cert.issuer}`}
            fill
            draggable={false}
            className="pointer-events-none object-contain p-2.5 sm:p-3"
            sizes="(min-width: 768px) 432px, (min-width: 640px) 400px, 352px"
            unoptimized
            priority
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-muted/75 px-3 py-2.5 sm:px-4 sm:py-3">
          <p className="text-[11px] text-muted-foreground sm:text-xs">
            {cert.date}
            {total > 1 ? (
              <span className="text-muted-foreground/70">
                {" "}
                · {index + 1}/{total}
              </span>
            ) : null}
          </p>

          {total > 1 ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onPrev}
                className={iconBtn}
                aria-label="Previous certificate"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={onNext}
                className={iconBtn}
                aria-label="Next certificate"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
