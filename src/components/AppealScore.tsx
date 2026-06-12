"use client";

import { useLocale } from "@/context/LocaleContext";

export function AppealScore({ score, compact = false }: { score: number; compact?: boolean }) {
  const { t } = useLocale();
  const clamped = Math.max(1, Math.min(10, Math.round(score)));
  const filled = Math.round(clamped / 2);

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 shadow-md backdrop-blur-sm ${compact ? "scale-90" : ""}`}
      title={t("destinations.appealLabel", { score: clamped })}
      aria-label={t("destinations.appealLabel", { score: clamped })}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`leading-none ${compact ? "text-sm" : "text-base"} ${
              i < filled ? "text-amber-400" : "text-white/35"
            }`}
            aria-hidden
          >
            ★
          </span>
        ))}
      </div>
      <span className={`font-bold tabular-nums text-amber-300 ${compact ? "text-[10px]" : "text-xs"}`}>
        {clamped}/10
      </span>
    </div>
  );
}
