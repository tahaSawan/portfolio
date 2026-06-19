/** Groq OpenAI-compatible API base URL. */
export const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

/**
 * Chat model on Groq free tier — fast Llama 3.3 70B.
 * Alternative: `llama-3.1-8b-instant` for even lower latency.
 */
export const CHAT_MODEL = "llama-3.3-70b-versatile";

export const TOP_K = 5;
/** Minimum lexical relevance score (no embedding API on Groq). */
export const MIN_RELEVANCE_SCORE = 0.25;

export const MAX_USER_MESSAGE_CHARS = 1_200;
export const MAX_HISTORY_MESSAGES = 8;
export const MAX_COMPLETION_TOKENS = 700;

/** Per-IP soft limit (best-effort on serverless; resets on cold instances). */
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1_000;
export const RATE_LIMIT_MAX_REQUESTS = 30;
