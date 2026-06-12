import type { MotorcycleRoute } from "@/lib/routes-types";
import type { MultiDayLeg } from "@/lib/route-tours";
import type { RouteCatalogEntry } from "@/i18n/messages/routes-catalog.types";

export type { RouteCatalogEntry };

type CatalogMessages = {
  routeCatalog?: Record<string, RouteCatalogEntry>;
};

function field(
  messages: CatalogMessages,
  routeId: string,
  key: keyof RouteCatalogEntry,
  fallback: string,
): string {
  const v = messages.routeCatalog?.[routeId]?.[key];
  return v && v.length > 0 ? v : fallback;
}

export function localizeRoute(route: MotorcycleRoute, messages: CatalogMessages): MotorcycleRoute {
  const id = route.id;
  return {
    ...route,
    name: field(messages, id, "name", route.name),
    tagline: field(messages, id, "tagline", route.tagline),
    description: field(messages, id, "description", route.description),
    highlights: field(messages, id, "highlights", route.highlights),
    bestTime: field(messages, id, "bestTime", route.bestTime),
    parkingInfo: field(messages, id, "parkingInfo", route.parkingInfo),
    fuelEstimate: field(messages, id, "fuelEstimate", route.fuelEstimate ?? "") || route.fuelEstimate,
    recommendedBike: field(messages, id, "recommendedBike", route.recommendedBike),
    startPoint: field(messages, id, "startPoint", route.startPoint),
    elevation: field(messages, id, "elevation", route.elevation),
    difficulty: (field(messages, id, "difficulty", route.difficulty) ||
      route.difficulty) as MotorcycleRoute["difficulty"],
  };
}

export function localizeItineraryLegs(
  routeId: string,
  legs: MultiDayLeg[],
  messages: CatalogMessages & {
    routeLegs?: Record<string, Record<string, { title?: string; description?: string; places?: string[]; stay?: string }>>;
  },
): MultiDayLeg[] {
  return legs.map((leg) => {
    const loc = messages.routeLegs?.[routeId]?.[String(leg.day)];
    if (!loc) return leg;
    return {
      ...leg,
      title: loc.title ?? leg.title,
      description: loc.description ?? leg.description,
      places: loc.places ?? leg.places,
      stayOptions: loc.stay ? [loc.stay] : leg.stayOptions,
    };
  });
}
