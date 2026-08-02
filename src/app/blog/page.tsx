import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { cn, CTA_SM_CLASS } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { getDb } from "@/utils/dbConnect";
import { serialize } from "@/lib/api";
import type { BlogPost } from "@/types/post";
import { BlogGrid } from "@/components/Blog/BlogGrid";
import { resolveCover } from "@/utils/unsplash";
import { Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description:
    "Insights on software, product, and how Speeir builds.",
  path: "/blog",
});

// Never attempted at build time — this route needs a live DB connection,
// which may not exist yet in every environment (e.g. a build without
// MONGODB_URI configured).
export const dynamic = "force-dynamic";

async function withResolvedCover(post: BlogPost): Promise<BlogPost> {
  const cover = await resolveCover(post);
  if (!cover) return post;

  return { ...post, coverImage: cover.url, coverImageCredit: cover.credit };
}

async function getPublishedPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  const posts = await db
    .collection<BlogPost>("posts")
    .find({ status: "published" })
    .sort({ createdAt: -1 })
    .toArray();
  return Promise.all(
    posts.map((post) => withResolvedCover(serialize(post)))
  );
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Insights from Speeir
        </h1>
        <p className="mt-4 text-balance text-sm leading-relaxed text-muted md:text-base">
          Notes on the software, products, and decisions behind what we build.
        </p>
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
              className={cn(CTA_SM_CLASS, "mt-6 px-6 py-2.5")}
            >
              Start a project
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ) : (
        <BlogGrid posts={posts} />
      )}
    </div>
  );
}
