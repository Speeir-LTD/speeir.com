import { services } from "@/data/services";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Speeir",
      description: "The service you're looking for doesn't exist or has been moved.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `${service.title} | Speeir`,
    description: service.longDescription,
    alternates: {
      canonical: `https://speeir.com/services/${(await params).slug}`,
    },
    openGraph: {
      title: `${service.title} | Speeir`,
      description: service.longDescription,
      url: `https://speeir.com/services/${(await params).slug}`,
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