import type { Metadata } from "next";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ | Speeir",
  description: "Answers to common questions about Speeir, our services, and how we work.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | Speeir",
    description: "Answers to common questions about Speeir, our services, and how we work.",
    url: new URL("https://speeir.com/faq"),
    siteName: "Speeir",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Speeir",
    description: "Answers to common questions about Speeir, our services, and how we work.",
  },
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          FAQ
        </p>
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
