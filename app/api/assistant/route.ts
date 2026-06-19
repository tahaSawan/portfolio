import {
  CHAT_MODEL,
  MAX_COMPLETION_TOKENS,
  MAX_HISTORY_MESSAGES,
  MAX_USER_MESSAGE_CHARS,
} from "@/lib/rag/config";
import { getGroqClient, isAssistantConfigured } from "@/lib/rag/groqClient";
import { buildSystemPrompt } from "@/lib/rag/prompt";
import { suggestFollowUps } from "@/lib/rag/followUps";
import { checkRateLimit, clientIp } from "@/lib/rag/rateLimit";
import { retrieveRelevantChunks } from "@/lib/rag/retrieve";
import type { AssistantSource, ClientChatMessage } from "@/lib/rag/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type StreamEvent =
  | { type: "sources"; sources: AssistantSource[] }
  | { type: "followups"; items: string[] }
  | { type: "token"; content: string }
  | { type: "done" }
  | { type: "error"; message: string };

function encodeEvent(event: StreamEvent): string {
  return `${JSON.stringify(event)}\n`;
}

function sanitizeMessages(raw: unknown): ClientChatMessage[] {
  if (!Array.isArray(raw)) return [];

  const messages: ClientChatMessage[] = [];

  for (const item of raw) {
    if (
      !item ||
      typeof item !== "object" ||
      !("role" in item) ||
      !("content" in item)
    ) {
      continue;
    }

    const role = (item as ClientChatMessage).role;
    const content = String((item as ClientChatMessage).content ?? "").trim();

    if ((role !== "user" && role !== "assistant") || !content) continue;
    if (content.length > MAX_USER_MESSAGE_CHARS) continue;

    messages.push({ role, content });
  }

  return messages.slice(-MAX_HISTORY_MESSAGES);
}

function latestUserMessage(messages: ClientChatMessage[]): string | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i]?.role === "user") {
      return messages[i]!.content;
    }
  }
  return null;
}

export async function POST(request: Request) {
  if (!isAssistantConfigured()) {
    return Response.json(
      {
        error:
          "Assistant is not configured. Set GROQ_API_KEY in your environment.",
      },
      { status: 503 },
    );
  }

  const rate = checkRateLimit(clientIp(request));
  if (!rate.ok) {
    return Response.json(
      {
        error: `Too many requests. Try again in about ${rate.retryAfterSec} seconds.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = sanitizeMessages(
    body && typeof body === "object" && "messages" in body
      ? (body as { messages: unknown }).messages
      : [],
  );

  const userQuery = latestUserMessage(messages);
  if (!userQuery) {
    return Response.json(
      { error: "A user message is required." },
      { status: 400 },
    );
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();

      const push = (event: StreamEvent) => {
        controller.enqueue(encoder.encode(encodeEvent(event)));
      };

      try {
        const retrieved = retrieveRelevantChunks(userQuery, {
          conversation: messages,
        });

        const sources: AssistantSource[] = retrieved.map((chunk) => ({
          id: chunk.id,
          title: chunk.title,
          section: chunk.section,
          url: chunk.url,
        }));

        push({ type: "sources", sources });
        push({
          type: "followups",
          items: suggestFollowUps(sources, userQuery),
        });

        const groq = getGroqClient();

        const completion = await groq.chat.completions.create({
          model: CHAT_MODEL,
          temperature: 0.35,
          max_tokens: MAX_COMPLETION_TOKENS,
          stream: true,
          messages: [
            { role: "system", content: buildSystemPrompt(retrieved) },
            ...messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          ],
        });

        for await (const part of completion) {
          const delta = part.choices[0]?.delta?.content;
          if (delta) {
            push({ type: "token", content: delta });
          }
        }

        push({ type: "done" });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong generating a reply.";
        push({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function GET() {
  return Response.json({
    configured: isAssistantConfigured(),
    provider: "groq",
    model: CHAT_MODEL,
  });
}
