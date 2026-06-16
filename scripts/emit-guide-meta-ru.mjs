/**
 * Emits guide-articles.ru.i18n.ts with Russian meta for all 54 articles.
 * Run: node scripts/emit-guide-meta-ru.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("src");
const enFile = fs.readFileSync(path.join(ROOT, "i18n/messages/guide-articles.en.i18n.ts"), "utf8");
const articles = [];
const re = /"([^"]+)":\s*\{\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*readTime:\s*"([^"]+)",\s*publishDate:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(enFile))) {
  articles.push({ id: m[1], category: m[3], readTime: m[4], publishDate: m[5] });
}

const CAT = {
  Safety: "Безопасность", Legal: "Право", Documents: "Документы", Practical: "Практика",
  Tips: "Советы", Culture: "Культура", Motorcycles: "Мотоциклы", Gear: "Экипировка",
  Guide: "Гид", Comparison: "Сравнение", Experience: "Опыт",
};

const T = {
  "safety-phuket": { title: "Безопасно ли ездить на мотоцикле на Пхукете?", excerpt: "Безопасность мото-езды на Пхукете и основные правила" },
  "thai-laws": { title: "Правила и штрафы для мотоциклистов в Таиланде", excerpt: "ПДД, требования к правам и система наказаний" },
  "international-license": { title: "Нужны ли международные права в Таиланде?", excerpt: "Требования IDP, как получить и срок действия" },
  "police-checkpoints": { title: "Полицейские посты в Таиланде — что нужно знать", excerpt: "Как вести себя, штрафы и ваши права" },
  "drunk-driving": { title: "Езда в нетрезвом виде в Таиланде — штрафы и последствия", excerpt: "Лимиты алкоголя, штрафы и правовые последствия" },
  "helmet-laws": { title: "Правила шлемов и контроль в Таиланде", excerpt: "Типы шлемов, требования и штрафы" },
  "accident-procedure": { title: "Что делать после аварии на мотоцикле", excerpt: "Шаги сразу после ДТП" },
  "insurance-claims": { title: "Страховка мотоцикла в Таиланде — как подать заявку", excerpt: "Типы страховки и процесс урегулирования" },
  "fuel-guide": { title: "АЗС и цены на бензин в Таиланде", excerpt: "Где заправиться, цены и способы оплаты" },
  "parking-guide": { title: "Парковка мотоцикла на Пхукете", excerpt: "Безопасные места и советы" },
  "atm-locations": { title: "Банкоматы на Пхукете и снятие наличных", excerpt: "Где найти ATM и советы по деньгам" },
  "sim-card": { title: "SIM-карты в Таиланде — оставайтесь на связи", excerpt: "Покупка и активация SIM" },
  "weather-preparation": { title: "Подготовка к погоде на Пхукете", excerpt: "Сезоны, дождь и жара" },
  "toll-roads": { title: "Трассы и платные дороги в Таиланде", excerpt: "Система шоссе и сборы" },
  "petrol-vs-diesel": { title: "Выбор байка: бензин или дизель", excerpt: "Тип топлива и экономичность" },
  "night-riding": { title: "Ночная езда на Пхукете — советы по безопасности", excerpt: "Техника и опасности ночью" },
  "monsoon-riding": { title: "Езда на Пхукете в сезон дождей", excerpt: "Безопасная езда под дождём" },
  "temple-visits": { title: "Этикет храмов для мотоциклистов", excerpt: "Что знать при посещении храмов" },
  "local-restaurants": { title: "Гид по местной еде на Пхукете для райдеров", excerpt: "Безопасные и вкусные места" },
  "photography-spots": { title: "Фото на мотоцикле — лучшие точки Пхукета", excerpt: "Лучшие локации и приёмы" },
  "best-scooter": { title: "Какой скутер выбрать на Пхукете?", excerpt: "Click vs ADV vs Forza — сравнение" },
  "click-vs-adv": { title: "Click 160 vs ADV 160 — подробное сравнение", excerpt: "Два популярных модели в деталях" },
  "couples-motorcycle": { title: "Лучший мотоцикл для пары", excerpt: "Комфорт и безопасность вдвоём" },
  "solo-traveler": { title: "Выбор мотоцикла для соло-путешественника", excerpt: "Идеальная модель для одного" },
  "beginner-bike": { title: "Лучший байк для первой аренды", excerpt: "Модели для новичков и советы" },
  "long-distance-bike": { title: "Лучший мотоцикл для дальних поездок", excerpt: "Комфорт и эффективность" },
  "automatic-vs-manual": { title: "Автомат или механика на Пхукете?", excerpt: "Плюсы и минусы каждого типа" },
  "helmet-types": { title: "Выбор мото-шлема — типы и цены", excerpt: "Типы шлемов и сертификация" },
  "complete-phuket": { title: "Полный гид по Пхукету для посетителей", excerpt: "Все уголки острова глазами райдера" },
  "complete-krabi": { title: "Открыть Krabi на мотоцикле", excerpt: "Все главные места Krabi" },
  "complete-khao-sok": { title: "Нац. парк Khao Sok — гид приключений", excerpt: "Джунгли и природа на двух колёсах" },
  "complete-phang-nga": { title: "Залив Phang Nga — мир известняка", excerpt: "Уникальная география Phang Nga" },
  "phuket-town": { title: "Что посмотреть в Phuket Town", excerpt: "Старый и новый Пхукет" },
  "patong-guide": { title: "Patong Beach — в центре туристической жизни", excerpt: "Patong днём и ночью" },
  "kata-karon": { title: "Пляжи Kata и Karon — спокойная альтернатива", excerpt: "Тише, чем Patong" },
  "rawai-guide": { title: "Rawai — местный пляж и морепродукты", excerpt: "Жемчужина южной оконечности" },
  "bang-tao": { title: "Bang Tao — люксовый курортный пляж", excerpt: "Премиум-пляж и курорты" },
  "old-phuket-town": { title: "Старый Пхукет — sino-portuguese архитектура", excerpt: "Исторический Пхукет" },
  "scooter-vs-motorcycle": { title: "Скутер или мотоцикл на Пхукете?", excerpt: "Автоматический скутер vs механика" },
  "rental-vs-buying": { title: "Аренда или покупка при длительном пребывании", excerpt: "Что выгоднее в долгую?" },
  "tourist-vs-local": { title: "Туристические и местные цены — как торговаться", excerpt: "Как сбивать цену в Таиланде" },
  "high-vs-low-season": { title: "Высокий vs низкий сезон — когда ехать", excerpt: "Какое время лучше?" },
  "package-vs-diy": { title: "Туры с гидом или самостоятельно?", excerpt: "Организованные vs свободные поездки" },
  "group-vs-solo": { title: "Групповая езда или соло — плюсы", excerpt: "Что интереснее?" },
  "daytrip-vs-multiday": { title: "Однодневка или многодневный тур", excerpt: "Планирование длительности поездки" },
  "backpacker-vs-luxury": { title: "Бюджетная поездка vs люксовый мото-тур", excerpt: "Сравнение вариантов" },
  "beginner-pov": { title: "Первая аренда на Пхукете — история новичка", excerpt: "Успехи и ошибки начинающих" },
  "worst-mistakes": { title: "Мои худшие ошибки при аренде на Пхукете", excerpt: "Предупреждения и уроки" },
  "sunset-spots": { title: "Лучшие закаты, которые я видел на мотоцикле", excerpt: "Фото и воспоминания" },
  "solo-female": { title: "Соло-езда женщины на Пхукете", excerpt: "Безопасность и независимость" },
  "first-time-riding": { title: "Первая езда в Таиланде — сердце колотится", excerpt: "Шок от трафика и адаптация" },
  "phuket-to-krabi": { title: "Пхукет — Krabi: приключение райдера", excerpt: "Опыт многодневного маршрута" },
  "budget-trip": { title: "5 дней на Пхукете с бюджетом $100", excerpt: "Советы экономного путешествия" },
  "luxury-tour": { title: "Люксовый мото-тур на Пхукете", excerpt: "Премиум-сервис аренды" },
};

function readTime(rt) {
  const n = rt.match(/(\d+)/)?.[1] ?? "5";
  return `${n} мин`;
}

const lines = [
  `import type { GuideArticleEntry } from "./guide-articles.types";`,
  ``,
  `export const guideArticlesRu: Record<string, GuideArticleEntry> = {`,
];
for (const a of articles) {
  const loc = T[a.id] ?? { title: a.id, excerpt: "" };
  lines.push(`  "${a.id}": {`);
  lines.push(`    title: ${JSON.stringify(loc.title)},`);
  lines.push(`    category: ${JSON.stringify(CAT[a.category] ?? a.category)},`);
  lines.push(`    readTime: ${JSON.stringify(readTime(a.readTime))},`);
  lines.push(`    publishDate: ${JSON.stringify(a.publishDate)},`);
  lines.push(`    excerpt: ${JSON.stringify(loc.excerpt)},`);
  lines.push(`  },`);
}
lines.push(`};`, ``);
fs.writeFileSync(path.join(ROOT, "i18n/messages/guide-articles.ru.i18n.ts"), lines.join("\n"), "utf8");
console.log(`guide-articles.ru.i18n.ts (${articles.length})`);
