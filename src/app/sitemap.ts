import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { work } from "@/data/work";

const SITE_URL = "https://speeir.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = ["", "/about", "/services", "/work", "/contact"].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const servicePages = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const workPages = work.map((item) => ({
    url: `${SITE_URL}/work/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pages, ...servicePages, ...workPages];
}
