import { CHAT_MODEL } from "@/lib/rag/config";
import { getGroqClient, isAssistantConfigured } from "@/lib/rag/groqClient";
import { checkRateLimit, clientIp } from "@/lib/rag/rateLimit";
import { retrieveRelevantChunks } from "@/lib/rag/retrieve";
import {
  JOB_FIT_MAX_TOKENS,
  JOB_FIT_RATE_LIMIT_MAX_REQUESTS,
  JOB_FIT_RATE_LIMIT_WINDOW_MS,
  JOB_FIT_TOP_K,
  MAX_JOB_DESCRIPTION_CHARS,
  MIN_JOB_DESCRIPTION_CHARS,
} from "@/lib/jobFit/config";
import { parseJobFitResponse } from "@/lib/jobFit/parse";
import { buildJobFitSystemPrompt } from "@/lib/jobFit/prompt";
import type { JobFitApiResponse } from "@/lib/jobFit/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitizeJobDescription(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (trimmed.length < MIN_JOB_DESCRIPTION_CHARS) return null;
  if (trimmed.length > MAX_JOB_DESCRIPTION_CHARS) {
    return trimmed.slice(0, MAX_JOB_DESCRIPTION_CHARS);
  }
  return trimmed;
}

export async function POST(request: Request) {
  if (!isAssistantConfigured()) {
    return Response.json(
      {
        error:
          "Job fit analyzer is not configured. Set GROQ_API_KEY in your environment.",
      },
      { status: 503 },
    );
  }

  const rate = checkRateLimit(`job-fit:${clientIp(request)}`, {
    max: JOB_FIT_RATE_LIMIT_MAX_REQUESTS,
    windowMs: JOB_FIT_RATE_LIMIT_WINDOW_MS,
  });

  if (!rate.ok) {
    return Response.json(
      {
        error: `Too many fit checks. Try again in about ${rate.retryAfterSec} seconds.`,
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

  const jobDescription = sanitizeJobDescription(
    body && typeof body === "object" && "jobDescription" in body
      ? (body as { jobDescription: unknown }).jobDescription
      : null,
  );

  if (!jobDescription) {
    return Response.json(
      {
        error: `Paste a job description (${MIN_JOB_DESCRIPTION_CHARS}+ characters).`,
      },
      { status: 400 },
    );
  }

  try {
    const retrieved = retrieveRelevantChunks(jobDescription, {
      topK: JOB_FIT_TOP_K,
    });

    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      model: CHAT_MODEL,
      temperature: 0.15,
      max_tokens: JOB_FIT_MAX_TOKENS,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildJobFitSystemPrompt(retrieved) },
        {
          role: "user",
          content: `Analyze fit for this role:\n\n${jobDescription}`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content ?? "";
    const result = parseJobFitResponse(content);

    if (!result) {
      return Response.json(
        { error: "Could not parse fit analysis. Please try again." },
        { status: 502 },
      );
    }

    const response: JobFitApiResponse = {
      result,
      sources: retrieved.map((chunk) => ({
        id: chunk.id,
        title: chunk.title,
        section: chunk.section,
        url: chunk.url,
      })),
    };

    return Response.json(response);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong running the fit analysis.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    configured: isAssistantConfigured(),
    provider: "groq",
    model: CHAT_MODEL,
    minChars: MIN_JOB_DESCRIPTION_CHARS,
    maxChars: MAX_JOB_DESCRIPTION_CHARS,
  });
}
