"use client";

import { useMemo } from "react";
import { useLocale } from "@/context/LocaleContext";
import { dictionaries } from "@/i18n";
import { localizeDifficulty } from "@/lib/difficulty-i18n";
import { localizeRoute } from "@/lib/route-i18n";
import { MOTORCYCLE_ROUTES } from "@/lib/routes";
import type { MotorcycleRoute } from "@/lib/routes-types";

function withLocalizedDifficulty(route: MotorcycleRoute, locale: keyof typeof dictionaries): MotorcycleRoute {
  const msgs = dictionaries[locale];
  return {
    ...route,
    difficulty: localizeDifficulty(route.difficulty, {
      easy: msgs.routesPage.difficultyEasy,
      medium: msgs.routesPage.difficultyMedium,
      hard: msgs.routesPage.difficultyHard,
    }) as MotorcycleRoute["difficulty"],
  };
}

export function useLocalizedRoute(route: MotorcycleRoute): MotorcycleRoute {
  const { locale } = useLocale();
  return useMemo(
    () => withLocalizedDifficulty(localizeRoute(route, dictionaries[locale]), locale),
    [route, locale],
  );
}

export function useLocalizedRoutes(): MotorcycleRoute[] {
  const { locale } = useLocale();
  return useMemo(
    () => MOTORCYCLE_ROUTES.map((r) => withLocalizedDifficulty(localizeRoute(r, dictionaries[locale]), locale)),
    [locale],
  );
}

export function useLocalizedRouteById(id: string): MotorcycleRoute | undefined {
  const routes = useLocalizedRoutes();
  return useMemo(() => routes.find((r) => r.id === id), [routes, id]);
}
