"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";
import type { RouteWaypoint } from "@/lib/route-maps";
import { buildGoogleMapsRouteUrl, buildGoogleMapsStopUrl } from "@/lib/navigation-links";

const RouteMap = dynamic(() => import("@/components/RouteMap").then((m) => m.RouteMap), {
  ssr: false,
  loading: () => null,
});

interface RouteMapHeroProps {
  routeName: string;
  tagline: string;
  fallbackImage: string;
  waypoints: RouteWaypoint[];
}

export function RouteMapHero({
  routeName,
  tagline,
  fallbackImage,
  waypoints,
}: RouteMapHeroProps) {
  const { t } = useLocale();
  const hasMap = waypoints.length >= 2;
  const boatCount = waypoints.filter((w) => w.access === "boat").length;
  const googleUrl = buildGoogleMapsRouteUrl(waypoints);

  return (
    <section className="relative h-[28rem] overflow-hidden bg-ink-950 md:h-[32rem] lg:h-[36rem]">
      {hasMap ? (
        <div className="absolute inset-0 z-0 bg-ink-900 dark:bg-ink-950">
          <RouteMap waypoints={waypoints} />
        </div>
      ) : (
        <Image src={fallbackImage} alt={routeName} fill className="object-cover" priority sizes="100vw" />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink-950/95 via-ink-950/25 to-ink-950/10" />

      <div className="relative z-20 flex h-full flex-col justify-between px-4 py-6 lg:px-6 lg:py-8">
        <div className="mx-auto w-full max-w-6xl">
          <Link
            href="/routes"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-ink-950/50 px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm hover:text-white"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("routeDetail.back")}
          </Link>
        </div>

        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="pointer-events-none max-w-2xl">
              {hasMap && (
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-jungle-600/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {t("routeDetail.mapLabel")}
                  </span>
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                    {t("routeDetail.mapStopCount", { count: waypoints.length })}
                  </span>
                  {boatCount > 0 && (
                    <span className="inline-flex rounded-full bg-orange-500/80 px-3 py-1 text-xs font-semibold text-white">
                      {t("routeDetail.mapLegendBoat")}
                    </span>
                  )}
                </div>
              )}
              <h1 className="font-heading text-3xl font-extrabold text-white drop-shadow md:text-4xl lg:text-5xl">
                {routeName}
              </h1>
              <p className="mt-2 text-base text-white/85 drop-shadow md:text-lg">{tagline}</p>
            </div>

            {hasMap && googleUrl && (
              <div className="pointer-events-auto flex flex-col gap-2 sm:items-end">
                <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                  {t("routeDetail.navigate")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand-700 shadow-lift hover:bg-neutral-100"
                  >
                    <span aria-hidden>🗺️</span>
                    {t("routeDetail.googleMaps")}
                  </a>
                </div>
              </div>
            )}
          </div>

          {hasMap && waypoints.length > 0 && (
            <div className="pointer-events-auto mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {waypoints.map((wp, i) => (
                <a
                  key={`${wp.name}-${i}`}
                  href={buildGoogleMapsStopUrl(wp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition hover:bg-white/25 ${
                    wp.access === "boat"
                      ? "border-orange-300/40 bg-orange-500/25 text-white"
                      : "border-white/25 bg-white/15 text-white"
                  }`}
                >
                  <span>
                    {wp.access === "boat" ? "⛵ " : ""}
                    {i + 1}. {wp.name}
                  </span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                    {t("routeDetail.goTo")}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
