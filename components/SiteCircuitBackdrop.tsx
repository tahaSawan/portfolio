import type { ReactNode } from "react";
import { CircuitGlowLines } from "@/components/CircuitGlowLines";

type SiteCircuitBackdropProps = {
  children: ReactNode;
};

/** Full-page orthogonal circuit glow behind all main content. */
export function SiteCircuitBackdrop({ children }: SiteCircuitBackdropProps) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
        aria-hidden
      >
        <CircuitGlowLines
          instanceId="site"
          pathSet="page"
          variant="page"
          className="h-full w-full"
          showScan={false}
          showVignette={false}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
