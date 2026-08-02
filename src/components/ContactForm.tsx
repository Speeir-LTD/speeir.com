"use client";

import { useState } from "react";
import { ArrowRight, Spinner } from "@phosphor-icons/react";
import { cn, CTA_CLASS } from "@/lib/utils";

const inputClasses =
  "w-full rounded-xl border border-border/40 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border/40 bg-white p-10 text-center shadow-md">
        <p className="text-base font-semibold text-ink">
          Thanks for reaching out.
        </p>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border/40 bg-white p-8 shadow-md md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input id="name" name="name" type="text" required className={`mt-2 ${inputClasses}`} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" required className={`mt-2 ${inputClasses}`} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`mt-2 ${inputClasses}`}
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className={cn(CTA_CLASS, "mt-6 disabled:cursor-not-allowed disabled:opacity-60")}
      >
        {sending && <Spinner size={16} className="animate-spin" />}
        {sending ? "Sending..." : "Send message"}
        {!sending && <ArrowRight size={16} />}
      </button>
    </form>
  );
}
