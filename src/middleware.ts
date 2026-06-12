import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PREVIEW_BYPASS_COOKIE } from "@/lib/site-mode";

const PREVIEW = process.env.NEXT_PUBLIC_SITE_PREVIEW !== "false";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/1") {
    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.set(PREVIEW_BYPASS_COOKIE, "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });
    return res;
  }

  const bypass = request.cookies.get(PREVIEW_BYPASS_COOKIE)?.value === "1";

  if (!PREVIEW || bypass) return NextResponse.next();

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
