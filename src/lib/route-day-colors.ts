import type { TourDays } from "@/lib/route-tours";

/** Rota listesi / kart başlığı gradyan renkleri — gün sayısına göre */
export const ROUTE_GROUP_STYLES: Record<
  TourDays,
  { gradient: string; badge: string; heading: string; border: string }
> = {
  1: {
    gradient: "from-brand-500 to-jungle-600",
    badge: "bg-brand-500/90",
    heading: "text-brand-700 dark:text-brand-300",
    border: "border-brand-200 dark:border-brand-800",
  },
  2: {
    gradient: "from-orange-500 to-amber-600",
    badge: "bg-orange-500/90",
    heading: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
  },
  3: {
    gradient: "from-violet-500 to-purple-600",
    badge: "bg-violet-500/90",
    heading: "text-violet-700 dark:text-violet-300",
    border: "border-violet-200 dark:border-violet-800",
  },
  4: {
    gradient: "from-rose-500 to-pink-600",
    badge: "bg-rose-500/90",
    heading: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
  },
  5: {
    gradient: "from-indigo-500 to-blue-600",
    badge: "bg-indigo-500/90",
    heading: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-800",
  },
  7: {
    gradient: "from-amber-600 to-red-600",
    badge: "bg-amber-600/90",
    heading: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
  10: {
    gradient: "from-ink-700 to-ink-950",
    badge: "bg-ink-800/90",
    heading: "text-ink-800 dark:text-neutral-200",
    border: "border-ink-300 dark:border-ink-600",
  },
};

export function getRouteGroupStyle(days: TourDays) {
  return ROUTE_GROUP_STYLES[days] ?? ROUTE_GROUP_STYLES[1];
}
