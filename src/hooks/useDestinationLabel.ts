"use client";

import { useLocale } from "@/context/LocaleContext";
import {
  destinationDescKey,
  destinationFieldKey,
  destinationI18nBase,
  destinationNameKey,
} from "@/lib/destination-i18n";
import {
  formatDestinationDistance,
  formatDestinationDuration,
  formatTotalTimeWithVisit,
} from "@/lib/destination-format";
import { getDestinationTimingKeys } from "@/lib/destination-timing";
import type { DestinationSpot } from "@/lib/destinations";
import type { TranslationKey } from "@/i18n/translate";

export function useDestinationLabel(spot: DestinationSpot) {
  const { t } = useLocale();
  const nameKey = destinationNameKey(spot.slug);
  const descKey = destinationDescKey(spot.slug);
  const distanceKey = destinationFieldKey(spot.slug, "distance");
  const durationKey = destinationFieldKey(spot.slug, "duration");
  const bestForKey = destinationFieldKey(spot.slug, "bestFor");

  const distance = distanceKey
    ? t(distanceKey)
    : formatDestinationDistance(spot.distance, t);

  const timingKeys = getDestinationTimingKeys(spot.slug, destinationI18nBase(spot.slug));

  const driveTime = timingKeys?.driveKey
    ? t(timingKeys.driveKey as TranslationKey)
    : durationKey
      ? t(durationKey)
      : formatDestinationDuration(spot.duration, t);

  const totalTime = timingKeys?.totalKey
    ? t(timingKeys.totalKey as TranslationKey)
    : formatTotalTimeWithVisit(driveTime, t);

  return {
    name: nameKey ? t(nameKey) : spot.name,
    description: descKey ? t(descKey) : spot.description,
    distance,
    duration: driveTime,
    driveTime,
    totalTime,
    bestFor: bestForKey ? t(bestForKey) : spot.bestFor,
  };
}
