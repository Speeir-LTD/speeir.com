import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/utils/dbConnect";
import { auth } from "@/auth";
import { slugify } from "@/utils/slugify";
import type { ApiResponse, BlogPost, BlogPostUpdateDTO } from "@/types/post";
import { validateBlogPost } from "@/utils/validators/blog";

const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ success: false, error: message }, { status });
};

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<BlogPost>>> {
  const session = await auth();
  if (!session?.user) return errorResponse("Unauthorized", 401);

  try {
    const db = await getDb();
    const { id } = await params;
    const body: Partial<BlogPostUpdateDTO> = await request.json();

    if (!ObjectId.isValid(id)) return errorResponse("Valid post ID is required", 400);

    const validation = validateBlogPost(body, true);
    if (!validation.success) {
      return errorResponse(validation.error?.message ?? "Validation failed", 400);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- discard any client-supplied _id
    const { _id: _discardId, ...updateData } = body as Partial<BlogPostUpdateDTO> & {
      slug?: string;
      _id?: unknown;
    };

    // Only touch the slug if the caller explicitly provided one, so editing
    // a title never silently breaks an already-published URL.
    if (updateData.slug) {
      const baseSlug = slugify(updateData.slug);
      let slug = baseSlug;
      let suffix = 1;
      while (await db.collection("posts").findOne({ slug, _id: { $ne: new ObjectId(id) } })) {
        slug = `${baseSlug}-${++suffix}`;
      }
      updateData.slug = slug;
    }

    const result = await db
      .collection<BlogPost>("posts")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...updateData, updatedAt: new Date() } });

    if (result.matchedCount === 0) return errorResponse("Post not found", 404);

    const updatedPost = await db.collection<BlogPost>("posts").findOne({ _id: new ObjectId(id) });
    if (!updatedPost) return errorResponse("Failed to retrieve updated post", 500);

    return NextResponse.json({
      success: true,
      data: { ...updatedPost, _id: updatedPost._id.toString() },
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return errorResponse("Failed to update post", 500);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse>> {
  const session = await auth();
  if (!session?.user) return errorResponse("Unauthorized", 401);

  try {
    const db = await getDb();
    const { id } = await params;

    if (!ObjectId.isValid(id)) return errorResponse("Valid post ID is required", 400);

    const result = await db.collection<BlogPost>("posts").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return errorResponse("Post not found", 404);

    return NextResponse.json({ success: true, data: { id } });
  } catch (error) {
    console.error("DELETE Error:", error);
    return errorResponse("Failed to delete post", 500);
  }
}
