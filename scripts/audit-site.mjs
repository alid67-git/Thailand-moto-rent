import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
}

function extractSlugsFromTs(rel) {
  const text = fs.readFileSync(path.join(root, rel), "utf8");
  return [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function extractRouteIds(rel) {
  const text = fs.readFileSync(path.join(root, rel), "utf8");
  return [...text.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function extractDestinationSlugsFromRoutes(globDirs) {
  const slugs = new Set();
  for (const rel of globDirs) {
    const text = fs.readFileSync(path.join(root, rel), "utf8");
    for (const m of text.matchAll(/destinationSlug:\s*"([^"]+)"/g)) {
      slugs.add(m[1]);
    }
  }
  return [...slugs];
}

function extractHeroSlugs(globDirs) {
  const slugs = new Set();
  for (const rel of globDirs) {
    const text = fs.readFileSync(path.join(root, rel), "utf8");
    for (const m of text.matchAll(/heroSlug:\s*"([^"]+)"/g)) {
      slugs.add(m[1]);
    }
  }
  return [...slugs];
}

function localPathExists(urlPath) {
  if (!urlPath.startsWith("/")) return true;
  const file = path.join(publicDir, urlPath.replace(/^\//, ""));
  return fs.existsSync(file);
}

function collectLocalImagesFromGalleries(galleries) {
  const missing = [];
  for (const [slug, urls] of Object.entries(galleries)) {
    for (const u of urls) {
      if (u.startsWith("http")) continue;
      if (!localPathExists(u)) missing.push({ slug, url: u });
    }
  }
  return missing;
}

function checkManifests() {
  const issues = [];
  const destRoot = path.join(publicDir, "images", "destinations");
  if (!fs.existsSync(destRoot)) return issues;
  for (const dir of fs.readdirSync(destRoot, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const manifestPath = path.join(destRoot, dir.name, "manifest.json");
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    for (const file of manifest) {
      const fp = path.join(destRoot, dir.name, file);
      if (!fs.existsSync(fp)) {
        issues.push({ slug: dir.name, file, type: "manifest-missing" });
      }
    }
  }
  return issues;
}

function scanImageRefsInSrc() {
  const missing = [];
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = path.join(dir, ent.name);
      if (ent.isDirectory() && ent.name !== "node_modules" && !ent.name.startsWith(".")) walk(fp);
      else if (/\.(tsx?|json)$/.test(ent.name)) {
        const text = fs.readFileSync(fp, "utf8");
        for (const m of text.matchAll(/["'](\/images\/[^"']+)["']/g)) {
          const url = m[1];
          if (!localPathExists(url)) {
            missing.push({ file: path.relative(root, fp), url });
          }
        }
      }
    }
  }
  walk(path.join(root, "src"));
  walk(path.join(root, "public"));
  return missing;
}

const destinationSlugs = extractSlugsFromTs("src/lib/destinations.ts");
const destinationSet = new Set(destinationSlugs);
const galleries = readJson("src/data/destination-galleries.json");
const routeFiles = [
  "src/lib/day-routes.ts",
  "src/lib/multi-route-catalog.ts",
  "src/lib/multi-route-extra.ts",
];
const routeStopSlugs = extractDestinationSlugsFromRoutes(routeFiles);
const heroSlugs = extractHeroSlugs(routeFiles);
const routeIds = [
  ...extractRouteIds("src/lib/day-routes.ts"),
  ...extractRouteIds("src/lib/multi-route-catalog.ts"),
  ...extractRouteIds("src/lib/multi-route-extra.ts"),
];

const missingDestPages = routeStopSlugs.filter((s) => !destinationSet.has(s));
const missingHeroDest = heroSlugs.filter((s) => !destinationSet.has(s) && !galleries[s]);
const missingGalleryFiles = collectLocalImagesFromGalleries(galleries);
const manifestIssues = checkManifests();
const srcMissingImages = scanImageRefsInSrc();

// Unique src missing
const seen = new Set();
const uniqueSrcMissing = srcMissingImages.filter((x) => {
  const k = x.url;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

console.log("=== SITE AUDIT ===\n");
console.log(`Destinations: ${destinationSlugs.length}`);
console.log(`Routes: ${routeIds.length}`);
console.log(`Route stop slugs: ${routeStopSlugs.length}`);
console.log(`Hero slugs: ${heroSlugs.length}\n`);

if (missingDestPages.length) {
  console.log("❌ BROKEN DESTINATION LINKS (route → missing page):");
  for (const s of missingDestPages) console.log(`  - ${s}`);
  console.log();
} else {
  console.log("✅ All route destination slugs have pages\n");
}

if (missingHeroDest.length) {
  console.log("⚠️ Hero slugs without destination page (OK if wikimedia/gallery):");
  for (const s of missingHeroDest) console.log(`  - ${s}`);
  console.log();
}

if (missingGalleryFiles.length) {
  console.log(`❌ MISSING LOCAL GALLERY FILES (${missingGalleryFiles.length}):`);
  const bySlug = {};
  for (const m of missingGalleryFiles) {
    bySlug[m.slug] = (bySlug[m.slug] ?? 0) + 1;
  }
  for (const [slug, count] of Object.entries(bySlug).sort((a, b) => b[1] - a[1]).slice(0, 20)) {
    console.log(`  - ${slug}: ${count} missing files`);
  }
  if (Object.keys(bySlug).length > 20) console.log(`  ... and ${Object.keys(bySlug).length - 20} more slugs`);
  console.log();
} else {
  console.log("✅ All gallery JSON paths exist on disk\n");
}

if (manifestIssues.length) {
  console.log(`❌ MANIFEST vs DISK (${manifestIssues.length}):`);
  for (const m of manifestIssues.slice(0, 15)) console.log(`  - ${m.slug}/${m.file}`);
  console.log();
} else {
  console.log("✅ All manifest files present\n");
}

if (uniqueSrcMissing.length) {
  console.log(`❌ MISSING IMAGES REFERENCED IN SRC (${uniqueSrcMissing.length}):`);
  for (const m of uniqueSrcMissing.slice(0, 25)) console.log(`  - ${m.url}`);
  console.log();
}

// Destinations without any image source
const wikimediaText = fs.readFileSync(path.join(root, "src/lib/destination-wikimedia.ts"), "utf8");
const wikimediaSlugs = new Set([...wikimediaText.matchAll(/"([^"]+)":\s*\[/g)].map((m) => m[1]));
const destData = fs.readFileSync(path.join(root, "src/lib/destinations.ts"), "utf8");
const noImage = [];
for (const slug of destinationSlugs) {
  const hasWiki = wikimediaSlugs.has(slug);
  const hasGallery = galleries[slug]?.length > 0;
  const hasFallback = destData.includes(`slug: "${slug}"`) && /image:\s*"[^"]+"/.test(
    destData.slice(destData.indexOf(`slug: "${slug}"`), destData.indexOf(`slug: "${slug}"`) + 400),
  );
  if (!hasWiki && !hasGallery && !hasFallback) noImage.push(slug);
}
if (noImage.length) {
  console.log("⚠️ Destinations relying only on fallback image field:");
  for (const s of noImage) console.log(`  - ${s}`);
  console.log();
}

const exitCode =
  missingDestPages.length || missingGalleryFiles.length || manifestIssues.length || uniqueSrcMissing.length
    ? 1
    : 0;
process.exit(exitCode);
