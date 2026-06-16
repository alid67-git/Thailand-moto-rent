export const locales = ["tr", "en", "th", "de", "fr", "ar", "zh", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  th: "ไทย",
  de: "Deutsch",
  fr: "Français",
  ar: "العربية",
  zh: "中文",
  ru: "Русский",
};

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export const LOCALE_STORAGE_KEY = "tmr-locale";
export const LOCALE_CHOSEN_KEY = "tmr-locale-chosen";
export const LOCALE_COOKIE = "tmr-locale";
