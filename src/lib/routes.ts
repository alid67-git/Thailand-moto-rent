export type { MotorcycleRoute, RouteStop, SafetyTip, StopAccess } from "@/lib/routes-types";
export { DAY_TRIP_ROUTES } from "@/lib/day-routes";

import { DAY_TRIP_ROUTES } from "@/lib/day-routes";
import type { MotorcycleRoute } from "@/lib/routes-types";

export const MOTORCYCLE_ROUTES: MotorcycleRoute[] = DAY_TRIP_ROUTES;

export function getRouteById(id: string): MotorcycleRoute | undefined {
  return MOTORCYCLE_ROUTES.find((r) => r.id === id);
}
