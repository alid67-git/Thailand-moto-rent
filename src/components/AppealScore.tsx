"use client";

import { useLocale } from "@/context/LocaleContext";

export function AppealScore({ score, compact = false }: { score: number; compact?: boolean }) {
  const { t } = useLocale();
  const clamped = Math.max(1, Math.min(10, Math.round(score)));

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${compact ? "" : "rounded-full bg-white/10 px-2.5 py-1 backdrop-blur-sm"}`}
      title={t("destinations.appealLabel", { score: clamped })}
      aria-label={t("destinations.appealLabel", { score: clamped })}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className={`inline-block rounded-full ${
              compact ? "h-1.5 w-1.5" : "h-2 w-2"
            } ${i < clamped ? "bg-amber-400" : "bg-white/25 dark:bg-neutral-600"}`}
          />
        ))}
      </div>
      <span className={`font-bold tabular-nums text-amber-300 ${compact ? "text-[10px]" : "text-xs"}`}>
        {clamped}/10
      </span>
    </div>
  );
}
