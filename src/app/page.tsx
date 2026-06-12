import { cookies } from "next/headers";
import { ComingSoonPage } from "@/components/ComingSoonPage";
import { HomeContent } from "@/components/HomeContent";
import { SiteFooter } from "@/components/SiteFooter";
import { isSitePreview, PREVIEW_BYPASS_COOKIE } from "@/lib/site-mode";

export default async function HomePage() {
  const cookieStore = await cookies();
  const bypass = cookieStore.get(PREVIEW_BYPASS_COOKIE)?.value;

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
