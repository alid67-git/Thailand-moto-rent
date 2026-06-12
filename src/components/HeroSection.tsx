"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchHero } from "@/components/SearchHero";
import { useLocale } from "@/context/LocaleContext";

export function HeroSection() {
  const { t } = useLocale();

  const stats = [
    { value: "4", label: t("hero.statBranches") },
    { value: "Honda", label: t("hero.statFleet") },
    { value: "24/7", label: t("hero.statSupport") },
  ];

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-ink-950 via-brand-900 to-jungle-900 sm:min-h-[92vh]">
      <Image
        src="/images/hero-phuket.jpg"
        alt=""
        fill
        className="object-cover object-center scale-105"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-brand-900/40" />
      <div className="pointer-events-none absolute -right-20 top-1/4 hidden h-[420px] w-[420px] rounded-full bg-brand-500/25 blur-[100px] sm:block" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 hidden h-[300px] w-[300px] rounded-full bg-jungle-500/20 blur-[80px] sm:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:gap-10 sm:py-16 lg:min-h-[92vh] lg:grid-cols-2 lg:gap-12 lg:px-6 lg:py-20">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-jungle-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              {t("hero.eyebrow")}
            </span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 md:text-lg lg:mx-0 mx-auto">
            {t("hero.subtitle")}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/book"
              className="flex min-h-[48px] items-center justify-center rounded-xl bg-thai-gradient px-7 py-3.5 text-center text-base font-bold text-white shadow-lg shadow-brand-500/30 transition hover:opacity-95 sm:text-sm"
            >
              {t("hero.search")} →
            </Link>
            <Link
              href="/#prices"
              className="flex min-h-[48px] items-center justify-center rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-center text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/15 sm:text-sm"
            >
              {t("nav.prices")}
            </Link>
          </div>

          <dl className="mt-8 flex flex-wrap justify-center gap-6 border-t border-white/10 pt-6 sm:mt-10 sm:gap-8 sm:pt-8 lg:justify-start lg:gap-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-heading text-2xl font-extrabold text-white md:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative w-full lg:max-w-none">
          <div className="relative mx-auto aspect-[4/3] max-h-[280px] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-1 shadow-2xl backdrop-blur-sm sm:max-h-none sm:rounded-3xl lg:mx-0 lg:max-w-none">
            <div className="relative h-full overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <Image
                src="/images/motorcycles/adv-160.jpg"
                alt="Honda ADV 160"
                fill
                className="object-contain object-center p-6 drop-shadow-2xl transition duration-700 hover:scale-[1.03]"
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent px-5 pb-4 pt-16">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-300">
                  Honda ADV 160
                </p>
                <p className="text-sm font-medium text-white/80">{t("hero.fleetCaption")}</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 hidden overflow-hidden rounded-2xl border border-white/20 shadow-xl lg:block">
            <Image
              src="/images/hero-coast.jpg"
              alt=""
              width={140}
              height={100}
              className="h-[100px] w-[140px] object-cover"
            />
          </div>

          <div className="mt-4 lg:absolute lg:-bottom-8 lg:right-0 lg:mt-0 lg:w-[min(100%,380px)]">
            <SearchHero variant="hero" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent sm:h-24 dark:from-[var(--background)]" />
    </section>
  );
}
