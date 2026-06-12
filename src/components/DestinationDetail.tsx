"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import type { DestinationSpot } from "@/lib/destinations";

interface DestinationDetailProps {
  spot: DestinationSpot;
}

export function DestinationDetail({ spot }: DestinationDetailProps) {
  const { t } = useLocale();

  return (
    <main>
      <section className="relative h-64 overflow-hidden bg-ink-950 sm:h-80 md:h-[500px]">
        <Image
          src={spot.image}
          alt={spot.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-8 sm:py-12 lg:px-6">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/destinations"
              className="mb-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white sm:mb-5"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t("destinations.page.back")}
            </Link>
            <h1 className="font-heading text-2xl font-extrabold text-white sm:text-4xl md:text-5xl">{spot.name}</h1>
            <p className="mt-2 max-w-2xl text-base text-white/70 sm:mt-3 sm:text-lg">{spot.description}</p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-12 dark:bg-ink-900 sm:py-16 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-xl font-bold text-ink-950 dark:text-neutral-50 sm:text-2xl">
            {t("destinations.page.gallery")}
          </h2>
          <div className="mt-6 columns-1 gap-3 sm:mt-8 sm:columns-2 lg:columns-4">
            {spot.images.map((img, idx) => (
              <div
                key={`${img}-${idx}`}
                className="mb-3 break-inside-avoid overflow-hidden rounded-xl shadow-lift dark:shadow-none"
              >
                <Image
                  src={img}
                  alt={`${spot.name} ${idx + 1}`}
                  width={400}
                  height={300}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 dark:bg-ink-950 sm:py-16 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-5 dark:border-ink-700 dark:bg-ink-900 sm:grid-cols-3 sm:gap-5 sm:p-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {t("destinations.distance")}
              </p>
              <p className="mt-1 font-heading text-base font-bold text-ink-950 dark:text-neutral-50 sm:text-lg">
                {spot.distance}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {t("destinations.duration")}
              </p>
              <p className="mt-1 font-heading text-base font-bold text-ink-950 dark:text-neutral-50 sm:text-lg">
                {spot.duration}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {t("destinations.bestFor")}
              </p>
              <p className="mt-1 font-heading text-base font-bold text-brand-600 dark:text-brand-400 sm:text-lg">
                {spot.bestFor}
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
            <h2 className="font-heading text-xl font-bold text-ink-950 dark:text-neutral-50 sm:text-2xl">
              {t("destinations.page.about")}
            </h2>
            <p className="mt-3 leading-relaxed text-neutral-500 dark:text-neutral-100">{spot.description}</p>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-neutral-200 pt-8 dark:border-ink-700 sm:flex-row sm:gap-4">
            <Link href="/book" className="btn-primary w-full sm:w-auto">
              {t("destinations.page.bookCta")}
            </Link>
            <Link href="/destinations" className="btn-secondary w-full sm:w-auto">
              {t("destinations.page.exploreMore")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

