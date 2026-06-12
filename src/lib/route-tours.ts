export type TourDays = 1 | 2 | 3 | 4 | 5;

export interface MultiDayLeg {
  day: number;
  title: string;
  description: string;
  stayOptions?: string[];
}

export interface RouteTourMeta {
  tourDays: TourDays;
  multiDayItinerary?: MultiDayLeg[];
}

const DAY_ROUTE_IDS = [
  "south-phuket-loop",
  "phuket-viewpoints-loop",
  "phuket-beach-hopping",
  "phuket-sunset-route",
  "big-buddha-culture",
  "hidden-phuket",
  "north-phuket-explorer",
  "phuket-old-town-cafe",
  "family-friendly-route",
  "phuket-night-ride",
  "luxury-phuket-route",
  "airport-plane-spotting",
] as const;

export const ROUTE_TOUR_META: Record<string, RouteTourMeta> = Object.fromEntries(
  DAY_ROUTE_IDS.map((id) => [id, { tourDays: 1 as TourDays }]),
);

export function getRouteTourMeta(routeId: string): RouteTourMeta {
  return ROUTE_TOUR_META[routeId] ?? { tourDays: 1 };
}

export const TOUR_DAY_GROUPS: TourDays[] = [1];
