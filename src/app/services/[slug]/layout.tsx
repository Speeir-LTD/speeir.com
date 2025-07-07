import { Metadata } from "next";
import { services } from "@/data/services";

interface ServiceLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Speeir",
      description: "The service you're looking for doesn't exist.",
    };
  }

  return {
    title: `${service.title} | Speeir - Professional Development Services`,
    description: service.longDescription || service.description,
    keywords: [
      service.title.toLowerCase(),
      "software development",
      "web development", 
      "mobile development",
      "speeir",
      "ireland",
      "technology solutions"
    ],
    openGraph: {
      title: `${service.title} | Speeir`,
      description: service.longDescription || service.description,
      url: `https://speeir.com/services/${slug}`,
      siteName: "Speeir",
      images: [
        {
          url: "/images/services/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${service.title} - Speeir Services`,
        },
      ],
      locale: "en_IE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Speeir`,
      description: service.longDescription || service.description,
      images: ["/images/services/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://speeir.com/services/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return <>{children}</>;
}
