export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i]! * b[i]!;
    normA += a[i]! * a[i]!;
    normB += b[i]! * b[i]!;
  }

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom === 0) return 0;
  return dot / denom;
}

/** Light keyword overlap boost for exact project/skill name matches. */
export function keywordBoost(query: string, text: string): number {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3);

  if (terms.length === 0) return 0;

  const haystack = text.toLowerCase();
  let hits = 0;

  for (const term of terms) {
    if (haystack.includes(term)) hits += 1;
  }

  return Math.min(0.12, hits * 0.03);
}
