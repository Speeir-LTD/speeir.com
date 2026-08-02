import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { getDb } from "@/utils/dbConnect";
import { serialize } from "@/lib/api";
import type { BlogPost } from "@/types/post";
import { BlogGrid } from "@/components/Blog/BlogGrid";
import { EmptyState } from "@/components/ui/primitives";
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
        <EmptyState
          heading="First post coming soon"
          body="We're writing up what we've learned. Check back shortly."
        />
      ) : (
        <BlogGrid posts={posts} />
      )}
    </div>
  );
}
