"use client";

import { useLocale } from "@/context/LocaleContext";
import type { TranslationKey } from "@/i18n/translate";
import type { MotorcycleRoute } from "@/lib/routes-types";
import { RouteStopCard } from "@/components/RouteStopCard";

function formatMin(
  totalMin: number,
  t: (key: TranslationKey, params?: Record<string, string | number>) => string,
): string {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return t("routeDetail.minOnly", { min: m });
  if (m === 0) return t("routeDetail.hoursOnly", { hours: h });
  return t("routeDetail.hoursAndMin", { hours: h, min: m });
}

export function RouteStopsSection({ route }: { route: MotorcycleRoute }) {
  const { t } = useLocale();

  return (
    <section className="panel-section bg-surface">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50">
          {t("routeDetail.stopsTitle")}
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
              label: t("routeDetail.totalDayMin"),
              value: formatMin(route.totalDayMin, t),
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

        <div className="mt-8 space-y-4">
          {route.stops.map((stop) => (
            <RouteStopCard key={stop.order} stop={stop} />
          ))}
        </div>
      </div>
    </section>
  );
}
