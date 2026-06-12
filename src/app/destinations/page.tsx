"use client";

import Image from "next/image";
import Link from "next/link";
import { AppealScore } from "@/components/AppealScore";
import { useLocale } from "@/context/LocaleContext";
import { useDestinationLabel } from "@/hooks/useDestinationLabel";
import { getAppealScore } from "@/lib/destination-scores";
import { DESTINATION_SPOTS } from "@/lib/destinations";
import { hasIslandAccess } from "@/lib/island-access";

function DestinationCard({ spot }: { spot: (typeof DESTINATION_SPOTS)[number] }) {
  const { t } = useLocale();
  const { name, description, distance, duration } = useDestinationLabel(spot);
  const appeal = getAppealScore(spot.slug);

  return (
    <Link href={`/destinations/${spot.slug}`} className="group">
      <article className="relative overflow-hidden rounded-2xl shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-lift-lg">
        <div className="relative h-56 overflow-hidden sm:h-64">
          <Image
            src={spot.image}
            alt={name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${spot.gradient} opacity-30 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/20 to-transparent" />
          <div className="absolute right-3 top-3">
            <AppealScore score={appeal} compact />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            {hasIslandAccess(spot.slug) && (
              <span className="mb-2 inline-block rounded-full bg-cyan-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Moto + tekne
              </span>
            )}
            <h2 className="font-heading text-lg font-extrabold tracking-tight text-white sm:text-xl">{name}</h2>
            <p className="mt-1 line-clamp-2 text-xs text-white/70 sm:text-sm">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-neutral-100 bg-white dark:divide-ink-700 dark:bg-ink-800">
          <div className="px-3 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              {t("destinations.distance")}
            </p>
            <p className="mt-0.5 text-xs font-bold text-ink-950 dark:text-neutral-100">{distance}</p>
          </div>
          <div className="px-3 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              {t("destinations.duration")}
            </p>
            <p className="mt-0.5 text-xs font-bold text-ink-950 dark:text-neutral-100">{duration}</p>
          </div>
          <div className="px-3 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              {t("destinations.appealShort")}
            </p>
            <p className="mt-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">{appeal}/10</p>
          </div>
        </div>
        {hasIslandAccess(spot.slug) && (
          <p className="border-t border-neutral-100 bg-cyan-50 px-4 py-2.5 text-center text-xs font-semibold text-cyan-800 dark:border-ink-700 dark:bg-cyan-950/30 dark:text-cyan-300">
            {t("destinations.accessGuideCta")}
          </p>
        )}
      </article>
    </Link>
  );
}

export default function DestinationsPage() {
  const { t } = useLocale();
  const sorted = [...DESTINATION_SPOTS].sort(
    (a, b) => getAppealScore(b.slug) - getAppealScore(a.slug),
  );

  return (
    <main>
      <section className="bg-thai-gradient px-4 py-16 text-white lg:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em]">
            {t("destinations.eyebrow")}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-extrabold md:text-5xl">
            {t("destinations.listTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {t("destinations.listSubtitle", { count: DESTINATION_SPOTS.length })}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-white/65">{t("destinations.accessGuideNote")}</p>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((spot) => (
              <DestinationCard key={spot.id} spot={spot} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
