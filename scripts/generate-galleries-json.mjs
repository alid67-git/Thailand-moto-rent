/**
 * public/images/destinations altındaki manifest.json dosyalarını okuyup
 * src/data/destination-galleries.json üretir.
 * Kullanım: node scripts/generate-galleries-json.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DEST_ROOT = path.join(ROOT, "public", "images", "destinations");
const OUT = path.join(ROOT, "src", "data", "destination-galleries.json");

const galleries = {};

if (fs.existsSync(DEST_ROOT)) {
  for (const slug of fs.readdirSync(DEST_ROOT)) {
    const dir = path.join(DEST_ROOT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;

    const manifestPath = path.join(dir, "manifest.json");
    let files = [];
    if (fs.existsSync(manifestPath)) {
      try {
        files = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      } catch {
        files = [];
      }
    }

    if (files.length === 0) {
      files = fs
        .readdirSync(dir)
        .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
        .sort();
    }

    // Yalnızca diskte gerçekten var olan dosyalar
    files = files.filter((f) => fs.existsSync(path.join(dir, f)));

    galleries[slug] = files.map((f) => `/images/destinations/${slug}/${f}`);
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(galleries, null, 2));
console.log(`Wrote ${Object.keys(galleries).length} galleries → ${OUT}`);
