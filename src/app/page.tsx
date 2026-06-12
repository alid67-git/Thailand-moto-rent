import { cookies, headers } from "next/headers";
import { ComingSoonPage } from "@/components/ComingSoonPage";
import { HomeContent } from "@/components/HomeContent";
import { SiteFooter } from "@/components/SiteFooter";
import {
  isSitePreview,
  PREVIEW_BYPASS_COOKIE,
  PREVIEW_BYPASS_HEADER,
} from "@/lib/site-mode";

export default async function HomePage() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const bypass =
    cookieStore.get(PREVIEW_BYPASS_COOKIE)?.value ??
    (headerStore.get(PREVIEW_BYPASS_HEADER) === "1" ? "1" : undefined);

  if (isSitePreview(bypass)) {
    return <ComingSoonPage />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-ink-950">
      <HomeContent />
      <SiteFooter />
    </div>
  );
}
