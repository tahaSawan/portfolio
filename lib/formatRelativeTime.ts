const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Short relative time, e.g. "3h ago" or "Jun 8". */
export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return iso;

  const diff = Date.now() - then;
  if (diff < MINUTE) return "just now";

  const mins = Math.floor(diff / MINUTE);
  if (mins < 60) return `${mins}m ago`;

  const hours = Math.floor(diff / HOUR);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(diff / DAY);
  if (days < 14) return `${days}d ago`;

  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
