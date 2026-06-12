"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  defaultLocale,
  isRtl,
  LOCALE_CHOSEN_KEY,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  type Locale,
  locales,
} from "@/i18n/config";
import { dictionaries } from "@/i18n";
import { createTranslator, type TranslationKey } from "@/i18n/translate";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function persistLocaleCookie(locale: Locale) {
  const secure = window.location.protocol === "https:";
  const parts = [
    `${LOCALE_COOKIE}=${locale}`,
    "path=/",
    `max-age=${60 * 60 * 24 * 365}`,
    "samesite=lax",
  ];
  if (secure) parts.push("secure");
  if (
    window.location.hostname === "thailand-moto-rent.com" ||
    window.location.hostname === "www.thailand-moto-rent.com"
  ) {
    parts.push("domain=.thailand-moto-rent.com");
  }
  document.cookie = parts.join("; ");
}

function applyDocumentLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
}

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const chosen = localStorage.getItem(LOCALE_CHOSEN_KEY);
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (chosen === "1" && stored && locales.includes(stored)) {
      setLocaleState(stored);
      applyDocumentLocale(stored);
    } else {
      setLocaleState(defaultLocale);
      applyDocumentLocale(defaultLocale);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyDocumentLocale(locale);
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale, ready]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
      localStorage.setItem(LOCALE_CHOSEN_KEY, "1");
      persistLocaleCookie(next);
      applyDocumentLocale(next);
      router.refresh();
    },
    [router],
  );

  const t = useMemo(() => createTranslator(dictionaries[locale]), [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
