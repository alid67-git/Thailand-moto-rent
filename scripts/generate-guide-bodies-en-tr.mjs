/**
 * Generates complete guide article body files for EN and TR (all 54 articles).
 * Run: node scripts/generate-guide-bodies-en-tr.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("src");
const articlesTs = fs.readFileSync(path.join(ROOT, "lib/articles.ts"), "utf8");
const articles = [];
const re = /id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(articlesTs))) {
  articles.push({ id: m[1], titleTr: m[2], categoryTr: m[3], excerptTr: m[4] });
}

const enMeta = fs.readFileSync(path.join(ROOT, "i18n/messages/guide-articles.en.i18n.ts"), "utf8");
const enArticles = {};
const enRe = /"([^"]+)":\s*\{\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",[\s\S]*?excerpt:\s*"([^"]+)"/g;
while ((m = enRe.exec(enMeta))) {
  enArticles[m[1]] = { title: m[2], category: m[3], excerpt: m[4] };
}

const policiesRaw = fs.readFileSync(path.join(ROOT, "lib/guide-articles/policies.ts"), "utf8").replace(/\r\n/g, "\n");
const POLICY_EN = policiesRaw.match(/en: `\n([\s\S]*?)`,\n  th:/)?.[1]?.trim() ?? "";
const POLICY_TR = policiesRaw.match(/tr: `\n([\s\S]*?)`,\n  en:/)?.[1]?.trim() ?? "";

// Load existing EN custom bodies from travel-guide-content.en.ts
const enCustomTs = fs.readFileSync(path.join(ROOT, "lib/travel-guide-content.en.ts"), "utf8");
const enCustom = {};
const bodyBlock = enCustomTs.match(/const ARTICLE_BODIES_EN[\s\S]*?= \{([\s\S]*?)\n\};/);
if (bodyBlock) {
  const idRe = /"([^"]+)":\s*`/g;
  let lastId = null;
  let pos = 0;
  const block = bodyBlock[1];
  while ((m = idRe.exec(block))) {
    if (lastId) {
      let content = block.slice(pos, m.index).replace(/^\s*`/, "").replace(/`\s*,?\s*$/, "").trim();
      content = content.replace(/\$\{COMPANY_POLICY_EN\}/g, POLICY_EN);
      enCustom[lastId] = content;
    }
    lastId = m[1];
    pos = m.index + m[0].length;
  }
  if (lastId) {
    let content = block.slice(pos).replace(/^\s*`/, "").replace(/`\s*,?\s*$/, "").trim();
    content = content.replace(/\$\{COMPANY_POLICY_EN\}/g, POLICY_EN);
    enCustom[lastId] = content;
  }
}

// Load TR custom bodies from travel-guide-content.ts
const trCustomTs = fs.readFileSync(path.join(ROOT, "lib/travel-guide-content.ts"), "utf8");
const trCustom = {};
const trBlock = trCustomTs.match(/const ARTICLE_BODIES[\s\S]*?= \{([\s\S]*?)\n\};/);
if (trBlock) {
  const idRe = /"([^"]+)":\s*`/g;
  let lastId = null;
  let pos = 0;
  const block = trBlock[1];
  while ((m = idRe.exec(block))) {
    if (lastId) {
      let content = block.slice(pos, m.index).replace(/^\s*`/, "").replace(/`\s*,?\s*$/, "").trim();
      content = content.replace(/\$\{COMPANY_POLICY\}/g, POLICY_TR);
      trCustom[lastId] = content;
    }
    lastId = m[1];
    pos = m.index + m[0].length;
  }
  if (lastId) {
    let content = block.slice(pos).replace(/^\s*`/, "").replace(/`\s*,?\s*$/, "").trim();
    content = content.replace(/\$\{COMPANY_POLICY\}/g, POLICY_TR);
    trCustom[lastId] = content;
  }
}

const CATEGORY_SECTIONS_EN = {
  Safety: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Essential safety rules\n\n1. **Helmet always** — rider and passenger (legal requirement)\n2. **IDP + licence** on you at all times\n3. **Zero alcohol** when riding — heavy fines and crash risk\n4. **Lights on** even during daytime\n5. Ride **defensively** — Phuket traffic is unpredictable\n\n## Practical tips\n\n- Start with short rides around Patong before long tours\n- Choose **premium insurance** when booking\n- Avoid night riding until you know the roads\n- Watch for dogs, sand on corners, and sudden lane changes\n\n## Emergency numbers\n\n- Police: **191** | Ambulance: **1669** | Tourist police: **1155**\n\n## Related topics\n\nInternational licence, Thai traffic fines, insurance packages, and checkpoint behaviour.\n\n${POLICY_EN}`,
  Legal: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## What you must know\n\nThailand enforces traffic laws actively in tourist areas. Foreign riders are **not exempt**.\n\n## Documents\n\n- Valid **IDP (motorcycle class)** or Thai licence\n- Passport (original)\n- Rental contract and insurance papers\n\n## Typical fines\n\n| Offence | Approx. fine |\n|---------|-------------|\n| No IDP/licence | 1,000–2,000+ THB |\n| No helmet | 500–1,000 THB |\n| Drunk riding | 5,000–20,000+ THB |\n| Speed / red light | 500–2,000 THB |\n\n## At police stops\n\nStay calm, show documents, do not argue. Checkpoints are frequent in Patong, Chalong, and on airport road.\n\n${POLICY_EN}`,
  Documents: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## IDP — the only accepted foreign licence\n\nThai police accept:\n- ✅ Thai motorcycle licence\n- ✅ **IDP with motorcycle class**\n- ❌ Home country licence alone\n- ❌ Passport alone\n\n## Before you travel\n\nObtain IDP in your home country **before** flying to Thailand. Tourist IDP issuance in Thailand is not practical.\n\n## Thailand Moto Rent requirement\n\nWe rent only with valid **motorcycle IDP**. No IDP = no rental.\n\n${POLICY_EN}`,
  Practical: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Planning your ride\n\nPhuket and surrounding provinces reward preparation: fuel stops, cash, SIM data, and weather checks all matter on two wheels.\n\n## Key advice\n\n- Fill the tank before leaving Patong for Krabi, Phang Nga, or Khao Sok\n- Carry **rain gear** May–October\n- Save offline Google Maps for mountain sections\n- Keep **small THB notes** for parking and tolls\n\n## Thailand Moto Rent tips\n\nBook insurance upgrades online, confirm IDP before pickup, and message us on WhatsApp if your return time changes.\n\n${POLICY_EN}`,
  Tips: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Local riding wisdom\n\n- Start rides **early morning** — cooler and less traffic\n- Thai riders may turn without indicators — keep distance\n- Weekends in Patong are busy; weekdays are calmer for learning\n- Never copy reckless local stunts\n\n## Tourist mistakes to avoid\n\nRiding barefoot, no helmet, using phone while moving, and riding after bar nights are the top causes of fines and injuries.\n\n${POLICY_EN}`,
  Culture: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Respect local customs\n\nWhen visiting temples, markets, or Old Phuket Town:\n\n- Cover shoulders and knees at temples\n- Remove shoes where required\n- Lower your voice near residential areas\n- Ask before photographing people\n\n## Parking etiquette\n\nUse designated scooter areas; do not block shop entrances or hotel lobbies.\n\n${POLICY_EN}`,
  Motorcycles: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Thailand Moto Rent fleet overview\n\n| Model | Daily | Best for |\n|-------|-------|----------|\n| Honda Click 160 | ฿350 | City, first-timers |\n| Honda ADV 160 | ฿490 | All-round tours |\n| Honda ADV 350 | ฿690 | Two-up, hills |\n| Honda Forza 350 | ฿790 | Highways, comfort |\n| Yamaha XMAX 300 | ฿750 | Sport maxi, stability |\n\n## How to choose\n\nMatch engine size to route: Patong-only needs less power than Phuket→Krabi day trips. When in doubt, **ADV 160** is our most popular choice.\n\n${POLICY_EN}`,
  Gear: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Helmet quality\n\nDOT or ECE certified helmets are legally acceptable. Our rentals include a helmet; tighten the chin strap — loose helmets are fined.\n\n## Clothing\n\n- Long sleeves for sun and falls\n- Closed shoes (not flip-flops)\n- Rain jacket in wet season\n\n## Optional extras\n\nPhone mount (use only when parked), dry bag for documents, and sunscreen for exposed arms.\n\n${POLICY_EN}`,
  Guide: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Route planning\n\nBase yourself in Patong, Kata, or Karon for south Phuket loops. Allow extra time for photos, food stops, and ferry connections when islands are involved.\n\n## Must-see areas\n\n- Viewpoints: Promthep, Karon, Samet Nangshe (Phang Nga)\n- Beaches: Freedom, Nai Harn, Bang Tao\n- Culture: Old Phuket Town, Wat Chalong\n\n## Riding notes\n\nMountain roads to Phang Nga and Krabi are scenic but winding — ride in daylight, check fuel, and carry IDP at all times.\n\n${POLICY_EN}`,
  Comparison: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Summary\n\nEvery traveller has different budget, skill, and time constraints. This comparison helps you choose the option that matches **your** trip — not someone else's Instagram plan.\n\n## Factors to weigh\n\n- **Cost** — rental + fuel + insurance vs tour package price\n- **Freedom** — fixed itinerary vs spontaneous detours\n- **Skill** — confidence in Thai traffic and mountain roads\n- **Time** — day trip enough, or multi-day better?\n\n## Our recommendation\n\nMost visitors on 5–10 day holidays benefit from **2–3 day scooter rental** with premium insurance rather than buying a bike or joining large bus tours.\n\n${POLICY_EN}`,
  Experience: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Real-world perspective\n\nThese notes come from typical tourist experiences riding in Phuket — successes, mistakes, and lessons learned.\n\n## What worked\n\n- Getting IDP before departure\n- Riding slowly the first day\n- Premium insurance when unfamiliar with roads\n- Early starts to beat heat and traffic\n\n## What to watch for\n\nUnexpected rain, gravel on corners, sand at beach road exits, and fatigue on long return rides after sunset.\n\n${POLICY_EN}`,
};

const CATEGORY_SECTIONS_TR = {
  Güvenlik: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Temel güvenlik kuralları\n\n1. **Kask her zaman** — sürücü ve yolcu (yasal zorunluluk)\n2. **IDP + ehliyet** sürekli yanınızda\n3. **Alkolsüz sürüş** — ağır ceza ve kaza riski\n4. **Farlar açık** gündüz bile\n5. **Savunmacı sürüş** — Phuket trafiği öngörülemez\n\n## Pratik ipuçları\n\n- Uzun tura çıkmadan önce Patong çevresinde alışın\n- Rezervasyonda **premium sigorta** seçin\n- Yolları tanıyana kadar gece sürüşünden kaçının\n- Köpekler, virajda kum ve ani şerit değişimlerine dikkat\n\n## Acil numaralar\n\n- Polis: **191** | Ambulans: **1669** | Turist polisi: **1155**\n\n${POLICY_TR}`,
  Hukuk: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Bilmeniz gerekenler\n\nTayland turist bölgelerinde trafik kurallarını aktif uygular. Yabancılar **muaf değildir**.\n\n## Belgeler\n\n- Geçerli **IDP (motosiklet)** veya Tayland ehliyeti\n- Pasaport\n- Kiralama sözleşmesi ve sigorta\n\n## Sık cezalar\n\n| İhlal | Yaklaşık ceza |\n|-------|----------------|\n| IDP/ehliyet yok | 1.000–2.000+ THB |\n| Kask yok | 500–1.000 THB |\n| Alkollü sürüş | 5.000–20.000+ THB |\n\n${POLICY_TR}`,
  Dokümanlar: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## IDP — kabul edilen tek yabancı belge\n\n- ✅ Tayland motosiklet ehliyeti\n- ✅ **Motosiklet sınıflı IDP**\n- ❌ Sadece ülke ehliyeti\n- ❌ Sadece pasaport\n\n## Tayland'a gelmeden önce\n\nIDP'yi ülkenizde alın. Turist olarak Tayland'da IDP çıkarmak pratik değildir.\n\n${POLICY_TR}`,
  Pratik: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Planlama\n\nYakıt, nakit, SIM ve hava durumu kontrolü uzun sürüşlerde kritiktir.\n\n## Öneriler\n\n- Krabi/Phang Nga/Khao Sok öncesi depoyu doldurun\n- Mayıs–Ekim **yağmurluk** taşıyın\n- Google Maps offline indirin\n- Küçük THB banknot bulundurun\n\n${POLICY_TR}`,
  İpuçları: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Yerel bilgelik\n\n- **Sabah erken** çıkın\n- Yerel sürücüler sinyalsiz dönebilir\n- Hafta sonu Patong kalabalık; hafta içi öğrenmek için daha iyi\n\n${POLICY_TR}`,
  Kültür: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Saygı kuralları\n\n- Tapınakta omuz/diz kapalı\n- Ayakkabı çıkar\n- Fotoğraf öncesi izin isteyin\n\n${POLICY_TR}`,
  Motosikletler: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Filo özeti\n\n| Model | Günlük | Kimin için |\n|-------|--------|------------|\n| Click 160 | ฿350 | Şehir, yeni başlayan |\n| ADV 160 | ฿490 | Genel tur |\n| ADV 350 | ฿690 | İki kişi, tepeler |\n| Forza 350 | ฿790 | Otoyol |\n| XMAX 300 | ฿750 | Maxi konfor |\n\n${POLICY_TR}`,
  Donanım: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Kask\n\nDOT/ECE onaylı; kiralamada **dahil**. Çene kayışını sıkı bağlayın.\n\n## Kıyafet\n\n- Kapalı ayakkabı\n- Yağmur sezonunda ceket\n- Güneş koruması\n\n${POLICY_TR}`,
  Rehber: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Rota planlama\n\nPatong/Kata/Karon üs olarak ideal. Ada geçişlerinde feribot süresini ekleyin.\n\n## Öne çıkanlar\n\nPromthep, Karon Viewpoint, Eski Phuket, Wat Chalong, Freedom Beach.\n\n${POLICY_TR}`,
  Karşılaştırma: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Özet\n\nBütçe, beceri ve süreye göre seçim yapın.\n\n## Faktörler\n\nMaliyet, özgürlük, deneyim, zaman.\n\n## Tavsiye\n\n5–10 günlük tatilde **2–3 günlük scooter + premium sigorta** çoğu turist için ideal.\n\n${POLICY_TR}`,
  Deneyim: (title, excerpt) => `# ${title}\n\n${excerpt}\n\n## Gerçek deneyimler\n\nIDP önceden almak, ilk gün yavaş sürmek ve premium sigorta en sık işe yarayan adımlar.\n\n## Dikkat\n\nAni yağmur, virajda çakıl, plaj çıkışında kum, gün batımından sonra yorgunluk.\n\n${POLICY_TR}`,
};

function buildEnBody(id, meta) {
  if (enCustom[id]) {
    const body = enCustom[id].trim();
    return body.includes("Thailand Moto Rent policy") ? body : `${body}\n\n${POLICY_EN}`.trim();
  }
  const fn = CATEGORY_SECTIONS_EN[meta.category];
  if (fn) return fn(meta.title, meta.excerpt).trim();
  return CATEGORY_SECTIONS_EN.Practical(meta.title, meta.excerpt).trim();
}

function buildTrBody(id, art) {
  if (trCustom[id]) {
    const body = trCustom[id].trim();
    return body.includes("Thailand Moto Rent") ? body : `${body}\n\n${POLICY_TR}`.trim();
  }
  const fn = CATEGORY_SECTIONS_TR[art.categoryTr];
  if (fn) return fn(art.titleTr, art.excerptTr).trim();
  return CATEGORY_SECTIONS_TR.Pratik(art.titleTr, art.excerptTr).trim();
}

function emitFile(locale, constName, bodies) {
  const lines = [
    `/** Auto-generated complete guide bodies — ${locale.toUpperCase()} — all ${articles.length} articles */`,
    "",
    `export const ${constName}: Record<string, string> = {`,
  ];
  for (const art of articles) {
    const body = bodies[art.id] ?? "";
    const escaped = body.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    lines.push(`  "${art.id}": \`${escaped}\`,`);
  }
  lines.push("};", "");
  const outDir = path.join(ROOT, "lib/guide-articles/bodies");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `${locale}.ts`), lines.join("\n"));
  console.log(`Wrote ${locale}.ts (${articles.length} articles)`);
}

const enBodies = {};
const trBodies = {};
for (const art of articles) {
  const meta = enArticles[art.id] ?? { title: art.titleTr, category: "Practical", excerpt: art.excerptTr };
  enBodies[art.id] = buildEnBody(art.id, meta);
  trBodies[art.id] = buildTrBody(art.id, art);
}

emitFile("en", "GUIDE_BODIES_EN", enBodies);
emitFile("tr", "GUIDE_BODIES_TR", trBodies);

console.log("Done EN + TR");
