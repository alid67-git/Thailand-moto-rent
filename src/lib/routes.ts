export type { MotorcycleRoute, RouteStop, SafetyTip, StopAccess } from "@/lib/routes-types";
export { DAY_TRIP_ROUTES } from "@/lib/day-routes";
export { MULTI_DAY_ROUTES, MULTI_ROUTE_CATALOG } from "@/lib/multi-day-routes";

import { DAY_TRIP_ROUTES } from "@/lib/day-routes";
import { MULTI_DAY_ROUTES } from "@/lib/multi-day-routes";
import type { MotorcycleRoute } from "@/lib/routes-types";

export const MOTORCYCLE_ROUTES: MotorcycleRoute[] = [...DAY_TRIP_ROUTES, ...MULTI_DAY_ROUTES];

export function getRouteById(id: string): MotorcycleRoute | undefined {
  return MOTORCYCLE_ROUTES.find((r) => r.id === id);
}

export const FEATURED_ROUTE_IDS = [
  "khao-sok-adventure",
  "krabi-highlights",
  "phang-nga-bay-explorer",
  "khao-sok-krabi-adventure",
  "ultimate-south-adventure",
  "ultimate-phuket-loop",
  "southern-thailand-grand-tour",
  "ultimate-andaman-tour",
];
