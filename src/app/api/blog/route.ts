import { NextResponse } from "next/server";
import { errorResponse } from "@/lib/api";
import { getDb } from "@/utils/dbConnect";
import { auth } from "@/auth";
import { slugify } from "@/utils/slugify";
import type { ApiResponse, BlogPost, BlogPostCreateDTO, BlogPostInsert } from "@/types/post";
import { validateBlogPost } from "@/utils/validators/blog";


// Admin-only: returns posts of every status. The public blog reads the
// database directly in Server Components, so this route has no public caller.
export async function GET(): Promise<NextResponse<ApiResponse<BlogPost[]>>> {
  const session = await auth();
  if (!session?.user) return errorResponse("Unauthorized", 401);

  try {
    const db = await getDb();
    const posts = await db
      .collection<BlogPost>("posts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: posts.map((post) => ({ ...post, _id: post._id.toString() })),
      total: posts.length,
    });
  } catch (error) {
    console.error("GET Error:", error);
    return errorResponse("Failed to fetch posts", 500);
  }
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse<BlogPost>>> {
  const session = await auth();
  if (!session?.user) return errorResponse("Unauthorized", 401);

  try {
    const db = await getDb();
    const body: BlogPostCreateDTO = await request.json();

    const validation = validateBlogPost(body);
    if (!validation.success) {
      return errorResponse(validation.error?.message ?? "Validation failed", 400);
    }

    const baseSlug = slugify(body.slug || body.title);
    let slug = baseSlug;
    let suffix = 1;
    while (await db.collection("posts").findOne({ slug })) {
      slug = `${baseSlug}-${++suffix}`;
    }

    const newPost: BlogPostInsert = {
      ...body,
      slug,
      tags: body.tags || [],
      status: body.status || "draft",
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Omit<BlogPost, "_id">>("posts").insertOne(newPost);
    const createdPost = await db.collection<BlogPost>("posts").findOne({
      _id: result.insertedId,
    });

    if (!createdPost) return errorResponse("Failed to retrieve created post", 500);

    return NextResponse.json(
      { success: true, data: { ...createdPost, _id: createdPost._id.toString() } },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return errorResponse("Failed to create post", 500);
  }
}
