import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";
import { Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "What Speeir builds: web, mobile, custom software, e-commerce, and more.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Services</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          What we build
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Six disciplines, one team: from first line of code to the support
          that keeps it running.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
