import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { faqs } from "@/data/faqs";
import { Eyebrow, FaqAccordion } from "@/components/ui/primitives";
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

      <div className="mx-auto mt-16 max-w-2xl">
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  );
}
