import type { Locale } from "@/i18n/config";
import type { Article } from "@/lib/articles";
import { TRAVEL_GUIDE_ARTICLES } from "@/lib/articles";
import { getArticleMultilingual, articlesDataMultilingual } from "@/lib/articles-multilingual";
import { guideArticlesEn } from "@/i18n/messages/guide-articles.en.i18n";
import { getArticleBody as getArticleBodyTr } from "@/lib/travel-guide-content";

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

function fromMultilingual(id: string, lang: ArticleLang): Partial<Article> | null {
  const multi = getArticleMultilingual(id, lang);
  if (!multi) return null;
  return {
    title: multi.title,
    category: multi.category,
    readTime: multi.readTime,
    publishDate: multi.publishDate,
    excerpt: multi.excerpt,
  };
}

export function getLocalizedArticle(id: string, locale: Locale): LocalizedArticle | null {
  const base = TRAVEL_GUIDE_ARTICLES.find((a) => a.id === id);
  if (!base) return null;

  const lang = articleLang(locale);
  const multi = fromMultilingual(id, lang);
  const enMeta = guideArticlesEn[id];

  let title = base.title;
  let category = base.category;
  let readTime = base.readTime;
  let publishDate = base.publishDate;
  let excerpt = base.excerpt;

  if (multi) {
    title = multi.title ?? title;
    category = multi.category ?? category;
    readTime = multi.readTime ?? readTime;
    publishDate = multi.publishDate ?? publishDate;
    excerpt = multi.excerpt ?? excerpt;
  } else if (lang === "en" && enMeta) {
    title = enMeta.title;
    category = enMeta.category;
    readTime = enMeta.readTime;
    publishDate = enMeta.publishDate;
    excerpt = enMeta.excerpt;
  } else if (lang === "th" && enMeta) {
    title = enMeta.title;
    category = enMeta.category;
    readTime = enMeta.readTime;
    publishDate = enMeta.publishDate;
    excerpt = enMeta.excerpt;
  }

  const categoryKey = ARTICLE_CATEGORY_KEYS[base.category] ?? base.category;

  return { id, title, category, readTime, publishDate, excerpt, categoryKey };
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

const COMPANY_POLICY_EN = `
## Thailand Moto Rent policy

- **We do not hold passports.** A **credit card pre-authorization** is used for deposit; released when you return the bike.
- **IDP (International Driving Permit) is mandatory.** Thai police accept only a **Thai licence or IDP** for foreigners — a home licence alone is not valid.
- **Rental terms:** Valid **motorcycle IDP** required; no rental without it.
- **Riding without IDP** and any fines are entirely the customer's responsibility.
- **Daily rental.** If returning late, notify us on **WhatsApp**.
- **No test rides.**
- **Damage:** Without insurance, repair cost + lost rental days. **Full coverage** recommended.
- **Drunk riding** carries severe penalties.
`;

function categoryTemplateEn(category: string, title: string): string {
  return `
# ${title}

This guide is for tourists planning to explore Phuket and surroundings by motorcycle.

## Overview

This ${category} article covers practical tips aligned with safe riding, IDP requirements, and Thailand Moto Rent rental terms.

## Key reminders

- Get your **IDP** before arriving in Thailand
- **Drunk riding** = heavy fines
- **Full insurance** recommended
- No passport deposit — **credit card hold** only

## More info

Related articles: International Licence, Thai Fines, Insurance Guide.

Contact us on WhatsApp for detailed questions.

${COMPANY_POLICY_EN}
`.trim();
}

export function getLocalizedArticleBody(id: string, locale: Locale): string | null {
  const lang = articleLang(locale);
  const multi = articlesDataMultilingual[id as keyof typeof articlesDataMultilingual];
  if (multi) {
    const content = multi[lang]?.content ?? multi.en?.content ?? multi.tr?.content;
    if (content) return content.trim();
  }

  if (lang === "tr") return getArticleBodyTr(id);

  const meta = getLocalizedArticle(id, locale);
  if (!meta) return null;

  const trBody = getArticleBodyTr(id);
  if (trBody && ARTICLE_BODIES_EN[id]) return ARTICLE_BODIES_EN[id].trim();

  if (trBody && !trBody.includes("Bu rehber Phuket")) return trBody;

  return categoryTemplateEn(meta.category, meta.title);
}

/** English bodies for key articles (from travel-guide-content) */
const ARTICLE_BODIES_EN: Record<string, string> = {
  "international-license": `
In Thailand you need a **Thai motorcycle licence** or **IDP** for scooters/motorcycles.

## The only foreign document police accept: IDP

- ✅ Thai motorcycle licence
- ✅ **IDP** (motorcycle class — tied to your home licence)
- ❌ Home licence only (without IDP)
- ❌ Passport only
- ❌ Other "international" documents alone

**IDP is the only international licence type Thai police recognise** (except Thai licence).

## Get it before you arrive

Obtain IDP in your home country with **motorcycle/scooter class**. Getting IDP as a tourist in Thailand is not practical.

## Thailand Moto Rent

Rental requires valid **motorcycle IDP**; no rental without it.

${COMPANY_POLICY_EN}
`,
  "thai-laws": `
Essential rules and fines when riding in Thailand.

## Licence and documents

- **IDP (motorcycle)** or **Thai licence** — nothing else accepted at checkpoints
- Carry passport
- Rental contract and insurance papers

## Common fines

| Violation | Approx. fine |
|-----------|----------------|
| No licence/IDP | 1,000–2,000+ THB |
| No helmet | 500–1,000 THB |
| Drunk riding | 5,000–20,000+ THB, jail risk |
| Speed / red light | 500–2,000 THB |

## Police checkpoints

Very frequent in tourist areas (Patong, Kata, airport road, Phang Nga). Stay calm; keep documents ready.

${COMPANY_POLICY_EN}
`,
  "drunk-driving": `
**Drunk motorcycle riding** in Thailand is extremely risky with **very high penalties**.

## Legal limit

Blood alcohol limits are low; practically **near-zero tolerance** for tourists. Even one drink can cause problems.

## Penalties

- Fine: **5,000 THB and up** (increases on repeat)
- Licence may be suspended
- Serious cases: **jail** and deportation risk
- In an accident, **insurance void** — all costs on you

${COMPANY_POLICY_EN}
`,
  "safety-phuket": `
Riding in Phuket is **manageable for careful tourists** if you follow rules and have proper documents.

## Is it safe?

- Traffic is busy but predictable with experience
- **IDP mandatory** — checkpoints are frequent
- Wear helmet always
- Avoid drunk riding and night riding if inexperienced

## Our recommendations

- Start with ADV 160 or Click 160
- Take premium insurance
- Ride defensively, not like locals

${COMPANY_POLICY_EN}
`,
};
