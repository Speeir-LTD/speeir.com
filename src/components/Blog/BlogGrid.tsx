"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "@phosphor-icons/react";
import type { BlogPost } from "@/types/post";
import { readingTime } from "@/utils/readingTime";
import { PostCover } from "./PostCover";

function excerpt(content: string, length: number): string {
  const plain = content.replace(/[#*_`>-]/g, "");
  return plain.length > length ? `${plain.slice(0, length)}…` : plain;
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element -- generated avatar */}
      <img
        src={`https://ui-avatars.com/api/?background=A15FDC&color=fff&name=${encodeURIComponent(post.author)}`}
        alt={post.author}
        className="h-7 w-7 rounded-full object-cover"
      />
      <div className="leading-tight">
        <p className="text-xs font-medium text-ink">{post.author}</p>
        <p className="flex items-center gap-1 text-[11px] text-muted">
          {formatDate(post.createdAt)}
          <span aria-hidden="true">&middot;</span>
          <Clock size={10} />
          {readingTime(post.content)} min read
        </p>
      </div>
    </div>
  );
}

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [featured, ...rest] = posts;

  return (
    <div className="mt-16 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-white shadow-md transition-transform hover:-translate-y-1 md:flex-row"
        >
          <div className="md:w-2/5">
            <PostCover seed={featured.slug} title={featured.title} image={featured.coverImage} />
          </div>
          <div className="flex flex-1 flex-col justify-center p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Latest
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {excerpt(featured.content, 200)}
            </p>
            {featured.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-5">
              <Meta post={featured} />
              <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
                Read
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>

      {rest.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((post, index) => (
            <motion.div
              key={post._id.toString()}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(index, 4) * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-white shadow-md transition-transform hover:-translate-y-1"
              >
                <PostCover seed={post.slug} title={post.title} image={post.coverImage} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-ink">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">
                    {excerpt(post.content, 140)}
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

                  <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                    <Meta post={post} />
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
                      Read
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
