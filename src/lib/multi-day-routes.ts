import { buildAllMultiRoutes } from "@/lib/multi-route-builder";
import { MULTI_ROUTE_CATALOG } from "@/lib/multi-route-catalog";

export const MULTI_DAY_ROUTES = buildAllMultiRoutes(MULTI_ROUTE_CATALOG);

export { MULTI_ROUTE_CATALOG };
