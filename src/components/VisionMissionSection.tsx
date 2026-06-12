"use client";

import { useLocale } from "@/context/LocaleContext";

export function VisionMissionSection() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden bg-ink-950 px-4 py-24 text-white lg:px-6">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
      <div className="pointer-events-none absolute inset-0 bg-grid-ink bg-grid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-brand-400">{t("vision.eyebrow")}</span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            {t("vision.title")}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Vision */}
          <article
            id="vision"
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/14 hover:bg-white/8"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/10 blur-3xl" />
            <div className="relative">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2C6.477 2 2 6.477 2 12M12 2c5.523 0 10 4.477 10 10M12 22c-5.523 0-10-4.477-10-10M12 22c5.523 0 10-4.477 10-10" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-400">
                {t("vision.eyebrow")}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-extrabold">{t("vision.title")}</h3>
              <p className="mt-4 leading-relaxed text-white/60">{t("vision.text")}</p>
            </div>
          </article>

          {/* Mission */}
          <article
            id="mission"
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/14 hover:bg-white/8"
          >
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-sky-500/8 blur-3xl" />
            <div className="relative">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-400">
                {t("mission.eyebrow")}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-extrabold">{t("mission.title")}</h3>
              <p className="mt-4 leading-relaxed text-white/60">{t("mission.text")}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
