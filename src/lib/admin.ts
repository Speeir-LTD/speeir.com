import { auth } from "@/auth";
import { errorResponse } from "@/lib/api";

/**
 * Guards the admin-only API routes. Returns a 401 response to hand straight
 * back, or null when the caller is signed in.
 */
export async function requireAdmin() {
  const session = await auth();
  return session?.user ? null : errorResponse("Unauthorized", 401);
}
