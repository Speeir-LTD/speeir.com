import { Metadata } from "next";
import BlogDetailsClient from "./BlogDetailsClient";
import { toPlainText } from "@/utils/markdown";

const SITE_URL = process.env.BASE_URL || "https://speeir.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/blog/og-image.jpg`;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}): Promise<Metadata> {
  const { id } = await searchParams;

  if (!id) {
    return {
      // Root layout applies a "%s | Speeir" title template — don't append
      // "| Speeir" here too, or it renders twice.
      title: "Blog Not Found",
      description: "We couldn't find the blog you're looking for.",
      robots: "noindex, nofollow",
    };
  }

  try {
    const res = await fetch(`${SITE_URL}/api/blog/${id}`, {
      next: { revalidate: 60 }, // Optional: cache for 60s
    });
    const blog = await res.json();
    const { title, content, author, createdAt } = blog.data;
    const description = toPlainText(content, 160);
    const socialTitle = `${title} | Speeir`;

    const blogUrl = `${SITE_URL}/blog-details?id=${id}`;

    return {
      title, // root layout's title template appends "| Speeir"
      description,
      alternates: {
        canonical: blogUrl,
      },
      openGraph: {
        type: "article",
        title: socialTitle,
        description,
        url: blogUrl,
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
        publishedTime: createdAt,
        authors: [author],
      },
      twitter: {
        card: "summary_large_image",
        title: socialTitle,
        description,
        images: [DEFAULT_OG_IMAGE],
      },
    };
  } catch (error) {
    return {
      title: "Blog Error",
      description: "An error occurred while loading the blog.",
      robots: "noindex, nofollow",
    };
  }
}

export default async function BlogDetailsPage() {
    return <BlogDetailsClient />;
  }
