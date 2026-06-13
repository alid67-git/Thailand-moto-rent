"use client";

import dynamic from "next/dynamic";
import { useLocale } from "@/context/LocaleContext";
import { buildGoogleMapsRouteUrl } from "@/lib/navigation-links";
import type { RouteWaypoint } from "@/lib/route-maps";

const RouteMap = dynamic(() => import("@/components/RouteMap").then((m) => m.RouteMap), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-neutral-200 dark:bg-ink-700" aria-hidden />
  ),
});

export function RouteCardMapPreview({
  routeName,
  waypoints,
}: {
  routeName: string;
  waypoints: RouteWaypoint[];
}) {
  const { t } = useLocale();
  const mapsUrl = buildGoogleMapsRouteUrl(waypoints);

  if (!mapsUrl || waypoints.length < 2) return null;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="group/map relative block h-36 overflow-hidden border-b border-neutral-200 bg-ink-900 dark:border-ink-700"
      aria-label={t("routesPage.openInMaps", { name: routeName })}
    >
      <RouteMap waypoints={waypoints} />
      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink-950/80 via-transparent to-transparent p-3 opacity-90 transition group-hover/map:from-ink-950/90">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-700 shadow dark:bg-ink-900/95 dark:text-brand-300">
          🗺️ {t("routesPage.openInMapsShort")}
        </span>
      </div>
    </a>
  );
}
