import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { SECTIONS } from "@/data/portfolio";
import { getDb } from "@/utils/dbConnect";
import type { BlogPost } from "@/types/post";
import { SITE_URL } from "@/lib/metadata";

async function getBlogPages() {
  // Best-effort: a missing/unreachable database shouldn't fail the whole
  // sitemap (or the build, since this runs at build time too).
  try {
    const db = await getDb();
    const posts = await db
      .collection<BlogPost>("posts")
      .find({ status: "published" })
      .project({ slug: 1, updatedAt: 1 })
      .toArray();

    return posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const pages = [
    "",
    "/about",
    "/services",
    "/work",
    "/case-studies",
    "/blog",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const detailPages = [
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...Object.values(SECTIONS).flatMap((section) =>
      section.items.map((item) => ({
        url: `${SITE_URL}${section.path}/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    ),
  ];

  return [...pages, ...detailPages, ...(await getBlogPages())];
}
