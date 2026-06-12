/**
 * Wikimedia Commons'dan destinasyon görselleri indirir.
 * Kullanım: node scripts/download-destination-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "images", "destinations");
const IMAGES_PER_SPOT = 20;
const DELAY_MS = 3500;
const SPOT_DELAY_MS = 8000;
const USER_AGENT = "ThailandMotoRent/1.0 (educational; contact@thailandmotorent.local)";

const SPOTS = [
  { slug: "mai-khao-plane-spot", search: "Mai Khao Beach airplane Phuket" },
  { slug: "monkey-hill", search: "Monkey Hill Phuket Toh Sae" },
  { slug: "monkey-cave", search: "Wat Suwan Kuha monkey cave Thailand" },
  { slug: "central-festival-phuket", search: "Central Festival Phuket" },
  { slug: "big-buddha", search: "Big Buddha Phuket" },
  { slug: "promthep-cape", search: "Promthep Cape Phuket" },
  { slug: "rawai-beach", search: "Rawai Beach Phuket" },
  { slug: "nai-harn-beach", search: "Nai Harn Beach Phuket" },
  { slug: "yanui-beach", search: "Yanui Beach Phuket" },
  { slug: "karon-viewpoint", search: "Karon View Point Phuket three beaches" },
  { slug: "windmill-viewpoint", search: "Windmill Viewpoint Phuket" },
  { slug: "wat-chalong", search: "Wat Chalong Phuket" },
  { slug: "old-phuket-town", search: "Phuket Old Town" },
  { slug: "bangla-road", search: "Bangla Road Patong Phuket" },
  { slug: "surin-beach", search: "Surin Beach Phuket" },
  { slug: "kata-beach", search: "Kata Beach Phuket" },
  { slug: "karon-beach", search: "Karon Beach Phuket" },
  { slug: "freedom-beach", search: "Freedom Beach Phuket" },
  { slug: "laem-singh", search: "Laem Singh Beach Phuket" },
  { slug: "nai-yang-beach", search: "Nai Yang Beach Phuket" },
  { slug: "cape-panwa", search: "Cape Panwa Phuket" },
  { slug: "khao-rang", search: "Khao Rang Phuket viewpoint" },
  { slug: "naka-weekend-market", search: "Naka Market Phuket" },
  { slug: "bang-tao-beach", search: "Bang Tao Beach Phuket" },
  { slug: "phang-nga-bay", search: "Phang Nga Bay Thailand" },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetry(url, opts = {}, retries = 4) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      ...opts,
      headers: { "User-Agent": USER_AGENT, ...opts.headers },
    });
    if (res.status === 429) {
      const wait = 15000 * (attempt + 1);
      console.warn(`  rate limited, waiting ${wait / 1000}s…`);
      await sleep(wait);
      continue;
    }
    return res;
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
      gsrlimit: "30",
      prop: "imageinfo",
      iiprop: "url|mime",
      iiurlwidth: "1200",
      format: "json",
      origin: "*",
    });
  const res = await fetchWithRetry(url);
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`invalid JSON (${text.slice(0, 40)}…)`);
  }
  const pages = data?.query?.pages;
  if (!pages) return [];
  return Object.values(pages)
    .filter((p) => p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url)
    .map((p) => ({
      title: p.title,
      url: p.imageinfo[0].thumburl || p.imageinfo[0].url,
      mime: p.imageinfo[0].mime,
    }))
    .filter((i) => i.mime?.startsWith("image/"));
}

async function downloadFile(url, dest) {
  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error("too small");
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function processSpot({ slug, search }) {
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });

  const manifestPath = path.join(dir, "manifest.json");
  let existing = [];
  if (fs.existsSync(manifestPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    } catch {
      existing = [];
    }
  }

  if (existing.length >= IMAGES_PER_SPOT) {
    console.log(`\n→ ${slug}: skip (${existing.length} images already)`);
    return existing.length;
  }

  console.log(`\n→ ${slug}: "${search}" (${existing.length}/${IMAGES_PER_SPOT} existing)`);
  await sleep(SPOT_DELAY_MS);

  let images = [];
  try {
    images = await searchImages(search);
  } catch (e) {
    console.warn(`  search failed: ${e.message}`);
  }

  if (images.length < 5) {
    await sleep(SPOT_DELAY_MS);
    try {
      const alt = await searchImages(search.split(" ").slice(0, 3).join(" "));
      images = [...images, ...alt];
    } catch {
      /* ignore */
    }
  }

  const seen = new Set();
  const manifest = [...existing];
  let idx = existing.length;

  for (const img of images) {
    if (manifest.length >= IMAGES_PER_SPOT) break;
    if (seen.has(img.url)) continue;
    seen.add(img.url);

    idx += 1;
    const ext = img.mime?.includes("png") ? "png" : "jpg";
    const filename = `${String(idx).padStart(2, "0")}.${ext}`;
    const dest = path.join(dir, filename);

    try {
      await sleep(DELAY_MS);
      const size = await downloadFile(img.url, dest);
      manifest.push(filename);
      console.log(`  ✓ ${filename} (${Math.round(size / 1024)} KB)`);
    } catch (e) {
      console.warn(`  ✗ skip ${filename}: ${e.message}`);
    }
  }

  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`  manifest: ${manifest.length} images`);
  return manifest.length;
}

async function regenerateGalleriesJson() {
  const genScript = path.join(__dirname, "generate-galleries-json.mjs");
  if (fs.existsSync(genScript)) {
    const { spawnSync } = await import("child_process");
    spawnSync(process.execPath, [genScript], { stdio: "inherit", cwd: ROOT });
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  let total = 0;
  for (const spot of SPOTS) {
    total += await processSpot(spot);
  }
  console.log(`\nDone. Total images: ${total}`);
  await regenerateGalleriesJson();
}

main().catch(console.error);
