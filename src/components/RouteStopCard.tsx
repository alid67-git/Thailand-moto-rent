"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { useIslandAccessGuide } from "@/hooks/useIslandAccessGuide";
import { roundToHalfHour } from "@/lib/time-format";
import type { RouteStop } from "@/lib/routes-types";
import { buildGoogleMapsStopUrl } from "@/lib/navigation-links";
import { getDestinationImageSet } from "@/lib/destination-images";
import { DESTINATION_SPOTS } from "@/lib/destinations";
import { shouldShowIslandAccess } from "@/lib/island-access-i18n";
import { IslandAccessCompact } from "@/components/IslandAccessSection";

function stopImage(stop: RouteStop): string | null {
  if (!stop.destinationSlug) return null;
  const spot = DESTINATION_SPOTS.find((s) => s.slug === stop.destinationSlug);
  if (!spot) return null;
  return getDestinationImageSet(stop.destinationSlug, spot.image, spot.images).hero;
}

export function RouteStopCard({ stop }: { stop: RouteStop }) {
  const { t } = useLocale();
  const slug = stop.destinationSlug;
  const image = stopImage(stop);
  const islandGuide = useIslandAccessGuide(
    shouldShowIslandAccess(slug, stop.access) ? slug : undefined,
  );
  const mapsUrl =
    stop.lat != null && stop.lng != null
      ? buildGoogleMapsStopUrl({ name: stop.name, lat: stop.lat, lng: stop.lng })
      : null;

  const inner = (
    <article className="panel overflow-hidden transition hover:border-brand-400 dark:hover:border-brand-500">
      <div className="flex flex-col sm:flex-row">
        {image && (
          <div className="relative h-44 w-full shrink-0 sm:h-auto sm:w-44 md:w-52">
            <Image src={image} alt={stop.name} fill className="object-cover" sizes="(max-width:640px) 100vw, 208px" />
            {stop.access === "boat" && (
              <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                ⛵ {t("routeDetail.boatStop")}
              </span>
            )}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-thai-gradient text-sm font-bold text-white">
              {stop.order}
            </div>
            <div className="min-w-0 flex-1">
              <h3
                className={`font-heading text-lg font-bold ${slug ? "text-brand-700 group-hover:underline dark:text-brand-300" : "text-ink-950 dark:text-neutral-50"}`}
              >
                {stop.name}
                {slug && (
                  <span className="ml-2 text-sm font-normal text-muted">{t("routeDetail.viewPlace")}</span>
                )}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                {stop.driveKm > 0 && (
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-neutral-700 dark:bg-ink-700 dark:text-neutral-200">
                    🛣️ {t("routeDetail.driveKm", { km: stop.driveKm })}
                  </span>
                )}
                {stop.driveMin > 0 && (
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200">
                    ⏱️ {t("routeDetail.driveMin", { min: roundToHalfHour(stop.driveMin) })}
                  </span>
                )}
                {stop.visitMin > 0 && (
                  <span className="rounded-full bg-jungle-50 px-2.5 py-1 text-jungle-800 dark:bg-jungle-900/30 dark:text-jungle-200">
                    📍 {t("routeDetail.visitMin", { min: roundToHalfHour(stop.visitMin) })}
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-body">{stop.description}</p>
          {stop.tips && (
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
              💡 {stop.tips}
            </p>
          )}
          {islandGuide && (
            <IslandAccessCompact guide={islandGuide} destinationSlug={slug} />
          )}
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-bold text-brand-700 hover:bg-brand-50 dark:border-ink-600 dark:text-brand-300 dark:hover:bg-ink-700"
            >
              🗺️ {t("routeDetail.openInMaps")}
            </a>
          )}
        </div>
      </div>
    </article>
  );

  if (slug) {
    return (
      <Link href={`/destinations/${slug}`} className="group block">
        {inner}
      </Link>
    );
  }

  return inner;
}
