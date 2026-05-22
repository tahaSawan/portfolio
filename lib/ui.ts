import { cn } from "./cn";

/** Focus — teal outline, no ring glow */
export const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * Section titles (About, Skills, …) — crisp hierarchy above body copy.
 */
export const sectionHeading = cn(
  "text-pretty text-left text-lg font-semibold leading-snug tracking-[-0.022em] text-foreground",
  "sm:text-xl sm:leading-[1.22]",
  "md:text-2xl md:leading-tight md:tracking-[-0.024em]",
);

/** In-section group titles (e.g. skill columns) — one step below section heading. */
export const subsectionTitle = cn(
  "text-[13px] font-semibold leading-snug tracking-[-0.02em] text-foreground-secondary",
  "sm:text-[15px] sm:leading-tight sm:text-foreground",
);

/** Space from section title to first content block */
export const afterSectionHeading = "mt-7 sm:mt-9 md:mt-10";

/** Space from in-card label (case studies, dense stacks) to body */
export const afterCardLabel = "mt-4 sm:mt-5";

/** Top rule + padding between major blocks inside a case-study card */
export const caseStudySectionTop = cn(
  "border-t border-border-muted/75 pt-9 sm:pt-10 md:pt-11",
);

/** Overline labels (contact fields, form labels) */
export const labelOverline =
  "text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.11em]";

/** Accent overlines (education blocks) — same rhythm as labelOverline */
export const labelOverlineAccent = cn(
  labelOverline,
  "text-accent/80",
);

/** Primary body copy — paragraphs, card descriptions */
export const proseBody = cn(
  "max-w-[60ch] text-pretty text-[14px] font-normal leading-[1.74] text-muted-foreground",
  "sm:text-[15px] sm:leading-[1.76]",
  "md:text-base md:leading-[1.78]",
);

/** Lead / first paragraph — one step lighter than body */
export const proseLead = cn(
  "max-w-[60ch] text-pretty text-[14px] font-normal leading-[1.74] text-muted-foreground",
  "sm:text-[15px] sm:leading-[1.76]",
  "md:text-base md:leading-[1.78]",
);

/** Subtle color / surface transition for links, chips, underlines */
export const transitionLink =
  "transition-[color,background-color,border-color,text-decoration-color] duration-200 ease-out";

/** Skill / stack chips — shared surface */
export const chipMatte = cn(
  "inline-flex min-h-9 touch-manipulation items-center rounded-md border border-accent/24 bg-surface-input px-2.5 py-1.5 text-[12px] font-medium leading-tight tracking-wide text-muted-foreground sm:min-h-0",
  transitionLink,
  "hover:border-accent/40 hover:bg-accent/[0.08] hover:text-foreground-secondary",
);

/** Form fields — border and surface only */
export const transitionField =
  "transition-[border-color,background-color] duration-200 ease-out";

/** Cards / panels — border, bg, optional tiny lift (pair with motion-safe:hover:-translate-y-0.5) */
export const cardSurfaceTransition =
  "transition-[transform,background-color,border-color] duration-200 ease-out";

/** Shell behind sticky nav — background, blur, border */
export const navShellTransition =
  "transition-[background-color,backdrop-filter,border-color] duration-300 ease-out motion-reduce:duration-150 motion-reduce:transition-[border-color]";

/** Buttons & compact controls — surface, border, label */
export const btnTransition =
  "transition-[background-color,border-color,color,opacity] duration-200 ease-out";

const btnMatteCore = cn(
  "inline-flex touch-manipulation items-center rounded-md border font-semibold shadow-none",
  "border-accent/28 bg-matte text-[13px] tracking-[-0.01em] text-foreground",
  btnTransition,
  "hover:border-accent/50 hover:bg-matte-hover hover:text-foreground",
  "active:bg-accent/[0.08] active:opacity-[0.96]",
  focusRing,
);

/** Hero CTAs — centered, full width on small screens */
export const buttonHero = cn(
  btnMatteCore,
  "min-h-12 w-full justify-center px-6 sm:h-11 sm:min-h-11 sm:w-auto sm:min-w-[10.5rem]",
);

/** Primary hero CTA — slightly richer surface */
export const buttonHeroPrimary = cn(
  "inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-md border font-semibold shadow-none",
  "border-accent/38 bg-matte-raised text-[13px] tracking-[-0.01em] text-foreground",
  btnTransition,
  "hover:border-accent/55 hover:bg-accent/[0.14] hover:text-foreground",
  "active:bg-accent/[0.09] active:opacity-[0.96]",
  focusRing,
  "sm:h-11 sm:min-h-11 sm:w-auto sm:min-w-[10.5rem]",
);

/** Resume download — dark surface, strong teal frame, icon-friendly row */
export const buttonHeroResume = cn(
  "group inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-md border px-5 font-semibold shadow-none",
  "border-accent/46 bg-matte-deep text-[13px] tracking-[-0.01em] text-foreground-secondary",
  "transition-[transform,background-color,border-color,color,opacity] duration-200 ease-out motion-reduce:transition-[background-color,border-color,color,opacity]",
  "hover:border-accent/60 hover:bg-matte-hover hover:text-foreground",
  "motion-safe:hover:-translate-y-px motion-reduce:hover:translate-y-0",
  "active:bg-matte-pressed active:opacity-[0.96]",
  focusRing,
  "sm:h-11 sm:min-h-11 sm:w-auto sm:min-w-[11.5rem]",
);

/** Secondary outline — live demo / external links in case studies */
export const buttonCaseStudyOutline = cn(
  "inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-md border px-5 text-[13px] font-semibold tracking-[-0.01em] text-foreground-secondary shadow-none sm:h-10 sm:min-h-10 sm:w-auto",
  "border-accent/26 bg-transparent",
  btnTransition,
  "hover:border-accent/50 hover:bg-accent/[0.08] hover:text-foreground",
  "active:bg-accent/[0.06] active:opacity-[0.96]",
  focusRing,
);

/** Compact actions (e.g. GitHub on project cards) */
export const buttonCompact = cn(
  btnMatteCore,
  "min-h-12 w-full justify-center px-5 sm:h-10 sm:min-h-10 sm:w-auto",
);

/** Contact channel rows — left-aligned content */
export const buttonContactRow = cn(
  "inline-flex min-h-12 w-full touch-manipulation items-center rounded-md border font-medium shadow-none",
  "justify-start border-accent/28 bg-matte px-4 py-3 text-left text-[13px] leading-snug tracking-[-0.01em] text-foreground-secondary sm:min-h-10 sm:py-2.5",
  btnTransition,
  "hover:border-accent/50 hover:bg-matte-hover hover:text-foreground",
  "active:bg-accent/[0.08] active:opacity-[0.96]",
  focusRing,
);

/** Form submit */
export const buttonSubmit = cn(
  btnMatteCore,
  "min-h-12 w-full justify-center px-6 sm:h-10 sm:min-h-10 sm:w-auto",
);
