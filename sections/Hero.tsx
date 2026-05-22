import { Fragment } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import {
  buttonHero,
  buttonHeroPrimary,
  buttonHeroResume,
  proseBody,
} from "@/lib/ui";
import { DownloadTrayIcon } from "@/components/SocialIcons";
import { CircuitGlowLines } from "@/components/CircuitGlowLines";

export function Hero() {
  const headlineParts = site.title.split(" • ");

  return (
    <header
      className={cn(
        "relative flex min-h-[calc(100svh-4.25rem)] flex-col items-center overflow-hidden border-b border-border-muted/85",
        "md:min-h-[calc(100svh-4.75rem)]",
      )}
    >
      {/* Soft grid — no glow, low contrast */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(45,212,191,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.05)_1px,transparent_1px)] bg-[length:52px_52px] opacity-50"
        aria-hidden
      />
      <CircuitGlowLines
        instanceId="hero"
        pathSet="hero"
        variant="hero"
        className="z-[1]"
        showScan
        showVignette
      />
      {/* Minimal blur accents — matte teal wash only */}
      <div
        className="pointer-events-none absolute -right-[20%] top-[8%] z-0 h-[min(42vw,22rem)] w-[min(42vw,22rem)] rounded-full bg-accent/[0.045] blur-[72px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[18%] bottom-[-10%] z-0 h-[min(38vw,18rem)] w-[min(38vw,18rem)] rounded-full bg-accent/[0.035] blur-[64px]"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 flex w-full flex-1 flex-col items-center justify-center px-4 py-14 sm:px-6",
          "sm:py-16 md:py-20",
        )}
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h1
            className={cn(
              "w-full text-balance text-pretty text-center text-3xl font-semibold leading-[1.1] tracking-[-0.032em] text-foreground",
              "sm:text-4xl sm:leading-[1.08] sm:tracking-[-0.035em]",
              "md:text-5xl md:leading-[1.06]",
              "lg:text-[3.15rem] lg:leading-[1.04]",
            )}
          >
            {site.name}
          </h1>

          <p
            className={cn(
              "mx-auto mt-5 w-full max-w-2xl text-balance text-pretty text-center text-[0.9375rem] font-medium leading-snug tracking-[-0.018em] text-muted-foreground sm:mt-6",
              "sm:text-lg sm:leading-[1.45] md:mt-7 md:max-w-[46rem] md:text-xl md:leading-[1.42]",
            )}
          >
            {headlineParts.map((segment, idx) => (
              <Fragment key={segment}>
                {idx > 0 ? (
                  <span className="text-accent/75" aria-hidden>
                    {" "}
                    ·{" "}
                  </span>
                ) : null}
                {segment}
              </Fragment>
            ))}
          </p>

          <p
            className={cn(
              "mx-auto mt-5 w-full text-pretty text-center sm:mt-6 md:mt-7",
              proseBody,
              "max-w-[54ch]",
            )}
          >
            {site.heroDescription}
          </p>

          <div
            className={cn(
              "mt-9 flex w-full max-w-md flex-col items-stretch justify-center gap-2.5 sm:mt-11 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-2.5 md:mt-12",
            )}
          >
            <Link href="/projects" className={buttonHeroPrimary}>
              View Projects
            </Link>
            <a
              href={site.resumeUrl}
              download={site.resumeDownloadFileName}
              className={buttonHeroResume}
              aria-label="Download resume as PDF"
            >
              <DownloadTrayIcon className="h-[1.05rem] w-[1.05rem] shrink-0 text-accent/85 transition-colors duration-200 ease-out group-hover:text-accent-hover" />
              Download Resume
            </a>
            <Link href="/#contact" className={buttonHero}>
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
