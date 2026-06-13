"use client";

import { useLocale } from "@/context/LocaleContext";
import { formatRoundedDuration } from "@/lib/time-format";
import type { TranslationKey } from "@/i18n/translate";
import type { MotorcycleRoute } from "@/lib/routes-types";
import type { RouteTourMeta } from "@/lib/route-tours";
import { getRouteGroupStyle } from "@/lib/route-day-colors";
import { RouteStopCard } from "@/components/RouteStopCard";

function formatMin(
  totalMin: number,
  t: (key: TranslationKey, params?: Record<string, string | number>) => string,
): string {
  return formatRoundedDuration(totalMin, t);
}

export function RouteStopsSection({
  route,
  tourMeta,
}: {
  route: MotorcycleRoute;
  tourMeta: RouteTourMeta;
}) {
  const { t } = useLocale();
  const isMultiDay = tourMeta.tourDays > 1;
  const groupStyle = getRouteGroupStyle(tourMeta.tourDays);

  const stopsByDay = route.stops.reduce<Record<number, typeof route.stops>>((acc, stop) => {
    const day = stop.day ?? 1;
    if (!acc[day]) acc[day] = [];
    acc[day].push(stop);
    return acc;
  }, {});

  const dayNumbers = Object.keys(stopsByDay)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <>
      {isMultiDay && tourMeta.multiDayItinerary && tourMeta.multiDayItinerary.length > 0 && (
        <section className="panel-section bg-surface">
          <div className="mx-auto max-w-4xl">
            <div
              className={`mb-2 inline-flex rounded-full bg-gradient-to-r ${groupStyle.gradient} px-3 py-1 text-xs font-bold uppercase tracking-wide text-white`}
            >
              {t("routesPage.tourDayBadge", { days: tourMeta.tourDays })}
            </div>
            <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50">
              {t("routesPage.multiDayTitle")}
            </h2>
            <p className="mt-2 text-sm text-body">{t("routesPage.multiDayNote")}</p>
            <div className="mt-8 space-y-5">
              {tourMeta.multiDayItinerary.map((leg) => {
                const legStyle = getRouteGroupStyle(tourMeta.tourDays);
                return (
                  <div
                    key={leg.day}
                    className={`panel overflow-hidden border-l-4 ${legStyle.border}`}
                  >
                    <div className={`bg-gradient-to-r ${legStyle.gradient} px-5 py-3`}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                          G{leg.day}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-white">{leg.title}</h3>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="text-body">{leg.description}</p>
                      {leg.places && leg.places.length > 0 && (
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {leg.places.map((place) => (
                            <li
                              key={place}
                              className="flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-2 text-sm text-body dark:bg-ink-700/50"
                            >
                              <span className={`text-xs font-bold ${legStyle.heading}`}>📍</span>
                              {place}
                            </li>
                          ))}
                        </ul>
                      )}
                      {leg.stayOptions && leg.stayOptions.length > 0 && (
                        <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/80 p-4 dark:border-brand-700 dark:bg-ink-700/60">
                          <p className="text-label text-brand-800 dark:text-brand-300">
                            🏨 {t("routeDetail.overnight")}
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {leg.stayOptions.map((stay) => (
                              <li key={stay} className="text-sm text-body">
                                {stay}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="panel-section bg-surface">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50">
            {isMultiDay ? t("routeDetail.allStopsTitle") : t("routeDetail.stopsTitle")}
          </h2>
          <p className="mt-2 text-sm text-body">{t("routeDetail.stopsHint")}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: t("routeDetail.totalDriveKm"),
                value: t("routeDetail.kmValue", { km: route.totalDriveKm }),
                icon: "🛣️",
              },
              {
                label: t("routeDetail.totalDriveMin"),
                value: formatMin(route.totalDriveMin, t),
                icon: "🏍️",
              },
              {
                label: t("routeDetail.totalVisitMin"),
                value: formatMin(route.totalVisitMin, t),
                icon: "📍",
              },
              {
                label: isMultiDay ? t("routeDetail.rentalDays") : t("routeDetail.totalDayMin"),
                value: isMultiDay
                  ? t("routesPage.tourDayBadge", { days: tourMeta.tourDays })
                  : formatMin(route.totalDayMin, t),
                icon: "⏱️",
                accent: true,
              },
            ].map((item) => (
              <div key={item.label} className="panel p-4">
                <p className="text-label">
                  {item.icon} {item.label}
                </p>
                <p
                  className={`mt-2 text-lg font-bold ${item.accent ? "text-brand-600 dark:text-brand-400" : "text-ink-950 dark:text-neutral-100"}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {route.fuelEstimate && (
            <p className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50/80 px-4 py-3 text-sm text-body dark:border-ink-600 dark:bg-ink-700/40">
              ⛽ {route.fuelEstimate}
            </p>
          )}

          <div className="mt-8 space-y-8">
            {isMultiDay
              ? dayNumbers.map((day) => {
                  const legStyle = getRouteGroupStyle(tourMeta.tourDays);
                  const legTitle =
                    tourMeta.multiDayItinerary?.find((l) => l.day === day)?.title ??
                    t("routeDetail.dayHeading", { day });
                  return (
                    <div key={day}>
                      <div
                        className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${legStyle.gradient} px-4 py-1.5 text-sm font-bold text-white`}
                      >
                        {t("routeDetail.dayHeading", { day })} — {legTitle}
                      </div>
                      <div className="space-y-4">
                        {stopsByDay[day].map((stop) => (
                          <RouteStopCard key={stop.order} stop={stop} />
                        ))}
                      </div>
                    </div>
                  );
                })
              : route.stops.map((stop) => <RouteStopCard key={stop.order} stop={stop} />)}
          </div>
        </div>
      </section>
    </>
  );
}
