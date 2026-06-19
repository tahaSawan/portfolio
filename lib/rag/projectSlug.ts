/** Extract `employee-turnover-analytics` from `project-employee-turnover-analytics-overview`. */
export function projectSlugFromChunkId(id: string): string | null {
  const match = id.match(
    /^project-(.+)-(overview|stack|architecture|highlights|future)$/,
  );
  return match?.[1] ?? null;
}
