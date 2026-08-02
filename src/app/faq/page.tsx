import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { faqs } from "@/data/faqs";
import { Eyebrow } from "@/components/ui/primitives";
import { JsonLd } from "@/components/ui/json-ld";

export const metadata: Metadata = pageMeta({
  title: "FAQ",
  description:
    "Answers to common questions about Speeir, our services, and how we work.",
  path: "/faq",
});

export default function FaqPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="container py-20 md:py-28">
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>FAQ</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Answers to common questions about Speeir, our services, and how we
          work.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl divide-y divide-border/40 rounded-2xl border border-border/40 bg-white shadow-md">
        {faqs.map((faq) => (
          <details key={faq.question} className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink marker:content-none">
              {faq.question}
              <span className="shrink-0 text-primary transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
