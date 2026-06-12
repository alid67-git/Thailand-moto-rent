"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import type { IslandAccessGuide } from "@/lib/island-access";

export function IslandAccessSection({ guide }: { guide: IslandAccessGuide }) {
  const { t } = useLocale();

  return (
    <div className="mt-12 rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-sky-50 p-6 dark:border-cyan-900 dark:from-cyan-950/30 dark:to-ink-900 sm:p-8">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-lg text-white">
          ⛵
        </span>
        <div>
          <h2 className="font-heading text-xl font-bold text-ink-950 dark:text-white sm:text-2xl">
            {t("islandAccess.title")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            {guide.summary}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-cyan-100 bg-white/80 p-4 dark:border-ink-700 dark:bg-ink-800/80">
          <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
            {t("islandAccess.motoEndpoint")}
          </p>
          <p className="mt-2 font-semibold text-ink-950 dark:text-white">{guide.motoEndpoint}</p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{guide.motoFromPatong}</p>
        </div>
        <div className="rounded-xl border border-cyan-100 bg-white/80 p-4 dark:border-ink-700 dark:bg-ink-800/80">
          <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
            {t("islandAccess.boatPier")}
          </p>
          <p className="mt-2 font-semibold text-ink-950 dark:text-white">{guide.boatPier}</p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {guide.boatType} · {guide.boatDuration}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-heading text-base font-bold text-ink-950 dark:text-white">
          {t("islandAccess.stepsTitle")}
        </h3>
        <ol className="mt-3 space-y-2">
          {guide.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
        <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
          {t("islandAccess.tipsTitle")}
        </h3>
        <ul className="mt-2 space-y-1.5">
          {guide.tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-amber-900/90 dark:text-amber-100/90">
              <span className="shrink-0">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function IslandAccessCompact({
  guide,
  destinationSlug,
}: {
  guide: IslandAccessGuide;
  destinationSlug?: string;
}) {
  const { t } = useLocale();

  return (
    <div
      className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50/80 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/20"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-cyan-800 dark:text-cyan-300">
        ⛵ {t("islandAccess.compactTitle")}
      </p>
      <p className="mt-2 text-sm text-body">{guide.summary}</p>
      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
        <div>
          <span className="font-bold text-ink-950 dark:text-neutral-100">
            {t("islandAccess.motoEndpoint")}:
          </span>{" "}
          <span className="text-body">{guide.motoEndpoint}</span>
        </div>
        <div>
          <span className="font-bold text-ink-950 dark:text-neutral-100">
            {t("islandAccess.boatPier")}:
          </span>{" "}
          <span className="text-body">
            {guide.boatType} · {guide.boatDuration}
          </span>
        </div>
      </div>
      {destinationSlug && (
        <Link
          href={`/destinations/${destinationSlug}`}
          className="mt-3 inline-flex text-xs font-bold text-brand-700 hover:underline dark:text-brand-300"
        >
          {t("islandAccess.viewFullGuide")} →
        </Link>
      )}
    </div>
  );
}
