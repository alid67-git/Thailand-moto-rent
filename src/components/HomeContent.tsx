"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { DestinationsSection } from "@/components/DestinationsSection";
import { TrustSection } from "@/components/TrustSection";
import { useLocale } from "@/context/LocaleContext";

export function HomeContent() {
  const { t } = useLocale();

  const faqs = useMemo(
    () => [
      { q: t("home.faq.q1"), a: t("home.faq.a1") },
      { q: t("home.faq.q2"), a: t("home.faq.a2") },
      { q: t("home.faq.q3"), a: t("home.faq.a3") },
      { q: t("home.faq.q4"), a: t("home.faq.a4") },
      { q: t("home.faq.q5"), a: t("home.faq.a5") },
      { q: t("home.faq.q6"), a: t("home.faq.a6") },
    ],
    [t],
  );

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [faqs]);

  const featuredMotorcycles = [
    { id: "click160", name: "Honda Click 160", image: "/images/motorcycles/click-160.jpg" },
    { id: "adv160", name: "Honda ADV 160", image: "/images/motorcycles/adv-160.jpg" },
    { id: "adv350", name: "Honda ADV 350", image: "/images/motorcycles/adv-350.jpg" },
    { id: "forza350", name: "Honda Forza 350", image: "/images/motorcycles/forza-350.jpg" },
    { id: "xmax300", name: "Yamaha XMAX 300", image: "/images/motorcycles/xmax-300.jpg" },
  ] as const;

  const featuredRoutes = [
    { key: "south" as const, distance: "85 km" },
    { key: "krabi" as const, distance: "120 km" },
    { key: "khaoSok" as const, distance: "130 km" },
    { key: "phangNga" as const, distance: "95 km" },
  ];

  const reviews = [
    { author: "John (USA)", rating: 5, textKey: "home.reviews.r1.text" as const },
    { author: "Sarah (Australia)", rating: 5, textKey: "home.reviews.r2.text" as const },
    { author: "Marco (Italy)", rating: 5, textKey: "home.reviews.r3.text" as const },
    { author: "Emma (Germany)", rating: 5, textKey: "home.reviews.r4.text" as const },
  ];

  const steps = ["s1", "s2", "s3", "s4"] as const;

  return (
    <main>
      <HeroSection />

      <section className="px-4 py-24 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <span className="eyebrow">{t("home.featuredEyebrow")}</span>
            <h2 className="section-title mt-3">{t("home.featuredTitle")}</h2>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-100">
              {t("home.featuredSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredMotorcycles.map((moto) => (
              <Link
                key={moto.id}
                href="/motorcycles"
                className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:border-jungle-200 hover:shadow-lift-lg dark:border-ink-700 dark:bg-ink-800"
              >
                <div className="relative h-40 overflow-hidden bg-brand-50 dark:bg-ink-700">
                  <Image
                    src={moto.image}
                    alt={moto.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-ink-950 dark:text-white">{moto.name}</h3>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-100">
                    {t(`home.motos.${moto.id}.category`)}
                  </p>
                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                    {t(`home.motos.${moto.id}.highlights`)}
                  </p>
                  <p className="mt-4 text-lg font-bold text-brand-600 dark:text-brand-400">
                    {t(`home.motos.${moto.id}.price`)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/motorcycles"
            className="mt-10 inline-flex rounded-xl bg-thai-gradient px-6 py-3 font-bold text-white shadow-glow-sm hover:opacity-95"
          >
            {t("home.featuredViewAll")}
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-b from-brand-50/60 to-jungle-50/40 px-4 py-24 dark:from-ink-900 dark:to-ink-950 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <span className="eyebrow">{t("home.routesEyebrow")}</span>
            <h2 className="section-title mt-3">{t("home.routesTitle")}</h2>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-100">
              {t("home.routesSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredRoutes.map((route) => (
              <Link
                key={route.key}
                href="/routes"
                className="group overflow-hidden rounded-2xl border border-brand-100 bg-white p-6 shadow-lift transition-all duration-300 hover:-translate-y-1 hover:border-jungle-300 hover:shadow-lift-lg dark:border-ink-700 dark:bg-ink-800"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink-950 dark:text-white">
                      {t(`home.routes.${route.key}.name`)}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-100">
                      {t(`home.routes.${route.key}.highlights`)}
                    </p>
                  </div>
                  <svg viewBox="0 0 16 16" className="h-5 w-5 text-jungle-500 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3.333 8h9.334M8.667 4.667L12 8l-3.333 3.333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 text-sm">
                  <div>
                    <p className="text-xs font-bold uppercase text-neutral-400">{t("home.distance")}</p>
                    <p className="mt-1 font-bold text-ink-950 dark:text-white">{route.distance}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-neutral-400">{t("home.duration")}</p>
                    <p className="mt-1 font-bold text-ink-950 dark:text-white">{t(`home.routes.${route.key}.duration`)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/routes"
            className="mt-10 inline-flex rounded-xl border border-brand-300 px-6 py-3 font-bold text-brand-700 hover:bg-brand-50 dark:border-ink-600 dark:text-white dark:hover:bg-ink-800"
          >
            {t("home.routesViewAll")}
          </Link>
        </div>
      </section>

      <DestinationsSection />
      <TrustSection />

      <section className="px-4 py-24 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="eyebrow justify-center">{t("home.reviewsEyebrow")}</span>
            <h2 className="section-title mt-3">{t("home.reviewsTitle")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reviews.map((review) => (
              <div key={review.author} className="rounded-2xl border border-brand-100 bg-white p-6 shadow-lift dark:border-ink-700 dark:bg-ink-800">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-gold-400">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
                  &ldquo;{t(review.textKey)}&rdquo;
                </p>
                <p className="mt-4 font-semibold text-ink-950 dark:text-white">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-jungle-50/50 to-brand-50/50 px-4 py-24 dark:from-ink-900 dark:to-ink-950 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="eyebrow justify-center">{t("home.howEyebrow")}</span>
            <h2 className="section-title mt-3">{t("home.howTitle")}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step} className="rounded-2xl border border-brand-100 bg-white p-6 dark:border-ink-700 dark:bg-ink-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-thai-gradient text-xl font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 font-heading font-bold text-ink-950 dark:text-white">
                  {t(`home.steps.${step}.title`)}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-100">
                  {t(`home.steps.${step}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="eyebrow justify-center">{t("home.faqEyebrow")}</span>
            <h2 className="section-title mt-3">{t("home.faqTitle")}</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-brand-100 bg-white p-6 shadow-lift dark:border-ink-700 dark:bg-ink-800">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink-950 dark:text-white">
                  {faq.q}
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brand-500 transition group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-4 text-neutral-600 dark:text-neutral-100">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-thai-gradient px-4 py-16 text-white lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold">{t("home.ctaTitle")}</h2>
          <p className="mt-3 text-white/90">{t("home.ctaSubtitle")}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/book" className="inline-flex justify-center rounded-xl bg-white px-6 py-3 font-bold text-brand-600 hover:bg-neutral-100">
              {t("home.ctaBook")}
            </Link>
            <Link href="/motorcycles" className="inline-flex justify-center rounded-xl border border-white px-6 py-3 font-bold text-white hover:bg-white/10">
              {t("home.ctaFleet")}
            </Link>
          </div>
        </div>
      </section>

      <AboutSection />
    </main>
  );
}
