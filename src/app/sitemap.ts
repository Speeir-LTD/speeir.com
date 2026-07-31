import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { work } from "@/data/work";
import { caseStudies } from "@/data/case-studies";
import { getDb } from "@/utils/dbConnect";
import type { BlogPost } from "@/types/post";

const SITE_URL = "https://speeir.com";

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
  ].map((path) => ({
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

  const caseStudyPages = caseStudies.map((item) => ({
    url: `${SITE_URL}/case-studies/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = await getBlogPages();

  return [...pages, ...servicePages, ...workPages, ...caseStudyPages, ...blogPages];
}
