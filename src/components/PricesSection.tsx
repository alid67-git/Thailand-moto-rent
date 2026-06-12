"use client";

import Image from "next/image";
import { ModelCard } from "@/components/ModelCard";
import { useLocale } from "@/context/LocaleContext";
import { MOTORCYCLE_MODELS } from "@/lib/catalog";

export function PricesSection() {
  const { t } = useLocale();

  return (
    <section id="prices" className="relative overflow-hidden bg-white px-4 py-24 dark:bg-ink-950 lg:px-6">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <Image src="/images/hero-coast.jpg" alt="" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">{t("prices.eyebrow")}</span>
            <h2 className="section-title mt-3">{t("prices.title")}</h2>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-100">{t("prices.subtitle")}</p>
            <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-500">{t("prices.note")}</p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {t("prices.includes")}
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {MOTORCYCLE_MODELS.map((model) => (
            <ModelCard key={model.id} model={model} showBookLink={false} />
          ))}
        </div>
      </div>
    </section>
  );
}

