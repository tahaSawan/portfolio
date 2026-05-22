"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * One short opacity fade-in after mount so the first paint feels intentional,
 * without spinners or staged hero animations.
 */
export function AppContentFade({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={cn(
        "motion-safe:transition-opacity motion-safe:duration-[280ms] motion-safe:ease-out",
        visible ? "opacity-100" : "opacity-0",
        "motion-reduce:opacity-100 motion-reduce:transition-none",
      )}
    >
      {children}
    </div>
  );
}
