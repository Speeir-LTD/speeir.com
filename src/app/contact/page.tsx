import type { Metadata } from "next";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Speeir",
  description: "Tell us what you're building.",
};

export default function ContactPage() {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Let&apos;s build something
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d build it.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <ContactForm />

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
          <EnvelopeSimple size={14} />
          Prefer email? Reach us at{" "}
          <a href="mailto:info@speeir.com" className="font-medium text-primary">
            info@speeir.com
          </a>
        </p>
      </div>
    </div>
  );
}
