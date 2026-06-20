import Link from "next/link";
import type { GitHubActivitySnapshot } from "@/lib/github.server";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { cn } from "@/lib/cn";
import {
  afterSectionHeading,
  btnTransition,
  cardSurfaceTransition,
  chipMatte,
  focusRing,
  labelOverline,
  proseBody,
  sectionHeading,
} from "@/lib/ui";
import { GitHubIcon } from "@/components/SocialIcons";

type GitHubStripProps = {
  data: GitHubActivitySnapshot;
};

const statPill = cn(
  "inline-flex items-center gap-1.5 rounded-full border border-border-muted/80 bg-surface-input/50 px-3 py-1",
  "text-[11px] font-medium text-muted-foreground sm:text-xs",
);

const repoCard = cn(
  "flex h-full w-[min(82vw,17rem)] shrink-0 flex-col rounded-lg border border-border-muted/85 bg-card p-3.5 sm:w-[16.5rem] sm:p-4",
  cardSurfaceTransition,
  "hover:border-accent/30 hover:bg-card-hover",
);

export function GitHubStrip({ data }: GitHubStripProps) {
  return (
    <div className="text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <h2 className={sectionHeading}>Building in public</h2>
          <p className={cn("mt-5 sm:mt-7", proseBody)}>
            Live snapshot from{" "}
            <a
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:text-accent-hover hover:underline"
            >
              @{data.username}
            </a>{" "}
            — recent repos and activity across open-source work.
          </p>
        </div>
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex min-h-11 shrink-0 touch-manipulation items-center justify-center gap-2 rounded-lg border border-border-muted px-4 text-sm font-semibold text-foreground-secondary",
            btnTransition,
            "hover:border-accent/35 hover:text-accent-hover",
            focusRing,
          )}
        >
          <GitHubIcon className="h-4 w-4" />
          View GitHub
        </a>
      </div>

      <div className={cn(afterSectionHeading, "flex flex-wrap gap-2")}>
        <span className={statPill}>
          <span className="font-semibold text-foreground">{data.publicRepos}</span>
          public repos
        </span>
        <span className={statPill}>
          <span className="font-semibold text-foreground">{data.totalStars}</span>
          stars
        </span>
        <span className={statPill}>
          <span className="font-semibold text-foreground">{data.followers}</span>
          followers
        </span>
        <span className={statPill}>
          Updated {formatRelativeTime(data.fetchedAt)}
        </span>
      </div>

      <div className="mt-6">
        <p className={labelOverline}>Recently pushed</p>
        <div
          className={cn(
            "mt-3 flex gap-3 overflow-x-auto pb-2",
            "snap-x snap-mandatory scroll-px-1",
            "[scrollbar-width:thin]",
          )}
        >
          {data.repos.map((repo) => (
            <article key={repo.url} className={cn(repoCard, "snap-start")}>
              <div className="flex items-start justify-between gap-2">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-sm font-semibold text-accent hover:underline",
                    focusRing,
                    "rounded-sm",
                  )}
                >
                  {repo.name}
                </a>
                {repo.portfolioSlug ? (
                  <Link
                    href={`/projects/${repo.portfolioSlug}`}
                    className={cn(
                      "shrink-0 rounded-full border border-accent/30 bg-accent/[0.08] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent",
                      btnTransition,
                      "hover:bg-accent/[0.14]",
                      focusRing,
                    )}
                  >
                    Portfolio
                  </Link>
                ) : null}
              </div>
              <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-[11px] leading-snug text-muted-foreground">
                {repo.description ?? "Open-source project on GitHub."}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                {repo.language ? (
                  <span className={cn(chipMatte, "text-[10px]")}>{repo.language}</span>
                ) : null}
                {repo.stars > 0 ? (
                  <span className="text-[10px] text-muted-foreground">
                    ★ {repo.stars}
                  </span>
                ) : null}
                <span className="text-[10px] text-muted-foreground">
                  {formatRelativeTime(repo.pushedAt)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {data.recent.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-lg border border-border-muted/80 bg-surface-input/30">
          <p className={cn(labelOverline, "border-b border-border-muted/70 px-3 py-2.5 sm:px-4")}>
            Recent activity
          </p>
          <ul className="divide-y divide-border-muted/60">
            {data.recent.map((item) => (
              <li key={`${item.type}-${item.occurredAt}-${item.repoName}`}>
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex flex-col gap-0.5 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4",
                    btnTransition,
                    "hover:bg-accent/[0.04]",
                    focusRing,
                  )}
                >
                  <span className="line-clamp-2 text-[12px] leading-snug text-foreground-secondary sm:line-clamp-1 sm:text-[13px]">
                    {item.label}
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground sm:text-[11px]">
                    {formatRelativeTime(item.occurredAt)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
