import { GitHubStrip } from "@/components/GitHubStrip";
import { fetchGitHubActivity } from "@/lib/github.server";

export async function GitHubActivity() {
  const data = await fetchGitHubActivity();

  if (!data) {
    return (
      <div className="text-left">
        <p className="text-sm text-muted-foreground">
          GitHub activity is temporarily unavailable. Visit{" "}
          <a
            href="https://github.com/tahaSawan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            github.com/tahaSawan
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return <GitHubStrip data={data} />;
}
