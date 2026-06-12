"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { DESTINATION_SPOTS } from "@/lib/destinations";
import { hasIslandAccess } from "@/lib/island-access";

export default function DestinationsPage() {
  const { t } = useLocale();

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
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATION_SPOTS.map((spot) => (
              <Link key={spot.id} href={`/destinations/${spot.slug}`} className="group">
                <article className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:border-jungle-200 hover:shadow-lift-lg dark:border-ink-700 dark:bg-ink-800">
                  <div className="relative h-48 overflow-hidden sm:h-52">
                    <Image
                      src={spot.image}
                      alt={spot.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${spot.gradient} opacity-25 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {hasIslandAccess(spot.slug) && (
                        <span className="mb-2 inline-block rounded-full bg-cyan-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          Moto + tekne
                        </span>
                      )}
                      <h2 className="font-heading text-lg font-extrabold text-white">{spot.name}</h2>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">
                      {spot.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      <span>{spot.distance}</span>
                      <span>·</span>
                      <span>{spot.duration}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
