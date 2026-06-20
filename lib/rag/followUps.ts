import type { AssistantSource } from "@/lib/rag/types";
import { projectSlugFromChunkId } from "@/lib/rag/projectSlug";

const PROJECT_FOLLOW_UPS: Record<string, string[]> = {
  prepxpert: [
    "What challenges did PrepXpert solve?",
    "Does PrepXpert have a live website?",
  ],
  legalconnect: [
    "How does LegalConnect use AI?",
    "What's the LegalConnect tech stack?",
  ],
  "reweave-website": [
    "What is the RE:WEAVE project about?",
    "What's the RE:WEAVE tech stack?",
    "Can I see the live RE:WEAVE website?",
  ],
  jobgpt: [
    "How does JobGPT rank jobs against a resume?",
    "What job boards does JobGPT search?",
    "Does JobGPT tailor resumes for specific roles?",
  ],
  "insight-flow-ai": [
    "How does InsightFlow's multi-agent pipeline work?",
    "What AI model does InsightFlow use?",
    "Can I try the live InsightFlow demo?",
  ],
  "precision-farming-robot": [
    "What vision model does the farming robot use?",
    "Tell me about the robotics work",
  ],
  "australian-apparel-sales": [
    "What were the top findings from the AAL sales analysis?",
    "Which Australian states underperformed in Q4 2020?",
    "What tools were used for the apparel sales project?",
  ],
  "employee-turnover-analytics": [
    "How does the turnover model handle class imbalance?",
    "What retention strategies does the project recommend?",
  ],
};

const GENERIC = [
  "What AI and ML skills does Taha have?",
  "How can I contact Taha?",
  "What's his education background?",
];

export function suggestFollowUps(
  sources: AssistantSource[],
  userQuery: string,
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const q = userQuery.toLowerCase();

  const add = (s: string) => {
    const key = s.toLowerCase();
    if (!seen.has(key) && !q.includes(key.slice(0, 12))) {
      seen.add(key);
      out.push(s);
    }
  };

  for (const source of sources) {
    const slug = projectSlugFromChunkId(source.id);
    if (slug && PROJECT_FOLLOW_UPS[slug]) {
      for (const s of PROJECT_FOLLOW_UPS[slug]!) add(s);
    }
  }

  if (sources.some((s) => s.section.toLowerCase().includes("skill"))) {
    add("What projects has he built with those skills?");
  }

  if (sources.some((s) => s.id === "contact")) {
    add("What projects should I look at first?");
  }

  for (const s of GENERIC) {
    add(s);
    if (out.length >= 3) break;
  }

  return out.slice(0, 3);
}
