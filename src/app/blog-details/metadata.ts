// src/app/blog-details/metadata.ts
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(`/api/blog/${params.id}`);
  const blog = await res.json();

  if (!res.ok || !blog.data) {
    return {
      title: "Blog Not Found | Speeir",
      description: "The blog post you're looking for doesn't exist or has been removed.",
      keywords: "blog, website development, application development, software solutions",
      robots: "noindex, nofollow",
    };
  }

  const { title, description, tags } = blog.data;

  return {
    title: `${title} | Speeir`,
    description: description || "Read in-depth articles and insights on various topics from Speeir's blog.",
    keywords: tags ? tags.join(", ") : "blog, speeir, insights, articles",
    robots: "index, follow",
    openGraph: {
      title: `${title} | Speeir`,
      description: description || "Explore detailed insights and articles on various topics.",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog-details/${params.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Speeir`,
      description: description || "Explore detailed insights and articles on various topics.",
    },
  };
}