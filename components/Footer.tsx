import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { focusRing, touchTextLink } from "@/lib/ui";
import {
  BrandBoltIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/SocialIcons";

const columnHeading = "text-sm font-semibold tracking-tight text-foreground";

const quickLinkClass = cn(
  touchTextLink,
  "text-sm text-muted-foreground hover:text-accent-hover",
);

const socialBox = cn(
  "inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-md border border-border-muted/80 text-muted-foreground",
  "transition-[border-color,color,background-color] duration-200 ease-out",
  "hover:border-accent/35 hover:text-accent-hover",
  focusRing,
);

/** In-page anchors; omit Home from “Quick links” (same pattern as many marketing footers). */
const footerQuickNav = site.nav.filter((item) => item.href !== "/#top");

export function Footer() {
  const { email, github, linkedIn } = site.contact;
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border-muted/85 bg-page",
        "mt-14 pb-[max(2.75rem,env(safe-area-inset-bottom))] pt-14 sm:mt-16 sm:pb-14 sm:pt-16 md:pt-20",
      )}
    >
      <div
        className={cn(
          "grid gap-12 sm:gap-14",
          "md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,1fr)] md:items-start md:gap-10 lg:gap-14",
        )}
      >
        {/* Brand + bio */}
        <div className="min-w-0 text-left">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent">
              <BrandBoltIcon className="h-[15px] w-[15px] text-on-accent" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground sm:text-[15px]">
              {site.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
            {site.heroDescription}
          </p>
        </div>

        {/* Quick links */}
        <nav className="min-w-0 text-left" aria-label="Quick links">
          <p className={columnHeading}>Quick links</p>
          <ul className="mt-4 flex flex-col gap-1.5">
            {footerQuickNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={quickLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect */}
        <div className="min-w-0 text-left">
          <p className={columnHeading}>Connect</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={linkedIn}
              className={socialBox}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={github}
              className={socialBox}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={`mailto:${email}`}
              className={socialBox}
              aria-label={`Email ${email}`}
            >
              <MailIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mt-12 flex flex-col gap-4 border-t border-border-muted/80 pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:pt-9",
        )}
      >
        <p className="text-left text-xs text-muted-foreground sm:text-[13px]">
          © {year} {site.name}. All rights reserved.
        </p>
        <Link
          href="/#top"
          className={cn(
            touchTextLink,
            "w-fit text-left text-xs text-muted-foreground hover:text-accent-hover sm:text-[13px]",
          )}
        >
          Back to top <span aria-hidden>↑</span>
        </Link>
      </div>
    </footer>
  );
}
