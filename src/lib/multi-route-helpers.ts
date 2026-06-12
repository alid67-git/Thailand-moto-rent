import type { MotorcycleRoute, RouteStop } from "@/lib/routes-types";
import { formatDurationFromMin, routeHeroImage, sumStops } from "@/lib/route-stop-builder";

export { routeHeroImage };

export function finalizeRoute(
  base: Omit<
    MotorcycleRoute,
    "totalDriveKm" | "totalDriveMin" | "totalVisitMin" | "totalDayMin" | "duration" | "distance"
  > & { totalDriveKm?: number },
): MotorcycleRoute {
  const totals = sumStops(base.stops);
  const totalDriveKm = base.totalDriveKm ?? totals.totalDriveKm;
  return {
    ...base,
    ...totals,
    totalDriveKm,
    distance: `${totalDriveKm} km`,
    duration: formatDurationFromMin(totals.totalDayMin),
  };
}

export { buildStop } from "@/lib/route-stop-builder";
