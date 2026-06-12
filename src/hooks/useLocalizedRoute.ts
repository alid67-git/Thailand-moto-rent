"use client";

import { useMemo } from "react";
import { useLocale } from "@/context/LocaleContext";
import { dictionaries } from "@/i18n";
import { localizeRoute } from "@/lib/route-i18n";
import { MOTORCYCLE_ROUTES } from "@/lib/routes";
import type { MotorcycleRoute } from "@/lib/routes-types";

export function useLocalizedRoute(route: MotorcycleRoute): MotorcycleRoute {
  const { locale } = useLocale();
  return useMemo(
    () => localizeRoute(route, dictionaries[locale]),
    [route, locale],
  );
}

export function useLocalizedRoutes(): MotorcycleRoute[] {
  const { locale } = useLocale();
  return useMemo(
    () => MOTORCYCLE_ROUTES.map((r) => localizeRoute(r, dictionaries[locale])),
    [locale],
  );
}

export function useLocalizedRouteById(id: string): MotorcycleRoute | undefined {
  const routes = useLocalizedRoutes();
  return useMemo(() => routes.find((r) => r.id === id), [routes, id]);
}
