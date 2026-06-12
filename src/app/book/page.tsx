import { Suspense } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { BookPageClient } from "./BookPageClient";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-ink-950">
      <main className="mx-auto max-w-6xl px-4 py-6 pb-safe sm:py-10">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-stone-500">
              …
            </div>
          }
        >
          <BookPageClient />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
