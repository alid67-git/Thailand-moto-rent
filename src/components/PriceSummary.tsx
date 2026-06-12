"use client";



import { useLocale } from "@/context/LocaleContext";

import { formatThb } from "@/lib/pricing";

import type { MotorcycleModel, PriceBreakdown } from "@/types";



interface PriceSummaryProps {

  model: MotorcycleModel;

  locationLabel: string;

  startDate: string;

  endDate: string;

  price: PriceBreakdown;

  cancellationSelected: boolean;

}



function SummaryContent({

  model,

  locationLabel,

  startDate,

  endDate,

  price,

  cancellationSelected,

  compact = false,

}: PriceSummaryProps & { compact?: boolean }) {

  const { t } = useLocale();



  return (

    <>

      {!compact && (

        <>

          <h3 className="text-lg font-bold text-stone-900 dark:text-neutral-50">{t("summary.title")}</h3>

          <p className="mt-1 text-sm text-stone-500 dark:text-neutral-100">

            {locationLabel} · {startDate} · {endDate}

          </p>

        </>

      )}



      {!compact && (

        <div className="mt-4 rounded-xl bg-stone-50 p-4 dark:bg-ink-800">

          <p className="font-semibold text-stone-900 dark:text-neutral-100">{model.fullName}</p>

          <p className="text-sm text-stone-500 dark:text-neutral-100">

            {t("summary.days", { count: price.days })} × {formatThb(model.dailyPriceThb)}

            {t("fleet.perDay")}

          </p>

        </div>

      )}



      <dl className={`space-y-2 text-sm ${compact ? "" : "mt-4"}`}>

        {!compact && (

          <>

            <div className="flex justify-between gap-4">

              <dt className="text-stone-600 dark:text-neutral-100">{t("summary.rentalSubtotal")}</dt>

              <dd className="font-medium dark:text-neutral-100">{formatThb(price.baseRentalThb)}</dd>

            </div>

            <div className="flex justify-between gap-4">

              <dt className="text-stone-600 dark:text-neutral-100">{t("summary.insurance")}</dt>

              <dd className="font-medium dark:text-neutral-100">

                {price.insuranceThb === 0 ? t("badges.included") : formatThb(price.insuranceThb)}

              </dd>

            </div>

            <div className="flex justify-between gap-4">

              <dt className="text-stone-600 dark:text-neutral-100">{t("summary.topcase")}</dt>

              <dd className="font-medium dark:text-neutral-100">

                {price.topcaseThb === 0 ? t("badges.none") : formatThb(price.topcaseThb)}

              </dd>

            </div>

            {cancellationSelected && (

              <div className="flex justify-between gap-4">

                <dt className="text-stone-600 dark:text-neutral-100">{t("summary.cancellation")}</dt>

                <dd className="font-medium dark:text-neutral-100">{formatThb(price.cancellationInsuranceThb)}</dd>

              </div>

            )}

          </>

        )}

        <div className={`flex justify-between gap-4 font-bold text-stone-900 dark:text-neutral-50 ${compact ? "text-base" : "border-t border-stone-200 pt-2 text-base dark:border-ink-700"}`}>

          <dt>{t("summary.payNow")}</dt>

          <dd className="text-brand-700 dark:text-brand-400">{formatThb(price.payNowThb)}</dd>

        </div>

        {!compact && (

          <div className="flex justify-between gap-4 text-xs text-stone-500 dark:text-neutral-500">

            <dt>{t("summary.deposit")}</dt>

            <dd>{formatThb(price.depositThb)}</dd>

          </div>

        )}

      </dl>



      {!compact && (

        <>

          <button

            type="button"

            className="mt-5 w-full min-h-[48px] rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white hover:bg-brand-700 active:scale-[0.98]"

          >

            {t("summary.checkout")}

          </button>

          <p className="mt-2 text-center text-xs text-stone-400">{t("summary.checkoutNote")}</p>

        </>

      )}

    </>

  );

}



export function PriceSummary(props: PriceSummaryProps) {

  const { t } = useLocale();



  return (

    <>

      <aside className="hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-ink-700 dark:bg-ink-800 lg:block lg:sticky lg:top-24">

        <SummaryContent {...props} />

      </aside>



      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-4 py-3 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-ink-700 dark:bg-ink-950/95 lg:hidden">

        <div className="mx-auto flex max-w-lg items-center gap-4">

          <div className="min-w-0 flex-1">

            <p className="truncate text-xs text-stone-500 dark:text-neutral-100">{props.model.fullName}</p>

            <SummaryContent {...props} compact />

          </div>

          <button

            type="button"

            className="shrink-0 min-h-[48px] rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white active:scale-[0.98]"

          >

            {t("summary.checkout")}

          </button>

        </div>

      </div>

    </>

  );

}



