import { services } from "@/data/services";
import { Metadata } from "next";
import React from "react";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata>  {
  const service = services.find(async s => s.slug === (await params).slug);

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