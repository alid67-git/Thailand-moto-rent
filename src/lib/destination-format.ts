import type { TranslationKey } from "@/i18n/translate";

type TFn = (key: TranslationKey, params?: Record<string, string | number>) => string;

/** Ham İngilizce mesafe/süre metinlerini seçili dile çevirir */
export function formatDestinationDistance(raw: string, t: TFn): string {
  if (/in patong|0\s*km|patong merkez|patong'dan\s*~?\s*0/i.test(raw)) {
    return t("destinations.distanceInPatong");
  }

  const kmFromPatongTr = raw.match(/patong'?dan\s*~?\s*(\d+)\s*km/i);
  if (kmFromPatongTr) {
    return t("destinations.distanceFromPatongKm", { km: kmFromPatongTr[1] });
  }

  const km = raw.match(/~?\s*(\d+)\s*km/i);
  if (km) {
    return t("destinations.distanceFromPatongKm", { km: km[1] });
  }

  return raw;
}

export function formatDestinationDuration(raw: string, t: TFn): string {
  if (/immediate|hemen|anında/i.test(raw)) {
    return t("destinations.durationImmediate");
  }

  // Turkish: "8 dk", "25–35 dk", "1,5 saat", "2–3 saat", "2+ saat"
  const trRangeMin = raw.match(/(\d+)\s*[–-]\s*(\d+)\s*dk/i);
  if (trRangeMin) {
    return t("destinations.durationMinutesRange", { from: trRangeMin[1], to: trRangeMin[2] });
  }

  const trSingleMin = raw.match(/^(\d+)\s*dk$/i);
  if (trSingleMin) {
    return t("destinations.durationMinutes", { min: trSingleMin[1] });
  }

  const trDecimalHour = raw.match(/^(\d+(?:[.,]\d+)?)\s*saat(?:\s*\+|\s*\+?\s*tekne|\s*\([^)]*\))?/i);
  if (trDecimalHour) {
    return t("destinations.durationHoursDecimal", { h: trDecimalHour[1].replace(",", ".") });
  }

  const trRangeHour = raw.match(/(\d+(?:[.,]\d+)?)\s*[–-]\s*(\d+(?:[.,]\d+)?)\s*saat/i);
  if (trRangeHour) {
    return t("destinations.durationHoursRange", {
      from: trRangeHour[1].replace(",", "."),
      to: trRangeHour[2].replace(",", "."),
    });
  }

  const trSingleHour = raw.match(/^(\d+)\s*saat/i);
  if (trSingleHour) {
    return t("destinations.durationHours", { h: trSingleHour[1] });
  }

  const trPlusHour = raw.match(/(\d+)\+\s*saat/i);
  if (trPlusHour) {
    return t("destinations.durationHoursPlus", { h: trPlusHour[1] });
  }

  const hoursShort = raw.match(/^(\d+)\s*h(?:ours?)?$/i);
  if (hoursShort) {
    return t("destinations.durationHours", { h: hoursShort[1] });
  }

  const decimalHour = raw.match(/^(\d+(?:[.,]\d+)?)\s*hours?$/i);
  if (decimalHour) {
    return t("destinations.durationHoursDecimal", { h: decimalHour[1].replace(",", ".") });
  }

  const decimalHourShort = raw.match(/^(\d+(?:[.,]\d+)?)\s*h$/i);
  if (decimalHourShort) {
    return t("destinations.durationHoursDecimal", { h: decimalHourShort[1].replace(",", ".") });
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
