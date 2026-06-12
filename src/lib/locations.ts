import type { ServiceLocation } from "@/types";
import type { TranslationKey } from "@/i18n/translate";

type TranslateFn = (key: TranslationKey, params?: Record<string, string | number>) => string;

export function formatLocationLabel(
  t: TranslateFn,
  location: ServiceLocation,
): string {
  return `${t(location.provinceKey)} · ${t(location.areaKey)}`;
}

export function formatLocationLabelById(
  t: TranslateFn,
  locationId: string,
  locations: ServiceLocation[],
): string {
  const loc = locations.find((l) => l.id === locationId);
  if (!loc) return "";
  return formatLocationLabel(t, loc);
}
