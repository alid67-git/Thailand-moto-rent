/**
 * Generates guide article metadata for de, fr, ar, zh, th from EN catalog.
 * Run: node scripts/generate-guide-meta-locales.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("src/i18n/messages");

const enFile = fs.readFileSync(path.join(ROOT, "guide-articles.en.i18n.ts"), "utf8");
const articles = [];
const re = /"([^"]+)":\s*\{\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*readTime:\s*"([^"]+)",\s*publishDate:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(enFile))) {
  articles.push({ id: m[1], title: m[2], category: m[3], readTime: m[4], publishDate: m[5], excerpt: m[6] });
}

const CAT = {
  de: {
    Safety: "Sicherheit", Legal: "Recht", Documents: "Dokumente", Practical: "Praktisch", Tips: "Tipps",
    Culture: "Kultur", Motorcycles: "Motorräder", Gear: "Ausrüstung", Guide: "Reiseführer",
    Comparison: "Vergleich", Experience: "Erfahrung",
  },
  fr: {
    Safety: "Sécurité", Legal: "Juridique", Documents: "Documents", Practical: "Pratique", Tips: "Conseils",
    Culture: "Culture", Motorcycles: "Motos", Gear: "Équipement", Guide: "Guide",
    Comparison: "Comparaison", Experience: "Expérience",
  },
  ar: {
    Safety: "السلامة", Legal: "القانون", Documents: "المستندات", Practical: "عملي", Tips: "نصائح",
    Culture: "الثقافة", Motorcycles: "الدراجات", Gear: "المعدات", Guide: "دليل",
    Comparison: "مقارنة", Experience: "تجربة",
  },
  zh: {
    Safety: "安全", Legal: "法律", Documents: "证件", Practical: "实用", Tips: "技巧",
    Culture: "文化", Motorcycles: "摩托车", Gear: "装备", Guide: "指南",
    Comparison: "对比", Experience: "体验",
  },
  th: {
    Safety: "ความปลอดภัย", Legal: "กฎหมาย", Documents: "เอกสาร", Practical: "ปฏิบัติ", Tips: "เคล็ดลับ",
    Culture: "วัฒนธรรม", Motorcycles: "มอเตอร์ไซค์", Gear: "อุปกรณ์", Guide: "คู่มือ",
    Comparison: "เปรียบเทียบ", Experience: "ประสบการณ์",
  },
};

// Title/excerpt translations keyed by article id — comprehensive DE/FR/AR/ZH/TH
// Loaded from embedded JSON for maintainability
const T = JSON.parse(fs.readFileSync(path.join("scripts", "guide-meta-translations.json"), "utf8"));

function readTime(locale, enRt) {
  const n = enRt.match(/(\d+)/)?.[1] ?? "5";
  if (locale === "de") return `${n} Min.`;
  if (locale === "fr") return `${n} min`;
  if (locale === "ar") return `${n} د`;
  if (locale === "zh") return `${n} 分钟`;
  if (locale === "th") return `${n} นาที`;
  return enRt;
}

function emit(locale) {
  const catMap = CAT[locale];
  const tr = T[locale] ?? {};
  const lines = [
    `import type { GuideArticleEntry } from "./guide-articles.types";`,
    "",
    `export const guideArticles${locale.charAt(0).toUpperCase() + locale.slice(1)}: Record<string, GuideArticleEntry> = {`,
  ];
  for (const a of articles) {
    const loc = tr[a.id] ?? {};
    const title = loc.title ?? a.title;
    const excerpt = loc.excerpt ?? a.excerpt;
    const category = catMap[a.category] ?? a.category;
    const rt = readTime(locale, a.readTime);
    lines.push(`  "${a.id}": {`);
    lines.push(`    title: ${JSON.stringify(title)},`);
    lines.push(`    category: ${JSON.stringify(category)},`);
    lines.push(`    readTime: ${JSON.stringify(rt)},`);
    lines.push(`    publishDate: ${JSON.stringify(a.publishDate)},`);
    lines.push(`    excerpt: ${JSON.stringify(excerpt)},`);
    lines.push(`  },`);
  }
  lines.push("};", "");
  fs.writeFileSync(path.join(ROOT, `guide-articles.${locale}.i18n.ts`), lines.join("\n"));
  console.log(`guide-articles.${locale}.i18n.ts (${articles.length})`);
}

for (const loc of ["de", "fr", "ar", "zh", "th"]) emit(loc);
