import { HomeContent } from "@/components/HomeContent";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-ink-950">
      <HomeContent />
      <SiteFooter />
    </div>
  );
}
