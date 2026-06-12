"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AddonOptionCard } from "@/components/AddonOptionCard";
import { PriceSummary } from "@/components/PriceSummary";
import { useLocale } from "@/context/LocaleContext";
import {
  DEFAULT_LOCATION_ID,
  getLocationById,
  getModelById,
  MOTORCYCLE_MODELS,
} from "@/lib/catalog";
import { LocationSelect } from "@/components/LocationSelect";
import { formatLocationLabel } from "@/lib/locations";
import {
  CANCELLATION_INSURANCE,
  INSURANCE_OPTIONS,
  TOPCASE_OPTIONS,
} from "@/lib/addons";
import { calculatePrice, formatThb, rentalDays } from "@/lib/pricing";
import type { BookingSelection } from "@/types";

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

interface BookingConfiguratorProps {
  initialLocationId?: string;
  initialStart?: string;
  initialEnd?: string;
  initialModelId?: string;
}

export function BookingConfigurator({
  initialLocationId = DEFAULT_LOCATION_ID,
  initialStart = defaultStartDate(),
  initialEnd = defaultEndDate(),
  initialModelId = "click-160",
}: BookingConfiguratorProps) {
  const { t } = useLocale();

  const [selection, setSelection] = useState<BookingSelection>({
    locationId: initialLocationId,
    startDate: initialStart,
    endDate: initialEnd,
    modelId: initialModelId,
    insuranceId: "ins-standard",
    topcaseId: "top-35l",
    cancellationInsurance: true,
  });

  const model = getModelById(selection.modelId);
  const days = rentalDays(selection.startDate, selection.endDate);
  const price = useMemo(() => calculatePrice(selection), [selection]);
  const selectedLocation = getLocationById(selection.locationId);
  const locationLabel = selectedLocation
    ? formatLocationLabel(t, selectedLocation)
    : "";

  if (!model || !price) return null;

  return (
    <div className="grid gap-6 pb-28 lg:grid-cols-[1fr_320px] lg:gap-8 lg:pb-0">
      <div className="space-y-8">
        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-bold text-stone-900">{t("book.tripDetails")}</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase text-stone-500">
                {t("book.area")}
              </span>
              <LocationSelect
                value={selection.locationId}
                onChange={(locationId) =>
                  setSelection((s) => ({ ...s, locationId }))
                }
                className="mobile-input w-full rounded-xl border border-stone-300 px-3 py-3 dark:border-ink-600 dark:bg-ink-800 dark:text-neutral-100 sm:py-2.5"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase text-stone-500">
                {t("book.pickup")}
              </span>
              <input
                type="date"
                value={selection.startDate}
                onChange={(e) =>
                  setSelection((s) => ({ ...s, startDate: e.target.value }))
                }
                className="mobile-input w-full rounded-xl border border-stone-300 px-3 py-3 dark:border-ink-600 dark:bg-ink-800 dark:text-neutral-100 sm:py-2.5"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase text-stone-500">
                {t("book.return")}
              </span>
              <input
                type="date"
                value={selection.endDate}
                min={selection.startDate}
                onChange={(e) =>
                  setSelection((s) => ({ ...s, endDate: e.target.value }))
                }
                className="mobile-input w-full rounded-xl border border-stone-300 px-3 py-3 dark:border-ink-600 dark:bg-ink-800 dark:text-neutral-100 sm:py-2.5"
              />
            </label>
          </div>
          <p className="mt-2 text-xs text-stone-500">{t("location.pickupNote")}</p>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-bold text-stone-900">{t("book.chooseBike")}</h2>
          <p className="mt-1 text-sm text-stone-500">{t("book.chooseBikeNote")}</p>
          <div className="mt-4 grid gap-3">
            {MOTORCYCLE_MODELS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelection((s) => ({ ...s, modelId: m.id }))}
                className={`flex min-h-[72px] items-center gap-4 rounded-xl border p-3 text-start transition active:scale-[0.99] sm:p-4 ${
                  selection.modelId === m.id
                    ? "border-brand-500 bg-brand-50 ring-2 ring-brand-200"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                  <Image
                    src={m.image}
                    alt={m.fullName}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-stone-900">{m.fullName}</p>
                  <p className="text-sm text-stone-500">
                    {formatThb(m.dailyPriceThb)}
                    {t("fleet.perDay")} · {t("fleet.deposit")} {formatThb(m.depositThb)}
                  </p>
                </div>
                {selection.modelId === m.id && (
                  <span className="shrink-0 text-sm font-semibold text-brand-700">
                    {t("badges.selected")}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-bold text-stone-900">{t("book.insurance")}</h2>
          <p className="mt-1 text-sm text-stone-500">{t("book.insuranceNote")}</p>
          <div className="mt-4 space-y-3">
            {INSURANCE_OPTIONS.map((opt) => (
              <AddonOptionCard
                key={opt.id}
                option={opt}
                selected={selection.insuranceId === opt.id}
                days={days}
                onSelect={() =>
                  setSelection((s) => ({ ...s, insuranceId: opt.id }))
                }
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-bold text-stone-900">{t("book.topcase")}</h2>
          <p className="mt-1 text-sm text-stone-500">{t("book.topcaseNote")}</p>
          <div className="mt-4 space-y-3">
            {TOPCASE_OPTIONS.map((opt) => (
              <AddonOptionCard
                key={opt.id}
                option={opt}
                selected={selection.topcaseId === opt.id}
                days={days}
                onSelect={() =>
                  setSelection((s) => ({ ...s, topcaseId: opt.id }))
                }
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-bold text-stone-900">{t("book.cancellation")}</h2>
          <AddonOptionCard
            option={CANCELLATION_INSURANCE}
            selected={selection.cancellationInsurance}
            days={days}
            onSelect={() =>
              setSelection((s) => ({
                ...s,
                cancellationInsurance: !s.cancellationInsurance,
              }))
            }
          />
        </section>
      </div>

      <PriceSummary
        model={model}
        locationLabel={locationLabel}
        startDate={selection.startDate}
        endDate={selection.endDate}
        price={price}
        cancellationSelected={selection.cancellationInsurance}
      />
    </div>
  );
}
