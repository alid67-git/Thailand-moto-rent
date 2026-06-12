"use client";

import { useLocale } from "@/context/LocaleContext";
import { destinationDescKey, destinationNameKey } from "@/lib/destination-i18n";
import type { DestinationSpot } from "@/lib/destinations";

export function useDestinationLabel(spot: DestinationSpot) {
  const { t } = useLocale();
  const nameKey = destinationNameKey(spot.slug);
  const descKey = destinationDescKey(spot.slug);

  return {
    name: nameKey ? t(nameKey) : spot.name,
    description: descKey ? t(descKey) : spot.description,
  };
}
