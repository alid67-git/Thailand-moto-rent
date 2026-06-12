import type { TranslationKey } from "@/i18n/translate";

type TFn = (key: TranslationKey, params?: Record<string, string | number>) => string;

/** Ham İngilizce mesafe/süre metinlerini seçili dile çevirir */
export function formatDestinationDistance(raw: string, t: TFn): string {
  if (/in patong|0\s*km/i.test(raw)) {
    return t("destinations.distanceInPatong");
  }

  const km = raw.match(/~?\s*(\d+)\s*km/i);
  if (km) {
    return t("destinations.distanceFromPatongKm", { km: km[1] });
  }

  return raw;
}

export function formatDestinationDuration(raw: string, t: TFn): string {
  if (/immediate/i.test(raw)) {
    return t("destinations.durationImmediate");
  }

  const hoursShort = raw.match(/^(\d+)\s*h(?:ours?)?$/i);
  if (hoursShort) {
    return t("destinations.durationHours", { h: hoursShort[1] });
  }

  const rangeMin = raw.match(/(\d+)\s*[-–]\s*(\d+)\s*min(?:ute)?s?/i);
  if (rangeMin) {
    return t("destinations.durationMinutesRange", { from: rangeMin[1], to: rangeMin[2] });
  }

  const singleMin = raw.match(/^(\d+)\s*min(?:ute)?s?$/i);
  if (singleMin) {
    return t("destinations.durationMinutes", { min: singleMin[1] });
  }

  const rangeHour = raw.match(/(\d+)\s*[-–]\s*(\d+)\s*hour/i);
  if (rangeHour) {
    return t("destinations.durationHoursRange", { from: rangeHour[1], to: rangeHour[2] });
  }

  const singleHour = raw.match(/^(\d+)\s*hour/i);
  if (singleHour) {
    return t("destinations.durationHours", { h: singleHour[1] });
  }

  const plusHour = raw.match(/(\d+)\+\s*hour/i);
  if (plusHour) {
    return t("destinations.durationHoursPlus", { h: plusHour[1] });
  }

  return raw;
}

export function formatTotalTimeWithVisit(driveTime: string, t: TFn): string {
  return t("destinations.totalTimeWithVisit", { drive: driveTime });
}
