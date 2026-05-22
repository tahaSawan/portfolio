"use client";

import { useCallback, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { focusRing, transitionField } from "@/lib/ui";

const labelClass =
  "mb-2 block text-xs font-medium tracking-tight text-muted-foreground sm:text-[13px]";

const fieldBase = cn(
  "w-full touch-manipulation rounded-lg border border-border-muted/90 bg-surface-input px-3.5 text-[15px] leading-[1.55] text-foreground-secondary placeholder:text-faint-foreground sm:text-base sm:leading-[1.6]",
  transitionField,
  "hover:border-accent/32",
  "focus:border-accent/45 focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-accent",
);

const inputClass = cn(fieldBase, "min-h-12 py-3 sm:min-h-11 sm:py-2.5");

const textareaClass = cn(fieldBase, "min-h-[148px] resize-y py-3 sm:py-2.5");

const selectClass = cn(inputClass, "cursor-pointer appearance-none pr-10");

const submitClass = cn(
  "mt-6 w-full rounded-lg bg-accent py-3.5 text-sm font-semibold text-on-accent shadow-none",
  "transition-opacity duration-200 ease-out hover:opacity-90 active:opacity-[0.96]",
  focusRing,
);

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const n = name.trim();
      const em = email.trim();
      const m = message.trim();
      if (!n || !em || !m) {
        setError("Please fill in your name, email, and message.");
        return;
      }
      setError(null);
      const subject = encodeURIComponent(`Portfolio inquiry from ${n}`);
      const co = company.trim();
      const tp = topic.trim();
      const body = encodeURIComponent(
        [
          co ? `Organization / company: ${co}` : null,
          tp ? `Topic: ${tp}` : null,
          `Name: ${n}`,
          `Email: ${em}`,
          "",
          m,
        ]
          .filter(Boolean)
          .join("\n"),
      );
      window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    },
    [name, email, company, topic, message],
  );

  return (
    <form onSubmit={submit} className="w-full" noValidate>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-company" className={labelClass}>
          Organization{" "}
          <span className="font-normal text-faint-foreground">(optional)</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={cn(inputClass, "mt-2")}
          placeholder="University, company, or team"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="contact-topic" className={labelClass}>
          Topic
        </label>
        <div className="relative mt-2">
          <select
            id="contact-topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={selectClass}
          >
            <option value="">What would you like to discuss?</option>
            <option value="General inquiry">General inquiry</option>
            <option value="Project or collaboration">Project or collaboration</option>
            <option value="Internship or opportunity">Internship or opportunity</option>
            <option value="Speaking or interview">Speaking or interview</option>
            <option value="Other">Other</option>
          </select>
          <span
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                d="m6 9 6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(textareaClass, "mt-2")}
          placeholder="Tell me a bit about what you are looking for…"
        />
      </div>

      {error ? (
        <p className="mt-3 text-[13px] text-muted-foreground" role="status">
          {error}
        </p>
      ) : null}

      <button type="submit" className={submitClass}>
        Send message
      </button>

      <p className="mt-4 text-left text-[12px] leading-relaxed text-faint-foreground sm:text-[13px]">
        Submits by opening your email app with a draft — nothing is stored on this site.
      </p>
    </form>
  );
}
