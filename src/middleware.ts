import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow internal paths, static assets, and the error page itself
  if (
    pathname.startsWith("/_next") || // Next.js internal paths
    pathname.startsWith("/images") || // Static assets (e.g., logo)
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api/sendEmail") || //api
    pathname.startsWith("/logo") || // Logo path
    pathname === "/error" // Error page
  ) {
    return NextResponse.next();
  }

  // Check if the path exists in the application
  const existingPaths = ["/", "/contact",  "/blog", "/blog-details"]; // Add all your valid routes here
  if (existingPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Rewrite all unmatched paths to the /error page
  return NextResponse.rewrite(new URL("/error", request.url));
}
