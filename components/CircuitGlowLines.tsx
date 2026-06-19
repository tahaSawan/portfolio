import { cn } from "@/lib/cn";
import {
  CIRCUIT_VIEWBOX,
  getCircuitPaths,
  type CircuitPathDef,
  type CircuitPathSetKey,
} from "@/lib/circuitGlowPaths";

export type CircuitGlowVariant = "hero" | "section" | "page";

type CircuitGlowLinesProps = {
  /** Unique id for SVG defs (e.g. `hero`, `page`, `about`) */
  instanceId: string;
  pathSet: CircuitPathSetKey;
  variant?: CircuitGlowVariant;
  className?: string;
  showScan?: boolean;
  showVignette?: boolean;
};

const VARIANT_STYLES: Record<
  CircuitGlowVariant,
  { opacity: string; strokeMain: number; strokeSharp: number }
> = {
  hero: { opacity: "opacity-85 sm:opacity-95", strokeMain: 1.15, strokeSharp: 0.55 },
  section: { opacity: "opacity-45 sm:opacity-55", strokeMain: 0.85, strokeSharp: 0.4 },
  page: { opacity: "opacity-35 sm:opacity-45", strokeMain: 0.75, strokeSharp: 0.35 },
};

function pathClassName(def: CircuitPathDef): string {
  return cn(
    "circuit-glow__path",
    def.delayClass,
    def.reverse && "circuit-glow__path--reverse",
    def.slow && "circuit-glow__path--slow",
  );
}

export function CircuitGlowLines({
  instanceId,
  pathSet,
  variant = "section",
  className,
  showScan,
  showVignette,
}: CircuitGlowLinesProps) {
  const paths = getCircuitPaths(pathSet);
  const viewBox =
    pathSet === "hero"
      ? CIRCUIT_VIEWBOX.hero
      : pathSet === "page"
        ? CIRCUIT_VIEWBOX.page
        : CIRCUIT_VIEWBOX.section;

  const styles = VARIANT_STYLES[variant];
  const gradId = `circuit-glow-stroke-${instanceId}`;
  const blurId = `circuit-glow-blur-${instanceId}`;
  const nodeId = `circuit-glow-node-${instanceId}`;

  const scan = showScan ?? variant === "hero";
  const vignette = showVignette ?? variant === "hero";

  const allNodes = paths.flatMap((p) => p.nodes ?? []);

  return (
    <div
      className={cn(
        "circuit-glow pointer-events-none absolute inset-0 overflow-hidden",
        variant === "hero" && "circuit-glow--hero",
        styles.opacity,
        className,
      )}
      aria-hidden
    >
      <svg
        className="circuit-glow__svg absolute inset-0 h-full w-full"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="35%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="50%" stopColor="var(--accent-hover)" stopOpacity="0.95" />
            <stop offset="65%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <filter
            id={blurId}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={nodeId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-hover)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g filter={`url(#${blurId})`} className="circuit-glow__lines">
          {paths.map((def) => (
            <path
              key={def.d}
              d={def.d}
              stroke={`url(#${gradId})`}
              strokeWidth={styles.strokeMain}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={pathClassName(def)}
            />
          ))}
        </g>

        <g className="circuit-glow__lines-sharp opacity-50">
          {paths.slice(0, Math.ceil(paths.length / 2)).map((def) => (
            <path
              key={`sharp-${def.d}`}
              d={def.d}
              stroke={`url(#${gradId})`}
              strokeWidth={styles.strokeSharp}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={pathClassName(def)}
            />
          ))}
        </g>

        {allNodes.length > 0 ? (
          <g className="circuit-glow__nodes">
            {allNodes.map(([cx, cy], i) => (
              <circle
                key={`${cx}-${cy}-${i}`}
                cx={cx}
                cy={cy}
                r={variant === "hero" ? 3 : 2.5}
                fill={`url(#${nodeId})`}
                className={cn(
                  "circuit-glow__node",
                  `circuit-glow__node--${(i % 3) + 1}`,
                )}
              />
            ))}
          </g>
        ) : null}

        {scan ? (
          <rect
            x="0"
            y="0"
            width="1440"
            height="2"
            fill={`url(#${gradId})`}
            className="circuit-glow__scan"
            opacity="0.45"
          />
        ) : null}
      </svg>

      {vignette ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_0%,var(--page-bg)_72%)]"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
