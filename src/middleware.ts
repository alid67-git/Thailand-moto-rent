import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PREVIEW = process.env.NEXT_PUBLIC_SITE_PREVIEW !== "false";

export function middleware(request: NextRequest) {
  if (!PREVIEW) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") return NextResponse.next();

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
