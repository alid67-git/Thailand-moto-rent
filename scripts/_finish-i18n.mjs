/**
 * One-time script: appends de/fr/ar/th/zh + CATALOG_I18N export to route-catalog-i18n-data.mjs
 * Run: node scripts/_finish-i18n.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ar, th, zh } from "./_langs-rest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET = path.join(__dirname, "route-catalog-i18n-data.mjs");

function entry(name, tagline, description, highlights, bestTime, parkingInfo, fuelEstimate, recommendedBike) {
  return { name, tagline, description, highlights, bestTime, parkingInfo, fuelEstimate, recommendedBike };
}

function formatEntry(id, e) {
  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `  "${id}": entry(
    "${esc(e.name)}",
    "${esc(e.tagline)}",
    "${esc(e.description)}",
    "${esc(e.highlights)}",
    "${esc(e.bestTime)}",
    "${esc(e.parkingInfo)}",
    "${esc(e.fuelEstimate)}",
    "${esc(e.recommendedBike)}",
  ),`;
}

function formatLang(varName, catalog, ids) {
  const lines = [`const ${varName} = {`];
  for (const id of ids) {
    if (!catalog[id]) throw new Error(`Missing ${varName}:${id}`);
    lines.push(formatEntry(id, catalog[id]));
  }
  lines.push("};");
  return lines.join("\n");
}

const IDS = [
  "south-phuket-loop","phuket-viewpoints-loop","phuket-beach-hopping","phuket-sunset-route",
  "big-buddha-culture","hidden-phuket","north-phuket-explorer","phuket-old-town-cafe",
  "family-friendly-route","phuket-night-ride","luxury-phuket-route","airport-plane-spotting",
  "khao-sok-adventure","krabi-highlights","phang-nga-bay-explorer","andaman-coast-discovery",
  "samet-nangshe-sunrise","khao-lak-coastal","khao-sok-krabi-adventure","andaman-coast-explorer-3d",
  "phang-nga-khao-sok-discovery","krabi-ultimate-explorer","ultimate-south-adventure","ultimate-phuket-loop",
  "andaman-coast-grand-tour","khao-sok-gulf-coast","southern-thailand-discovery","southern-thailand-grand-tour",
  "andaman-coast-complete","khao-sok-gulf-expedition","luxury-south-thailand","phuket-to-satun",
  "ultimate-andaman-tour","southern-thailand-loop-7d","koh-samui-adventure","deep-south-explorer",
  "south-thailand-expedition","ranong-hot-springs","luxury-coastal-escape","southern-nature-loop",
  "ranong-scenic-ride","krabi-trang-explorer","ranong-andaman-adventure","koh-lanta-explorer","twin-coast-tour",
];

// ─── DE ─────────────────────────────────────────────────────────────────────
const de = {
  "south-phuket-loop": entry("Süd-Phuket-Rundfahrt","Big Buddha, Sonnenuntergang & Meeresfrüchte — beliebteste Tagestour","Die klassische Phuket-Motorradtour für Erstbesucher. Morgens in Patong starten, abends zurück: Big Buddha, Aussichtspunkte, Sonnenuntergang am Promthep Cape und frische Meeresfrüchte in Rawai. Gute Straßen — ideal als Phuket-Scooter-Tagestour.","Postkarten-Aussichten · Sonnenuntergang · Rawai Meeresfrüchte","Abfahrt 08:30 — Promthep 17:30–18:30","Motorradparkplätze an allen Stopps; Promthep abends voll","~7 L · 300–400 THB","Honda Click 160 / ADV 160"),
  "phuket-viewpoints-loop": entry("Phuket Viewpoints Loop","6 Aussichtspunkte — Stadt, Meer & Golden Hour","Motorradtour für Fotografen: Monkey Hill bis Promthep Cape an einem Tag. Mindestens 25 Minuten pro Stopp einplanen.","Beste Fotospots · Stadt- & Meerspanoramen","Start 09:00 — Route für Sonnenuntergang umkehren","Parkplätze an jedem Viewpoint; Radar Hill eng","~5 L · 250 THB","Honda Click 160"),
  "phuket-beach-hopping": entry("Phuket Beach Hopping","8 Strände an einem Tag — Badestopps an der Südküste","Acht Strände von Patong bis Ya Nui mit Schwimmpausen. Badezeug, Handtuch, Sonnencreme und Wasser mitnehmen. Budget für Freedom Beach Longtail.","8 Strände · Schwimmpausen","Start 08:00 — Strandzeit 10:00–17:00","Strandparkplätze 20–40 THB","~4 L · 200 THB + Freedom Longtail ~300 THB","Honda Click 160 / ADV 160"),
  "phuket-sunset-route": entry("Phuket Sunset Route","Old Town bis Promthep — Golden Hour & Sonnenuntergang","Die beliebteste Sonnenuntergangs-Scooter-Route: Nachmittagsstart, Old Town, Finale am Promthep Cape.","Sonnenuntergangsfotos · Golden Hour","Abfahrt 12:00 — Promthep 17:30–18:30","Wenig Parkplatz am Promthep am Abend","~5 L · 250 THB","Honda Click 160 / ADV 160"),
  "big-buddha-culture": entry("Big Buddha & Kultur-Tour","Tempel, Big Buddha & Old Town","Kulturelle Tagestour jenseits der Strände: Wat Chalong, Big Buddha, Old Town und Museum — morgens Patong, abends zurück.","Thai-Kultur · Historische Stätten · Old Town","Start 09:00 — Sonntag ideal für Walking Street","Thepkasattri-Parkplatz in Old Town","~3 L · 150 THB","Honda Click 160"),
  "hidden-phuket": entry("Hidden Phuket Route","6 Geheimtipps abseits der Massen","Black Rock, Ao Sane, Sirinat und Soi Dog — Stopps ohne Touristenbusse. GPS auf engen Dorfstraßen nutzen.","Unbekannte Orte · Ruhige Strände","Start 08:00","Offizielle Parkplätze Sirinat & Mai Khao","~5 L · 250 THB","Honda ADV 160"),
  "north-phuket-explorer": entry("Nord-Phuket Explorer","Bang Tao bis Sarasin-Brücke","Ruhigere Nordküste: Resort-Strände, Mai Khao und Sarasin-Brücke — morgens und abends Patong.","Nord-Phuket · Weniger Verkehr","Start 08:30","Kostenlose Motorradparkplätze bei Resorts","~6 L · 300 THB","Honda Click 160 / Forza 350"),
  "phuket-old-town-cafe": entry("Old Town & Café-Tour","Cafés, Instagram-Spots & Nachtmarkt","Kurze Scooter-Tour durch Thalang Road, Soi Romanee, Chillva Market und Khao Rang — ideal für Paare.","Cafés · Instagram · Chillva Market","Abfahrt 11:00 — Chillva ab 17:00","Thepkasattri oder Robinson Old Town","~2 L · 100 THB","Honda Click 160"),
  "family-friendly-route": entry("Familienfreundliche Route","Aquarium, Strände & kurze Etappen","Entspannte Tour mit kurzen Fahrten, Aquarium und sicheren Stränden. Mittags Schatten bevorzugen.","Familienfreundlich · Kurze Fahrten · Aquarium","Start 09:00 — Aquarium ab 08:30","Motorradparkplätze vorhanden","~3 L · 150 THB","Honda Click 160 / Forza 350"),
  "phuket-night-ride": entry("Phuket Night Ride","Old Town bis Bangla — Abendtour","Old Town bei Nacht, Bangla Road und Kalim-Blick auf Patong — kurze Strecke, große Atmosphäre.","Nachtfotos · Nachtleben · Kalim","Abfahrt 16:00–17:00 — bis ~22:00","Kostenpflichtige Parkplätze Bangla","~2 L · 100 THB","Honda Click 160"),
  "luxury-phuket-route": entry("Luxury Phuket Route","Beach Clubs & Premium-Dining","Boat Avenue, Catch Beach Club, Surin und Café Del Mar — Phukets luxuriöse Seite per Scooter.","Luxus Beach Clubs · Premium-Restaurants","Abfahrt 11:00 — Clubs 12:00–18:00","Valet oder kostenlose Parkplätze","~4 L · 200 THB + Club","Honda Forza 350 / ADV 160"),
  "airport-plane-spotting": entry("Flughafen Plane Spotting","Mai Khao Landebahn & Sarasin-Brücke","Nai Yang bis Mai Khao Plane Spotting, dann Sarasin-Brücke — für Aviation-Fans.","Flugzeugfotos · Nord-Phuket","Start 08:00 — Nachmittag viel Landeverkehr","Kostenloser Parkplatz Mai Khao","~5 L · 250 THB","Honda Click 160 / ADV 160"),
  "khao-sok-adventure": entry("Khao Sok 2-Tage-Abenteuer","Dschungel-Bungalow + Cheow Lan See","Zweitägige Miete ab Patong: Regenwald Khao Sok und Cheow Lan. Eine Nacht Bungalow oder Floating Raft.","Khao Sok, Cheow Lan, Bungalow, Regenwald","Nov–Apr; Vorsicht bei Regen","Kostenlos Park & Staudamm","~12 L · 520 THB","Honda ADV 350 / Forza 350"),
  "krabi-highlights": entry("Krabi Highlights 2 Tage","Tiger Cave, Emerald Pool, Ao Nang","Phuket nach Krabi per Scooter: Tiger Cave, Emerald Pool, Sonnenuntergang Ao Nang — ideal mit Mehr-Tages-Miete ab Patong.","Tiger Cave, Emerald Pool, Hot Springs, Ao Nang","Nov–Apr; früh starten","Kostenlos Nationalpark & Hotels","~14 L · 600 THB","Honda ADV 160 / Forza 350"),
  "phang-nga-bay-explorer": entry("Phang Nga Bucht 2 Tage","Samet Nangshe, James Bond, Affenhöhle","Sonnenaufgang Samet Nangshe, James Bond Bootstour, Affenhöhle — wenig Fahren, viel Landschaft.","Samet Nangshe, James Bond, Affenhöhle, Koh Panyee","Freitag oder Wochenende; Trockenzeit","Hotel- & Surakul-Anlegestelle","~10 L · 430 THB + Boot","Honda ADV 160"),
  "andaman-coast-discovery": entry("Andaman-Küste Entdeckung 2 Tage","Khao Lak, Similan-Tor & Nordstrände","Ruhige Nord-Andaman-Küste: Khao Lak, Tsunami-Denkmal, Thap Lamu — Basis für Similan.","Khao Lak, Bang Niang, Thap Lamu, nahe Khao Sok","Nov–Apr (Similan-Saison)","Kostenlos Hotel & Pier","~12 L · 520 THB","Honda ADV 160 / Forza 350"),
  "samet-nangshe-sunrise": entry("Samet Nangshe Sonnenaufgang 2 Tage","Übernachtung mit Buchtblick","Eine Nacht Samet Nangshe, Sonnenaufgang 05:30 — perfektes Wochenende ab Patong.","Samet Nangshe, Sonnenaufgang, Phang Nga","Freitagabend oder Samstag","Kostenlos Hotel","~8 L · 350 THB","Honda ADV 160"),
  "khao-lak-coastal": entry("Khao Lak Küstentour 2 Tage","Strände, Wasserfälle & ruhiger Norden","Khao Lak Strände und Lam Ru Wasserfälle in zwei entspannten Tagen.","Khao Lak, Lam Ru, Bang Niang, Sirinat","Nov–Apr; werktags ruhiger","Kostenlos Strand & Park","~8 L · 350 THB","Honda ADV 160"),
  "khao-sok-krabi-adventure": entry("Khao Sok + Krabi 3 Tage","Dschungel, See & Krabi-Strände","Khao Sok und Krabi in drei Tagen — perfekte Mehr-Tages-Miete ab Patong.","Khao Sok, Cheow Lan, Tiger Cave, Emerald Pool, Ao Nang","Nov–Apr; Waldstraßen bei Regen","Park, Staudamm, Hotels","~20 L · 880 THB","Honda ADV 350 / Forza 350"),
  "andaman-coast-explorer-3d": entry("Andaman-Küste 3 Tage","Phang Nga, Khao Lak & Krabi","Volle Andaman-Küste in drei Tagen — ausgewogenes Tempo, verschiedene Übernachtungen.","Phang Nga, Khao Lak, Krabi, James Bond, Ao Nang","Nov–Apr","Hotel & Pier","~18 L · 790 THB","Honda ADV 160 / Forza 350"),
  "phang-nga-khao-sok-discovery": entry("Phang Nga + Khao Sok 3 Tage","Bootstouren & Regenwald","Bucht-Bootstouren und Khao Sok Regenwald in drei Tagen ab Patong.","Samet Nangshe, James Bond, Khao Sok, Cheow Lan","Nov–Apr; Trockenzeit für Wald","Pier, Park, Hotels","~16 L · 700 THB + Boot","Honda ADV 350 / Forza 350"),
  "krabi-ultimate-explorer": entry("Krabi Ultimate 3 Tage","Alle Krabi-Highlights","Tiger Cave, Emerald Pool, Hot Springs, Railay — Longtail von Ao Nang.","Tiger Cave, Emerald Pool, Hot Springs, Railay, Ao Nang","Nov–Apr","Ao Nang Parkplatz; Longtail Railay","~16 L · 700 THB + Boot","Honda ADV 160 / Forza 350"),
  "ultimate-south-adventure": entry("Ultimate Süd 3 Tage","Phang Nga, Khao Sok & Krabi","Drei Top-Regionen in drei Tagen per Scooter ab Patong — intensiv und lohnend.","Phang Nga, Khao Sok, Cheow Lan, Krabi, Emerald Pool","Nov–Apr; fitte Fahrer","Parkplätze überall","~22 L · 970 THB","Honda ADV 350 / Forza 350"),
  "ultimate-phuket-loop": entry("Ultimate Phuket 4 Tage","Ganz Phuket: Strände, Kultur, Aussicht","Phuket in vier Tagen end-to-end — Mehr-Tages-Miete ab Patong.","Big Buddha, Old Town, Kata, Promthep, Bang Tao, Sirinat","Nov–Apr; früh starten","Kostenlos Strand & Tempel","~22 L · 970 THB","Honda ADV 160 / Forza 350"),
  "andaman-coast-grand-tour": entry("Andaman Grand Tour 4 Tage","Volle Küste Phang Nga bis Krabi","Vier Tage gesamte Andaman-Küste ab Patong — umfassende Südtour.","Phang Nga, James Bond, Khao Lak, Krabi, Emerald Pool","Nov–Apr","Hotel & Park","~28 L · 1230 THB","Honda ADV 350 / Forza 350"),
  "khao-sok-gulf-coast": entry("Khao Sok + Küste 4 Tage","Regenwald, See & Andaman","Khao Sok mit Andaman-Küste verbinden — Cheow Lan, Khao Lak, Phang Nga.","Khao Sok, Cheow Lan, Khao Lak, Phang Nga, James Bond","Nov–Apr; Trockenzeit Wald","Park, Staudamm, Hotels","~30 L · 1320 THB","Honda ADV 350 / Forza 350"),
  "southern-thailand-discovery": entry("Südthailand Entdeckung 4 Tage","Krabi, Lanta-Fähre & Phang Nga","Krabi, Koh-Lanta-Fähre und Phang Nga — Insel und Küste kombiniert.","Krabi, Emerald Pool, Railay, Lanta-Fähre, Phang Nga","Nov–Apr","Fährterminal Parkplatz","~26 L · 1140 THB + Fähre","Honda ADV 350 / Forza 350"),
  "southern-thailand-grand-tour": entry("Südthailand Grand Tour 5 Tage","Phang Nga, Khao Sok, Krabi & Lanta","Fünf Tage beste Stopps — entspanntes Tempo, verschiedene Übernachtungen ab Patong.","Phang Nga, Khao Sok, Cheow Lan, Krabi, Lanta","Nov–Apr","Parkplätze überall","~35 L · 1540 THB","Honda ADV 350 / Forza 350"),
  "andaman-coast-complete": entry("Andaman Komplett 5 Tage","Volles Programm Bucht bis Krabi","Jede Ecke der Andaman-Küste in fünf Tagen — Bootstouren und Strände.","James Bond, Khao Lak, Similan-Tor, Krabi, Railay","Nov–Apr","Hotel & Pier","~40 L · 1760 THB + Boot","Honda ADV 350 / Forza 350"),
  "khao-sok-gulf-expedition": entry("Khao Sok Expedition 5 Tage","Wald, See & volle Andaman","Zwei Nächte Wald, drei Küste — Expedition für Naturliebhaber.","Khao Sok, Cheow Lan, Ton Prai, Khao Lak, Phang Nga","Nov–Apr; Wald bei Regen riskant","Park & Hotels","~42 L · 1850 THB","Honda ADV 350 / Forza 350"),
  "luxury-south-thailand": entry("Luxus Südthailand 5 Tage","Premium-Unterkünfte & kuratierte Stopps","Fünf Tage Luxus und handverlesene Stopps ab Patong — Resort-Pausen inklusive.","Bang Tao, Sirinat, Khao Lak Resort, Krabi, Ao Nang","Nov–Apr; werktags ruhiger","Resort-Valet","~30 L · 1320 THB","Honda Forza 350"),
  "phuket-to-satun": entry("Phuket nach Satun 5 Tage","Langstrecke zur Südgrenze","Fünf Tage bis zur Südgrenze und zurück via Krabi, Trang, Satun — Langstrecken-Abenteuer.","Krabi, Lanta, Trang, Satun, Emerald Pool","Nov–Apr; lange Tagesetappen","Hotels & Tankstellen","~38 L · 1670 THB","Honda ADV 350 / Forza 350"),
  "ultimate-andaman-tour": entry("Ultimate Andaman 7 Tage","Komplette Andaman-Küste","Sieben Tage volle Andaman-Küste — umfassendstes Programm ab Patong.","Phang Nga, Khao Sok, Cheow Lan, Khao Lak, Krabi, Lanta, Railay","Nov–Apr","Parkplätze überall","~50 L · 2200 THB","Honda ADV 350 / Forza 350"),
  "southern-thailand-loop-7d": entry("Südthailand Loop 7 Tage","Volle Südschleife","Sieben-Tage-Rundfahrt — Küste, Regenwald, Binnenland für erfahrene Fahrer.","Khao Lak, Krabi, Trang, Phang Nga, Khao Sok","Nov–Apr; erfahrene Fahrer","Hotel","~48 L · 2110 THB","Honda ADV 350 / Forza 350"),
  "koh-samui-adventure": entry("Koh Samui Abenteuer 7 Tage","Festland + Fähre nach Samui","Patong bis Surat Thani, Fähre Koh Samui — einzigartige Insel-Festland-Kombination.","Surat Thani, Koh Samui, Khao Sok, Krabi, Chumphon","Nov–Apr; Fährzeiten prüfen","Fährterminal; Scooter auf Samui","~42 L · 1850 THB + Fähre","Honda ADV 350 / Forza 350"),
  "deep-south-explorer": entry("Tiefes Süden Explorer 10 Tage","Satun, Trang & Far South","Zehn Tage epische Fahrt nach Satun, Trang, Hat Yai — für erfahrene Fahrer.","Krabi, Lanta, Trang, Satun, Hat Yai, Emerald Pool","Nov–Apr; 200+ km/Tag","Stadthotels & Tankstellen","~75 L · 3300 THB","Honda ADV 350 / Forza 350"),
  "south-thailand-expedition": entry("Südthailand Expedition 10 Tage","Epische Südtour inkl. Deep South","Umfassendste Zehn-Tage-Expedition — Reisehinweise prüfen, keine Nachtfahrten.","Khao Sok, Krabi, Satun, Hat Yai, Koh Samui, Phang Nga","Nov–Apr; Sicherheit Deep South","Fährterminals & Hotels","~100 L · 4400 THB + Fähre","Honda ADV 350 / Forza 350"),
  "ranong-hot-springs": entry("Ranong Thermalquellen 3 Tage","Raksawarin & ruhige Nordküste","Drei Tage ab Patong zu Ranongs heißen Quellen — Raksawarin und Porn Rang.","Raksawarin, Porn Rang, Ranong, Phang Nga","Nov–Apr; Abends in Quellen ideal","Parkplatz Quellen & Hotels","~18 L · 790 THB","Honda ADV 350 / Forza 350"),
  "luxury-coastal-escape": entry("Luxus Küstenflucht 4 Tage","Premium-Resorts & Andaman","Vier Tage Luxus ab Patong — Khao Lak Resorts, Bang Tao, Surin Beach Clubs.","Khao Lak Resort, Bang Tao, Surin","Nov–Apr; werktags ruhiger","Resort-Valet","~22 L · 970 THB","Honda Forza 350"),
  "southern-nature-loop": entry("Süd-Natur-Loop 5 Tage","Regenwald, Wasserfälle & Parks","Fünf Tage Natur ab Patong — Khao Sok, Lam Ru, Emerald Pool.","Khao Sok, Cheow Lan, Lam Ru, Emerald Pool","Nov–Apr; Wald bei Regen","Kostenlos Park & Hotels","~32 L · 1410 THB","Honda ADV 350 / Forza 350"),
  "ranong-scenic-ride": entry("Ranong Panorama 2 Tage","Kurze Strecke, große Aussicht","Zwei Tage Panoramafahrt nach Ranong — Phang Nga und Küstenstraße.","Phang Nga, Ranong Strände, Küstenstraße","Nov–Apr; früh starten","Kostenlos Viewpoints","~12 L · 530 THB","Honda ADV 160 / Forza 350"),
  "krabi-trang-explorer": entry("Krabi + Trang Explorer 4 Tage","Zwei Provinzen, ein Scooter","Vier Tage Krabi und Trang — Emerald Pool, Pak Meng, unberührte Küste.","Krabi, Trang, Emerald Pool, Pak Meng","Nov–Apr","Hotel & Strand","~26 L · 1140 THB","Honda ADV 350 / Forza 350"),
  "ranong-andaman-adventure": entry("Ranong Andaman Abenteuer 5 Tage","Thermalquellen, Inseln & Nord-Andaman","Fünf Tage Ranong und Nord-Andaman — heiße Quellen, Koh Phayam, Khao Lak.","Ranong Quellen, Koh Phayam, Khao Lak, Phang Nga","Nov–Apr; Fähren prüfen","Fährterminal & Hotels","~34 L · 1490 THB + Fähre","Honda ADV 350 / Forza 350"),
  "koh-lanta-explorer": entry("Koh Lanta Explorer 3 Tage","Fähre + Inselstrände","Drei Tage Koh Lanta ab Patong — Fähre, Long Beach, Mu Ko Lanta.","Koh Lanta Fähre, Long Beach, Mu Ko Lanta, Krabi","Nov–Apr; Morgenfähren","Fährterminal; Scooter auf Lanta","~16 L · 700 THB + Fähre","Honda ADV 160 / Forza 350"),
  "twin-coast-tour": entry("Zwei-Küsten-Tour 7 Tage","Andaman + Golf von Thailand","Sieben Tage zwei Meere — Andaman und Golfküste ab Patong.","Andaman, Golf von Thailand, Khao Sok, Surat Thani, Chumphon","Nov–Apr; erfahrene Fahrer","Fährterminals & Hotels","~48 L · 2110 THB + Fähre","Honda ADV 350 / Forza 350"),
};

const fr = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_catalog-i18n-fr-only.json"), "utf8"),
).fr;
const rest = { fr, ar, th, zh };

let content = fs.readFileSync(TARGET, "utf8").trimEnd();
if (!content.endsWith("};")) throw new Error("Unexpected file ending");
content += "\n\n" + formatLang("de", de, IDS);
for (const code of ["fr", "ar", "th", "zh"]) {
  content += "\n\n" + formatLang(code, rest[code], IDS);
}
// Note: de defined above; fr/ar/th/zh from imports
content += "\n\nexport const CATALOG_I18N = { en, de, fr, ar, th, zh };\n";

fs.writeFileSync(TARGET, content, "utf8");
console.log("✓ Appended de, fr, ar, th, zh + CATALOG_I18N export");
for (const code of ["de", "fr", "ar", "th", "zh"]) {
  console.log(`  ${code}: ${Object.keys(code === "de" ? de : rest[code]).length} routes`);
}
