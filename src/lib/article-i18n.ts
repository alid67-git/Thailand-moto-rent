import type { Locale } from "@/i18n/config";
import type { Article } from "@/lib/articles";
import { TRAVEL_GUIDE_ARTICLES } from "@/lib/articles";
import { getArticleMultilingual, articlesDataMultilingual } from "@/lib/articles-multilingual";
import { getFullArticle } from "@/lib/articles-full";
import { guideArticlesEn } from "@/i18n/messages/guide-articles.en.i18n";
import { getArticleBody as getArticleBodyTr } from "@/lib/travel-guide-content";
import { getArticleBodyEn, hasCustomArticleBodyEn } from "@/lib/travel-guide-content.en";

/** Map articles.ts IDs → articles-multilingual.ts keys */
export const ARTICLE_CONTENT_ALIASES: Record<string, string> = {
  "monsoon-riding": "rainy-season",
  "night-riding": "night-safety",
  "sim-card": "communication",
  "local-restaurants": "phuket-restaurants",
  "weather-preparation": "weather-guide",
  "police-checkpoints": "checkpoint-tips",
  "atm-locations": "money-tips",
  "temple-visits": "temple-etiquette",
  "photography-spots": "photography-tips",
  "solo-traveler": "solo-travel",
  "high-vs-low-season": "season-guide",
  "rental-vs-buying": "rental-tips",
  "group-vs-solo": "group-riding",
};

/** Stable category keys — filter uses these, not localized labels */
export const ARTICLE_CATEGORY_KEYS: Record<string, string> = {
  Güvenlik: "safety",
  Hukuk: "legal",
  Dokümanlar: "documents",
  Pratik: "practical",
  İpuçları: "tips",
  Kültür: "culture",
  Motosikletler: "motorcycles",
  Donanım: "gear",
  Rehber: "guide",
  Karşılaştırma: "comparison",
  Deneyim: "experience",
};

export type LocalizedArticle = Article & {
  categoryKey: string;
};

type ArticleLang = "tr" | "en" | "th";

function articleLang(locale: Locale): ArticleLang {
  if (locale === "tr") return "tr";
  if (locale === "th") return "th";
  return "en";
}

function resolveContentId(id: string): string {
  return ARTICLE_CONTENT_ALIASES[id] ?? id;
}

type ArticleMeta = Pick<Article, "title" | "category" | "readTime" | "publishDate" | "excerpt">;

function fromMultilingual(id: string, lang: ArticleLang): ArticleMeta | null {
  const resolved = resolveContentId(id);
  const multi = getArticleMultilingual(resolved, lang) ?? getArticleMultilingual(id, lang);
  if (!multi) return null;
  return {
    title: multi.title,
    category: multi.category,
    readTime: multi.readTime,
    publishDate: multi.publishDate,
    excerpt: multi.excerpt,
  };
}

function fromFullArticle(id: string, lang: ArticleLang): ArticleMeta | null {
  const full = getFullArticle(id, lang) ?? getFullArticle(id, "en");
  if (!full || typeof full !== "object" || !("title" in full)) return null;
  return {
    title: full.title,
    category: full.category,
    readTime: full.readTime,
    publishDate: full.publishDate,
    excerpt: full.excerpt,
  };
}

function fromGuideCatalog(id: string, lang: ArticleLang): ArticleMeta | null {
  if (lang === "tr") return null;
  const en = guideArticlesEn[id];
  if (!en) return null;
  if (lang === "en") return en;
  return en;
}

export function getLocalizedArticle(id: string, locale: Locale): LocalizedArticle | null {
  const base = TRAVEL_GUIDE_ARTICLES.find((a) => a.id === id);
  if (!base) return null;

  const lang = articleLang(locale);
  const meta =
    fromFullArticle(id, lang) ??
    fromMultilingual(id, lang) ??
    fromGuideCatalog(id, lang) ??
    base;

  const categoryKey = ARTICLE_CATEGORY_KEYS[base.category] ?? base.category;

  return {
    id,
    title: meta.title,
    category: meta.category,
    readTime: meta.readTime,
    publishDate: meta.publishDate,
    excerpt: meta.excerpt,
    categoryKey,
  };
}

export function getLocalizedArticles(locale: Locale): LocalizedArticle[] {
  return TRAVEL_GUIDE_ARTICLES.map((a) => getLocalizedArticle(a.id, locale)!);
}

export function getLocalizedCategories(locale: Locale) {
  const articles = getLocalizedArticles(locale);
  const map = new Map<string, { key: string; name: string; count: number }>();
  for (const a of articles) {
    const existing = map.get(a.categoryKey);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(a.categoryKey, { key: a.categoryKey, name: a.category, count: 1 });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function multilingualBody(id: string, lang: ArticleLang): string | null {
  const resolved = resolveContentId(id);
  const entry =
    articlesDataMultilingual[resolved as keyof typeof articlesDataMultilingual] ??
    articlesDataMultilingual[id as keyof typeof articlesDataMultilingual];
  if (!entry) return null;
  const block = entry[lang]?.content ?? entry.en?.content ?? entry.tr?.content;
  return block?.trim() ?? null;
}

function fullArticleBody(id: string, lang: ArticleLang): string | null {
  const full = getFullArticle(id, lang) ?? (lang !== "en" ? getFullArticle(id, "en") : null);
  if (!full?.content) return null;
  return full.content.trim();
}

export function getLocalizedArticleBody(id: string, locale: Locale): string | null {
  const lang = articleLang(locale);

  if (lang === "tr") return getArticleBodyTr(id);

  const meta = getLocalizedArticle(id, locale);
  if (!meta) return null;

  return (
    fullArticleBody(id, lang) ??
    (hasCustomArticleBodyEn(id) ? getArticleBodyEn(id, meta.title, meta.category) : null) ??
    multilingualBody(id, lang) ??
    getArticleBodyEn(id, meta.title, meta.category)
  );
}

/** Format read time for display — e.g. "8 min" → localized */
export function formatArticleReadTime(readTime: string, readMinutesLabel: (n: number) => string): string {
  if (/[\u0E00-\u0E7F]/.test(readTime)) return readTime;
  const m = readTime.match(/(\d+)/);
  if (!m) return readTime;
  return readMinutesLabel(Number(m[1]));
}
