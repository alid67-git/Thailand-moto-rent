export const PREVIEW_BYPASS_COOKIE = "tmr-site-access";
export const PREVIEW_BYPASS_HEADER = "x-tmr-preview-bypass";

const PRODUCTION_HOSTS = new Set([
  "thailand-moto-rent.com",
  "www.thailand-moto-rent.com",
]);

export function previewBypassCookieOptions(hostname: string, secure: boolean) {
  const opts: {
    path: string;
    maxAge: number;
    sameSite: "lax";
    secure: boolean;
    domain?: string;
  } = {
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
    sameSite: "lax",
    secure,
  };

  if (PRODUCTION_HOSTS.has(hostname)) {
    opts.domain = ".thailand-moto-rent.com";
  }

  return opts;
}

/** Site preview: coming-soon home, subpages blocked, noindex. Set env to "false" at launch. */
export function isSitePreviewEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SITE_PREVIEW !== "false";
}

export function hasPreviewBypass(bypassCookie?: string | null): boolean {
  return bypassCookie === "1";
}

/** Whether the visitor should see the public coming-soon gate. */
export function isSitePreview(bypassCookie?: string | null): boolean {
  return isSitePreviewEnabled() && !hasPreviewBypass(bypassCookie);
}
