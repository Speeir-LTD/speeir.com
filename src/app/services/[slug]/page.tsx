import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
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
  return {
    title: `${service.title} — Speeir`,
    description: service.description,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} — Speeir`,
      description: service.description,
      url: new URL(`https://speeir.com/services/${slug}`),
      siteName: "Speeir",
      type: "website",
      images: [
        {
          url: new URL("https://speeir.com/logo.svg"),
          width: 1200,
          height: 630,
          alt: `${service.title} | Speeir`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — Speeir`,
      description: service.description,
      images: ["https://speeir.com/logo.svg"],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="container py-20 md:py-28">
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft size={14} />
        All services
      </Link>

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

      <div className="mx-auto mt-20 max-w-2xl rounded-2xl border border-border/40 bg-white p-8 text-center shadow-md">
        <h2 className="text-xl font-semibold text-ink">
          Ready to talk {service.title.toLowerCase()}?
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
