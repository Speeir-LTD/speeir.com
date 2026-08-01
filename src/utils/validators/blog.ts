import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug must be lowercase, alphanumeric, and hyphen-separated")
    .optional(),
  content: z.string().min(10),
  author: z.string().min(3),
  tags: z.array(z.string()).optional(),
  status: z.enum(["published", "draft", "archived"]).optional(),
  // Data URL (uploaded file) or an https:// URL (e.g. an Unsplash photo) —
  // capped well under MongoDB's 16MB document limit.
  coverImage: z.string().max(3_000_000).nullable().optional(),
  coverImageCredit: z.object({ name: z.string(), url: z.string() }).nullable().optional(),
});

export function validateBlogPost(
  data: unknown,
  isUpdate: boolean = false
): { success: boolean; error?: z.ZodError } {
  if (isUpdate) {
    const updateSchema = blogPostSchema.partial();
    return updateSchema.safeParse(data);
  }

  return blogPostSchema.safeParse(data);
}
