/**
 * Tüm destinasyonlar için Wikimedia Commons görselleri indirir.
 * Her slug için en az MIN_IMAGES fotoğraf hedeflenir.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "images", "destinations");
const MIN_IMAGES = 8;
const SEARCH_DELAY = 10000;
const DOWNLOAD_DELAY = 4500;
const USER_AGENT = "ThailandMotoRent/1.0 (destination gallery; educational)";

const SPOT_SEARCHES = {
  "mai-khao-plane-spot": ["Mai Khao Beach Phuket airplane", "Phuket airport beach plane"],
  "monkey-hill": ["Monkey Hill Phuket", "Toh Sae Hill Phuket"],
  "monkey-cave": ["Wat Suwan Kuha Phang Nga", "monkey cave temple Thailand"],
  "central-festival-phuket": ["Central Festival Phuket", "Central Phuket Floresta"],
  "big-buddha": ["Big Buddha Phuket", "Phuket Big Buddha statue"],
  "promthep-cape": ["Promthep Cape Phuket sunset", "Promthep Cape Thailand"],
  "rawai-beach": ["Rawai Beach Phuket", "Rawai pier Phuket"],
  "nai-harn-beach": ["Nai Harn Beach Phuket", "Nai Harn bay"],
  "yanui-beach": ["Yanui Beach Phuket", "Yanui bay rocks"],
  "karon-viewpoint": ["Karon View Point Phuket", "three beaches viewpoint Phuket"],
  "windmill-viewpoint": ["Windmill Viewpoint Phuket", "Nai Harn windmill"],
  "wat-chalong": ["Wat Chalong Phuket", "Chalong temple Thailand"],
  "old-phuket-town": ["Phuket Old Town", "Phuket Sino-Portuguese"],
  "bangla-road": ["Bangla Road Patong", "Patong nightlife Thailand"],
  "surin-beach": ["Surin Beach Phuket", "Surin bay Thailand"],
  "kata-beach": ["Kata Beach Phuket", "Kata bay surf"],
  "karon-beach": ["Karon Beach Phuket", "Karon bay sand"],
  "freedom-beach": ["Freedom Beach Phuket", "Freedom bay Patong"],
  "laem-singh": ["Laem Singh Beach Phuket", "Laem Singh viewpoint"],
  "nai-yang-beach": ["Nai Yang Beach Phuket", "Sirinat National Park beach"],
  "cape-panwa": ["Cape Panwa Phuket", "Panwa lighthouse Phuket"],
  "khao-rang": ["Khao Rang Phuket", "Rang Hill viewpoint Phuket"],
  "naka-weekend-market": ["Naka Market Phuket", "Phuket weekend market"],
  "bang-tao-beach": ["Bang Tao Beach Phuket", "Bang Tao lagoon"],
  "phang-nga-bay": ["Phang Nga Bay Thailand", "James Bond Island Phang Nga"],
  "samet-nangshe": ["Samet Nangshe viewpoint", "Samet Nangshe Phang Nga"],
  "black-rock-viewpoint": ["Black Rock Viewpoint Phuket", "Kamala viewpoint rocks"],
  "nakkerd-viewpoint": ["Nakkerd Hills Phuket", "Phuket 360 viewpoint"],
  "paradise-beach": ["Paradise Beach Phuket", "Paradise bay Patong"],
  "banana-beach": ["Banana Beach Phuket", "Haad Klom Phuket"],
  "soi-romanee": ["Soi Romanee Phuket", "Old Phuket Town colorful street"],
  "chillva-market": ["Chillva Market Phuket", "Chillva night market"],
  "kalim-viewpoint": ["Kalim Beach Patong viewpoint", "Patong bay view hill"],
  "kamala-beach": ["Kamala Beach Phuket sunset", "Kamala bay Thailand"],
  "ao-sane-beach": ["Ao Sane Beach Phuket", "Nai Thon beach Phuket"],
  "patong-hill-view": ["Patong Bay view hill", "Patong panorama Thailand"],
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url, retries = 5) {
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
    if (res.status === 429) {
      await sleep(20000 * (i + 1));
      continue;
    }
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`bad JSON: ${text.slice(0, 60)}`);
    }
  }
  throw new Error("HTTP 429");
}

async function searchImages(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: query,
      gsrnamespace: "6",
      gsrlimit: "20",
      prop: "imageinfo",
      iiprop: "url|mime",
      iiurlwidth: "1280",
      format: "json",
      origin: "*",
    });
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages) return [];
  return Object.values(pages)
    .filter((p) => p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url)
    .map((p) => ({
      url: p.imageinfo[0].thumburl || p.imageinfo[0].url,
      mime: p.imageinfo[0].mime,
    }))
    .filter((i) => i.mime?.startsWith("image/"));
}

async function downloadFile(url, dest) {
  for (let i = 0; i <= 4; i++) {
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
    if (res.status === 429) {
      await sleep(20000 * (i + 1));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 6000) throw new Error("too small");
    fs.writeFileSync(dest, buf);
    return buf.length;
  }
  throw new Error("HTTP 429");
}

async function processSlug(slug, searches) {
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });

  let manifest = [];
  const manifestPath = path.join(dir, "manifest.json");
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    } catch {
      manifest = [];
    }
  }

  if (manifest.length >= MIN_IMAGES) {
    console.log(`→ ${slug}: skip (${manifest.length} ok)`);
    return manifest.length;
  }

  console.log(`\n→ ${slug} (need ${MIN_IMAGES - manifest.length} more)`);
  const seen = new Set(
    manifest.map((f) => path.join(dir, f)).filter((p) => fs.existsSync(p))
  );
  let idx = manifest.length;

  for (const query of searches) {
    if (manifest.length >= MIN_IMAGES) break;
    await sleep(SEARCH_DELAY);
    let results = [];
    try {
      results = await searchImages(query);
      console.log(`  search "${query}": ${results.length} hits`);
    } catch (e) {
      console.warn(`  search fail: ${e.message}`);
    }

    for (const img of results) {
      if (manifest.length >= MIN_IMAGES) break;
      if (seen.has(img.url)) continue;
      seen.add(img.url);
      idx += 1;
      const ext = img.mime?.includes("png") ? "png" : "jpg";
      const filename = `${String(idx).padStart(2, "0")}.${ext}`;
      const dest = path.join(dir, filename);
      try {
        await sleep(DOWNLOAD_DELAY);
        const size = await downloadFile(img.url, dest);
        manifest.push(filename);
        console.log(`  ✓ ${filename} (${Math.round(size / 1024)} KB)`);
      } catch (e) {
        console.warn(`  ✗ ${filename}: ${e.message}`);
        idx -= 1;
      }
    }
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`  done: ${manifest.length} images`);
  return manifest.length;
}

async function regenerateGalleriesJson() {
  const gen = path.join(__dirname, "generate-galleries-json.mjs");
  const { spawnSync } = await import("child_process");
  spawnSync(process.execPath, [gen], { stdio: "inherit", cwd: ROOT });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [slug, searches] of Object.entries(SPOT_SEARCHES)) {
    await processSlug(slug, searches);
  }
  await regenerateGalleriesJson();
  console.log("\nAll destinations processed.");
}

main().catch(console.error);
