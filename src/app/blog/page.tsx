import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { getDb } from "@/utils/dbConnect";
import type { BlogPost } from "@/types/post";

export const metadata: Metadata = {
  title: "Blog | Speeir",
  description: "Insights on software, product, and how Speeir builds.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Speeir",
    description: "Insights on software, product, and how Speeir builds.",
    url: new URL("https://speeir.com/blog"),
    siteName: "Speeir",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Speeir",
    description: "Insights on software, product, and how Speeir builds.",
  },
};

// Never attempted at build time — this route needs a live DB connection,
// which may not exist yet in every environment (e.g. a build without
// MONGODB_URI configured).
export const dynamic = "force-dynamic";

async function getPublishedPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  const posts = await db
    .collection<BlogPost>("posts")
    .find({ status: "published" })
    .sort({ createdAt: -1 })
    .toArray();
  return posts.map((post) => ({ ...post, _id: post._id.toString() }));
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Blog
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Insights from Speeir
        </h1>
      </div>

      {posts.length === 0 ? (
        <div className="group relative mx-auto mt-16 flex max-w-lg flex-col items-center rounded-2xl border border-dashed border-border/40 bg-white p-14 text-center shadow-md">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-2xl bg-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkle size={20} weight="duotone" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-ink">
              First post coming soon
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We&apos;re writing up what we&apos;ve learned. Check back shortly.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id.toString()}
              href={`/blog/${post.slug}`}
              className="group relative flex flex-col rounded-2xl border border-border/40 bg-white p-6 shadow-md transition-transform hover:-translate-y-1"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-2xl bg-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative z-10 flex flex-1 flex-col">
                <p className="text-xs text-muted">
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-ink">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">
                  {post.content.replace(/[#*_`>-]/g, "").slice(0, 140)}
                  {post.content.length > 140 ? "…" : ""}
                </p>
                {post.tags.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read post
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
