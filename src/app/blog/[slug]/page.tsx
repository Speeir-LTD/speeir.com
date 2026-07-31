import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ObjectId } from "mongodb";
import { getDb } from "@/utils/dbConnect";
import type { BlogPost } from "@/types/post";

export const dynamic = "force-dynamic";

async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  const post = await db.collection<BlogPost>("posts").findOne({ slug, status: "published" });
  if (!post) return null;

  await db.collection("posts").updateOne({ _id: post._id as ObjectId }, { $inc: { views: 1 } });

  return { ...post, _id: post._id.toString() };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const db = await getDb();
  const post = await db.collection<BlogPost>("posts").findOne({ slug, status: "published" });
  if (!post) return {};

  const description = post.content.replace(/[#*_`>-]/g, "").slice(0, 160);

  return {
    title: `${post.title} | Speeir`,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Speeir`,
      description,
      url: new URL(`https://speeir.com/blog/${slug}`),
      siteName: "Speeir",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Speeir`,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        author: { "@type": "Person", name: post.author },
        datePublished: new Date(post.createdAt).toISOString(),
        dateModified: new Date(post.updatedAt).toISOString(),
        publisher: { "@type": "Organization", name: "Speeir", url: "https://speeir.com" },
        url: `https://speeir.com/blog/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Blog", item: "https://speeir.com/blog" },
          { "@type": "ListItem", position: 2, name: post.title, item: `https://speeir.com/blog/${slug}` },
        ],
      },
    ],
  };

  return (
    <div className="container py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft size={14} />
        All posts
      </Link>

      <div className="mx-auto mt-8 max-w-2xl text-center">
        <p className="text-xs text-muted">
          {post.author} &middot;{" "}
          {new Date(post.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {post.title}
        </h1>

        {post.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="prose prose-neutral mx-auto mt-16 max-w-2xl prose-headings:font-semibold prose-headings:text-ink prose-p:text-muted prose-a:text-primary prose-strong:text-ink">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="mx-auto mt-20 max-w-2xl rounded-2xl border border-border/40 bg-white p-8 text-center shadow-md">
        <h2 className="text-xl font-semibold text-ink">Have a project in mind?</h2>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Start a project
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
