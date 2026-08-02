"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { MagnifyingGlass, PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import type { BlogPost } from "@/types/post";
import { cn, CTA_SM_CLASS, INPUT_CLASS } from "@/lib/utils";
import { BlogFormModal } from "./BlogFormModal";

const STATUS_STYLES: Record<string, string> = {
  published: "bg-green-100 text-green-800",
  draft: "bg-amber-100 text-amber-800",
  archived: "bg-gray-100 text-gray-700",
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to load posts");
      setPosts(json.data || []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return;

    try {
      const res = await fetch(`/api/blog/${post._id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to delete post");
      toast.success("Post deleted");
      fetchPosts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete post");
    }
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-ink">Blog posts</h1>
        <button
          onClick={() => {
            setEditingPost(null);
            setModalOpen(true);
          }}
          className={CTA_SM_CLASS}
        >
          <Plus size={16} />
          New post
        </button>
      </div>

      <div className="relative mt-6 max-w-sm">
        <MagnifyingGlass
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className={cn(INPUT_CLASS, "bg-white py-2 pl-9 pr-4")}
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border/40 bg-white shadow-md">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/40 text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Author</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Views</th>
              <th className="px-5 py-3 font-medium">Created</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-muted">
                  Loading posts...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-muted">
                  No posts yet.
                </td>
              </tr>
            ) : (
              filtered.map((post) => (
                <tr key={post._id.toString()} className="border-b border-border/40 last:border-0">
                  <td className="px-5 py-3 font-medium text-ink">{post.title}</td>
                  <td className="px-5 py-3 text-muted">{post.author}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        STATUS_STYLES[post.status] ?? STATUS_STYLES.draft
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted">{post.views}</td>
                  <td className="px-5 py-3 text-muted">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setModalOpen(true);
                        }}
                        aria-label="Edit"
                        className="rounded-full p-2 text-muted hover:bg-primary/10 hover:text-primary"
                      >
                        <PencilSimple size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post)}
                        aria-label="Delete"
                        className="rounded-full p-2 text-muted hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <BlogFormModal
        open={modalOpen}
        post={editingPost}
        onClose={() => setModalOpen(false)}
        onSaved={fetchPosts}
      />
    </div>
  );
}
