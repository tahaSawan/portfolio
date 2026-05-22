"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

/** Calm deceleration — no bounce, reads “engineered” not “marketing”. */
const REVEAL_EASE = "cubic-bezier(0.28, 0.12, 0.18, 1)";

/**
 * Subtle enter when section nears viewport: opacity + small upward translate.
 * One-shot observer (disconnects after reveal); respects reduced motion.
 */
export function SectionReveal({ children, className }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const alreadyInView = rect.top < vh * 0.94 && rect.bottom > vh * 0.06;
    if (alreadyInView) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) {
          setVisible(true);
          io.disconnect();
        }
      },
      {
        threshold: [0, 0.08, 0.15],
        rootMargin: "0px 0px 12% 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-[420ms]",
        "motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0 pointer-events-none motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:pointer-events-auto",
        className,
      )}
      style={{ transitionTimingFunction: REVEAL_EASE }}
    >
      {children}
    </div>
  );
}
