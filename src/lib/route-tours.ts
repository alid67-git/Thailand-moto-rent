import { DAY_TRIP_ROUTES } from "@/lib/day-routes";
import { legsToItinerary } from "@/lib/multi-route-builder";
import { MULTI_ROUTE_CATALOG } from "@/lib/multi-route-catalog";

export interface MultiDayLeg {
  day: number;
  title: string;
  description: string;
  places?: string[];
  stayOptions?: string[];
}

export type TourDays = 1 | 2 | 3 | 4 | 5 | 7 | 10;

export interface RouteTourMeta {
  tourDays: TourDays;
  multiDayItinerary?: MultiDayLeg[];
  featured?: boolean;
}

const DAY_META: Record<string, RouteTourMeta> = Object.fromEntries(
  DAY_TRIP_ROUTES.map((r) => [r.id, { tourDays: 1 as TourDays }]),
);

const MULTI_META: Record<string, RouteTourMeta> = Object.fromEntries(
  MULTI_ROUTE_CATALOG.map((r) => [
    r.id,
    {
      tourDays: r.tourDays,
      multiDayItinerary: legsToItinerary(r.legs),
      featured: r.featured,
    },
  ]),
);

export const ROUTE_TOUR_META: Record<string, RouteTourMeta> = {
  ...DAY_META,
  ...MULTI_META,
};

export function getRouteTourMeta(routeId: string): RouteTourMeta {
  return ROUTE_TOUR_META[routeId] ?? { tourDays: 1 };
}

export const TOUR_DAY_GROUPS: TourDays[] = [1, 2, 3, 4, 5, 7, 10];

export function isFeaturedRoute(routeId: string): boolean {
  return ROUTE_TOUR_META[routeId]?.featured === true;
}
