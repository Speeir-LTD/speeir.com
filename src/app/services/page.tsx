import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Services | Speeir",
  description: "What Speeir builds: web, mobile, custom software, e-commerce, and more.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Speeir",
    description: "What Speeir builds: web, mobile, custom software, e-commerce, and more.",
    url: new URL("https://speeir.com/services"),
    siteName: "Speeir",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Speeir",
    description: "What Speeir builds: web, mobile, custom software, e-commerce, and more.",
  },
};

export default function ServicesPage() {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Services
        </p>
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
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
