import OpenAI from "openai";
import { GROQ_BASE_URL } from "@/lib/rag/config";

export function getGroqClient(): OpenAI {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  return new OpenAI({
    apiKey,
    baseURL: GROQ_BASE_URL,
  });
}

export function isAssistantConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY?.trim());
}
