import fs from "fs";

const UNMAPPED = [
  "bang-pae-waterfall",
  "tiger-cave-krabi",
  "emerald-pool",
  "hot-springs",
  "krabi-town",
  "railay-beach",
  "cheow-lan-lake",
  "similan-islands",
  "coral-island",
  "bamboo-island",
  "koh-phi-phi",
  "ao-nang",
  "ton-prai-waterfall",
  "monkey-beach",
  "koh-naka-island",
  "khao-lak",
  "three-pagodas-pass",
  "sirinat-national-park",
  "bang-tao-temple",
  "soi-dog-foundation",
  "phuket-aquarium",
  "phuket-fantasea",
  "bang-pae-elephant-sanctuary",
  "patong-fish-market",
  "sticky-waterfall",
  "erawan-national-park",
  "mae-sa-waterfall",
  "phang-nga-cave",
  "lanta-island",
];

const KEY_MAP = {
  "bang-pae-waterfall": "bangPaeWaterfall",
  "tiger-cave-krabi": "tigerCave",
  "emerald-pool": "emeraldPool",
  "hot-springs": "hotSprings",
  "krabi-town": "krabiTown",
  "railay-beach": "railayBeach",
  "cheow-lan-lake": "cheowLanLake",
  "similan-islands": "similanIslands",
  "coral-island": "coralIsland",
  "bamboo-island": "bambooIsland",
  "koh-phi-phi": "kohPhiPhi",
  "ao-nang": "aoNang",
  "ton-prai-waterfall": "tonPraiWaterfall",
  "monkey-beach": "monkeyBeach",
  "koh-naka-island": "kohNaka",
  "khao-lak": "khaoLak",
  "three-pagodas-pass": "threePagodasPass",
  "sirinat-national-park": "sirinatPark",
  "bang-tao-temple": "bangTaoTemple",
  "soi-dog-foundation": "soiDog",
  "phuket-aquarium": "phuketAquarium",
  "phuket-fantasea": "phuketFantasea",
  "bang-pae-elephant-sanctuary": "bangPaeElephant",
  "patong-fish-market": "patongFishMarket",
  "sticky-waterfall": "stickyWaterfall",
  "erawan-national-park": "erawanPark",
  "mae-sa-waterfall": "maeSaWaterfall",
  "phang-nga-cave": "phangNgaCave",
  "lanta-island": "lantaIsland",
};

const src = fs.readFileSync("src/lib/destinations.ts", "utf8");
const spots = [];
for (const slug of UNMAPPED) {
  const re = new RegExp(
    `slug:\\s*"${slug}"[\\s\\S]*?name:\\s*"([^"]+)"[\\s\\S]*?description:\\s*"([^"]+)"[\\s\\S]*?distance:\\s*"([^"]+)"[\\s\\S]*?duration:\\s*"([^"]+)"[\\s\\S]*?bestFor:\\s*"([^"]+)"`,
  );
  const m = src.match(re);
  if (!m) {
    console.error("missing", slug);
    continue;
  }
  spots.push({ slug, key: KEY_MAP[slug], name: m[1], description: m[2], distance: m[3], duration: m[4], bestFor: m[5] });
}

function kmFromDistance(d) {
  const m = d.match(/(\d+)\s*km/i);
  return m ? m[1] : null;
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function block(key, spot, lang) {
  const km = kmFromDistance(spot.distance);
  let distance, duration;
  if (lang === "tr") {
    distance = km ? `Patong'dan ~${km} km` : spot.distance;
    duration = spot.duration.includes("hour")
      ? spot.duration.replace("hours", "saat").replace("hour", "saat")
      : spot.duration.replace("min", "dk");
  } else {
    distance = km ? `~${km} km from Patong` : spot.distance;
    duration = spot.duration;
  }
  return `  ${key}: {
    name: "${esc(spot.name)}",
    description: "${esc(spot.description)}",
    distance: "${esc(distance)}",
    duration: "${esc(duration)}",
    bestFor: "${esc(spot.bestFor)}",
  },`;
}

console.log("// i18n keys for destination-i18n.ts");
for (const s of spots) {
  console.log(`  "${s.slug}": "${s.key}",`);
}

console.log("\n// TR blocks");
for (const s of spots) console.log(block(s.key, s, "tr"));

console.log("\n// EN blocks - names/descriptions need EN - using spot data as base");
for (const s of spots) console.log(block(s.key, s, "en"));
