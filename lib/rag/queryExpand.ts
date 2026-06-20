/** Synonym and alias expansions for lexical retrieval. */
const SYNONYM_GROUPS: readonly (readonly string[])[] = [
  ["ai", "artificial intelligence", "openai", "generative"],
  ["ml", "machine learning", "scikit", "data science"],
  ["full stack", "fullstack", "next.js", "react", "backend"],
  ["prepxpert", "prep xpert", "mdcat", "test prep", "myprepxpert"],
  ["legalconnect", "legal connect", "legalconnectpk", "legal tech"],
  [
    "reweave",
    "re:weave",
    "reweave-website",
    "circular textiles",
    "textile infrastructure",
    "sweden client",
    "sustainability",
  ],
  [
    "jobgpt",
    "job gpt",
    "career-ops",
    "job search",
    "resume tailoring",
    "application tracking",
  ],
  [
    "insightflow",
    "insight flow",
    "insight-flow",
    "gemini",
    "multi-agent",
    "executive dashboard",
    "autonomous agent",
  ],
  ["robot", "robotics", "yolo", "precision farming", "computer vision"],
  ["contact", "email", "reach", "hire", "linkedin", "phone"],
  ["education", "fast", "nuces", "degree", "certification"],
  ["resume", "cv", "download"],
  ["job fit", "fit check", "job description", "role match", "match score", "hiring"],
  ["tableau", "analytics", "sales", "apparel"],
  [
    "turnover",
    "attrition",
    "employee",
    "hr",
    "portobello",
    "smote",
    "gradient boosting",
    "scikit-learn",
  ],
];

const FOLLOW_UP_RE =
  /^(yes|yeah|yep|ok|okay|sure|tell me more|more about|what about|how about|and\b|also|explain|elaborate|go on|continue|why|who|when|where)\b/i;

const SHORT_QUERY_MAX = 28;

export function isFollowUpQuery(query: string): boolean {
  const q = query.trim();
  if (q.length <= SHORT_QUERY_MAX && FOLLOW_UP_RE.test(q)) return true;
  if (/^(tell me more|what else|anything else)/i.test(q)) return true;
  return false;
}

function expandSynonyms(query: string): string {
  const lower = query.toLowerCase();
  const extras: string[] = [];

  for (const group of SYNONYM_GROUPS) {
    if (group.some((term) => lower.includes(term))) {
      extras.push(...group);
    }
  }

  return extras.length > 0 ? `${query} ${[...new Set(extras)].join(" ")}` : query;
}

function lastUserBefore(
  messages: { role: string; content: string }[],
  beforeIndex: number,
): string | null {
  for (let i = beforeIndex - 1; i >= 0; i--) {
    if (messages[i]?.role === "user") return messages[i]!.content;
  }
  return null;
}

function lastAssistantBefore(
  messages: { role: string; content: string }[],
  beforeIndex: number,
): string | null {
  for (let i = beforeIndex - 1; i >= 0; i--) {
    if (messages[i]?.role === "assistant") return messages[i]!.content;
  }
  return null;
}

/** Build a richer retrieval query using conversation context and synonyms. */
export function expandRetrievalQuery(
  userQuery: string,
  messages: { role: string; content: string }[],
): string {
  let query = userQuery.trim();
  const idx = messages.findLastIndex(
    (m) => m.role === "user" && m.content.trim() === query,
  );

  if (idx > 0 && isFollowUpQuery(query)) {
    const prevUser = lastUserBefore(messages, idx);
    const prevAssistant = lastAssistantBefore(messages, idx);
    const parts = [prevUser, query, prevAssistant?.slice(0, 200)].filter(
      Boolean,
    );
    query = parts.join(" ");
  }

  return expandSynonyms(query);
}
