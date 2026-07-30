import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseStudyBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.title} | Speeir`,
    description: item.summary,
    alternates: {
      canonical: `/case-studies/${slug}`,
    },
    openGraph: {
      title: `${item.title} | Speeir`,
      description: item.summary,
      url: new URL(`https://speeir.com/case-studies/${slug}`),
      siteName: "Speeir",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Speeir`,
      description: item.summary,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCaseStudyBySlug(slug);
  if (!item) notFound();

  const [cover, ...gallery] = item.images;
  const paragraphs = item.caseStudy?.split(/\n\s*\n/).filter(Boolean) ?? [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Case Studies",
        item: "https://speeir.com/case-studies",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: item.title,
        item: `https://speeir.com/case-studies/${slug}`,
      },
    ],
  };

  return (
    <div className="container py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft size={14} />
        All case studies
      </Link>

      <div className="mx-auto mt-8 max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {item.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {item.summary}
        </p>

        {item.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {item.liveUrl && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Visit {item.title}
            <ArrowSquareOut size={16} />
          </a>
        )}
      </div>

      {cover && (
        <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-border/40 shadow-md">
          <Image
            src={cover}
            alt={item.title}
            width={1600}
            height={900}
            priority
            className="h-auto w-full"
          />
        </div>
      )}

      {paragraphs.length > 0 && (
        <div className="mx-auto mt-16 max-w-2xl space-y-5">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {gallery.length > 0 && (
        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
          {gallery.map((src) => (
            <div
              key={src}
              className="overflow-hidden rounded-2xl border border-border/40 shadow-md"
            >
              <Image
                src={src}
                alt={item.title}
                width={800}
                height={600}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mx-auto mt-20 max-w-2xl rounded-2xl border border-border/40 bg-white p-8 text-center shadow-md">
        <h2 className="text-xl font-semibold text-ink">
          Want something like {item.title}?
        </h2>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Start a project
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
