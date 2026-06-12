"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { formatThb } from "@/lib/pricing";
import type { MotorcycleModel } from "@/types";

interface ModelCardProps {
  model: MotorcycleModel;
  compact?: boolean;
  showBookLink?: boolean;
}

export function ModelCard({ model, compact = false, showBookLink = true }: ModelCardProps) {
  const { t } = useLocale();

  const categoryLabel = {
    scooter: t("categories.scooter"),
    adventure: t("categories.adventure"),
    maxi: t("categories.maxi"),
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lift transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift-xl dark:border-ink-700 dark:bg-ink-800 dark:shadow-none">
      <div
        className="relative h-60 overflow-hidden"
        style={{
          background: `linear-gradient(145deg, #0f172a 0%, #1e293b 45%, ${model.accentColor}33 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,255,255,0.12),transparent_55%)]" />
        <Image
          src={model.image}
          alt={model.fullName}
          fill
          className="object-contain object-center p-5 transition duration-700 group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <div
          className="absolute left-3.5 top-3.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-lg"
          style={{ backgroundColor: model.accentColor }}
        >
          {categoryLabel[model.category]}
        </div>

        <div className="absolute right-3.5 top-3.5 rounded-full bg-white/95 px-3 py-1 shadow-md backdrop-blur-sm">
          <span className="text-xs font-bold text-brand-600">{formatThb(model.dailyPriceThb)}</span>
          <span className="text-[10px] text-neutral-400">{t("fleet.perDay")}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent px-4 pb-4 pt-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
            {model.brand}
          </p>
          <h3 className="font-heading text-xl font-extrabold tracking-tight text-white">
            {model.name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className={`text-sm leading-relaxed text-neutral-500 ${compact ? "line-clamp-2" : ""}`}>
          {t(model.descriptionKey)}
        </p>

        {!compact && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {model.bestForKeys.map((key) => (
              <span
                key={key}
                className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-600"
              >
                {t(key)}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 divide-x divide-neutral-100 rounded-xl bg-neutral-50 text-center">
          <div className="px-3 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
              {t("fleet.engine")}
            </p>
            <p className="mt-0.5 text-sm font-extrabold text-ink-950">{model.engineCc}cc</p>
          </div>
          <div className="px-3 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
              {t("fleet.from")}
            </p>
            <p className="mt-0.5 text-sm font-extrabold text-brand-600">{formatThb(model.dailyPriceThb)}</p>
          </div>
          <div className="px-3 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
              {t("fleet.deposit")}
            </p>
            <p className="mt-0.5 text-sm font-extrabold text-ink-950">{formatThb(model.depositThb)}</p>
          </div>
        </div>

        {showBookLink && (
          <Link
            href={`/book?model=${model.id}`}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-ink-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            {t("fleet.select")}
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
