"use client";

import { useEffect, useRef, useState } from "react";
import { FlagIcon } from "@/components/FlagIcon";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { useLocale } from "@/context/LocaleContext";

export function LanguageSwitcher({
  variant = "dark",
  compact = false,
}: {
  variant?: "dark" | "light";
  compact?: boolean;
}) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isLight = variant === "light";

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (compact) {
    return (
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`touch-target flex h-10 w-10 items-center justify-center rounded-lg border transition sm:h-9 sm:w-auto sm:gap-1.5 sm:px-2.5 ${
            isLight
              ? "border-neutral-200 bg-white hover:bg-neutral-50 dark:border-ink-600 dark:bg-ink-800 dark:hover:bg-ink-700"
              : "border-white/15 bg-white/10 hover:bg-white/15"
          }`}
          aria-label="Language"
        >
          <FlagIcon locale={locale} />
          <svg viewBox="0 0 12 12" className={`hidden h-3 w-3 transition-transform sm:block ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 4l4 4 4-4" strokeLinecap="round" />
          </svg>
        </button>
        {open && (
          <div className={`absolute right-0 top-full z-[60] mt-2 max-h-[min(70dvh,320px)] min-w-[168px] overflow-y-auto rounded-xl border shadow-lift-lg ${
            isLight
              ? "border-neutral-200 bg-white"
              : "border-white/10 bg-white/95 backdrop-blur-sm"
          }`}>
            <div className="divide-y divide-neutral-100 py-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setLocale(loc);
                    setOpen(false);
                  }}
                  className={`flex min-h-[44px] w-full items-center gap-2.5 px-3 py-2.5 text-sm transition ${
                    locale === loc
                      ? isLight
                        ? "bg-brand-50 font-semibold text-brand-600"
                        : "bg-brand-500/10 font-semibold text-brand-600"
                      : isLight
                        ? "text-neutral-600 hover:bg-neutral-50"
                        : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  <FlagIcon locale={loc} />
                  <span>{localeLabels[loc]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-0.5 rounded-lg border p-0.5 ${
        isLight ? "border-neutral-200 bg-neutral-50" : "border-white/15 bg-white/10"
      }`}
      role="group"
      aria-label="Language"
    >
      {locales.map((loc) => {
        const active = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc)}
            aria-label={localeLabels[loc]}
            aria-pressed={active}
            title={localeLabels[loc]}
            className={`flex h-8 w-9 items-center justify-center rounded-md transition ${
              active
                ? isLight
                  ? "bg-white ring-2 ring-brand-400 ring-offset-1 ring-offset-neutral-50"
                  : "bg-white/20 ring-2 ring-brand-400 ring-offset-1 ring-offset-ink-950"
                : isLight
                  ? "hover:bg-white"
                  : "hover:bg-white/10"
            }`}
          >
            <FlagIcon locale={loc} />
          </button>
        );
      })}
    </div>
  );
}
