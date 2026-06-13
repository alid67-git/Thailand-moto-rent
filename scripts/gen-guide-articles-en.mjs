import fs from "fs";

const src = fs.readFileSync("src/lib/articles.ts", "utf8");
const articles = [];
const blockRe = /\{\s*id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?readTime:\s*"([^"]+)"[\s\S]*?publishDate:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"/g;
let m;
while ((m = blockRe.exec(src))) {
  articles.push({ id: m[1], title: m[2], category: m[3], readTime: m[4], publishDate: m[5], excerpt: m[6] });
}

const catEn = {
  Güvenlik: "Safety",
  Hukuk: "Legal",
  Dokümanlar: "Documents",
  Acil: "Emergency",
  Pratik: "Practical",
  Teknik: "Technical",
  İpuçları: "Tips",
  Yeme: "Food",
  Sağlık: "Health",
  Sigorta: "Insurance",
  Kiralama: "Rental",
  Seyahat: "Travel",
  Kültür: "Culture",
  Sürüş: "Riding",
  Motosikletler: "Motorcycles",
  Rehber: "Guide",
  Karşılaştırma: "Comparison",
  Deneyim: "Experience",
  Rota: "Routes",
  Bütçe: "Budget",
};

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const lines = [
  'import type { GuideArticleEntry } from "./guide-articles.types";',
  "",
  "/** Auto-generated EN metadata for travel guide articles */",
  "export const guideArticlesEn: Record<string, GuideArticleEntry> = {",
];

for (const a of articles) {
  const cat = catEn[a.category] ?? a.category;
  lines.push(`  "${a.id}": {`);
  lines.push(`    title: "${esc(a.title)}",`);
  lines.push(`    category: "${cat}",`);
  lines.push(`    readTime: "${a.readTime}",`);
  lines.push(`    publishDate: "${a.publishDate}",`);
  lines.push(`    excerpt: "${esc(a.excerpt)}",`);
  lines.push("  },");
}

lines.push("};");
lines.push("");

fs.writeFileSync("src/i18n/messages/guide-articles.en.i18n.ts", lines.join("\n"));
console.log(`Wrote ${articles.length} articles`);
