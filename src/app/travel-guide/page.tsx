"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import {
  formatArticleReadTime,
  getLocalizedArticles,
  getLocalizedCategories,
} from "@/lib/article-i18n";
import type { TranslationKey } from "@/i18n/translate";

function categoryLabel(t: (key: TranslationKey, params?: Record<string, string | number>) => string, key: string) {
  return t(`guidePage.categoryLabels.${key}` as TranslationKey);
}

export default function TravelGuidePage() {
  const { t, locale } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const articles = useMemo(() => getLocalizedArticles(locale), [locale]);
  const categories = useMemo(() => getLocalizedCategories(locale), [locale]);

  const filteredArticles = selectedCategory
    ? articles.filter((article) => article.categoryKey === selectedCategory)
    : articles;

  const formatReadTime = (readTime: string) =>
    formatArticleReadTime(readTime, (n) => t("guidePage.readMinutes", { n }));

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 to-jungle-800 px-4 py-20 text-white lg:px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">{t("guidePage.title")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {t("guidePage.subtitle", { count: articles.length })}
          </p>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="mb-4 font-heading text-lg font-bold text-ink-950 dark:text-white">
              {t("guidePage.categories")}
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === null
                    ? "bg-brand-500 text-white"
                    : "border border-neutral-300 text-ink-950 hover:border-brand-500 dark:border-ink-700 dark:text-white"
                }`}
              >
                {t("guidePage.all")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === cat.key
                      ? "bg-brand-500 text-white"
                      : "border border-neutral-300 text-ink-950 hover:border-brand-500 dark:border-ink-700 dark:text-white"
                  }`}
                >
                  {categoryLabel(t, cat.key)} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/travel-guide/${article.id}`}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-lift-lg dark:border-ink-700 dark:bg-ink-800"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    {categoryLabel(t, article.categoryKey)}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-100">
                    {formatReadTime(article.readTime)}
                  </span>
                </div>
                <h3 className="line-clamp-2 font-heading text-lg font-bold text-ink-950 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {article.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-100">{article.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-brand-600 transition-all group-hover:gap-3 dark:text-brand-400">
                  <span className="text-sm font-semibold">{t("guidePage.read")}</span>
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3.333 8h9.334M8.667 4.667L12 8l-3.333 3.333" strokeLinecap="round" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center dark:border-ink-700">
              <p className="text-neutral-600 dark:text-neutral-100">{t("guidePage.empty")}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-thai-gradient px-4 py-16 text-white lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold">{t("guidePage.ctaTitle")}</h2>
          <p className="mt-3 text-white/90">{t("guidePage.ctaSubtitle")}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/book"
              className="inline-flex justify-center rounded-lg bg-white px-6 py-3 font-bold text-brand-600 hover:bg-neutral-100"
            >
              {t("guidePage.ctaBook")}
            </Link>
            <Link
              href="/"
              className="inline-flex justify-center rounded-lg border border-white px-6 py-3 font-bold text-white hover:bg-white/10"
            >
              {t("guidePage.ctaHome")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
