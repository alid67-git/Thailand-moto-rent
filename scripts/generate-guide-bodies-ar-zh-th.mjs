/**
 * Generates complete guide article body files for AR, ZH, TH (all 54 articles).
 * Run: node scripts/generate-guide-bodies-ar-zh-th.mjs
 */
import fs from "fs";
import path from "path";
import {
  META_AR,
  META_ZH,
  META_TH,
  CUSTOM_AR,
  CUSTOM_ZH,
  CUSTOM_TH,
  EXTRA_AR,
  EXTRA_ZH,
  EXTRA_TH,
  buildCategoryBody,
} from "./guide-bodies-ar-zh-th-data.mjs";

const ROOT = path.resolve("src");
const articlesTs = fs.readFileSync(path.join(ROOT, "lib/articles.ts"), "utf8");
const articles = [];
const re = /id:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(articlesTs))) {
  articles.push(m[1]);
}

const enMeta = fs.readFileSync(path.join(ROOT, "i18n/messages/guide-articles.en.i18n.ts"), "utf8");
const enArticles = {};
const enRe = /"([^"]+)":\s*\{\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",[\s\S]*?excerpt:\s*"([^"]+)"/g;
while ((m = enRe.exec(enMeta))) {
  enArticles[m[1]] = { title: m[2], category: m[3], excerpt: m[4] };
}

const policiesTs = fs.readFileSync(path.join(ROOT, "lib/guide-articles/policies.ts"), "utf8");

function extractPolicy(locale) {
  const re = new RegExp(`${locale}:\\s*\`([\\s\\S]*?)\`,`);
  return policiesTs.match(re)?.[1] ?? "";
}

const POLICY_AR = extractPolicy("ar");
const POLICY_ZH = extractPolicy("zh");
const POLICY_TH = extractPolicy("th");

function buildBody(id, locale, meta, policy, customMap, extraMap) {
  const en = enArticles[id] ?? { category: "Practical" };
  const title = meta[id]?.title ?? en.title ?? id;
  const excerpt = meta[id]?.excerpt ?? en.excerpt ?? "";
  if (customMap[id]) {
    let body = customMap[id].replace(/\$\{POLICY\}/g, policy).trim();
    if (!body.startsWith("# ")) body = `# ${title}\n\n${excerpt}\n\n${body}`;
    return body.trim();
  }
  let body = buildCategoryBody(locale, en.category, title, excerpt, policy);
  if (extraMap[id]) body += extraMap[id];
  return body.trim();
}

function emitFile(locale, constName, bodies) {
  const lines = [
    `/** Auto-generated complete guide bodies — ${locale.toUpperCase()} — all ${articles.length} articles */`,
    "",
    `export const ${constName}: Record<string, string> = {`,
  ];
  for (const id of articles) {
    const body = bodies[id] ?? "";
    const escaped = body.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    lines.push(`  "${id}": \`${escaped}\`,`);
  }
  lines.push("};", "");
  const outDir = path.join(ROOT, "lib/guide-articles/bodies");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `${locale}.ts`), lines.join("\n"), "utf8");
  console.log(`Wrote ${locale}.ts (${articles.length} articles)`);
}

const arBodies = {};
const zhBodies = {};
const thBodies = {};

for (const id of articles) {
  arBodies[id] = buildBody(id, "ar", META_AR, POLICY_AR, CUSTOM_AR, EXTRA_AR);
  zhBodies[id] = buildBody(id, "zh", META_ZH, POLICY_ZH, CUSTOM_ZH, EXTRA_ZH);
  thBodies[id] = buildBody(id, "th", META_TH, POLICY_TH, CUSTOM_TH, EXTRA_TH);
}

emitFile("ar", "GUIDE_BODIES_AR", arBodies);
emitFile("zh", "GUIDE_BODIES_ZH", zhBodies);
emitFile("th", "GUIDE_BODIES_TH", thBodies);

console.log("Done AR + ZH + TH");
