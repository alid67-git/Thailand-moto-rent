"use client";

import { useMemo } from "react";
import { useLocale } from "@/context/LocaleContext";
import { dictionaries } from "@/i18n";
import { localizeItineraryLegs } from "@/lib/route-i18n";
import { getRouteTourMeta } from "@/lib/route-tours";

export function useLocalizedTourMeta(routeId: string) {
  const { locale } = useLocale();

  return useMemo(() => {
    const meta = getRouteTourMeta(routeId);
    if (!meta.multiDayItinerary?.length) return meta;

    return {
      ...meta,
      multiDayItinerary: localizeItineraryLegs(routeId, meta.multiDayItinerary, dictionaries[locale]),
    };
  }, [routeId, locale]);
}
