import type { TranslationKey } from "@/i18n/translate";

type TFn = (key: TranslationKey, params?: Record<string, string | number>) => string;

/** Display times rounded to nearest 30 minutes (whole or half hour). */
export function roundToHalfHour(minutes: number): number {
  if (minutes <= 0) return 0;
  if (minutes <= 15) return 15;
  return Math.round(minutes / 30) * 30;
}

export function formatRoundedDuration(minutes: number, t: TFn): string {
  const rounded = roundToHalfHour(minutes);
  if (rounded === 0) return t("routeDetail.minOnly", { min: 15 });
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (h === 0) return t("routeDetail.minOnly", { min: m });
  if (m === 0) return t("routeDetail.hoursOnly", { hours: h });
  if (m === 30) return t("routeDetail.hoursHalf", { hours: h });
  return t("routeDetail.hoursAndMin", { hours: h, min: m });
}

/** Compact label for stop cards (e.g. "45 dk" → "30 dk", "90 dk" → "1,5 saat"). */
export function formatRoundedShort(minutes: number, t: TFn): string {
  return formatRoundedDuration(minutes, t);
}

/** Turkish/legacy string builder for route.duration fields in data. */
export function formatDurationFromMinRounded(totalMin: number): string {
  const rounded = roundToHalfHour(totalMin);
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (h === 0) return `~${m} dk`;
  if (m === 0) return `~${h} saat`;
  if (m === 30) return `~${h},5 saat`;
  return `~${h} saat ${m} dk`;
}
