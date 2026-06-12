import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PREVIEW_BYPASS_COOKIE,
  PREVIEW_BYPASS_HEADER,
  previewBypassCookieOptions,
} from "@/lib/site-mode";

const PREVIEW = process.env.NEXT_PUBLIC_SITE_PREVIEW !== "false";

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;

  if (hostname === "www.thailand-moto-rent.com") {
    const url = request.nextUrl.clone();
    url.hostname = "thailand-moto-rent.com";
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/1") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(PREVIEW_BYPASS_HEADER, "1");
    const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    res.cookies.set(
      PREVIEW_BYPASS_COOKIE,
      "1",
      previewBypassCookieOptions(
        request.nextUrl.hostname,
        request.nextUrl.protocol === "https:",
      ),
    );
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
