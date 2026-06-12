export const locales = ["tr", "en", "th", "de", "fr", "ar", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const localeLabels: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  th: "ไทย",
  de: "Deutsch",
  fr: "Français",
  ar: "العربية",
  zh: "中文",
};

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export const LOCALE_STORAGE_KEY = "tmr-locale";
