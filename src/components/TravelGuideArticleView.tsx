"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLocale } from "@/context/LocaleContext";
import {
  getLocalizedArticle,
  getLocalizedArticleBody,
  getLocalizedArticles,
} from "@/lib/article-i18n";
import { ArticleContent } from "@/components/ArticleContent";

export function TravelGuideArticleView({ articleId }: { articleId: string }) {
  const { t, locale } = useLocale();

  const article = useMemo(() => getLocalizedArticle(articleId, locale), [articleId, locale]);
  const content = useMemo(() => getLocalizedArticleBody(articleId, locale), [articleId, locale]);

  const related = useMemo(() => {
    if (!article) return [];
    const all = getLocalizedArticles(locale);
    return all
      .filter((a) => a.id !== articleId && a.categoryKey === article.categoryKey)
      .slice(0, 3)
      .concat(all.filter((a) => a.id !== articleId && a.categoryKey !== article.categoryKey).slice(0, 1))
      .slice(0, 3);
  }, [article, articleId, locale]);

  if (!article || !content) return null;

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-900 to-ink-950 px-4 py-20 text-white lg:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/travel-guide"
            className="mb-4 inline-flex items-center gap-2 text-white/80 hover:text-white"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12L6 8l4-4" strokeLinecap="round" />
            </svg>
            {t("guidePage.articleBack")}
          </Link>
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
            {article.category}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold md:text-5xl">{article.title}</h1>
          <div className="mt-6 flex items-center gap-4 text-white/70">
            <span>{article.readTime}</span>
            <span>·</span>
            <span>{article.publishDate}</span>
          </div>
        </div>
      </section>

      <section className="panel-section bg-surface">
        <div className="mx-auto max-w-3xl">
          <ArticleContent content={content} />

          <div className="panel-accent mt-12 p-8 text-center">
            <h3 className="font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50">
              {t("guidePage.articleCtaTitle")}
            </h3>
            <p className="mt-2 text-body">{t("guidePage.articleCtaText")}</p>
            <Link href="/book" className="btn-primary mt-6">
              {t("guidePage.articleCtaBook")}
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { href: "/routes", label: t("guidePage.linkRoutes") },
              { href: "/destinations", label: t("guidePage.linkDestinations") },
              { href: "/motorcycles", label: t("guidePage.linkMotorcycles") },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="panel flex items-center justify-between p-4 transition hover:border-brand-500"
              >
                <span className="font-semibold text-ink-950 dark:text-neutral-100">{link.label}</span>
                <span className="text-brand-600 dark:text-brand-400">→</span>
              </Link>
            ))}
          </div>

          {related.length > 0 && (
            <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-ink-700">
              <h3 className="font-heading text-lg font-bold text-ink-950 dark:text-neutral-50">
                {t("guidePage.relatedArticles")}
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {related.map((art) => (
                  <Link
                    key={art.id}
                    href={`/travel-guide/${art.id}`}
                    className="panel p-4 transition hover:border-brand-500"
                  >
                    <h4 className="line-clamp-2 font-bold text-ink-950 dark:text-neutral-100">{art.title}</h4>
                    <p className="mt-2 text-sm text-muted">{art.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
