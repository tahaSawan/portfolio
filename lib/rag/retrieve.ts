import { buildKnowledgeChunks } from "@/lib/rag/chunks";
import { MIN_RELEVANCE_SCORE, TOP_K } from "@/lib/rag/config";
import { keywordBoost } from "@/lib/rag/math";
import type { KnowledgeChunk, RetrievedChunk } from "@/lib/rag/types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "about",
  "can",
  "do",
  "does",
  "for",
  "he",
  "her",
  "his",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "of",
  "on",
  "or",
  "she",
  "tell",
  "the",
  "to",
  "was",
  "what",
  "with",
  "you",
]);

function terms(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));
}

function scoreChunk(query: string, chunk: KnowledgeChunk): number {
  const corpus = `${chunk.section} ${chunk.title} ${chunk.text}`.toLowerCase();
  const queryTerms = terms(query);
  if (queryTerms.length === 0) return 0;

  let score = keywordBoost(query, corpus);

  const titleLower = chunk.title.toLowerCase();
  const sectionLower = chunk.section.toLowerCase();

  for (const term of queryTerms) {
    if (titleLower.includes(term)) score += 0.35;
    if (sectionLower.includes(term)) score += 0.2;
    if (corpus.includes(term)) score += 0.12;
  }

  const slugMatch = chunk.id.match(/^project-([^-]+)/);
  if (slugMatch) {
    const slug = slugMatch[1]!;
    for (const term of queryTerms) {
      if (slug.includes(term) || term.includes(slug)) score += 0.55;
    }
  }

  return score;
}

const globalStore = globalThis as unknown as {
  ragChunks?: KnowledgeChunk[];
};

function getChunks(): KnowledgeChunk[] {
  if (!globalStore.ragChunks) {
    globalStore.ragChunks = buildKnowledgeChunks();
  }
  return globalStore.ragChunks;
}

function fallbackChunks(chunks: KnowledgeChunk[]): RetrievedChunk[] {
  const ids = new Set(["profile", "projects-index", "contact"]);
  return chunks
    .filter((c) => ids.has(c.id))
    .map((c) => ({ ...c, score: 0.2 }));
}

/** Lexical retrieval — no embedding API required (Groq is chat-only). */
export function retrieveRelevantChunks(
  query: string,
  topK = TOP_K,
): RetrievedChunk[] {
  const chunks = getChunks();

  const scored = chunks
    .map((chunk) => ({
      ...chunk,
      score: scoreChunk(query, chunk),
    }))
    .filter((c) => c.score >= MIN_RELEVANCE_SCORE)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return fallbackChunks(chunks).slice(0, topK);
  }

  return scored.slice(0, topK);
}
