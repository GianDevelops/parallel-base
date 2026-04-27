"use client";

import { useState, FormEvent } from "react";

interface Props {
  theme?: "dark" | "light";
}

export default function StudioWaitlist({ theme = "dark" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), product: "studio" }),
      });
      setStatus("done");
    } catch {
      setStatus("done");
    }
  };

  const isLight = theme === "light";

  // Tokens per theme
  const containerBg = isLight ? "bg-white" : "bg-background";
  const borderColor = isLight ? "border-light-border" : "border-border";
  const textColor = isLight ? "text-light-text" : "text-foreground";
  const placeholderColor = isLight
    ? "placeholder:text-light-muted/60"
    : "placeholder:text-muted/40";
  const buttonBase = isLight
    ? "bg-light-text/5 hover:bg-light-text hover:text-light-bg text-light-text"
    : "bg-foreground/5 hover:bg-foreground hover:text-background text-foreground";
  const submittingMutedColor = isLight ? "text-light-muted" : "text-muted";

  if (status === "done") {
    return (
      <div className="w-full border border-accent flex items-center px-5 py-5 min-h-[64px] gap-3">
        <span className="w-2 h-2 bg-accent flex-shrink-0" />
        <span className="font-mono text-sm text-accent tracking-[0.05em] uppercase">
          You&apos;re on the list. We&apos;ll be in touch.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`w-full ${containerBg} border ${borderColor} focus-within:border-accent transition-colors flex flex-col md:flex-row overflow-hidden`}
      >
        <div className="flex-grow flex items-center px-4 min-h-[64px]">
          <span className="font-mono text-accent text-sm w-3 flex-shrink-0 mr-3 select-none">
            _
          </span>
          <input
            type="email"
            required
            disabled={status === "submitting"}
            placeholder="Enter your email…"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full bg-transparent ${textColor} font-mono text-sm sm:text-base ${placeholderColor} focus:outline-none`}
            autoComplete="email"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting" || !email.trim()}
          className={`border-t md:border-t-0 md:border-l ${borderColor} ${buttonBase} font-mono text-xs md:text-sm uppercase tracking-[0.15em] px-7 py-5 min-h-[64px] transition-colors whitespace-nowrap flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {status === "submitting" ? (
            <span className={submittingMutedColor}>Submitting…</span>
          ) : (
            <>
              Join Waitlist
              <span className="font-sans text-lg leading-none">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
