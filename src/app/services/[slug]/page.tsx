import type { Metadata } from "next";
import { breadcrumbs, pageMeta } from "@/lib/metadata";
import { BackLink, CTACard } from "@/components/ui/primitives";
import { notFound } from "next/navigation";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { services, getServiceBySlug } from "@/data/services";
import { ServiceIcon } from "@/components/ServiceIcon";

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
    ],
  };

  return (
    <div className="container py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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

      <div className="mx-auto mt-16 grid max-w-4xl gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-ink">
            Benefits
          </h2>
          <ul className="mt-5 space-y-3">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-muted">
                <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink">
            Our process
          </h2>
          <ol className="mt-5 space-y-5">
            {service.process.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <CTACard heading={`Ready to talk ${service.title.toLowerCase()}?`} />
    </div>
  );
}
