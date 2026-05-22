import { cn } from "./cn";

/** Max width + horizontal padding — shared by `Container` and full-bleed `Navbar` inner rows. */
export const containerInnerClassName = cn(
  "mx-auto w-full max-w-[1120px]",
  "pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]",
  "sm:pl-[max(2rem,env(safe-area-inset-left))] sm:pr-[max(2rem,env(safe-area-inset-right))]",
  "lg:pl-[max(3rem,env(safe-area-inset-left))] lg:pr-[max(3rem,env(safe-area-inset-right))]",
);
