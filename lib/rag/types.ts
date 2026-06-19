export type KnowledgeChunk = {
  id: string;
  title: string;
  section: string;
  url?: string;
  text: string;
};

export type RetrievedChunk = KnowledgeChunk & {
  score: number;
};

export type AssistantSource = {
  id: string;
  title: string;
  section: string;
  url?: string;
};

export type ChatRole = "user" | "assistant";

export type ClientChatMessage = {
  role: ChatRole;
  content: string;
};
