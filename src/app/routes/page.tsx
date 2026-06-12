"use client";

import Link from "next/link";
import { MOTORCYCLE_ROUTES } from "@/lib/routes";
import { getRouteTourMeta, TOUR_DAY_GROUPS } from "@/lib/route-tours";
import { useLocale } from "@/context/LocaleContext";

function RouteCard({ route }: { route: (typeof MOTORCYCLE_ROUTES)[number] }) {
  const { t } = useLocale();
  const meta = getRouteTourMeta(route.id);

  return (
    <Link
      href={`/routes/${route.id}`}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-lift-lg dark:border-ink-700 dark:bg-ink-800"
    >
      <div className="bg-gradient-to-r from-brand-500 to-jungle-600 p-6 text-white">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
            {t("routesPage.tourDayBadge", { days: meta.tourDays })}
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold">{route.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-white/90">{route.tagline}</p>
      </div>

      <div className="p-6">
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-100">
              {t("routesPage.distance")}
            </p>
            <p className="mt-1 font-bold text-ink-950 dark:text-white">{route.distance}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-100">
              {t("routesPage.duration")}
            </p>
            <p className="mt-1 font-bold text-ink-950 dark:text-white">{route.duration}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-100">
              {t("routesPage.difficulty")}
            </p>
            <p className="mt-1 font-bold text-brand-600">{route.difficulty}</p>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-4 dark:border-ink-700">
          <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-100">
            {t("routesPage.highlights")}
          </p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-100">{route.highlights}</p>
        </div>

        <span className="mt-6 block w-full rounded-xl bg-thai-gradient px-4 py-3 text-center text-sm font-bold text-white transition group-hover:opacity-95">
          {t("routesPage.viewRoute")}
        </span>
      </div>
    </Link>
  );
}

export default function RoutesPage() {
  const { t } = useLocale();

  const tips = [
    { title: t("routesPage.tipFuel.title"), description: t("routesPage.tipFuel.description") },
    { title: t("routesPage.tipWeather.title"), description: t("routesPage.tipWeather.description") },
    { title: t("routesPage.tipSafety.title"), description: t("routesPage.tipSafety.description") },
    { title: t("routesPage.tipBreaks.title"), description: t("routesPage.tipBreaks.description") },
  ];

  const groups = TOUR_DAY_GROUPS.map((days) => ({
    days,
    routes: MOTORCYCLE_ROUTES.filter((r) => getRouteTourMeta(r.id).tourDays === days),
  })).filter((g) => g.routes.length > 0);

  return (
    <main>
      <section className="relative overflow-hidden bg-thai-gradient px-4 py-20 text-white lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em]">
              {t("routesPage.eyebrow")}
            </span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">{t("routesPage.title")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{t("routesPage.subtitle")}</p>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-14">
          {groups.map(({ days, routes }) => (
            <div key={days}>
              <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-white">
                {t("routesPage.tourDayLabel", { days })}
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {routes.map((route) => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-24 dark:bg-ink-900 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title">{t("routesPage.tipsTitle")}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-800"
              >
                <h3 className="font-bold text-ink-950 dark:text-white">{tip.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-100">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
