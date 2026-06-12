import { ComingSoonPage } from "@/components/ComingSoonPage";
import { HomeContent } from "@/components/HomeContent";
import { SiteFooter } from "@/components/SiteFooter";
import { isSitePreview } from "@/lib/site-mode";

export default function HomePage() {
  if (isSitePreview()) {
    return <ComingSoonPage />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-ink-950">
      <HomeContent />
      <SiteFooter />
    </div>
  );
}
