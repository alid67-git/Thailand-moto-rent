"use client";

import { useSearchParams } from "next/navigation";
import { BookingConfigurator } from "@/components/BookingConfigurator";
import { useLocale } from "@/context/LocaleContext";
import {
  DEFAULT_LOCATION_ID,
  getLocationById,
  isBookableLocation,
} from "@/lib/catalog";
import { formatLocationLabel } from "@/lib/locations";

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

const VALID_MODELS = ["click-160", "adv-160", "forza-350"];

export function BookPageClient() {
  const searchParams = useSearchParams();
  const { t } = useLocale();

  const locParam = searchParams.get("location") ?? DEFAULT_LOCATION_ID;
  const locationId = isBookableLocation(locParam) ? locParam : DEFAULT_LOCATION_ID;
  const location = getLocationById(locationId);

  const start = searchParams.get("start") ?? defaultStartDate();
  const end = searchParams.get("end") ?? defaultEndDate();
  const modelParam = searchParams.get("model") ?? "click-160";
  const modelId = VALID_MODELS.includes(modelParam) ? modelParam : "click-160";

  return (
    <>
      <div className="mb-8">
        {location && (
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {formatLocationLabel(t, location)}
          </p>
        )}
        <h1 className="mt-2 text-2xl font-bold text-stone-900 dark:text-neutral-50 sm:text-3xl">{t("book.title")}</h1>
        <p className="mt-2 text-stone-600">{t("book.subtitle")}</p>
      </div>
      <BookingConfigurator
        initialLocationId={locationId}
        initialStart={start}
        initialEnd={end}
        initialModelId={modelId}
      />
    </>
  );
}
