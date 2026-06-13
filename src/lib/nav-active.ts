/** Returns true when the nav item should appear active for the current pathname. */
export function isNavLinkActive(pathname: string, href: string): boolean {
  const path = href.split("#")[0];
  if (!path || path === "/") return pathname === "/";

  if (path === "/motorcycles") return pathname.startsWith("/motorcycles");
  if (path === "/destinations") return pathname.startsWith("/destinations");
  if (path === "/routes") return pathname.startsWith("/routes");
  if (path === "/travel-guide") return pathname.startsWith("/travel-guide");
  if (path === "/book") return pathname.startsWith("/book");

  return pathname === path || pathname.startsWith(`${path}/`);
}

export const navLinkClass = (active: boolean) =>
  active
    ? "rounded-lg px-3 py-2 text-sm font-semibold text-brand-600 bg-brand-50 dark:text-brand-300 dark:bg-brand-950/40"
    : "rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition hover:text-brand-600 dark:text-neutral-300 dark:hover:text-brand-400";

export const navLinkMobileClass = (active: boolean) =>
  active
    ? "flex min-h-[48px] items-center rounded-xl bg-brand-50 px-4 text-base font-semibold text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
    : "flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-neutral-800 active:bg-neutral-100 dark:text-neutral-100 dark:active:bg-ink-800";
