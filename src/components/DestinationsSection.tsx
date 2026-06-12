"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { useDestinationLabel } from "@/hooks/useDestinationLabel";
import { useDestinationImage } from "@/hooks/useDestinationImage";
import { DESTINATION_SPOTS } from "@/lib/destinations";

function HomeDestinationCard({ spot }: { spot: (typeof DESTINATION_SPOTS)[number] }) {
  const { t } = useLocale();
  const { name, description, distance, duration, bestFor } = useDestinationLabel(spot);
  const heroImage = useDestinationImage(spot);

  return (
    <Link href={`/destinations/${spot.slug}`} className="group">
      <article className="relative overflow-hidden rounded-2xl shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-lift-lg">
        <div className="relative h-48 overflow-hidden sm:h-56">
          <Image
            src={heroImage}
            alt={name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${spot.gradient} opacity-30 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <h3 className="font-heading text-lg font-extrabold tracking-tight text-white sm:text-xl">{name}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-white/70 sm:text-sm">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-neutral-100 bg-white dark:divide-ink-700 dark:bg-ink-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{t("destinations.distance")}</p>
            <p className="mt-0.5 text-sm font-bold text-ink-950 dark:text-neutral-100">{distance}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{t("destinations.duration")}</p>
            <p className="mt-0.5 text-sm font-bold text-ink-950 dark:text-neutral-100">{duration}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{t("destinations.bestFor")}</p>
            <p className="mt-0.5 text-xs font-semibold text-jungle-600 dark:text-jungle-400">{bestFor}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function DestinationsSection() {
  const { t } = useLocale();

  return (
    <section id="destinations" className="bg-gradient-to-b from-white to-brand-50/40 px-4 py-16 dark:from-ink-950 dark:to-ink-900 sm:py-20 lg:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="eyebrow">{t("destinations.eyebrow")}</span>
          <h2 className="section-title mt-3">{t("destinations.title")}</h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-100">{t("destinations.subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATION_SPOTS.slice(0, 6).map((spot) => (
            <HomeDestinationCard key={spot.id} spot={spot} />
          ))}
        </div>
        <Link
          href="/destinations"
          className="mt-10 inline-flex rounded-xl border border-brand-300 px-6 py-3 font-bold text-brand-700 hover:bg-brand-50 dark:border-ink-600 dark:text-white dark:hover:bg-ink-800"
        >
          {t("destinations.viewAll")}
        </Link>
      </div>
    </section>
  );
}
