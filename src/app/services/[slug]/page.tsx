import type { Metadata } from "next";
import { breadcrumbs, pageMeta } from "@/lib/metadata";
import { BackLink, CTACard, Eyebrow, FaqAccordion } from "@/components/ui/primitives";
import { notFound } from "next/navigation";
import { Check, ListChecks, Flag, Question } from "@phosphor-icons/react/dist/ssr";
import { services, getServiceBySlug } from "@/data/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ServiceCard } from "@/components/ServiceCard";
import { JsonLd } from "@/components/ui/json-ld";
import { StatsGrid } from "@/components/StatsGrid";
import { STATS } from "@/data/stats";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return pageMeta({
    title: service.title,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@type": "Organization", name: "Speeir", url: "https://speeir.com" },
        areaServed: "IE",
        url: `https://speeir.com/services/${slug}`,
      },
      breadcrumbs([
        { name: "Services", path: "/services" },
        { name: service.title, path: `/services/${slug}` },
      ]),
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="container py-20 md:py-28">
      <JsonLd data={structuredData} />
      <BackLink href="/services">All services</BackLink>

      <div className="mx-auto mt-8 max-w-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ServiceIcon name={service.icon} size={26} />
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {service.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {service.longDescription}
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <StatsGrid stats={STATS} />
      </div>

      <div className="mx-auto mt-20 grid max-w-4xl gap-6 md:grid-cols-2 md:items-start">
        <div className="rounded-2xl border border-border/40 bg-white p-8 shadow-md transition-shadow duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ListChecks size={18} weight="duotone" />
            </div>
            <h2 className="text-lg font-semibold text-ink">Benefits</h2>
          </div>
          <ul className="mt-2 divide-y divide-border/40">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3.5 py-4 text-sm text-muted">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Check size={14} weight="bold" />
                </span>
                <span className="pt-1">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border/40 bg-white p-8 shadow-md transition-shadow duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Flag size={18} weight="duotone" />
            </div>
            <h2 className="text-lg font-semibold text-ink">Our process</h2>
          </div>
          <div className="relative mt-6">
            <div
              aria-hidden="true"
              className="absolute bottom-5 left-5 top-5 w-px bg-border"
            />
            <ol className="space-y-6">
              {service.process.map((step, index) => {
                const isLast = index === service.process.length - 1;
                return (
                  <li key={step.title} className="flex gap-4">
                    <span
                      className={cn(
                        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                        isLast
                          ? "bg-primary text-white"
                          : "border-2 border-primary/20 bg-white text-primary"
                      )}
                    >
                      {isLast ? <Check size={16} weight="bold" /> : index + 1}
                    </span>
                    <div className="pt-2">
                      <p className="text-sm font-semibold text-ink">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Question size={18} weight="duotone" />
          </div>
          <h2 className="text-lg font-semibold text-ink">
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-5">
          <FaqAccordion faqs={service.faqs} />
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-4xl">
        <Eyebrow className="text-center">Explore more</Eyebrow>
        <h2 className="mt-2 text-center text-lg font-semibold text-ink">
          Related services
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {related.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>

      <CTACard heading={`Ready to talk ${service.title.toLowerCase()}?`} />
    </div>
  );
}
