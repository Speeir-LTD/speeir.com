import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
        crawlDelay: 10,
      },
    ],
    sitemap: "https://speeir.com/sitemap.xml",
    host: "https://speeir.com",
  };
}
