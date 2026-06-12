"use client";

import { useLocale } from "@/context/LocaleContext";

const valueIcons = [
  <svg key="safety" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="transparent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" strokeLinecap="round" />
  </svg>,
  <svg key="quality" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export function AboutSection() {
  const { t } = useLocale();

  const values = [
    { title: t("about.value1Title"), text: t("about.value1Text") },
    { title: t("about.value2Title"), text: t("about.value2Text") },
    { title: t("about.value3Title"), text: t("about.value3Text") },
  ];

  const services = [
    t("whatWeDo.item1"),
    t("whatWeDo.item2"),
    t("whatWeDo.item3"),
    t("whatWeDo.item4"),
  ];

  return (
    <>
      {/* About */}
      <section id="about" className="relative overflow-hidden bg-white px-4 py-24 dark:bg-ink-950 lg:px-6">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-brand-100/30 blur-[100px]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-sky-100/40 blur-[80px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="eyebrow">{t("about.eyebrow")}</span>
            <h2 className="section-title mt-3">{t("about.title")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-500 dark:text-neutral-100">{t("about.text")}</p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white p-6 shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-lift-lg dark:border-ink-700 dark:bg-ink-800 dark:shadow-none"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                  {valueIcons[i]}
                </div>
                <h3 className="font-heading text-lg font-bold text-ink-950 dark:text-neutral-50">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-100">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do" className="bg-neutral-50 px-4 py-24 dark:bg-ink-900 lg:px-6">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="eyebrow">{t("whatWeDo.eyebrow")}</span>
            <h2 className="section-title mt-3">{t("whatWeDo.title")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-500 dark:text-neutral-100">{t("whatWeDo.text")}</p>
          </div>

          <ul className="mt-10 space-y-3 lg:mt-0">
            {services.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lift transition-all duration-200 hover:border-neutral-300 hover:shadow-lift-lg dark:border-ink-700 dark:bg-ink-800 dark:hover:border-ink-600"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink-950 font-heading text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-medium leading-relaxed text-ink-900 dark:text-neutral-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

