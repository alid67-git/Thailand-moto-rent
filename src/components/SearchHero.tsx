"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LocationSelect } from "@/components/LocationSelect";
import { useLocale } from "@/context/LocaleContext";
import { DEFAULT_LOCATION_ID } from "@/lib/catalog";

function defaultStartDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function defaultEndDate() {
  const d = new Date();
  d.setDate(d.getDate() + 4);
  return d.toISOString().slice(0, 10);
}

interface SearchHeroProps {
  variant?: "hero" | "default";
}

export function SearchHero({ variant = "default" }: SearchHeroProps) {
  const router = useRouter();
  const { t } = useLocale();
  const [locationId, setLocationId] = useState(DEFAULT_LOCATION_ID);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const isHero = variant === "hero";

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ location: locationId, start: startDate, end: endDate });
    router.push(`/book?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className={
        isHero
          ? "overflow-hidden rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur-xl sm:p-6"
          : "mt-8 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lift-lg sm:p-5 dark:border-ink-700 dark:bg-ink-800"
      }
    >
      {isHero && (
        <p className="mb-5 text-sm font-semibold text-white/80">
          {t("hero.search")} →
        </p>
      )}

      {!isHero && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="badge bg-brand-50 text-brand-700">
            {t("location.regionBadge")}
          </span>
          <span className="text-xs text-neutral-500">{t("location.pickupNote")}</span>
        </div>
      )}

      <div className="grid gap-3">
        <label className="block">
          <span className={`mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] ${isHero ? "text-white/50" : "text-neutral-400"}`}>
            {t("location.area")}
          </span>
          <LocationSelect
            value={locationId}
            onChange={setLocationId}
            className={`mobile-input w-full rounded-xl border px-3.5 py-3 font-medium outline-none transition-all duration-150 focus:ring-3 sm:py-2.5 ${
              isHero
                ? "border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-white/8 [&>option]:bg-ink-900 [&>option]:text-white"
                : "border-neutral-200 bg-white text-ink-900 focus:border-brand-500 focus:ring-brand-500/12 dark:border-ink-600 dark:bg-ink-800 dark:text-neutral-100"
            }`}
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={`mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] ${isHero ? "text-white/50" : "text-neutral-400"}`}>
              {t("book.pickup")}
            </span>
            <input
              type="date"
              value={startDate}
              min={defaultStartDate()}
              onChange={(e) => setStartDate(e.target.value)}
              className={`mobile-input w-full rounded-xl border px-3.5 py-3 font-medium outline-none transition-all duration-150 focus:ring-3 sm:py-2.5 ${
                isHero
                  ? "border-white/15 bg-white/10 text-white focus:border-white/30 focus:ring-white/8 [color-scheme:dark]"
                  : "border-neutral-200 bg-white text-ink-900 focus:border-brand-500 focus:ring-brand-500/12 dark:border-ink-600 dark:bg-ink-800 dark:text-neutral-100"
              }`}
            />
          </label>
          <label className="block">
            <span className={`mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] ${isHero ? "text-white/50" : "text-neutral-400"}`}>
              {t("book.return")}
            </span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`mobile-input w-full rounded-xl border px-3.5 py-3 font-medium outline-none transition-all duration-150 focus:ring-3 sm:py-2.5 ${
                isHero
                  ? "border-white/15 bg-white/10 text-white focus:border-white/30 focus:ring-white/8 [color-scheme:dark]"
                  : "border-neutral-200 bg-white text-ink-900 focus:border-brand-500 focus:ring-brand-500/12 dark:border-ink-600 dark:bg-ink-800 dark:text-neutral-100"
              }`}
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-1 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-brand-600 active:scale-[0.98] sm:text-sm"
        >
          {t("hero.search")}
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3.333 8h9.334M8.667 4.667L12 8l-3.333 3.333" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}
