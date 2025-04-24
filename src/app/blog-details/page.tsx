import { Metadata } from "next";
import BlogDetailsClient from "./BlogDetailsClient";

interface PageProps {
    searchParams?: Promise<{ id?: string }>;
  }

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { id?: string };
}): Promise<Metadata> {
  const id = await searchParams?.id;

  if (!id) {
    return {
      title: "Blog Not Found | Speeir",
      robots: "noindex, nofollow"
    };
  }

  try {
    const res = await fetch(`https://speeir.com/api/blog/${id}`);
    const blog = await res.json();

    return {
      title: `${blog.data.title} | Speeir`,
      description: blog.data.description,
      openGraph: {
        title: `${blog.data.title} | Speeir`,
        description: blog.data.description,
        url: `https://speeir.com/blog-details?id=${id}`,
        type: "article",
      },
      alternates: {
        canonical: `https://speeir.com/blog-details?id=${id}`,
      },
    };
  } catch (error) {
    return {
      title: "Blog Error | Speeir",
      robots: "noindex, nofollow"
    };
  }
}

export default async function BlogDetailsPage({
    searchParams,
  }: PageProps) {
    return <BlogDetailsClient />;
  }
