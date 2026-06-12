/** Site preview: only coming-soon home, other routes redirect, noindex. Set to "false" at launch. */
export function isSitePreview(): boolean {
  return process.env.NEXT_PUBLIC_SITE_PREVIEW !== "false";
}
