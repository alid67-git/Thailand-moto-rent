import type { MotorcycleRoute } from "@/lib/routes-types";
import type { MultiRouteDef, MultiRouteLegDef, MultiRouteStopDef } from "@/lib/multi-route-types";
import { buildStop, formatDurationFromMin, routeHeroImage, sumStops } from "@/lib/route-stop-builder";
import type { MultiDayLeg } from "@/lib/route-tours";

export function legsToItinerary(legs: MultiRouteLegDef[]): MultiDayLeg[] {
  return legs.map((leg) => ({
    day: leg.day,
    title: leg.title,
    description: leg.description,
    places: leg.places,
    stayOptions: leg.stay ? [leg.stay] : undefined,
  }));
}

export function buildMultiRoute(def: MultiRouteDef): MotorcycleRoute {
  let order = 1;
  const stops = def.legs.flatMap((leg) =>
    leg.stops.map((stop) =>
      buildStop({
        order: order++,
        day: leg.day,
        name: stop.name,
        description: stop.description,
        driveKm: stop.driveKm,
        driveMin: stop.driveMin,
        visitMin: stop.visitMin,
        destinationSlug: stop.destinationSlug,
        lat: stop.lat,
        lng: stop.lng,
        access: stop.access,
        tips: stop.tips,
      }),
    ),
  );

  const totals = sumStops(stops);
  const duration = `${def.tourDays} gün · ${def.driveTimeLabel}`;

  return {
    id: def.id,
    name: def.name,
    tagline: def.tagline,
    description: def.description,
    distance: `${def.totalDriveKm} km`,
    totalDriveKm: def.totalDriveKm,
    totalDriveMin: totals.totalDriveMin,
    totalVisitMin: totals.totalVisitMin,
    totalDayMin: totals.totalDayMin,
    duration,
    difficulty: def.difficulty,
    highlights: def.highlights,
    recommendedBike: def.recommendedBike,
    image: routeHeroImage(def.heroSlug, ""),
    bestTime: def.bestTime,
    elevation: def.elevation,
    startPoint: "Patong Beach Roundabout",
    parkingInfo: def.parkingInfo,
    fuelEstimate: def.fuelEstimate,
    stops,
    safetyTips: def.safetyTips,
  };
}

export function buildAllMultiRoutes(defs: MultiRouteDef[]): MotorcycleRoute[] {
  return defs.map(buildMultiRoute);
}

export { formatDurationFromMin };
