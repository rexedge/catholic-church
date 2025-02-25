import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/about",
  "/contact",
  "/masses",
  "/events",
];

// Define routes that require specific roles
const adminRoutes = ["/admin", "/admin/users", "/admin/parishes"];
const priestRoutes = ["/priest", "/priest/masses", "/priest/intentions"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the route is public
  // Also allow reset-password with any subpath (for tokens)
  if (
    publicRoutes.some((route) => pathname === route) ||
    pathname.startsWith("/reset-password/")
  ) {
    return NextResponse.next();
  }

  // Get the user from the session
  const session = await auth();
  const user = session?.user;

  // If no user and not on a public route, redirect to login
  if (!user) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

  // Check role-based access
  if (
    (adminRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    ) &&
      user.role !== "ADMIN") ||
    (priestRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    ) &&
      user.role !== "PRIEST" &&
      user.role !== "ADMIN")
  ) {
    // Redirect to unauthorized page or dashboard
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files (e.g. robots.txt)
     * - api/auth (Auth.js API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|api/auth).*)",
  ],
};
