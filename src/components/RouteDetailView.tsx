"use client";

import Link from "next/link";
import { RouteMapHero } from "@/components/RouteMapHero";
import { RouteStopsSection } from "@/components/RouteStopsSection";
import { useLocalizedRouteById } from "@/hooks/useLocalizedRoute";
import { getRouteWaypoints } from "@/lib/route-maps";
import { getRouteTourMeta } from "@/lib/route-tours";
import { useLocale } from "@/context/LocaleContext";

export function RouteDetailView({ routeId }: { routeId: string }) {
  const { t } = useLocale();
  const route = useLocalizedRouteById(routeId);

  if (!route) return null;

  const tourMeta = getRouteTourMeta(routeId);
  const waypoints = getRouteWaypoints(routeId);

  return (
    <main>
      <RouteMapHero
        routeName={route.name}
        tagline={route.tagline}
        fallbackImage={route.image}
        waypoints={waypoints}
      />

      <section className="panel-section bg-surface">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {[
              { label: t("routesPage.distance"), value: route.distance },
              { label: t("routesPage.duration"), value: route.duration },
              { label: t("routesPage.difficulty"), value: route.difficulty, accent: true },
              { label: t("routeDetail.elevation"), value: route.elevation },
              { label: t("routeDetail.bestTime"), value: route.bestTime, small: true },
            ].map((item) => (
              <div key={item.label} className="panel p-4">
                <p className="text-label">{item.label}</p>
                <p
                  className={`mt-2 font-bold ${item.small ? "text-sm" : "text-lg"} ${item.accent ? "text-brand-600 dark:text-brand-400" : "text-ink-950 dark:text-neutral-100"}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-section">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50">
              {t("routeDetail.aboutTitle")}
            </h2>
            <p className="mt-4 leading-relaxed text-body">{route.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="panel p-5">
              <h3 className="font-heading font-bold text-ink-950 dark:text-neutral-50">
                {t("routeDetail.startPointTitle")}
              </h3>
              <p className="mt-2 text-body">{route.startPoint}</p>
            </div>
            <div className="panel p-5">
              <h3 className="font-heading font-bold text-ink-950 dark:text-neutral-50">
                {t("routeDetail.recommendedBikeTitle")}
              </h3>
              <p className="mt-2 font-bold text-brand-600 dark:text-brand-400">{route.recommendedBike}</p>
            </div>
            <div className="panel p-5">
              <h3 className="font-heading font-bold text-ink-950 dark:text-neutral-50">
                {t("routeDetail.parkingTitle")}
              </h3>
              <p className="mt-2 text-body">{route.parkingInfo}</p>
            </div>
            <div className="panel p-5">
              <h3 className="font-heading font-bold text-ink-950 dark:text-neutral-50">
                {t("routeDetail.highlightsTitle")}
              </h3>
              <p className="mt-2 text-body">{route.highlights}</p>
            </div>
          </div>
        </div>
      </section>

      <RouteStopsSection route={route} tourMeta={tourMeta} />

      <section className="panel-section">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50">
            {t("routeDetail.safetyTitle")}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {route.safetyTips.map((tip, i) => (
              <div key={i} className="panel p-6">
                <div className="text-3xl">{tip.icon}</div>
                <h3 className="mt-3 font-heading font-bold text-ink-950 dark:text-neutral-50">{tip.title}</h3>
                <p className="mt-2 text-sm text-body">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-section bg-surface">
        <div className="mx-auto max-w-4xl">
          <div className="panel-accent p-6">
            <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">
              {t("routeDetail.recommendedCta", { bike: route.recommendedBike })}
            </p>
            <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <p className="text-lg font-bold text-ink-950 dark:text-neutral-100">{route.recommendedBike}</p>
                <p className="text-sm text-body">{t("routeDetail.recommendedSubtext")}</p>
              </div>
              <Link
                href="/book"
                className="whitespace-nowrap rounded-lg bg-thai-gradient px-6 py-3 font-bold text-white hover:opacity-95"
              >
                {t("routeDetail.bookNow")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="panel-section">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-thai-gradient p-8 text-center text-white shadow-lift md:p-12">
            <h2 className="font-heading text-3xl font-bold">{t("routeDetail.readyTitle")}</h2>
            <p className="mt-3 text-white/90">{t("routeDetail.readySubtitle", { name: route.name })}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/book"
                className="inline-flex justify-center rounded-lg bg-white px-6 py-3 font-bold text-brand-600 hover:bg-neutral-100"
              >
                {t("routeDetail.bookMoto")}
              </Link>
              <Link
                href="/routes"
                className="inline-flex justify-center rounded-lg border border-white px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                {t("routeDetail.otherRoutes")}
              </Link>
              <Link
                href="/travel-guide"
                className="inline-flex justify-center rounded-lg border border-white px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                {t("routeDetail.travelGuide")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
