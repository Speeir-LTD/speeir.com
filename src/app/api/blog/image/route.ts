import { NextResponse } from "next/server";
import { errorResponse } from "@/lib/api";
import { auth } from "@/auth";
import { getUnsplashCover } from "@/utils/unsplash";
import type { ApiResponse } from "@/types/post";
import type { UnsplashPhoto } from "@/utils/unsplash";


export async function GET(request: Request): Promise<NextResponse<ApiResponse<UnsplashPhoto>>> {
  const session = await auth();
  if (!session?.user) return errorResponse("Unauthorized", 401);

  if (!process.env.UNSPLASH_ACCESS_KEY) {
    return errorResponse("UNSPLASH_ACCESS_KEY is not configured", 500);
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();
  if (!query) return errorResponse("Query is required", 400);

  // "reroll" lets the admin ask for a different photo for the same query
  // without changing what's actually stored as the seed.
  const reroll = searchParams.get("reroll") || "0";

  const photo = await getUnsplashCover(query, `${query}-${reroll}`);
  if (!photo) return errorResponse("No matching photos found", 404);

  return NextResponse.json({ success: true, data: photo });
}
