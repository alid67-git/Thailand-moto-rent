import type { TranslationKey } from "@/i18n/translate";

type TFn = (key: TranslationKey, params?: Record<string, string | number>) => string;

export type DurationMessages = {
  minOnly: string;
  hoursOnly: string;
  hoursHalf: string;
  hoursAndMin: string;
  durationApprox: string;
  durationMultiDay: string;
};

function apply(template: string, params: Record<string, string | number>): string {
  return Object.entries(params).reduce(
    (s, [k, v]) => s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
    template,
  );
}

function formatMinutes(minutes: number, m: DurationMessages): string {
  const rounded = minutes <= 0 ? 0 : minutes <= 15 ? 15 : Math.round(minutes / 30) * 30;
  if (rounded === 0) return apply(m.minOnly, { min: 15 });
  const h = Math.floor(rounded / 60);
  const rem = rounded % 60;
  if (h === 0) return apply(m.minOnly, { min: rem });
  if (rem === 0) return apply(m.hoursOnly, { hours: h });
  if (rem === 30) return apply(m.hoursHalf, { hours: h });
  return apply(m.hoursAndMin, { hours: h, min: rem });
}

export function formatMinutesLocalized(minutes: number, m: DurationMessages): string {
  return formatMinutes(minutes, m);
}

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
  const rem = rounded % 60;
  if (h === 0) return t("routeDetail.minOnly", { min: rem });
  if (rem === 0) return t("routeDetail.hoursOnly", { hours: h });
  if (rem === 30) return t("routeDetail.hoursHalf", { hours: h });
  return t("routeDetail.hoursAndMin", { hours: h, min: rem });
}

export function formatRoundedShort(minutes: number, t: TFn): string {
  return formatRoundedDuration(minutes, t);
}

/** Turkish/legacy — static route build only; UI uses localizeRoute duration. */
export function formatDurationFromMinRounded(totalMin: number): string {
  const rounded = roundToHalfHour(totalMin);
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (h === 0) return `~${m} dk`;
  if (m === 0) return `~${h} saat`;
  if (m === 30) return `~${h},5 saat`;
  return `~${h} saat ${m} dk`;
}

function applyTemplate(template: string, params: Record<string, string | number>): string {
  return apply(template, params);
}

export { applyTemplate as applyDurationTemplate };
