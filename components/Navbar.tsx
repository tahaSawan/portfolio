"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { containerInnerClassName } from "@/lib/containerLayout";
import { cn } from "@/lib/cn";
import { btnTransition, focusRing, navShellTransition } from "@/lib/ui";
import {
  GitHubIcon,
  LinkedInIcon,
  BrandBoltIcon,
} from "@/components/SocialIcons";
import { ThemeToggle } from "@/components/ThemeToggle";

/** Section ids for scroll-spy (order matches `site.nav` hash targets). */
const NAV_SECTION_IDS = site.nav
  .map((item) => {
    const i = item.href.indexOf("#");
    return i === -1 ? null : item.href.slice(i + 1);
  })
  .filter((id): id is string => Boolean(id));

function sectionIdFromHref(href: string): string | null {
  const i = href.indexOf("#");
  return i === -1 ? null : href.slice(i + 1);
}

function computeActiveSection(headerEl: HTMLElement | null): string | null {
  if (typeof window === "undefined") return null;
  const band =
    (headerEl?.getBoundingClientRect().height ?? 64) + window.scrollY + 6;
  let current: string | null = null;
  for (const id of NAV_SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (band >= top) current = id;
  }
  return current;
}

const brandClass = cn(
  "group flex shrink-0 items-center gap-2.5 rounded-lg py-1",
  btnTransition,
  "hover:opacity-95",
  focusRing,
);

const desktopNavLinkBase = cn(
  "rounded-md px-2.5 py-2 text-[13px] font-medium tracking-[-0.01em] text-muted-foreground",
  "transition-[color,opacity] duration-200 ease-out",
  "hover:text-accent-hover",
  focusRing,
);

const desktopNavLinkActive = cn("text-accent");

const iconLink = cn(
  "inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-border-muted/70 text-muted-foreground",
  btnTransition,
  "hover:border-accent/35 hover:text-accent-hover",
  focusRing,
);

const mobileNavItemBase = cn(
  "flex min-h-11 w-full items-center rounded-md px-3 text-[13px] font-medium tracking-[-0.01em] text-foreground-secondary sm:text-[14px]",
  btnTransition,
  "hover:bg-accent/[0.08] hover:text-accent-hover active:bg-accent/[0.06]",
  focusRing,
);

const mobileNavItemActive = cn("text-accent bg-accent/[0.08]");

const ctaClass = cn(
  "hidden rounded-full bg-accent px-5 py-2 text-[13px] font-semibold tracking-tight text-on-accent md:inline-flex md:items-center md:justify-center",
  btnTransition,
  "hover:opacity-90",
  focusRing,
);

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span
      className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]"
      aria-hidden
    >
      <span
        className={cn(
          "h-0.5 w-5 origin-center rounded-full bg-muted-foreground transition duration-200 ease-out",
          open && "translate-y-[7px] rotate-45 bg-foreground-secondary",
        )}
      />
      <span
        className={cn(
          "h-0.5 w-5 rounded-full bg-muted-foreground transition duration-200 ease-out",
          open && "scale-x-0 opacity-0",
        )}
      />
      <span
        className={cn(
          "h-0.5 w-5 origin-center rounded-full bg-muted-foreground transition duration-200 ease-out",
          open && "-translate-y-[7px] -rotate-45 bg-foreground-secondary",
        )}
      />
    </span>
  );
}

export function Navbar() {
  const { linkedIn, github } = site.contact;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const scrollRaf = useRef<number>(0);

  const isHome = pathname === "/";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const flush = () => {
      scrollRaf.current = 0;
      setScrolled(window.scrollY > 10);
      if (pathname === "/") {
        setActiveSection(computeActiveSection(headerRef.current));
      } else {
        setActiveSection(null);
      }
    };

    const onScroll = () => {
      if (scrollRaf.current) return;
      scrollRaf.current = window.requestAnimationFrame(flush);
    };

    flush();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <Fragment>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 w-full overflow-hidden border-b",
          "pt-[env(safe-area-inset-top)]",
          navShellTransition,
          scrolled
            ? "border-border-muted bg-page/95 max-md:backdrop-blur-sm md:bg-page/92 md:backdrop-blur-lg supports-[backdrop-filter]:max-md:bg-page/94 supports-[backdrop-filter]:md:bg-page/86"
            : "border-border-muted/80 bg-page/90 max-md:backdrop-blur-none md:bg-page/84 md:backdrop-blur-md supports-[backdrop-filter]:max-md:bg-page/92 supports-[backdrop-filter]:md:bg-page/76",
        )}
      >
        {/* Subtle teal arc / wash — reference-style depth */}
        <div
          className="pointer-events-none absolute -right-16 top-0 h-44 w-[22rem] opacity-[0.16] sm:w-[28rem]"
          aria-hidden
        >
          <div
            className="h-full w-full bg-[radial-gradient(ellipse_90%_120%_at_100%_0%,rgba(45,212,191,0.45),transparent_58%)]"
            aria-hidden
          />
        </div>
        <div
          className="pointer-events-none absolute -right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-accent/[0.07] sm:h-40 sm:w-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-2 top-1/2 h-[7.5rem] w-[7.5rem] -translate-y-1/2 rounded-full border border-accent/[0.05] sm:h-[9.5rem] sm:w-[9.5rem]"
          aria-hidden
        />

        <div
          className={cn(
            containerInnerClassName,
            "relative flex min-h-[3.25rem] items-center gap-3 py-2 sm:gap-4 md:min-h-[3.5rem] md:py-2.5",
          )}
        >
          <Link href="/" className={brandClass}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent sm:h-9 sm:w-9">
              <BrandBoltIcon className="h-[15px] w-[15px] text-on-accent" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground sm:text-[15px]">
              {site.navBrand}
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center md:flex">
            <nav aria-label="Primary">
              <ul className="flex flex-wrap items-center justify-center gap-x-0.5 lg:gap-x-1">
                {site.nav.map((item) => {
                  const sid = sectionIdFromHref(item.href);
                  const projectsActive =
                    item.href === "/projects" &&
                    (pathname === "/projects" ||
                      pathname.startsWith("/projects/"));
                  const active = Boolean(
                    projectsActive ||
                      (isHome && sid && activeSection === sid),
                  );
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          desktopNavLinkBase,
                          active && desktopNavLinkActive,
                        )}
                        aria-current={active ? "true" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5">
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/#contact" className={ctaClass}>
                Get in Touch
              </Link>
              <ThemeToggle />
              <div
                className="flex items-center gap-1.5 border-l border-border-muted/80 pl-2.5"
                aria-label="Social profiles"
              >
                <a
                  href={github}
                  className={iconLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-[17px] w-[17px]" />
                </a>
                <a
                  href={linkedIn}
                  className={iconLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-[17px] w-[17px]" />
                </a>
              </div>
            </div>

            <ThemeToggle className="md:hidden" />
            <button
              type="button"
              className={cn(
                "flex min-h-11 min-w-11 items-center justify-center rounded-md text-muted-foreground md:hidden",
                btnTransition,
                "hover:bg-accent/[0.08] hover:text-accent-hover",
                focusRing,
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        <div
          id="mobile-nav-panel"
          className={cn(
            "border-t border-border-muted/70 md:hidden",
            "transition-[border-color,background-color] duration-200 ease-out",
            menuOpen
              ? "block bg-page/97 max-md:backdrop-blur-sm supports-[backdrop-filter]:max-md:bg-page/94 md:bg-page/95 md:backdrop-blur-md supports-[backdrop-filter]:md:bg-page/88"
              : "hidden",
          )}
        >
          <div className={containerInnerClassName}>
            <nav aria-label="Primary mobile" className="pb-3 pt-1">
              <ul className="flex flex-col gap-0.5">
                {site.nav.map((item) => {
                  const sid = sectionIdFromHref(item.href);
                  const projectsActive =
                    item.href === "/projects" &&
                    (pathname === "/projects" ||
                      pathname.startsWith("/projects/"));
                  const active = Boolean(
                    projectsActive ||
                      (isHome && sid && activeSection === sid),
                  );
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          mobileNavItemBase,
                          active && mobileNavItemActive,
                        )}
                        aria-current={active ? "true" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 px-2">
                <Link
                  href="/#contact"
                className={cn(
                  "flex min-h-11 w-full items-center justify-center rounded-full bg-accent py-3 text-[13px] font-semibold text-on-accent",
                  btnTransition,
                  "hover:opacity-90",
                  focusRing,
                )}
                  onClick={() => setMenuOpen(false)}
                >
                  Get in Touch
                </Link>
              </div>
              <div
                className="mt-3 flex items-center justify-center gap-2 border-t border-border-muted/60 px-2 pt-3"
                aria-label="Social profiles"
              >
                <a
                  href={github}
                  className={iconLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={linkedIn}
                  className={iconLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-[18px] w-[18px]" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <button
          type="button"
          className={cn(
            "fixed inset-0 z-40 cursor-default border-0 bg-black/55 p-0 md:hidden",
            "backdrop-blur-[2px] motion-reduce:backdrop-blur-none",
          )}
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </Fragment>
  );
}
