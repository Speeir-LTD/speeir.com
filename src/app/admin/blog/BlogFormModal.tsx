"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { X, Plus, Spinner } from "@phosphor-icons/react";
import type { BlogPost } from "@/types/post";

type FormState = {
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  status: "draft" | "published" | "archived";
};

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  content: "",
  author: "",
  tags: [],
  status: "draft",
};

export function BlogFormModal({
  open,
  post,
  onClose,
  onSaved,
}: {
  open: boolean;
  post?: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        slug: post.slug,
        content: post.content,
        author: post.author,
        tags: post.tags,
        status: post.status === "archived" ? "archived" : post.status === "published" ? "published" : "draft",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [post, open]);

  if (!open) return null;

  const isEdit = !!post;

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/blog/${post._id}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to save post");
      }

      toast.success(isEdit ? "Post updated" : "Post created");
      onSaved();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/40 bg-white shadow-md">
        <div className="sticky top-0 flex items-center justify-between border-b border-border/40 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-ink">
            {isEdit ? "Edit post" : "New post"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-muted hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-lg border border-border/60 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
              placeholder="Post title"
            />
          </div>

          {isEdit && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Slug <span className="text-muted">(leave as-is to keep the current URL)</span>
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full rounded-lg border border-border/60 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
                placeholder="post-slug"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Author</label>
            <input
              required
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              className="w-full rounded-lg border border-border/60 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Content <span className="text-muted">(Markdown supported)</span>
            </label>
            <textarea
              required
              rows={10}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className="w-full rounded-lg border border-border/60 px-4 py-2.5 font-mono text-sm text-ink outline-none focus:border-primary"
              placeholder="Write the post in Markdown..."
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Tags</label>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 rounded-lg border border-border/60 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
                placeholder="Add a tag and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="inline-flex items-center gap-1 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
            {form.tags.length > 0 && (
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value as FormState["status"] }))
              }
              className="w-full rounded-lg border border-border/60 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 border-t border-border/40 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-full border border-border/60 px-5 py-2.5 text-sm font-medium text-ink hover:border-primary/40 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving && <Spinner size={16} className="animate-spin" />}
              {isEdit ? "Save changes" : "Create post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
