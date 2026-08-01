import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import { ObjectId } from "mongodb";
import { getDb } from "@/utils/dbConnect";
import type { BlogPost } from "@/types/post";
import { readingTime } from "@/utils/readingTime";
import { PostCover } from "@/components/Blog/PostCover";
import { getUnsplashCover } from "@/utils/unsplash";

export const dynamic = "force-dynamic";

async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  const post = await db.collection<BlogPost>("posts").findOne({ slug, status: "published" });
  if (!post) return null;

  await db.collection("posts").updateOne({ _id: post._id as ObjectId }, { $inc: { views: 1 } });

  return { ...post, _id: post._id.toString() };
}

async function getOtherPublishedPosts(excludeSlug: string, limit = 2): Promise<BlogPost[]> {
  const db = await getDb();
  const posts = await db
    .collection<BlogPost>("posts")
    .find({ status: "published", slug: { $ne: excludeSlug } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return posts.map((post) => ({ ...post, _id: post._id.toString() }));
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

  const morePosts = await getOtherPublishedPosts(slug);

  let cover = post.coverImage;
  let coverCredit = post.coverImageCredit;
  if (!cover) {
    const photo = await getUnsplashCover(post.tags[0] || post.title, post.slug);
    if (photo) {
      cover = photo.url;
      coverCredit = photo.credit;
    }
  }

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

      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
        >
          <ArrowLeft size={14} />
          All posts
        </Link>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          <span>{post.author}</span>
          <span aria-hidden="true">&middot;</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span aria-hidden="true">&middot;</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            {readingTime(post.content)} min read
          </span>
        </div>

        {post.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
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

        <div className="mt-8 overflow-hidden rounded-2xl shadow-md">
          <PostCover seed={post.slug} title={post.title} image={cover} credit={coverCredit} showCredit />
        </div>

        <div className="prose prose-neutral mt-12 max-w-none prose-headings:font-semibold prose-headings:text-ink prose-p:text-muted prose-a:text-primary prose-strong:text-ink">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="mx-auto mt-20 max-w-3xl rounded-2xl border border-border/40 bg-white p-8 text-center shadow-md">
          <h2 className="text-xl font-semibold text-ink">Have a project in mind?</h2>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Start a project
            <ArrowRight size={16} />
          </Link>
        </div>

        {morePosts.length > 0 && (
          <div className="mx-auto mt-20 max-w-3xl border-t border-border/40 pt-12 pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              More from the blog
            </p>
            <ul className="mt-6 space-y-6">
              {morePosts.map((other) => (
                <li key={other._id.toString()}>
                  <Link href={`/blog/${other.slug}`} className="group flex items-center justify-between gap-4">
                    <span>
                      <span className="block font-medium text-ink group-hover:text-primary">
                        {other.title}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {new Date(other.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
