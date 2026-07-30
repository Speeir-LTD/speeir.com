import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies | Speeir",
  description: "Client and brand work delivered by Speeir.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies | Speeir",
    description: "Client and brand work delivered by Speeir.",
    url: new URL("https://speeir.com/case-studies"),
    siteName: "Speeir",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Speeir",
    description: "Client and brand work delivered by Speeir.",
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Case Studies
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Brands we&apos;ve worked with
        </h1>
      </div>

      {caseStudies.length === 0 ? (
        <div className="group relative mx-auto mt-16 flex max-w-lg flex-col items-center rounded-2xl border border-dashed border-border/40 bg-white p-14 text-center shadow-md">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-2xl bg-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkle size={20} weight="duotone" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-ink">
              Case studies coming soon
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We&apos;re putting together the brands we&apos;ve worked with.
              Check back shortly, or see what we can build for you.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <Link
              key={item.id}
              href={`/case-studies/${item.slug}`}
              className="group relative flex flex-col rounded-2xl border border-border/40 bg-white p-6 shadow-md transition-transform hover:-translate-y-1"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-2xl bg-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative z-10 flex flex-1 flex-col">
                {item.images[0] && (
                  <div className="mb-5 overflow-hidden rounded-xl border border-border/40">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={640}
                      height={400}
                      className="h-auto w-full"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">
                  {item.summary}
                </p>
                {item.tags.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  View case study
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
