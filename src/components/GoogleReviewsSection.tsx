"use client";

import type { GoogleReview } from "@/lib/destination-places";
import { useLocale } from "@/context/LocaleContext";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "text-amber-400" : "text-neutral-300 dark:text-ink-600"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function GoogleReviewsSection({ reviews }: { reviews: GoogleReview[] }) {
  const { t } = useLocale();

  if (reviews.length === 0) return null;

  return (
    <section className="panel-section">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50">
          {t("destinations.page.googleReviews")}
        </h2>
        <span className="badge bg-white text-neutral-700 shadow-sm dark:bg-ink-700 dark:text-neutral-200">
          <span className="text-amber-400">★</span> Google
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review, i) => (
          <article key={`${review.author}-${i}`} className="panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink-950 dark:text-neutral-100">{review.author}</p>
                <p className="text-xs text-muted">{review.relativeTime}</p>
              </div>
              <Stars rating={review.rating} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-body">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
