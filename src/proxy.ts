import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED = [
  "/home",
  "/dashboard",
  "/profile/edit",
  "/projects/create",
  "/projects/manage",
  "/notifications",
  "/search",
  "/settings",
  "/onboarding",
  "/network",
  "/admin",
];

function isProtected(pathname: string) {
  if (PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"))) return true;
  if (pathname === "/profile") return true;
  if (/^\/projects\/[^/]+\/(edit|verification)$/.test(pathname)) return true;
  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isProtected(pathname)) return NextResponse.next();
  const token = request.cookies.get("progo_session")?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  try {
    const secret = process.env.AUTH_SECRET;
    if (!secret) return NextResponse.next();
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    if (pathname.startsWith("/admin") && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
