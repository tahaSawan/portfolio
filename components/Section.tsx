import type { ReactNode } from "react";
import { CircuitGlowLines } from "@/components/CircuitGlowLines";
import type { CircuitPathSetKey } from "@/lib/circuitGlowPaths";
import { cn } from "@/lib/cn";
import { SectionReveal } from "@/components/SectionReveal";

export type SectionTone = "default" | "muted";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Slight teal-black wash, full viewport width behind content */
  tone?: SectionTone;
  /** Thin top separator — use false for hero and first content block */
  divider?: boolean;
  /** Subtle fade/slide when section nears viewport */
  reveal?: boolean;
  /** Orthogonal circuit glow in this section (off for hero — it has its own) */
  circuitGlow?: boolean;
};

function sectionCircuitPathSet(id?: string): CircuitPathSetKey {
  if (!id) return "section-a";
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash + id.charCodeAt(i)) % 2;
  }
  return hash === 0 ? "section-a" : "section-b";
}

export function Section({
  children,
  id,
  className,
  tone = "default",
  divider = false,
  reveal = false,
  circuitGlow = true,
}: SectionProps) {
  const glowId = id ?? "section";

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 sm:scroll-mt-28",
        "py-14 sm:py-20 lg:py-[6.75rem]",
        divider && "border-t border-border-muted/85",
        className,
      )}
    >
      {tone === "muted" ? (
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen max-w-none -translate-x-1/2 bg-section-muted"
          aria-hidden
        />
      ) : null}
      {circuitGlow ? (
        <CircuitGlowLines
          instanceId={glowId}
          pathSet={sectionCircuitPathSet(id)}
          variant="section"
          showScan={false}
          showVignette={false}
        />
      ) : null}
      <div className="relative z-10">
        {reveal ? <SectionReveal>{children}</SectionReveal> : children}
      </div>
    </section>
  );
}
