import type { Metadata } from "next";
import { breadcrumbs, pageMeta } from "@/lib/metadata";
import { cn, PROSE_CLASS } from "@/lib/utils";
import { BackLink, CTACard, Eyebrow } from "@/components/ui/primitives";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Clock, Eye } from "@phosphor-icons/react/dist/ssr";
import { getDb } from "@/utils/dbConnect";
import { serialize } from "@/lib/api";
import type { BlogPost } from "@/types/post";
import { readingTime } from "@/utils/readingTime";
import { PostCover } from "@/components/Blog/PostCover";
import { resolveCover } from "@/utils/unsplash";
import { ShareButton } from "@/components/Blog/ShareButton";
import { JsonLd } from "@/components/ui/json-ld";

export const dynamic = "force-dynamic";

async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  const post = await db
    .collection<BlogPost>("posts")
    .findOneAndUpdate(
      { slug, status: "published" },
      { $inc: { views: 1 } },
      { returnDocument: "after" }
    );
  if (!post) return null;

  return serialize(post);
}

async function getOtherPublishedPosts(excludeSlug: string, limit = 2): Promise<BlogPost[]> {
  const db = await getDb();
  const posts = await db
    .collection<BlogPost>("posts")
    .find({ status: "published", slug: { $ne: excludeSlug } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return posts.map(serialize);
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

  // Social crawlers fetch this URL directly, so only a real http(s) URL
  // works here — an admin-uploaded cover is stored as a data: URL, which
  // isn't fetchable and falls back to the site's default OG image instead.
  const ogImage = (await resolveCover(post))?.url;
  const images = ogImage?.startsWith("http")
    ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }]
    : undefined;

  return pageMeta({
    title: post.title,
    description,
    path: `/blog/${slug}`,
    type: "article",
    images,
  });
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

  const cover = (await resolveCover(post))?.url;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        ...(cover?.startsWith("http") ? { image: cover } : {}),
        author: { "@type": "Person", name: post.author },
        datePublished: new Date(post.createdAt).toISOString(),
        dateModified: new Date(post.updatedAt).toISOString(),
        publisher: { "@type": "Organization", name: "Speeir", url: "https://speeir.com" },
        url: `https://speeir.com/blog/${slug}`,
      },
      breadcrumbs([
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${slug}` },
      ]),
    ],
  };

  return (
    <div className="container py-20 md:py-28">
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-3xl">
        <BackLink href="/blog">All posts</BackLink>

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
          <span aria-hidden="true">&middot;</span>
          <span className="inline-flex items-center gap-1">
            <Eye size={12} />
            {post.views} views
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
          <PostCover seed={post.slug} title={post.title} image={cover} />
        </div>

        <div className={cn(PROSE_CLASS, "mt-12 max-w-none")}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="mt-10 flex justify-center border-t border-border/40 pt-8">
          <ShareButton title={post.title} url={`https://speeir.com/blog/${post.slug}`} />
        </div>

        <CTACard heading="Have a project in mind?" className="max-w-3xl" />

        {morePosts.length > 0 && (
          <div className="mx-auto mt-20 max-w-3xl border-t border-border/40 pt-12 pb-8">
            <Eyebrow>More from the blog</Eyebrow>
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
