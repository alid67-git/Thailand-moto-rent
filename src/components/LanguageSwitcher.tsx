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
    function onPointerOutside(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerOutside);
    return () => document.removeEventListener("pointerdown", onPointerOutside);
  }, []);

  function pickLocale(loc: Locale) {
    setLocale(loc);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`touch-target inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
          isLight
            ? "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 dark:border-ink-600 dark:bg-ink-800 dark:text-neutral-100 dark:hover:bg-ink-700"
            : "border-white/20 bg-white/10 text-white hover:bg-white/15"
        } ${compact ? "sm:min-h-[36px] sm:px-2.5" : ""}`}
      >
        <FlagIcon locale={locale} />
        <span className={compact ? "hidden sm:inline" : "inline"}>{localeLabels[locale]}</span>
        <svg
          viewBox="0 0 12 12"
          className={`h-3.5 w-3.5 shrink-0 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language"
          className={`absolute right-0 top-full z-[60] mt-2 w-[min(calc(100vw-1.5rem),18.5rem)] rounded-xl border p-1.5 shadow-lift-lg sm:w-72 ${
            isLight
              ? "border-neutral-200 bg-white"
              : "border-white/10 bg-ink-900/95 backdrop-blur-md"
          }`}
        >
          <div className="grid grid-cols-2 gap-1">
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={locale === loc}
                onPointerDown={(e) => {
                  e.preventDefault();
                  pickLocale(loc);
                }}
                onClick={() => pickLocale(loc)}
                className={`flex min-h-[42px] items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition touch-manipulation sm:min-h-[44px] sm:px-3 ${
                  locale === loc
                    ? isLight
                      ? "bg-brand-50 font-semibold text-brand-600"
                      : "bg-brand-500/15 font-semibold text-brand-300"
                    : isLight
                      ? "text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100"
                      : "text-white/80 hover:bg-white/5 active:bg-white/10"
                }`}
              >
                <FlagIcon locale={loc} className="shrink-0" />
                <span className="truncate leading-tight">{localeLabels[loc]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
