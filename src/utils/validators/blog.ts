// src/lib/validators/blog.ts
import { z } from 'zod';

const blogPostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  author: z.string().min(3),
  tags: z.array(z.string()).optional(),
  status: z.enum(['published', 'draft', 'archived']).default('draft'),
});

export function validateBlogPost(data: unknown, isUpdate: true): z.SafeParseReturnType<Partial<z.infer<typeof blogPostSchema>>, Partial<z.infer<typeof blogPostSchema>>>;
export function validateBlogPost(data: unknown, isUpdate?: false): z.SafeParseReturnType<z.infer<typeof blogPostSchema>, z.infer<typeof blogPostSchema>>;
export function validateBlogPost(data: unknown, isUpdate: boolean = false) {
  if (isUpdate) {
    // More lenient validation for updates: all fields optional, but
    // unknown/extra keys are still stripped by zod's default "strip" mode.
    const updateSchema = blogPostSchema.partial();
    return updateSchema.safeParse(data);
  }

  return blogPostSchema.safeParse(data);
}