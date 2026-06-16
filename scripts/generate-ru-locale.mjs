import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");
const GUIDE_BODIES_DIR = path.join(ROOT, "src", "lib", "guide-articles", "bodies");
const ROUTE_SOURCE_PATH = path.join(ROOT, "scripts", "route-i18n-source.json");
const ROUTE_TRANSLATIONS_PATH = path.join(ROOT, "scripts", "route-i18n-translations.json");

const PRESERVE_WORDS = new Set([
  "Thailand",
  "Moto",
  "Rent",
  "Phuket",
  "Patong",
  "Kamala",
  "Kata",
  "Karon",
  "Krabi",
  "Ao",
  "Nang",
  "Bang",
  "Pae",
  "Tao",
  "Big",
  "Buddha",
  "Samui",
  "Cape",
  "Panwa",
  "Chaweng",
  "Cheow",
  "Lan",
  "Chumphon",
  "Donsak",
  "Fisherman",
  "Village",
  "Hat",
  "Yai",
  "Hot",
  "Springs",
  "Hua",
  "Hin",
  "James",
  "Bond",
  "Khao",
  "Lak",
  "Sok",
  "Koh",
  "Panyee",
  "Trang",
  "Pakbara",
  "Pak",
  "Meng",
  "Phang",
  "Nga",
  "Promthep",
  "Railay",
  "Ratchaprapha",
  "Rawai",
  "Samet",
  "Nangshe",
  "Satun",
  "Similan",
  "Sirinat",
  "Songkhla",
  "Surat",
  "Thani",
  "Surin",
  "Takua",
  "Thalang",
  "Thap",
  "Lamu",
  "Tiger",
  "Cave",
  "Ton",
  "Prai",
  "Lamai",
  "Lanta",
  "Emerald",
  "Pool",
  "Monkey",
  "Hill",
  "Old",
  "Town",
  "Google",
  "Maps",
  "Apple",
  "Waze",
  "WhatsApp",
  "IDP",
  "SMS",
  "ISO",
  "THB",
  "API",
  "VPN",
  "VIP",
  "HKT",
  "DOT",
  "ECE",
  "ADV",
  "XMAX",
  "Forza",
  "Honda",
  "Yamaha",
  "Click",
  "Raya",
  "Bookhemian",
  "Jungceylon",
  "Soi",
]);

const EXACT_MAP = {
  "About us": "О нас",
  "What we do": "Что мы делаем",
  Vision: "Видение",
  Mission: "Миссия",
  Fleet: "Парк",
  Routes: "Маршруты",
  "Travel guide": "Путеводитель",
  Book: "Бронировать",
  "Open menu": "Открыть меню",
  "Close menu": "Закрыть меню",
  Corporate: "Корпоративный",
  About: "О компании",
  "Sign in": "Войти",
  Register: "Регистрация",
  Menu: "Меню",
  "My account": "Мой аккаунт",
  Distance: "Расстояние",
  Duration: "Длительность",
  Included: "Включено",
  Recommended: "Рекомендуется",
  Free: "Бесплатно",
  Selected: "Выбрано",
  None: "Нет",
  "Loading map…": "Загрузка карты…",
  "Google Maps": "Google Maps",
  "Apple Maps": "Apple Maps",
  Waze: "Waze",
  "Book now": "Забронировать сейчас",
  "Start booking": "Начать бронирование",
  "Ready to explore Phuket?": "Готовы исследовать Phuket?",
  "Page not found": "Страница не найдена",
  "Back to home": "На главную",
  "Coming soon": "Скоро",
  Safety: "Безопасность",
  Legal: "Право",
  Documents: "Документы",
  Practical: "Практика",
  Tips: "Советы",
  Culture: "Культура",
  Motorcycles: "Мотоциклы",
  Gear: "Снаряжение",
  Guide: "Гид",
  Comparison: "Сравнение",
  Experience: "Опыт",
  min: "мин",
};

const WORD_MAP = {
  title: "заголовок",
  description: "описание",
  rental: "аренда",
  motorcycle: "мотоцикл",
  motorcycles: "мотоциклы",
  scooter: "скутер",
  scooters: "скутеры",
  prices: "цены",
  price: "цена",
  insurance: "страховка",
  extras: "дополнения",
  destinations: "места",
  destination: "место",
  routes: "маршруты",
  route: "маршрут",
  guide: "гид",
  travel: "путешествие",
  booking: "бронирование",
  book: "бронировать",
  reserve: "резервировать",
  summary: "сводка",
  details: "детали",
  day: "день",
  days: "дней",
  hour: "час",
  hours: "часов",
  minute: "минута",
  minutes: "минут",
  return: "возврат",
  start: "старт",
  stop: "остановка",
  stops: "остановки",
  map: "карта",
  explore: "исследовать",
  popular: "популярный",
  featured: "рекомендуемый",
  customer: "клиент",
  customers: "клиенты",
  review: "отзыв",
  reviews: "отзывы",
  question: "вопрос",
  questions: "вопросы",
  answer: "ответ",
  answers: "ответы",
  support: "поддержка",
  contact: "контакт",
  company: "компания",
  privacy: "конфиденциальность",
  terms: "условия",
  safety: "безопасность",
  parking: "парковка",
  highlights: "главные места",
  fuel: "топливо",
  break: "пауза",
  sunrise: "рассвет",
  sunset: "закат",
  beach: "пляж",
  beaches: "пляжи",
  town: "город",
  forest: "лес",
  lake: "озеро",
  bay: "залив",
  island: "остров",
  islands: "острова",
  ferry: "паром",
  pier: "пирс",
  boat: "лодка",
  morning: "утро",
  afternoon: "день",
  evening: "вечер",
  night: "ночь",
  final: "финальный",
  easy: "легко",
  medium: "средне",
  hard: "сложно",
  premium: "премиум",
  standard: "стандарт",
  basic: "базовый",
  account: "аккаунт",
  password: "пароль",
  email: "email",
  phone: "телефон",
  code: "код",
  verification: "проверка",
  create: "создать",
  continue: "продолжить",
  checkout: "оформление",
  total: "итого",
  subtotal: "промежуточный итог",
  deposit: "депозит",
  included: "включено",
  recommended: "рекомендуется",
};

const TRANSLIT = {
  a: "а", b: "б", c: "к", d: "д", e: "е", f: "ф", g: "г", h: "х", i: "и", j: "дж", k: "к", l: "л", m: "м",
  n: "н", o: "о", p: "п", q: "к", r: "р", s: "с", t: "т", u: "у", v: "в", w: "в", x: "кс", y: "й", z: "з",
};

function read(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Generated ${path.relative(ROOT, filePath)}`);
}

function isAllUpper(token) {
  return token.length > 1 && token === token.toUpperCase();
}

function preserveToken(token) {
  if (PRESERVE_WORDS.has(token)) return true;
  if (/^\d+$/.test(token)) return true;
  if (isAllUpper(token) && token.length <= 6) return true;
  return false;
}

function translitWord(token) {
  const chars = [...token];
  let out = "";
  for (const ch of chars) {
    const lower = ch.toLowerCase();
    if (!TRANSLIT[lower]) {
      out += ch;
      continue;
    }
    const ru = TRANSLIT[lower];
    out += ch === lower ? ru : ru.charAt(0).toUpperCase() + ru.slice(1);
  }
  return out;
}

function applyCase(reference, translated) {
  if (reference === reference.toUpperCase()) return translated.toUpperCase();
  if (reference[0] === reference[0].toUpperCase()) return translated.charAt(0).toUpperCase() + translated.slice(1);
  return translated;
}

function translateWord(token) {
  if (preserveToken(token)) return token;
  const lower = token.toLowerCase();
  if (WORD_MAP[lower]) return applyCase(token, WORD_MAP[lower]);
  return translitWord(token);
}

function protect(text, rx, keyPrefix) {
  const kept = [];
  const changed = text.replace(rx, (m) => {
    const key = `@@${keyPrefix}${kept.length}@@`;
    kept.push(m);
    return key;
  });
  return { changed, kept };
}

function restore(text, keyPrefix, kept) {
  let out = text;
  kept.forEach((value, idx) => {
    out = out.replace(`@@${keyPrefix}${idx}@@`, value);
  });
  return out;
}

function translateText(input) {
  if (typeof input !== "string" || input.length === 0) return input;
  if (EXACT_MAP[input]) return EXACT_MAP[input];

  const p1 = protect(input, /\{[^}]+\}/g, "PLH");
  const p2 = protect(p1.changed, /\$\{[^}]+\}/g, "TPL");

  let out = p2.changed.replace(/[A-Za-z][A-Za-z0-9'/-]*/g, (token) => translateWord(token));
  out = out.replace(/\bmin\b/gi, "мин");
  out = out.replace(/\bh\b/gi, "ч");

  out = restore(out, "TPL", p2.kept);
  out = restore(out, "PLH", p1.kept);
  return out;
}

function findMatchingBrace(text, openIndex) {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escape = false;

  for (let i = openIndex; i < text.length; i += 1) {
    const ch = text[i];
    const prev = text[i - 1];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === "\\") {
      escape = true;
      continue;
    }
    if (!inDouble && !inTemplate && ch === "'" && prev !== "\\") {
      inSingle = !inSingle;
      continue;
    }
    if (!inSingle && !inTemplate && ch === "\"" && prev !== "\\") {
      inDouble = !inDouble;
      continue;
    }
    if (!inSingle && !inDouble && ch === "`" && prev !== "\\") {
      inTemplate = !inTemplate;
      continue;
    }
    if (inSingle || inDouble || inTemplate) continue;
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  throw new Error("Could not match closing brace.");
}

function extractObjectByMarker(content, marker) {
  const markerIndex = content.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Marker not found: ${marker}`);
  const eqIndex = content.indexOf("=", markerIndex);
  const braceStart = content.indexOf("{", eqIndex);
  const braceEnd = findMatchingBrace(content, braceStart);
  return content.slice(braceStart, braceEnd + 1);
}

function translateStringLiteralLiteral(rawLiteral) {
  const val = JSON.parse(rawLiteral);
  return JSON.stringify(translateText(val));
}

function translateTemplateLiteral(rawTemplate) {
  const inner = rawTemplate.slice(1, -1);
  const p = protect(inner, /\$\{[^}]+\}/g, "TMP");
  let translated = translateText(p.changed);
  translated = restore(translated, "TMP", p.kept);
  translated = translated.replace(/`/g, "\\`");
  return `\`${translated}\``;
}

function translateObjectLiteral(code) {
  let out = code;
  const keyKeep = [];
  out = out.replace(/"(?:\\.|[^"\\])*"\s*:/g, (m) => {
    const key = `@@KEY${keyKeep.length}@@`;
    keyKeep.push(m);
    return key;
  });
  out = out.replace(/`(?:\\.|[^`\\])*`/g, (m) => translateTemplateLiteral(m));
  out = out.replace(/"(?:\\.|[^"\\])*"/g, (m) => translateStringLiteralLiteral(m));
  keyKeep.forEach((original, idx) => {
    out = out.replace(`@@KEY${idx}@@`, original);
  });
  return out;
}

function buildRouteRuMap() {
  const routeTranslations = JSON.parse(read(ROUTE_TRANSLATIONS_PATH));
  const map = {};
  for (const [sourceText, langs] of Object.entries(routeTranslations)) {
    if (langs.ru) {
      map[sourceText] = langs.ru;
      continue;
    }
    const fromEn = typeof langs.en === "string" ? langs.en : sourceText;
    map[sourceText] = translateText(fromEn);
  }
  return map;
}

function generateRouteLegsAndStops(routeRuMap) {
  const routeSource = JSON.parse(read(ROUTE_SOURCE_PATH));

  const legsLines = [
    "import type { RouteLegsCatalog } from \"./route-legs.types\";",
    "",
    "export const routeLegsRu: RouteLegsCatalog = {",
  ];
  const stopsLines = [
    "import type { RouteStopsCatalog } from \"./route-legs.types\";",
    "",
    "export const routeStopsRu: RouteStopsCatalog = {",
  ];

  for (const route of routeSource) {
    legsLines.push(`  "${route.id}": {`);
    for (const leg of route.legs) {
      const ruTitle = routeRuMap[leg.title] || translateText(leg.title);
      const ruDesc = routeRuMap[leg.description] || translateText(leg.description);
      const ruPlaces = (leg.places || []).map((p) => routeRuMap[p] || translateText(p));
      legsLines.push(`    "${leg.day}": {`);
      legsLines.push(`      title: ${JSON.stringify(ruTitle)},`);
      legsLines.push(`      description: ${JSON.stringify(ruDesc)},`);
      legsLines.push(`      places: [${ruPlaces.map((p) => JSON.stringify(p)).join(", ")}],`);
      legsLines.push("    },");
    }
    legsLines.push("  },");

    const stopKeys = Object.keys(route.stops || {});
    if (stopKeys.length > 0) {
      stopsLines.push(`  "${route.id}": {`);
      for (const day of stopKeys) {
        const stop = route.stops[day];
        const ruName = routeRuMap[stop.name] || translateText(stop.name);
        const ruDesc = routeRuMap[stop.description] || translateText(stop.description);
        stopsLines.push(`    "${day}": {`);
        stopsLines.push(`      name: ${JSON.stringify(ruName)},`);
        stopsLines.push(`      description: ${JSON.stringify(ruDesc)},`);
        stopsLines.push("    },");
      }
      stopsLines.push("  },");
    }
  }

  legsLines.push("};", "");
  stopsLines.push("};", "");

  write(path.join(MESSAGES_DIR, "route-legs.ru.i18n.ts"), legsLines.join("\n"));
  write(path.join(MESSAGES_DIR, "route-stops.ru.i18n.ts"), stopsLines.join("\n"));
}

function generateDestinationsExtraRu() {
  const src = read(path.join(MESSAGES_DIR, "destinations-extra.i18n.ts"));
  const enObj = extractObjectByMarker(src, "export const destinationExtraEn");
  const ruObj = translateObjectLiteral(enObj);
  const out = [
    "/** Дополнительные тексты мест — автогенерация RU */",
    "",
    "export const destinationExtraRu = " + ruObj + ";",
    "",
  ].join("\n");
  write(path.join(MESSAGES_DIR, "destinations-extra-ru.i18n.ts"), out);
}

function generateDestinationsRu() {
  const src = read(path.join(MESSAGES_DIR, "destinations.i18n.ts"));
  const enObj = extractObjectByMarker(src, "export const destinationMessagesEn");
  let ruObj = translateObjectLiteral(enObj);
  ruObj = ruObj.replace(/\.\.\.destinationExtraEn/g, "...destinationExtraRu");
  const out = [
    "/** Тексты направлений RU — автогенерация */",
    "",
    "import { destinationExtraRu } from \"./destinations-extra-ru.i18n\";",
    "",
    "export const destinationMessagesRu = " + ruObj + ";",
    "",
  ].join("\n");
  write(path.join(MESSAGES_DIR, "destinations-ru.i18n.ts"), out);
}

function generateRouteCatalogRu() {
  const src = read(path.join(MESSAGES_DIR, "routes-catalog.en.i18n.ts"));
  const enObj = extractObjectByMarker(src, "export const routeCatalogEn");
  const ruObj = translateObjectLiteral(enObj);
  const out = [
    "import type { RouteCatalog } from \"./routes-catalog.types\";",
    "",
    "export const routeCatalogRu: RouteCatalog = " + ruObj + ";",
    "",
  ].join("\n");
  write(path.join(MESSAGES_DIR, "routes-catalog.ru.i18n.ts"), out);
}

function generateIslandAccessGuidesRu() {
  const src = read(path.join(MESSAGES_DIR, "island-access-guides.en.i18n.ts"));
  const enObj = extractObjectByMarker(src, "export const islandAccessGuidesEn");
  const ruObj = translateObjectLiteral(enObj);
  const out = [
    "import type { IslandAccessGuideCatalog } from \"@/lib/island-access-i18n\";",
    "",
    "export const islandAccessGuidesRu: IslandAccessGuideCatalog = " + ruObj + ";",
    "",
  ].join("\n");
  write(path.join(MESSAGES_DIR, "island-access-guides.ru.i18n.ts"), out);
}

function generateGuideArticlesRu() {
  const src = read(path.join(MESSAGES_DIR, "guide-articles.en.i18n.ts"));
  const enObj = extractObjectByMarker(src, "export const guideArticlesEn");
  let ruObj = translateObjectLiteral(enObj);
  ruObj = ruObj.replace(/"category":/g, "category:");
  ruObj = ruObj.replace(/"readTime":\s*"(\d+)\s*min"/g, "readTime: \"$1 мин\"");
  ruObj = ruObj.replace(/category:\s*"Safety"/g, "category: \"Безопасность\"");
  ruObj = ruObj.replace(/category:\s*"Legal"/g, "category: \"Право\"");
  ruObj = ruObj.replace(/category:\s*"Documents"/g, "category: \"Документы\"");
  ruObj = ruObj.replace(/category:\s*"Practical"/g, "category: \"Практика\"");
  ruObj = ruObj.replace(/category:\s*"Tips"/g, "category: \"Советы\"");
  ruObj = ruObj.replace(/category:\s*"Culture"/g, "category: \"Культура\"");
  ruObj = ruObj.replace(/category:\s*"Motorcycles"/g, "category: \"Мотоциклы\"");
  ruObj = ruObj.replace(/category:\s*"Gear"/g, "category: \"Снаряжение\"");
  ruObj = ruObj.replace(/category:\s*"Guide"/g, "category: \"Гид\"");
  ruObj = ruObj.replace(/category:\s*"Comparison"/g, "category: \"Сравнение\"");
  ruObj = ruObj.replace(/category:\s*"Experience"/g, "category: \"Опыт\"");

  const out = [
    "import type { GuideArticleEntry } from \"./guide-articles.types\";",
    "",
    "export const guideArticlesRu: Record<string, GuideArticleEntry> = " + ruObj + ";",
    "",
  ].join("\n");
  write(path.join(MESSAGES_DIR, "guide-articles.ru.i18n.ts"), out);
}

function generateGuideBodiesRu() {
  const src = read(path.join(GUIDE_BODIES_DIR, "en.ts"));
  const enObj = extractObjectByMarker(src, "export const GUIDE_BODIES_EN");
  const ruObj = translateObjectLiteral(enObj);
  const out = [
    "/** Автогенерация RU тел статей (54 статьи) */",
    "",
    "export const GUIDE_BODIES_RU: Record<string, string> = " + ruObj + ";",
    "",
  ].join("\n");
  write(path.join(GUIDE_BODIES_DIR, "ru.ts"), out);
}

function generateRuMessagesIndex() {
  const src = read(path.join(MESSAGES_DIR, "en.ts"));
  const enObj = extractObjectByMarker(src, "const en: Messages");
  let ruObj = translateObjectLiteral(enObj);
  ruObj = ruObj
    .replace(/\bdestinationMessagesEn\b/g, "destinationMessagesRu")
    .replace(/\brouteCatalogEn\b/g, "routeCatalogRu")
    .replace(/\bislandAccessGuidesEn\b/g, "islandAccessGuidesRu")
    .replace(/\brouteLegsEn\b/g, "routeLegsRu")
    .replace(/\brouteStopsEn\b/g, "routeStopsRu");

  const out = [
    "import type { Messages } from \"./tr\";",
    "import { destinationMessagesRu } from \"./destinations-ru.i18n\";",
    "import { routeCatalogRu } from \"./routes-catalog.ru.i18n\";",
    "import { islandAccessGuidesRu } from \"./island-access-guides.ru.i18n\";",
    "import { routeLegsRu } from \"./route-legs.ru.i18n\";",
    "import { routeStopsRu } from \"./route-stops.ru.i18n\";",
    "",
    "const ru: Messages = " + ruObj + ";",
    "",
    "export default ru;",
    "",
  ].join("\n");
  write(path.join(MESSAGES_DIR, "ru.ts"), out);
}

function main() {
  console.log("Generating RU locale files...");
  generateDestinationsExtraRu();
  generateDestinationsRu();
  generateRouteCatalogRu();
  generateIslandAccessGuidesRu();

  const routeRuMap = buildRouteRuMap();
  console.log(`Built route RU map entries: ${Object.keys(routeRuMap).length}`);
  generateRouteLegsAndStops(routeRuMap);

  generateGuideArticlesRu();
  generateGuideBodiesRu();
  generateRuMessagesIndex();

  console.log("RU locale generation completed.");
}

main();
