"use client";

import { useLocale } from "@/context/LocaleContext";
import { formatThb } from "@/lib/pricing";
import type { AddonOption } from "@/types";

interface AddonOptionCardProps {
  option: AddonOption;
  selected: boolean;
  days: number;
  onSelect: () => void;
}

export function AddonOptionCard({
  option,
  selected,
  days,
  onSelect,
}: AddonOptionCardProps) {
  const { t } = useLocale();
  const dailyTotal = option.pricePerDayThb * days;
  const total = dailyTotal + option.priceFlatThb;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border p-4 text-start transition ${
        selected
          ? "border-brand-500 bg-brand-50 ring-2 ring-brand-200"
          : "border-stone-200 bg-white hover:border-stone-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-stone-900">{t(option.nameKey)}</span>
            {option.included && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                {t("badges.included")}
              </span>
            )}
            {option.recommended && !option.included && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                {t("badges.recommended")}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-stone-600">{t(option.descriptionKey)}</p>
        </div>
        <div className="shrink-0 text-end">
          {option.included ? (
            <span className="text-sm font-semibold text-green-700">{t("badges.free")}</span>
          ) : option.priceFlatThb > 0 ? (
            <span className="text-sm font-bold text-stone-900">
              +{formatThb(option.priceFlatThb)}
            </span>
          ) : (
            <span className="text-sm font-bold text-stone-900">
              +{formatThb(option.pricePerDayThb)}
              {t("common.perDay")}
            </span>
          )}
          {!option.included && total > 0 && option.pricePerDayThb > 0 && (
            <p className="text-xs text-stone-400">
              {formatThb(total)} {t("common.total")}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
