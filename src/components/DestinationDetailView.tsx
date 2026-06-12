"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { AppealScore } from "@/components/AppealScore";
import { DestinationGallery } from "@/components/DestinationGallery";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { IslandAccessSection } from "@/components/IslandAccessSection";
import { useDestinationLabel } from "@/hooks/useDestinationLabel";
import { getAppealScore } from "@/lib/destination-scores";
import { getDestinationPlace } from "@/lib/destination-places";
import type { DestinationSpot } from "@/lib/destinations";
import type { IslandAccessGuide } from "@/lib/island-access";
import { useLocale } from "@/context/LocaleContext";

const DestinationMiniMap = dynamic(
  () => import("@/components/DestinationMiniMap").then((m) => m.DestinationMiniMap),
  { ssr: false, loading: () => <div className="min-h-[200px] animate-pulse rounded-2xl bg-neutral-200 dark:bg-ink-700" /> },
);

export function DestinationDetailView({
  spot,
  islandAccess,
}: {
  spot: DestinationSpot;
  islandAccess?: IslandAccessGuide;
}) {
  const { t } = useLocale();
  const { name, description } = useDestinationLabel(spot);
  const place = getDestinationPlace(spot.slug, spot.image, spot.images);
  const heroImage = place.heroImage ?? spot.image;
  const appeal = getAppealScore(spot.slug);

  return (
    <main>
      <section className="panel-section border-b border-neutral-200 dark:border-ink-700">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/destinations"
            className="mb-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-muted hover:text-brand-600 dark:hover:text-brand-400"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("destinations.page.back")}
          </Link>

          <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift lg:col-span-2 lg:aspect-auto lg:min-h-[320px]">
              <Image src={heroImage} alt={name} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 66vw" />
              <div className="absolute left-4 top-4">
                <AppealScore score={appeal} />
              </div>
            </div>
            <div className="min-h-[200px] lg:min-h-0">
              <DestinationMiniMap lat={place.lat} lng={place.lng} name={name} />
            </div>
          </div>

          <div className="mt-8">
            <h1 className="font-heading text-3xl font-extrabold text-ink-950 dark:text-neutral-50 md:text-4xl">
              {name}
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-body">{description}</p>
          </div>
        </div>
      </section>

      <section className="panel-section bg-surface">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-xl font-bold text-ink-950 dark:text-neutral-50">
            {t("destinations.page.gallery")}
          </h2>
          <p className="mt-1 text-sm text-muted">{t("destinations.page.galleryHint")}</p>
          <div className="mt-4">
            <DestinationGallery images={place.gallery} alt={name} />
          </div>
        </div>
      </section>

      <section className="panel-section">
        <div className="mx-auto max-w-4xl">
          <div className="panel grid gap-5 p-6 sm:grid-cols-3">
            <div>
              <p className="text-label">{t("destinations.distance")}</p>
              <p className="mt-2 text-lg font-bold text-ink-950 dark:text-neutral-100">{spot.distance}</p>
            </div>
            <div>
              <p className="text-label">{t("destinations.duration")}</p>
              <p className="mt-2 text-lg font-bold text-ink-950 dark:text-neutral-100">{spot.duration}</p>
            </div>
            <div>
              <p className="text-label">{t("destinations.appealShort")}</p>
              <p className="mt-2 text-lg font-bold text-amber-600 dark:text-amber-400">{appeal}/10</p>
            </div>
          </div>

          <div className="mt-12 space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50">
                {t("destinations.page.about")}
              </h2>
              <p className="mt-4 leading-relaxed text-body">{description}</p>
            </div>
            {islandAccess && <IslandAccessSection guide={islandAccess} />}
          </div>

          <div className="mt-12">
            <GoogleReviewsSection reviews={place.reviews} />
          </div>

          <div className="panel-accent mt-12 p-6">
            <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">
              {t("destinations.page.bookCta")}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-bold text-ink-950 dark:text-neutral-100">Honda ADV 160</p>
              <Link href="/book" className="btn-primary text-center">
                {t("destinations.page.bookCta")}
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-neutral-200 pt-8 sm:flex-row dark:border-ink-700">
            <Link href="/book" className="btn-primary flex-1 text-center">
              {t("destinations.page.bookCta")}
            </Link>
            <Link href="/destinations" className="btn-secondary flex-1 text-center">
              {t("destinations.page.exploreMore")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
