import type { Locale } from "@/i18n/config";
import type { Article } from "@/lib/articles";
import { TRAVEL_GUIDE_ARTICLES } from "@/lib/articles";
import { getGuideMeta, getGuideBody } from "@/lib/guide-articles";

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
  Safety: "safety",
  Legal: "legal",
  Documents: "documents",
  Practical: "practical",
  Tips: "tips",
  Culture: "culture",
  Motorcycles: "motorcycles",
  Gear: "gear",
  Guide: "guide",
  Comparison: "comparison",
  Experience: "experience",
  Sicherheit: "safety",
  Recht: "legal",
  Dokumente: "documents",
  Praktisch: "practical",
  Tipps: "tips",
  Kultur: "culture",
  Motorräder: "motorcycles",
  Ausrüstung: "gear",
  Reiseführer: "guide",
  Vergleich: "comparison",
  Erfahrung: "experience",
  Sécurité: "safety",
  Juridique: "legal",
  Pratique: "practical",
  Conseils: "tips",
  Motos: "motorcycles",
  Équipement: "gear",
  Comparaison: "comparison",
  Expérience: "experience",
  السلامة: "safety",
  القانون: "legal",
  المستندات: "documents",
  عملي: "practical",
  نصائح: "tips",
  الثقافة: "culture",
  الدراجات: "motorcycles",
  المعدات: "gear",
  دليل: "guide",
  مقارنة: "comparison",
  تجربة: "experience",
  安全: "safety",
  法律: "legal",
  证件: "documents",
  实用: "practical",
  技巧: "tips",
  文化: "culture",
  摩托车: "motorcycles",
  装备: "gear",
  指南: "guide",
  对比: "comparison",
  体验: "experience",
  ความปลอดภัย: "safety",
  กฎหมาย: "legal",
  เอกสาร: "documents",
  ปฏิบัติ: "practical",
  เคล็ดลับ: "tips",
  วัฒนธรรม: "culture",
  มอเตอร์ไซค์: "motorcycles",
  อุปกรณ์: "gear",
  คู่มือ: "guide",
  เปรียบเทียบ: "comparison",
  ประสบการณ์: "experience",
  Безопасность: "safety",
  Право: "legal",
  Документы: "documents",
  Практика: "practical",
  Советы: "tips",
  Культура: "culture",
  Мотоциклы: "motorcycles",
  Экипировка: "gear",
  Гид: "guide",
  Сравнение: "comparison",
  Опыт: "experience",
};

export type LocalizedArticle = Article & {
  categoryKey: string;
};

export function getLocalizedArticle(id: string, locale: Locale): LocalizedArticle | null {
  const base = TRAVEL_GUIDE_ARTICLES.find((a) => a.id === id);
  if (!base) return null;

  const meta = getGuideMeta(id, locale) ?? {
    title: base.title,
    category: base.category,
    readTime: base.readTime,
    publishDate: base.publishDate,
    excerpt: base.excerpt,
  };

  const categoryKey = ARTICLE_CATEGORY_KEYS[meta.category] ?? ARTICLE_CATEGORY_KEYS[base.category] ?? "guide";

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

export function getLocalizedArticleBody(id: string, locale: Locale): string | null {
  return getGuideBody(id, locale);
}

/** Format read time for display — e.g. "8 min" → localized */
export function formatArticleReadTime(readTime: string, readMinutesLabel: (n: number) => string): string {
  if (/[\u0E00-\u0E7F\u0600-\u06FF\u4e00-\u9fff\u0400-\u04FF]/.test(readTime)) return readTime;
  const m = readTime.match(/(\d+)/);
  if (!m) return readTime;
  return readMinutesLabel(Number(m[1]));
}
