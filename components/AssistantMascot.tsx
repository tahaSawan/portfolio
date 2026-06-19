import { cn } from "@/lib/cn";

type MascotProps = {
  className?: string;
  /** Pulsing glow ring around the bulb (FAB state). */
  glow?: boolean;
  /** Gentle hover/float animation. */
  animate?: boolean;
};

/** Glowing lightbulb with a friendly face — matches portfolio teal accent. */
export function LightbulbMascot({
  className,
  glow = false,
  animate = false,
}: MascotProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center",
        animate && "assistant-mascot-float",
        className,
      )}
      aria-hidden
    >
      {glow ? (
        <span className="assistant-fab-ring pointer-events-none absolute inset-[-6px] rounded-full" />
      ) : null}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="relative h-full w-full"
        aria-hidden
      >
        <path
          d="M24 6c-6.2 0-11 4.9-11 11.2 0 3.8 1.8 6.4 3.6 8.6.9 1.1 1.8 2.1 2.4 3.5.6 1.3.9 2.8.9 4.2h8.2c0-1.4.3-2.9.9-4.2.6-1.4 1.5-2.4 2.4-3.5 1.8-2.2 3.6-4.8 3.6-8.6C35 10.9 30.2 6 24 6Z"
          stroke="currentColor"
          strokeWidth="1.75"
          className="text-accent"
        />
        <path
          d="M18.5 34.5h11M20 38.5h8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="text-accent/85"
        />
        <circle cx="19.5" cy="19" r="1.35" fill="currentColor" className="text-accent" />
        <circle cx="28.5" cy="19" r="1.35" fill="currentColor" className="text-accent" />
        <path
          d="M19 24.5c1.2 1.6 2.6 2.4 5 2.4s3.8-.8 5-2.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-accent"
        />
      </svg>
    </span>
  );
}

/** Compact buddy bot for the chat panel — glass-friendly, teal palette. */
export function BuddyMascot({
  className,
  thinking = false,
}: {
  className?: string;
  thinking?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0",
        thinking ? "assistant-buddy-think" : "assistant-mascot-float",
        className,
      )}
      aria-hidden
    >
      <span className="assistant-buddy-glow pointer-events-none absolute -inset-2 rounded-full" />
      <svg viewBox="0 0 64 72" fill="none" className="relative h-full w-full">
        <ellipse cx="32" cy="66" rx="14" ry="3" fill="currentColor" className="text-accent/25" />
        <rect x="22" y="38" width="20" height="22" rx="10" fill="currentColor" className="text-accent/90" />
        <rect x="26" y="44" width="12" height="7" rx="2" fill="currentColor" className="text-page" />
        <rect x="28" y="46" width="8" height="2" rx="1" fill="currentColor" className="text-accent" />
        <path
          d="M14 42c0-10 8-18 18-18s18 8 18 18"
          stroke="currentColor"
          strokeWidth="2"
          className="text-foreground-secondary"
          fill="currentColor"
          fillOpacity="0.08"
        />
        <circle cx="26" cy="30" r="3.25" fill="currentColor" className="text-page" />
        <circle cx="38" cy="30" r="3.25" fill="currentColor" className="text-page" />
        <circle cx="26" cy="30" r="1.5" fill="currentColor" className="text-accent" />
        <circle cx="38" cy="30" r="1.5" fill="currentColor" className="text-accent" />
        <path
          d="M28 36.5c1.2 1 2.2 1.5 4 1.5s2.8-.5 4-1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-accent"
        />
        <line
          x1="32"
          y1="14"
          x2="32"
          y2="8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-foreground-secondary"
        />
        <circle cx="32" cy="6" r="3" fill="currentColor" className="text-accent" />
        <circle cx="18" cy="44" r="4" fill="currentColor" className="text-accent/80" />
        <circle cx="46" cy="44" r="4" fill="currentColor" className="text-accent/80" />
      </svg>
    </span>
  );
}

type PeekBubbleProps = {
  text: string;
  className?: string;
};

/** Glass speech bubble shown beside the FAB when idle (desktop). */
export function PeekSpeechBubble({ text, className }: PeekBubbleProps) {
  return (
    <div
      className={cn(
        "assistant-glass pointer-events-none absolute right-[calc(100%+0.85rem)] top-1/2 hidden w-[min(16rem,42vw)] -translate-y-1/2 rounded-2xl px-4 py-3 text-left md:block",
        className,
      )}
    >
      <p className="text-pretty text-[13px] font-medium leading-snug text-foreground-secondary">
        {text}
      </p>
      <span
        className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-accent/20 bg-[color-mix(in_srgb,var(--color-page)_72%,transparent)]"
        aria-hidden
      />
    </div>
  );
}
