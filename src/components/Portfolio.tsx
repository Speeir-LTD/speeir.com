import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowSquareOut, Sparkle } from "@phosphor-icons/react/dist/ssr";
import type { PortfolioItem, Section } from "@/data/portfolio";
import { breadcrumbs } from "@/lib/metadata";
import { CTA_CLASS, CTA_SM_CLASS } from "@/lib/utils";
import { BackLink, CTACard, Eyebrow } from "@/components/ui/primitives";

const TAG_CLASS =
  "rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary";

function Tags({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={`mt-5 flex flex-wrap gap-2 ${className ?? ""}`}>
      {tags.map((tag) => (
        <li key={tag} className={TAG_CLASS}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function PortfolioList({ section }: { section: Section }) {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {section.heading}
        </h1>
      </div>

      {section.items.length === 0 ? (
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
              {section.emptyHeading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {section.emptyBody}
            </p>
            <Link href="/contact" className={`mt-6 ${CTA_SM_CLASS}`}>
              Start a project
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item) => (
            <Link
              key={item.slug}
              href={`${section.path}/${item.slug}`}
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
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{item.summary}</p>
                <Tags tags={item.tags} />
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {section.itemCta}
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

export function PortfolioDetail({
  section,
  item,
}: {
  section: Section;
  item: PortfolioItem;
}) {
  const [cover, ...gallery] = item.images;
  const paragraphs = item.caseStudy?.split(/\n\s*\n/).filter(Boolean) ?? [];

  const structuredData = {
    "@context": "https://schema.org",
    ...breadcrumbs([
      { name: section.eyebrow, path: section.path },
      { name: item.title, path: `${section.path}/${item.slug}` },
    ]),
  };

  return (
    <div className="container py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BackLink href={section.path}>{section.backLabel}</BackLink>

      <div className="mx-auto mt-8 max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {item.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{item.summary}</p>

        <Tags tags={item.tags} className="mt-6 justify-center" />

        {item.liveUrl && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 ${CTA_CLASS}`}
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

      <CTACard heading={`Want something like ${item.title}?`} />
    </div>
  );
}
