import { services } from "@/data/services";
import { Metadata } from "next";

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Speeir",
      description: "The service you're looking for doesn't exist or has been moved.",
      keywords: "service not found, Speeir",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `${service.title} | Speeir`,
    description: service.longDescription,
    keywords: `${service.title.toLowerCase()}, IT solutions, Ireland, Speeir`,
    robots: "index, follow",
  };
};