"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { X, Plus, Spinner, Sparkle, UploadSimple, ArrowsClockwise, ImageSquare } from "@phosphor-icons/react";
import type { BlogPost, CoverImageCredit } from "@/types/post";
import { cn, CTA_SM_CLASS, INPUT_CLASS } from "@/lib/utils";
import { apiRequest, apiSend, toastError } from "@/lib/fetcher";

type FormState = {
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  coverImage: string | null;
  coverImageCredit: CoverImageCredit | null;
};

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  content: "",
  author: "",
  tags: [],
  status: "draft",
  coverImage: null,
  coverImageCredit: null,
};

const COVER_MAX_DIMENSION = 1600;

/** Swaps in a spinner while an action is in flight. */
function BusyIcon({
  busy,
  icon: Icon,
  size = 16,
}: {
  busy: boolean;
  icon: typeof Spinner;
  size?: number;
}) {
  return busy ? <Spinner size={size} className="animate-spin" /> : <Icon size={size} />;
}

/** Submit-on-Enter for the single-line inputs, without submitting the form. */
const onEnter = (run: () => void) => (e: React.KeyboardEvent) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  run();
};

// Small bordered buttons in the cover-image toolbar.
const TOOL_BTN_CLASS =
  "inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-2 text-xs font-medium text-ink hover:border-primary/40 disabled:opacity-50";

// Downscale + re-encode client-side so an uploaded photo doesn't balloon the
// post document — covers are stored as a data URL directly on the post
// (no file storage service configured for this project).
function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.onload = () => {
        const scale = Math.min(1, COVER_MAX_DIMENSION / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label} {hint && <span className="text-muted">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

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
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [imageQuery, setImageQuery] = useState("");
  const [findingImage, setFindingImage] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rerollRef = useRef(0);

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        slug: post.slug,
        content: post.content,
        author: post.author,
        tags: post.tags,
        status: post.status,
        coverImage: post.coverImage ?? null,
        coverImageCredit: post.coverImageCredit ?? null,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setTopic("");
    setImageQuery("");
  }, [post, open]);

  if (!open) return null;

  const isEdit = !!post;

  // Every text control writes one key of FormState.
  const set =
    (key: "title" | "slug" | "author" | "content" | "status") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const generateWithAI = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    try {
      const draft = await apiSend<{ title: string; content: string; tags?: string[] }>(
        "/api/blog/generate",
        "POST",
        { topic },
        "Failed to generate post"
      );
      setForm((f) => ({ ...f, title: draft.title, content: draft.content, tags: draft.tags || [] }));
      toast.success("Draft generated — review before saving");
    } catch (error) {
      toastError(error, "Failed to generate post");
    } finally {
      setGenerating(false);
    }
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingImage(true);
    try {
      const dataUrl = await compressImageFile(file);
      setForm((f) => ({ ...f, coverImage: dataUrl, coverImageCredit: null }));
    } catch (error) {
      toastError(error, "Failed to process image");
    } finally {
      setUploadingImage(false);
    }
  };

  const findOnUnsplash = async (isReroll = false) => {
    const query = imageQuery.trim() || form.tags[0] || form.title;
    if (!query) return;

    rerollRef.current = isReroll ? rerollRef.current + 1 : 0;

    setFindingImage(true);
    try {
      const photo = await apiRequest<{ url: string; credit: CoverImageCredit }>(
        `/api/blog/image?query=${encodeURIComponent(query)}&reroll=${rerollRef.current}`,
        undefined,
        "Failed to find an image"
      );
      setForm((f) => ({ ...f, coverImage: photo.url, coverImageCredit: photo.credit }));
    } catch (error) {
      toastError(error, "Failed to find an image");
    } finally {
      setFindingImage(false);
    }
  };

  const removeCoverImage = () => {
    setForm((f) => ({ ...f, coverImage: null, coverImageCredit: null }));
  };

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
      await apiSend(
        isEdit ? `/api/blog/${post._id}` : "/api/blog",
        isEdit ? "PUT" : "POST",
        form,
        "Failed to save post"
      );
      toast.success(isEdit ? "Post updated" : "Post created");
      onSaved();
      onClose();
    } catch (error) {
      toastError(error, "Something went wrong");
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
          {!isEdit && (
            <div className="space-y-2 rounded-lg border border-dashed border-border/60 p-4">
              <label htmlFor="topic" className="block text-sm font-medium text-ink">
                Generate with AI
              </label>
              <div className="flex gap-2">
                <input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={onEnter(generateWithAI)}
                  className={cn(INPUT_CLASS, "flex-1")}
                  placeholder="Enter a topic, e.g. 'benefits of remote work'"
                />
                <button
                  type="button"
                  onClick={generateWithAI}
                  disabled={generating || !topic.trim()}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                >
                  <BusyIcon busy={generating} icon={Sparkle} />
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3 rounded-lg border border-dashed border-border/60 p-4">
            <label className="block text-sm font-medium text-ink">Cover image</label>

            {form.coverImage ? (
              <div className="relative overflow-hidden rounded-lg border border-border/40">
                {/* eslint-disable-next-line @next/next/no-img-element -- preview only, source can be a data URL or a remote Unsplash URL */}
                <img src={form.coverImage} alt="Cover preview" className="h-40 w-full object-cover" />
                <button
                  type="button"
                  onClick={removeCoverImage}
                  aria-label="Remove cover image"
                  className="absolute right-2 top-2 rounded-full bg-ink/70 p-1.5 text-white hover:bg-ink"
                >
                  <X size={14} />
                </button>
                {form.coverImageCredit && (
                  <span className="absolute bottom-2 right-2 rounded-full bg-ink/60 px-2 py-0.5 text-[10px] text-white/80">
                    Photo: {form.coverImageCredit.name}
                  </span>
                )}
              </div>
            ) : (
              <p className="text-xs text-muted">
                No cover set — the public post will show a generated placeholder until one is added.
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelected}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className={TOOL_BTN_CLASS}
              >
                <BusyIcon busy={uploadingImage} icon={UploadSimple} size={14} />
                Upload image
              </button>

              <input
                value={imageQuery}
                onChange={(e) => setImageQuery(e.target.value)}
                onKeyDown={onEnter(() => findOnUnsplash())}
                placeholder={form.tags[0] || "Search Unsplash, e.g. 'remote work'"}
                className={cn(INPUT_CLASS, "min-w-[10rem] flex-1 px-3 py-2 text-xs")}
              />
              <button
                type="button"
                onClick={() => findOnUnsplash()}
                disabled={findingImage || !(imageQuery.trim() || form.tags[0] || form.title)}
                className={TOOL_BTN_CLASS}
              >
                <BusyIcon busy={findingImage} icon={ImageSquare} size={14} />
                Find on Unsplash
              </button>

              {form.coverImageCredit && (
                <button
                  type="button"
                  onClick={() => findOnUnsplash(true)}
                  disabled={findingImage}
                  aria-label="Try another photo"
                  className={TOOL_BTN_CLASS}
                >
                  <ArrowsClockwise size={14} />
                </button>
              )}
            </div>
          </div>

          <Field label="Title">
            <input
              required
              value={form.title}
              onChange={set("title")}
              className={INPUT_CLASS}
              placeholder="Post title"
            />
          </Field>

          {isEdit && (
            <Field label="Slug" hint="leave as-is to keep the current URL">
              <input
                value={form.slug}
                onChange={set("slug")}
                className={INPUT_CLASS}
                placeholder="post-slug"
              />
            </Field>
          )}

          <Field label="Author">
            <input
              required
              value={form.author}
              onChange={set("author")}
              className={INPUT_CLASS}
              placeholder="Author name"
            />
          </Field>

          <Field label="Content" hint="Markdown supported">
            <textarea
              required
              rows={10}
              value={form.content}
              onChange={set("content")}
              className={cn(INPUT_CLASS, "font-mono")}
              placeholder="Write the post in Markdown..."
            />
          </Field>

          <Field label="Tags">
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={onEnter(addTag)}
                className={cn(INPUT_CLASS, "flex-1")}
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
          </Field>

          <Field label="Status">
            <select
              value={form.status}
              onChange={set("status")}
              className={INPUT_CLASS}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </Field>

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
              className={cn(CTA_SM_CLASS, "disabled:opacity-60")}
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
