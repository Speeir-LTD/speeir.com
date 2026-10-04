import Image from "next/image";
import Link from "next/link";
import {
  AppleLogo,
  ArrowRight,
  Check,
  CheckCircle,
  Circle,
  GooglePlayLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { breadcrumbs } from "@/lib/metadata";
import { cn, CTA_CLASS } from "@/lib/utils";
import { BackLink, Eyebrow, FaqAccordion, Glow } from "@/components/ui/primitives";
import { JsonLd } from "@/components/ui/json-ld";

type Point = { icon: Icon; title: string; body: string };

export interface Product {
  slug: string;
  name: string;
  metaDescription: string;
  logo: string;
  /** schema.org applicationCategory, e.g. "HealthApplication". */
  category: string;
  /** Share-card image; falls back to the generated OG card. */
  ogImage?: { url: string; width: number; height: number };
  /** The product's own brand colour (6-digit hex). Tints washes and glows only; UI accents stay Speeir purple. */
  brand: string;
  hero: {
    heading: string;
    lead: string;
    status: string[];
    primaryCta: { label: string; href: string };
    stores: { appStore: string; googlePlay: string };
    screens: { src: string; alt: string }[];
  };
  facts: { value: string; label: string }[];
  problem: { eyebrow: string; heading: string; body: string; points: Point[] };
  steps: { heading: string; items: { title: string; body: string }[] };
  audiences: { icon: Icon; eyebrow: string; heading: string; image: string; points: string[] }[];
  features: { eyebrow: string; heading: string; items: Point[] };
  engineering: { eyebrow: string; heading: string; body: string; stack: string[]; trust: Point[] };
  roadmap?: {
    eyebrow: string;
    heading: string;
    body: string;
    stages: { state: "done" | "now" | "next"; label: string; title: string; points: string[] }[];
  };
  invites: {
    eyebrow: string;
    heading: string;
    body: string;
    items: (Point & { cta: string; href: string })[];
  };
  faqs: { question: string; answer: string }[];
  closing: { heading: string; body: string };
}

const SECONDARY_CLASS =
  "inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md";

const CARD_CLASS =
  "group relative rounded-2xl border border-border/40 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_40px_-8px_rgba(161,95,220,0.18)] md:p-7";

/** Contact form link with the enquiry pre-labelled. */
export const contactHref = (subject: string) => `/contact?subject=${encodeURIComponent(subject)}`;

const isExternal = (href: string) => href.startsWith("http");

/** Soft radial wash of the product colour; `a` is a 2-digit hex alpha. */
const wash = (brand: string, at: string, a = "24") =>
  `radial-gradient(60% 60% at ${at}, ${brand}${a} 0%, transparent 70%)`;

function SectionIntro({ eyebrow, heading, body }: { eyebrow: string; heading: string; body?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {heading}
      </h2>
      {body && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{body}</p>}
    </div>
  );
}

function IconChip({ icon: IconCmp, className }: { icon: Icon; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary",
        className
      )}
    >
      <IconCmp size={22} weight="duotone" />
    </span>
  );
}

function Phone({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-[2rem] border-[6px] border-ink bg-ink shadow-2xl", className)}>
      <Image src={src} alt={alt} width={460} height={1000} priority={priority} className="h-auto w-full" />
    </div>
  );
}

/** Icon beside the text on phones (keeps the page short), stacked above it from md up. */
function PointCard({ point }: { point: Point }) {
  return (
    <div className={CARD_CLASS}>
      <Glow />
      <div className="relative z-10 flex gap-4 md:block">
        <IconChip icon={point.icon} />
        <div>
          <h3 className="text-lg font-semibold text-ink md:mt-5">{point.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted md:mt-2">{point.body}</p>
        </div>
      </div>
    </div>
  );
}

function StoreButtons({ stores }: { stores: Product["hero"]["stores"] }) {
  return (
    <>
      <a href={stores.appStore} target="_blank" rel="noopener noreferrer" className={SECONDARY_CLASS}>
        <AppleLogo size={18} weight="fill" />
        App Store
      </a>
      <a href={stores.googlePlay} target="_blank" rel="noopener noreferrer" className={SECONDARY_CLASS}>
        <GooglePlayLogo size={18} weight="fill" />
        Google Play
      </a>
    </>
  );
}

function PrimaryCta({ cta }: { cta: Product["hero"]["primaryCta"] }) {
  return (
    <Link
      href={cta.href}
      {...(isExternal(cta.href) && { target: "_blank", rel: "noopener noreferrer" })}
      className={CTA_CLASS}
    >
      {cta.label}
      <ArrowRight size={16} />
    </Link>
  );
}

function PulseDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
    </span>
  );
}

export function ProductShowcase({ product: p }: { product: Product }) {
  const path = `/work/${p.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: p.name,
        description: p.metaDescription,
        applicationCategory: p.category,
        operatingSystem: "iOS, Android",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        publisher: { "@type": "Organization", name: "Speeir", url: "https://speeir.com" },
        downloadUrl: [p.hero.stores.appStore, p.hero.stores.googlePlay],
      },
      breadcrumbs([
        { name: "Products", path: "/work" },
        { name: p.name, path },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />

      {/* Hero */}
      <section
        className="overflow-hidden py-20 md:py-28"
        style={{ backgroundImage: `${wash(p.brand, "85% 30%", "2e")}, ${wash(p.brand, "0% 100%", "14")}` }}
      >
        <div className="container">
          <BackLink href="/work">All products</BackLink>
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <Image src={p.logo} alt={p.name} width={400} height={100} priority className="h-8 w-auto" />
                <span className="h-6 w-px bg-border/60" aria-hidden="true" />
                <Eyebrow>by Speeir</Eyebrow>
              </div>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
                {p.hero.heading}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{p.hero.lead}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.hero.status.map((s, i) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-ink ring-1 ring-border/40"
                  >
                    {i === 0 && <PulseDot />}
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <PrimaryCta cta={p.hero.primaryCta} />
                <StoreButtons stores={p.hero.stores} />
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[16rem] items-start justify-center sm:max-w-md">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-6 rounded-full blur-3xl"
                style={{ backgroundColor: `${p.brand}40` }}
              />
              <Phone
                src={p.hero.screens[0].src}
                alt={p.hero.screens[0].alt}
                priority
                className="relative z-10 w-1/2 -rotate-3"
              />
              <Phone
                src={p.hero.screens[1].src}
                alt={p.hero.screens[1].alt}
                priority
                className="relative mt-16 -ml-8 w-1/2 rotate-3"
              />
            </div>
          </div>

          {/* Facts */}
          <dl className="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:gap-6 lg:grid-cols-4">
            {p.facts.map((f) => (
              <div
                key={f.label}
                className="flex flex-col-reverse rounded-2xl border border-border/40 bg-white p-5 shadow-md md:p-6"
              >
                <dt className="mt-1 text-xs leading-snug text-muted md:text-sm">{f.label}</dt>
                <dd className="text-2xl font-bold tracking-tight text-ink md:text-3xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Problem */}
      <section className="p-4 md:p-6">
        <div className="rounded-3xl bg-white py-20 md:py-28">
          <div className="container">
            <SectionIntro {...p.problem} />
            <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
              {p.problem.points.map((pt) => (
                <PointCard key={pt.title} point={pt} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works: a numbered timeline, vertical on phones, horizontal from lg */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionIntro eyebrow="How it works" heading={p.steps.heading} />
          <div className="relative mx-auto mt-14 max-w-5xl">
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-primary/40 to-primary/5 lg:bottom-auto lg:left-[12.5%] lg:right-[12.5%] lg:top-5 lg:h-px lg:w-auto lg:bg-gradient-to-r"
            />
            <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
              {p.steps.items.map((step, i) => (
                <li key={step.title} className="flex gap-5 lg:flex-col lg:items-center lg:text-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-white text-sm font-semibold text-primary shadow-sm">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink lg:mt-5">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Two sides of the marketplace */}
      <section className="p-4 md:p-6">
        <div className="rounded-3xl bg-white py-20 md:py-28">
          <div className="container space-y-20 md:space-y-28">
            {p.audiences.map((a, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={a.eyebrow}
                  className={cn(
                    "mx-auto grid max-w-5xl items-center gap-12 md:gap-20",
                    flip ? "md:grid-cols-[16rem_1fr]" : "md:grid-cols-[1fr_16rem]"
                  )}
                >
                  <div className={cn(flip && "md:order-2")}>
                    <div className="flex items-center gap-3">
                      <IconChip icon={a.icon} className="h-9 w-9" />
                      <Eyebrow>{a.eyebrow}</Eyebrow>
                    </div>
                    <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                      {a.heading}
                    </h2>
                    <ul className="mt-8 space-y-4">
                      {a.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-base leading-relaxed text-muted">
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check size={12} weight="bold" />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={cn("relative mx-auto w-56 md:w-full", flip && "md:order-1")}>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-8 rounded-full blur-3xl"
                      style={{ backgroundColor: `${p.brand}33` }}
                    />
                    <Phone src={a.image} alt={`${p.name} ${a.eyebrow.toLowerCase()} screen`} className="relative" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionIntro eyebrow={p.features.eyebrow} heading={p.features.heading} />
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3">
            {p.features.items.map((pt) => (
              <PointCard key={pt.title} point={pt} />
            ))}
          </div>
        </div>
      </section>

      {/* Engineering & trust: the page's one dark break */}
      <section className="p-4 md:p-6">
        <div className="rounded-3xl bg-ink py-20 text-white md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>{p.engineering.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {p.engineering.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">{p.engineering.body}</p>
            </div>
            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
              {p.engineering.stack.map((s) => (
                <li key={s} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
              {p.engineering.trust.map(({ icon: IconCmp, title, body }) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:block">
                  <IconCmp size={24} weight="duotone" className="shrink-0 text-primary" />
                  <div>
                    <h3 className="text-base font-semibold sm:mt-4">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      {p.roadmap && (
        <section className="py-20 md:py-28">
          <div className="container">
            <SectionIntro {...p.roadmap} />
            <ol className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3 md:gap-6">
              {p.roadmap.stages.map((stage) => (
                <li
                  key={stage.label}
                  className={cn(
                    "rounded-2xl border bg-white p-6 shadow-md md:p-7",
                    stage.state === "now" ? "border-primary/40 ring-1 ring-primary/20" : "border-border/40",
                    stage.state === "next" && "border-dashed"
                  )}
                >
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {stage.state === "done" && <CheckCircle size={16} weight="fill" />}
                    {stage.state === "now" && <PulseDot />}
                    {stage.state === "next" && <Circle size={16} />}
                    {stage.label}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{stage.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {stage.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Invites: shops, investors, co-founders, clients */}
      <section className="p-4 md:p-6">
        <div className="rounded-3xl bg-white py-20 md:py-28">
          <div className="container">
            <SectionIntro eyebrow={p.invites.eyebrow} heading={p.invites.heading} body={p.invites.body} />
            <div
              className={cn(
                "mx-auto mt-12 grid gap-4 md:mt-14 md:gap-6",
                { 1: "max-w-2xl", 3: "max-w-6xl md:grid-cols-3" }[p.invites.items.length] ??
                  "max-w-5xl md:grid-cols-2"
              )}
            >
              {p.invites.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  {...(isExternal(item.href) && { target: "_blank", rel: "noopener noreferrer" })}
                  className={cn(CARD_CLASS, "flex flex-col")}
                >
                  <Glow />
                  <div className="relative z-10 flex flex-1 flex-col">
                    <div className="flex items-center gap-4">
                      <IconChip icon={item.icon} />
                      <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {item.cta}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionIntro eyebrow="FAQ" heading={`Questions about ${p.name}`} />
          <div className="mx-auto mt-12 max-w-3xl md:mt-14">
            <FaqAccordion faqs={p.faqs} />
          </div>
        </div>
      </section>

      {/* Closing call to action, tinted with the product colour */}
      <section className="px-4 pb-20 md:px-6 md:pb-28">
        <div
          className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/40 bg-white px-6 py-16 text-center shadow-md md:py-20"
          style={{ backgroundImage: `${wash(p.brand, "50% 0%", "33")}, ${wash(p.brand, "100% 100%", "1a")}` }}
        >
          <Image src={p.logo} alt={p.name} width={400} height={100} className="mx-auto h-8 w-auto" />
          <h2 className="mx-auto mt-8 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            {p.closing.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{p.closing.body}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PrimaryCta cta={p.hero.primaryCta} />
            <StoreButtons stores={p.hero.stores} />
          </div>
          <p className="mt-8 text-sm text-muted">
            Questions?{" "}
            <a href="mailto:info@speeir.com" className="font-medium text-primary hover:underline">
              info@speeir.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
