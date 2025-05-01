import { services } from "@/data/services";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Await the params promise first
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Speeir",
      description: "The service you're looking for doesn't exist or has been moved.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${service.title} | Speeir`,
    description: service.longDescription,
    alternates: {
      canonical: `https://speeir.com/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Speeir`,
      description: service.longDescription,
      url: `https://speeir.com/services/${slug}`,
      type: 'website',
      images: [
        {
          url: `https://speeir.com/images/logo/logo.svg`,
          width: 1200,
          height: 630,
          alt: `${service.title} image`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}