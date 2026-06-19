"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { btnTransition, focusRing } from "@/lib/ui";
import type { AssistantSource } from "@/lib/rag/types";

type ChatRole = "user" | "assistant";

type UiMessage = {
  id: string;
  role: ChatRole;
  content: string;
  sources?: AssistantSource[];
  streaming?: boolean;
};

const SUGGESTED_PROMPTS = [
  "What projects has Taha built?",
  "What's his experience with AI and ML?",
  "Tell me about PrepXpert",
  "How can I contact him?",
] as const;

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function AssistantIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 3a7 7 0 0 0-4 12.5V19a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.5A7 7 0 0 0 12 3Z" />
      <path d="M9.5 22h5" />
      <path d="M10 10.5h.01M14 10.5h.01" />
      <path d="M10 14.5a2.5 2.5 0 0 0 4 0" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m5 12 14-7-4 7 4 7-14-7Z" />
    </svg>
  );
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern =
    /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`${match.index}-b`} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("[")) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternal = href.startsWith("/");
        if (isInternal) {
          nodes.push(
            <Link
              key={`${match.index}-l`}
              href={href}
              className="font-medium text-accent underline-offset-2 hover:text-accent-hover hover:underline"
            >
              {label}
            </Link>,
          );
        } else {
          nodes.push(
            <a
              key={`${match.index}-e`}
              href={href}
              className="font-medium text-accent underline-offset-2 hover:text-accent-hover hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {label}
            </a>,
          );
        }
      } else {
        nodes.push(token);
      }
    } else {
      nodes.push(
        <a
          key={`${match.index}-u`}
          href={token}
          className="font-medium text-accent underline-offset-2 hover:text-accent-hover hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {token.replace(/^https?:\/\//, "")}
        </a>,
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function MessageBody({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/);

  return (
    <div className="space-y-2.5 text-[14px] leading-relaxed text-muted-foreground">
      {paragraphs.map((paragraph, i) => {
        const lines = paragraph.split("\n");
        const isList = lines.every((line) => /^[-*•]\s/.test(line.trim()));

        if (isList) {
          return (
            <ul key={i} className="list-disc space-y-1 pl-4">
              {lines.map((line) => (
                <li key={line}>{renderInlineMarkdown(line.replace(/^[-*•]\s*/, ""))}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="text-pretty">
            {lines.map((line, lineIdx) => (
              <span key={lineIdx}>
                {lineIdx > 0 ? <br /> : null}
                {renderInlineMarkdown(line)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function SourcePills({ sources }: { sources: AssistantSource[] }) {
  const unique = sources.filter(
    (source, index, arr) =>
      arr.findIndex((s) => s.url === source.url && s.title === source.title) ===
      index,
  );

  if (unique.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {unique.map((source) => {
        const label = source.section;
        const className = cn(
          "inline-flex max-w-full items-center rounded-full border border-accent/22 bg-accent/[0.06] px-2.5 py-1 text-[11px] font-medium text-accent",
          btnTransition,
          "hover:border-accent/40 hover:bg-accent/[0.1]",
          focusRing,
        );

        if (source.url?.startsWith("/")) {
          return (
            <Link key={source.id} href={source.url} className={className}>
              <span className="truncate">{label}</span>
            </Link>
          );
        }

        if (source.url) {
          return (
            <a
              key={source.id}
              href={source.url}
              className={className}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="truncate">{label}</span>
            </a>
          );
        }

        return (
          <span key={source.id} className={className}>
            <span className="truncate">{label}</span>
          </span>
        );
      })}
    </div>
  );
}

export function PortfolioAssistant() {
  const panelId = useId();
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open, messages, scrollToBottom]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      setInput("");

      const userMessage: UiMessage = {
        id: createId(),
        role: "user",
        content: trimmed,
      };

      const assistantId = createId();
      const historyForApi = [...messages, userMessage]
        .filter((m) => !m.streaming && m.content.trim())
        .map((m) => ({ role: m.role, content: m.content }));

      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          streaming: true,
        },
      ]);
      setLoading(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyForApi }),
          signal: controller.signal,
        });

        if (!response.ok) {
          let message = "Unable to reach the assistant.";
          try {
            const data = (await response.json()) as { error?: string };
            if (data.error) message = data.error;
          } catch {
            /* ignore */
          }
          throw new Error(message);
        }

        if (!response.body) {
          throw new Error("No response stream received.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let sources: AssistantSource[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.trim()) continue;

            const event = JSON.parse(line) as {
              type: string;
              content?: string;
              sources?: AssistantSource[];
              message?: string;
            };

            if (event.type === "sources" && event.sources) {
              sources = event.sources;
            } else if (event.type === "token" && event.content) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + event.content }
                    : m,
                ),
              );
            } else if (event.type === "error") {
              throw new Error(event.message ?? "Stream error.");
            }
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  streaming: false,
                  sources,
                }
              : m,
          ),
        );
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        const message =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
        setMessages((prev) =>
          prev.filter((m) => m.id !== assistantId || m.content.trim()),
        );
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [loading, messages],
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      void sendMessage(input);
    },
    [input, sendMessage],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void sendMessage(input);
      }
    },
    [input, sendMessage],
  );

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setLoading(false);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed z-[60] flex h-14 w-14 touch-manipulation items-center justify-center rounded-full border border-accent/40 bg-matte-deep text-accent shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
          "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))]",
          btnTransition,
          "hover:border-accent/60 hover:bg-matte-hover hover:text-accent-hover",
          open && "pointer-events-none scale-95 opacity-0",
          focusRing,
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Open portfolio assistant"
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-accent/10 blur-md"
          aria-hidden
        />
        <AssistantIcon className="relative h-6 w-6" />
      </button>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-[55] cursor-default border-0 bg-black/45 p-0 backdrop-blur-[2px] motion-reduce:backdrop-blur-none md:bg-black/35"
          aria-label="Close assistant"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <section
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio assistant"
        className={cn(
          "fixed z-[60] flex flex-col overflow-hidden border border-border-muted/90 bg-page shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
          "inset-x-0 bottom-0 max-h-[min(88dvh,42rem)] rounded-t-2xl",
          "md:inset-x-auto md:bottom-[max(1.25rem,env(safe-area-inset-bottom))] md:right-[max(1.25rem,env(safe-area-inset-right))] md:max-h-[min(34rem,78dvh)] md:w-[min(100vw-2rem,24rem)] md:rounded-2xl",
          "transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-border-muted/80 px-4 py-3.5 sm:px-5">
          <div className="min-w-0 text-left">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Ask about {site.name.split(" ")[0]}
            </p>
            <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
              Grounded in this portfolio — projects, skills, and contact info.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {messages.length > 0 ? (
              <button
                type="button"
                onClick={clearChat}
                className={cn(
                  "rounded-md px-2 py-1.5 text-[11px] font-medium text-muted-foreground",
                  btnTransition,
                  "hover:bg-accent/[0.08] hover:text-foreground-secondary",
                  focusRing,
                )}
              >
                Clear
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground",
                btnTransition,
                "hover:bg-accent/[0.08] hover:text-foreground-secondary",
                focusRing,
              )}
              aria-label="Close assistant"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div
          ref={listRef}
          className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5"
        >
          {messages.length === 0 ? (
            <div className="text-left">
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                Ask about projects, AI/ML experience, education, or how to get in
                touch. I only answer from content on this site.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={loading}
                    onClick={() => void sendMessage(prompt)}
                    className={cn(
                      "rounded-full border border-accent/24 bg-surface-input px-3 py-2 text-left text-[12px] font-medium leading-snug text-foreground-secondary",
                      btnTransition,
                      "hover:border-accent/40 hover:bg-accent/[0.08]",
                      focusRing,
                    )}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[92%] rounded-2xl px-3.5 py-3 text-left sm:max-w-[88%]",
                  message.role === "user"
                    ? "rounded-br-md bg-accent text-on-accent"
                    : "rounded-bl-md border border-border-muted/80 bg-card",
                )}
              >
                {message.role === "user" ? (
                  <p className="text-[14px] leading-relaxed">{message.content}</p>
                ) : (
                  <>
                    {message.content ? (
                      <MessageBody content={message.content} />
                    ) : message.streaming ? (
                      <div className="flex items-center gap-1.5 py-1" aria-hidden>
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent/70" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent/70 [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent/70 [animation-delay:240ms]" />
                      </div>
                    ) : null}
                    {message.sources && !message.streaming ? (
                      <SourcePills sources={message.sources} />
                    ) : null}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {error ? (
          <p
            className="shrink-0 px-4 pb-2 text-left text-[12px] text-muted-foreground sm:px-5"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <form
          onSubmit={onSubmit}
          className="shrink-0 border-t border-border-muted/80 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
        >
          <div className="flex items-end gap-2">
            <label htmlFor={inputId} className="sr-only">
              Message
            </label>
            <textarea
              ref={inputRef}
              id={inputId}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
              placeholder="Ask a question…"
              className={cn(
                "max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-border-muted/90 bg-surface-input px-3.5 py-2.5 text-[14px] leading-relaxed text-foreground-secondary placeholder:text-faint-foreground",
                btnTransition,
                "focus:border-accent/45 focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-accent",
              )}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={cn(
                "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent",
                btnTransition,
                "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40",
                focusRing,
              )}
              aria-label="Send message"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-left text-[10px] leading-relaxed text-faint-foreground">
            AI assistant · answers from portfolio content only
          </p>
        </form>
      </section>
    </>
  );
}
