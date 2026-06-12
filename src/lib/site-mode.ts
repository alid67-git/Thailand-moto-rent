export const PREVIEW_BYPASS_COOKIE = "tmr-site-access";

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
