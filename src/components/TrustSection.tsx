"use client";

import { useLocale } from "@/context/LocaleContext";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 text-gold-400" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 text-jungle-500" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h18v10H3V7z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 12h2" strokeLinecap="round" />
      <path d="M3 11h18" strokeLinecap="round" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12v4a2 2 0 002 2h1M20 12v4a2 2 0 01-2 2h-1" strokeLinecap="round" />
      <path d="M4 12a8 8 0 0116 0" strokeLinecap="round" />
    </svg>
  );
}

export function TrustSection() {
  const { t } = useLocale();

  const trustElements = [
    { icon: <ShieldIcon />, title: t("trust.safeTitle"), description: t("trust.safeDesc") },
    { icon: <StarIcon />, title: t("trust.starTitle"), description: t("trust.starDesc") },
    { icon: <WalletIcon />, title: t("trust.depositTitle"), description: t("trust.depositDesc") },
    { icon: <HeadsetIcon />, title: t("trust.supportTitle"), description: t("trust.supportDesc") },
  ];

  const certifications = [
    { name: t("trust.certGoogle"), abbr: "G" },
    { name: t("trust.certTrip"), abbr: "TA" },
    { name: t("trust.certReviews"), abbr: "✓" },
    { name: t("trust.certIso"), abbr: "ISO" },
  ];

  const reviews = [
    { name: "Ahmet K.", key: "review1" as const },
    { name: "European Travel Co.", key: "review2" as const },
    { name: "Sena M.", key: "review3" as const },
  ];

  return (
    <section className="bg-white px-4 py-24 dark:bg-ink-950 lg:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="eyebrow justify-center">{t("trust.eyebrow")}</span>
          <h2 className="section-title mt-3">{t("trust.title")}</h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-100">{t("trust.subtitle")}</p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trustElements.map((item) => (
            <div key={item.title} className="rounded-2xl border border-brand-100 bg-gradient-to-b from-brand-50/50 to-white p-6 text-center dark:border-ink-700 dark:from-ink-800 dark:to-ink-800">
              {item.icon}
              <h3 className="mt-3 font-heading font-bold text-ink-950 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-100">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-jungle-200 bg-jungle-50/40 p-8 dark:border-ink-700 dark:bg-ink-800">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-jungle-700 dark:text-jungle-400">
            {t("trust.partners")}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col items-center gap-3 rounded-xl bg-white p-4 dark:bg-ink-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-thai-gradient text-sm font-bold text-white">
                  {cert.abbr}
                </div>
                <p className="text-center text-sm font-semibold text-ink-950 dark:text-white">{cert.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-8 font-heading text-2xl font-bold text-ink-950 dark:text-white">
            {t("trust.googleReviews")}
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.key} className="rounded-2xl border border-brand-100 bg-white p-6 dark:border-ink-700 dark:bg-ink-800">
                <div>
                  <p className="font-semibold text-ink-950 dark:text-white">{review.name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-100">
                    {t(`trust.${review.key}.country`)} · {t(`trust.${review.key}.date`)}
                  </p>
                </div>
                <div className="mt-3 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} viewBox="0 0 24 24" className="h-4 w-4 fill-gold-400">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-100">
                  &ldquo;{t(`trust.${review.key}.text`)}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-thai-gradient p-8 text-center text-white shadow-glow-brand">
          <h3 className="font-heading text-2xl font-bold">{t("trust.ctaTitle")}</h3>
          <p className="mt-2 text-white/90">{t("trust.ctaSubtitle")}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://www.google.com/search?q=Thailand+Moto+Rent+Phuket+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-lg bg-white px-6 py-3 font-bold text-brand-600 hover:bg-neutral-100"
            >
              {t("trust.ctaButton")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
