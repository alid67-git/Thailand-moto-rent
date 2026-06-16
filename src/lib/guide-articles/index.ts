import type { Locale } from "@/i18n/config";
import type { GuideArticleEntry } from "@/i18n/messages/guide-articles.types";
import { guideArticlesEn } from "@/i18n/messages/guide-articles.en.i18n";
import { guideArticlesTr } from "@/i18n/messages/guide-articles.tr.i18n";
import { guideArticlesDe } from "@/i18n/messages/guide-articles.de.i18n";
import { guideArticlesFr } from "@/i18n/messages/guide-articles.fr.i18n";
import { guideArticlesAr } from "@/i18n/messages/guide-articles.ar.i18n";
import { guideArticlesZh } from "@/i18n/messages/guide-articles.zh.i18n";
import { guideArticlesTh } from "@/i18n/messages/guide-articles.th.i18n";
import { guideArticlesRu } from "@/i18n/messages/guide-articles.ru.i18n";
import { GUIDE_BODIES_EN } from "./bodies/en";
import { GUIDE_BODIES_TR } from "./bodies/tr";
import { GUIDE_BODIES_DE } from "./bodies/de";
import { GUIDE_BODIES_FR } from "./bodies/fr";
import { GUIDE_BODIES_AR } from "./bodies/ar";
import { GUIDE_BODIES_ZH } from "./bodies/zh";
import { GUIDE_BODIES_TH } from "./bodies/th";
import { GUIDE_BODIES_RU } from "./bodies/ru";

const GUIDE_META: Record<Locale, Record<string, GuideArticleEntry>> = {
  tr: guideArticlesTr,
  en: guideArticlesEn,
  th: guideArticlesTh,
  de: guideArticlesDe,
  fr: guideArticlesFr,
  ar: guideArticlesAr,
  zh: guideArticlesZh,
  ru: guideArticlesRu,
};

const GUIDE_BODIES: Record<Locale, Record<string, string>> = {
  tr: GUIDE_BODIES_TR,
  en: GUIDE_BODIES_EN,
  th: GUIDE_BODIES_TH,
  de: GUIDE_BODIES_DE,
  fr: GUIDE_BODIES_FR,
  ar: GUIDE_BODIES_AR,
  zh: GUIDE_BODIES_ZH,
  ru: GUIDE_BODIES_RU,
};

export function getGuideMeta(id: string, locale: Locale): GuideArticleEntry | null {
  return GUIDE_META[locale]?.[id] ?? GUIDE_META.en[id] ?? null;
}

export function getGuideBody(id: string, locale: Locale): string | null {
  const body = GUIDE_BODIES[locale]?.[id] ?? GUIDE_BODIES.en[id];
  return body?.trim() ?? null;
}
