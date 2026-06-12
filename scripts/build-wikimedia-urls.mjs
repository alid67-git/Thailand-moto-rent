/**
 * Wikimedia Commons API ile gerçek görsel URL'leri toplar → destination-wikimedia.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "src", "lib", "destination-wikimedia.ts");
const USER_AGENT = "ThailandMotoRent/1.0 (destination photos; +https://thailand-moto-rent.com)";

const SPOT_SEARCH = {
  "big-buddha": "Big Buddha Phuket Thailand",
  "promthep-cape": "Promthep Cape Phuket",
  "phrom-thep-cape-lighthouse": "Promthep Cape lighthouse Phuket",
  "windmill-viewpoint": "Windmill Viewpoint Phuket",
  "karon-viewpoint": "Karon View Point Phuket",
  "nai-harn-beach": "Nai Harn Beach Phuket",
  "kata-beach": "Kata Beach Phuket",
  "karon-beach": "Karon Beach Phuket",
  "kamala-beach": "Kamala Beach Phuket",
  "patong-beach": "Patong Beach Phuket",
  "bang-tao-beach": "Bang Tao Beach Phuket",
  "surin-beach": "Surin Beach Phuket",
  "rawai-beach": "Rawai Beach Phuket",
  "old-phuket-town": "Phuket Old Town Thailand",
  "wat-chalong": "Wat Chalong Phuket",
  "monkey-hill": "Monkey Hill Phuket",
  "freedom-beach": "Freedom Beach Phuket",
  "banana-beach": "Banana Beach Phuket",
  "bang-pae-waterfall": "Bang Pae waterfall Phuket",
  "tiger-cave-krabi": "Tiger Cave Temple Krabi",
  "emerald-pool": "Emerald Pool Krabi",
  "hot-springs": "Krabi hot springs",
  "krabi-town": "Krabi town Thailand",
  "railay-beach": "Railay Beach Krabi",
  "cheow-lan-lake": "Cheow Lan Lake Khao Sok",
  "khao-sok-national-park": "Khao Sok National Park",
  "james-bond-island": "James Bond Island Phang Nga",
  "phang-nga-bay": "Phang Nga Bay Thailand",
  "similan-islands": "Similan Islands Thailand",
  "coral-island": "Coral Island Phuket",
  "bamboo-island": "Bamboo Island Phuket",
  "koh-phi-phi": "Phi Phi Islands Thailand",
  "samet-nangshe": "Samet Nangshe viewpoint Phang Nga",
  "ao-nang": "Ao Nang Krabi",
  "ton-prai-waterfall": "Ton Prai waterfall Khao Sok",
  "paradise-beach": "Paradise Beach Phuket",
  "khao-yai-viewpoint": "Khao Yai viewpoint Phang Nga",
  "monkey-beach": "Monkey Beach Phi Phi",
  "koh-naka-island": "Koh Naka Phuket",
  "khao-lak": "Khao Lak beach Thailand",
  "three-pagodas-pass": "Three Pagodas Pass Thailand",
  "sirinat-national-park": "Sirinat National Park Phuket",
  "radar-hill-viewpoint": "Radar Hill Phuket",
  "bang-tao-temple": "Wat Bang Thong Phuket",
  "soi-dog-foundation": "Soi Dog Foundation Phuket",
  "phuket-aquarium": "Phuket Aquarium",
  "phuket-fantasea": "Phuket FantaSea",
  "thalang-viewpoint": "Thalang Phuket viewpoint",
  "bang-pae-elephant-sanctuary": "Bang Pae elephant Phuket",
  "patong-fish-market": "Patong market Phuket",
  "sticky-waterfall": "Bua Tong sticky waterfall Chiang Mai",
  "erawan-national-park": "Erawan National Park waterfall",
  "mae-sa-waterfall": "Mae Sa waterfall Chiang Mai",
  "phang-nga-cave": "Wat Suwan Kuha monkey cave",
  "lanta-island": "Koh Lanta Thailand",
  "mai-khao-plane-spot": "Mai Khao Beach airplane Phuket",
  "monkey-cave": "Wat Suwan Kuha monkey cave",
  "bangla-road": "Bangla Road Patong",
  "yanui-beach": "Yanui Beach Phuket",
  "laem-singh": "Laem Singh Beach Phuket",
  "nai-yang-beach": "Nai Yang Beach Phuket",
  "cape-panwa": "Cape Panwa Phuket",
  "khao-rang": "Khao Rang Phuket",
  "naka-weekend-market": "Naka Market Phuket",
  "central-festival-phuket": "Central Festival Phuket",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function searchImages(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: query,
      gsrnamespace: "6",
      gsrlimit: "12",
      prop: "imageinfo",
      iiprop: "url|mime|thumburl",
      iiurlwidth: "1280",
      format: "json",
      origin: "*",
    });

  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return [];

  return Object.values(pages)
    .filter((p) => p.imageinfo?.[0])
    .map((p) => ({
      title: p.title,
      url: p.imageinfo[0].thumburl || p.imageinfo[0].url,
      mime: p.imageinfo[0].mime,
    }))
    .filter((i) => i.mime?.startsWith("image/") && i.url);
}

async function main() {
  const result = {};
  const slugs = Object.keys(SPOT_SEARCH);

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const query = SPOT_SEARCH[slug];
    process.stdout.write(`[${i + 1}/${slugs.length}] ${slug}… `);

    try {
      await sleep(1200);
      let images = await searchImages(query);
      if (images.length < 3) {
        await sleep(1200);
        const alt = await searchImages(query.split(" ").slice(0, 3).join(" "));
        images = [...images, ...alt];
      }

      const seen = new Set();
      const urls = [];
      for (const img of images) {
        if (seen.has(img.url)) continue;
        seen.add(img.url);
        urls.push(img.url);
        if (urls.length >= 5) break;
      }

      result[slug] = urls;
      console.log(`${urls.length} urls`);
    } catch (e) {
      console.log(`FAIL: ${e.message}`);
      result[slug] = [];
    }
  }

  const fallbackSlugs = ["phang-nga-bay", "big-buddha", "promthep-cape", "old-phuket-town", "kata-beach"];
  const fallback = fallbackSlugs.flatMap((s) => result[s] ?? []).slice(0, 5);

  let ts = `/** Auto-generated — Wikimedia Commons (CC). Do not edit by hand; run: node scripts/build-wikimedia-urls.mjs */\n\n`;
  ts += `export const DESTINATION_WIKIMEDIA: Record<string, string[]> = {\n`;
  for (const [slug, urls] of Object.entries(result)) {
    if (urls.length === 0) continue;
    ts += `  "${slug}": [\n`;
    for (const u of urls) {
      ts += `    ${JSON.stringify(u)},\n`;
    }
    ts += `  ],\n`;
  }
  ts += `};\n\n`;
  ts += `export const PHUKET_FALLBACK_IMAGES = [\n`;
  for (const u of fallback) {
    ts += `  ${JSON.stringify(u)},\n`;
  }
  ts += `];\n`;

  fs.writeFileSync(OUT, ts);
  const withImages = Object.values(result).filter((a) => a.length > 0).length;
  console.log(`\nWrote ${OUT} (${withImages}/${slugs.length} spots with images)`);
}

main().catch(console.error);
