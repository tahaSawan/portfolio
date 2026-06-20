import { site } from "@/lib/site";

export type GitHubRepoCard = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
  /** Portfolio case study slug when this repo is featured on the site */
  portfolioSlug?: string;
};

export type GitHubActivityItem = {
  type: string;
  repoName: string;
  repoUrl: string;
  occurredAt: string;
  label: string;
};

export type GitHubActivitySnapshot = {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  repos: GitHubRepoCard[];
  recent: GitHubActivityItem[];
  fetchedAt: string;
};

const REVALIDATE_SEC = 30 * 60;

type GitHubRepoApi = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
};

type GitHubUserApi = {
  login: string;
  public_repos: number;
  followers: number;
};

type GitHubEventApi = {
  type: string;
  created_at: string;
  repo: { name: string; url: string };
  payload?: {
    ref?: string;
    commits?: { message?: string }[];
  };
};

function githubUsername(): string {
  const url = site.contact.github.replace(/\/$/, "");
  const segment = url.split("/").pop();
  return segment ?? "tahaSawan";
}

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": `${site.name.replace(/\s+/g, "-")}-portfolio`,
  };
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function portfolioSlugForRepo(repoUrl: string): string | undefined {
  const normalized = repoUrl.replace(/\/$/, "").toLowerCase();
  for (const project of site.projects) {
    if (!project.githubUrl) continue;
    if (project.githubUrl.replace(/\/$/, "").toLowerCase() === normalized) {
      return project.slug;
    }
  }
  return undefined;
}

function eventLabel(event: GitHubEventApi): string {
  const repo = event.repo.name.split("/").pop() ?? event.repo.name;
  switch (event.type) {
    case "PushEvent": {
      const msg = event.payload?.commits?.[0]?.message?.split("\n")[0]?.trim();
      return msg ? `Pushed to ${repo}: ${msg}` : `Pushed to ${repo}`;
    }
    case "CreateEvent":
      return `Created ${repo}${event.payload?.ref ? ` (${event.payload.ref})` : ""}`;
    case "WatchEvent":
      return `Starred ${repo}`;
    case "ForkEvent":
      return `Forked ${repo}`;
    default:
      return `${event.type.replace(/Event$/, "")} on ${repo}`;
  }
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: githubHeaders(),
      next: { revalidate: REVALIDATE_SEC },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchGitHubActivity(): Promise<GitHubActivitySnapshot | null> {
  const username = githubUsername();
  const profileUrl = site.contact.github;

  const [user, reposRaw, eventsRaw] = await Promise.all([
    fetchJson<GitHubUserApi>(`https://api.github.com/users/${username}`),
    fetchJson<GitHubRepoApi[]>(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=8&type=owner`,
    ),
    fetchJson<GitHubEventApi[]>(
      `https://api.github.com/users/${username}/events/public?per_page=8`,
    ),
  ]);

  if (!user || !reposRaw?.length) return null;

  const repos: GitHubRepoCard[] = reposRaw.map((repo) => ({
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    pushedAt: repo.pushed_at,
    portfolioSlug: portfolioSlugForRepo(repo.html_url),
  }));

  const totalStars = reposRaw.reduce((sum, r) => sum + r.stargazers_count, 0);

  const recent: GitHubActivityItem[] = (eventsRaw ?? [])
    .filter((e) => e.repo?.name)
    .slice(0, 6)
    .map((event) => ({
      type: event.type,
      repoName: event.repo.name.split("/").pop() ?? event.repo.name,
      repoUrl: `https://github.com/${event.repo.name}`,
      occurredAt: event.created_at,
      label: eventLabel(event),
    }));

  return {
    username: user.login,
    profileUrl,
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    repos,
    recent,
    fetchedAt: new Date().toISOString(),
  };
}
