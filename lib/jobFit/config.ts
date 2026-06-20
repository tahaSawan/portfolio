/** Max characters accepted in a pasted job description. */
export const MAX_JOB_DESCRIPTION_CHARS = 8_000;

/** Minimum meaningful job description length. */
export const MIN_JOB_DESCRIPTION_CHARS = 80;

/** Retrieval breadth for fit analysis. */
export const JOB_FIT_TOP_K = 12;

export const JOB_FIT_MAX_TOKENS = 1_400;

/** Per-IP limit for fit checks (separate from Lumo chat). */
export const JOB_FIT_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1_000;
export const JOB_FIT_RATE_LIMIT_MAX_REQUESTS = 12;
