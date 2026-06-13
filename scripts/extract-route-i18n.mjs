/**
 * Extract route legs & stops from multi-route-catalog.ts and day-routes.ts
 * Run: node scripts/extract-route-i18n.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("src/lib");

function unescape(s) {
  return s.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, "\n");
}

function parseStringArray(inner) {
  const items = [];
  const re = /"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = re.exec(inner))) items.push(unescape(m[1]));
  return items;
}

function parseLegBlock(block) {
  const day = Number(block.match(/leg\s*\(\s*(\d+)/)?.[1] ?? 0);
  const title = unescape(block.match(/leg\s*\(\s*\d+\s*,\s*"((?:\\.|[^"\\])*)"/)?.[1] ?? "");
  const desc = unescape(block.match(/leg\s*\(\s*\d+\s*,\s*"[^"]*"\s*,\s*"((?:\\.|[^"\\])*)"/)?.[1] ?? "");
  const placesMatch = block.match(/,\s*\[([\s\S]*?)\]\s*,\s*\[/);
  const places = placesMatch ? parseStringArray(placesMatch[1]) : [];
  const stay = block.match(/,\s*"((?:\\.|[^"\\])*)"\s*\)\s*,?\s*$/m)?.[1];
  return { day, title, description: desc, places, stay: stay || undefined };
}

function parseStopCall(call) {
  const name = unescape(call.match(/s\s*\(\s*"((?:\\.|[^"\\])*)"/)?.[1] ?? "");
  const desc = unescape(call.match(/s\s*\(\s*"[^"]*"\s*,\s*"((?:\\.|[^"\\])*)"/)?.[1] ?? "");
  const slug = call.match(/destinationSlug:\s*"([^"]+)"/)?.[1];
  const tips = call.match(/tips:\s*"((?:\\.|[^"\\])*)"/)?.[1];
  return { name, description: desc, destinationSlug: slug, tips: tips ? unescape(tips) : undefined };
}

function extractMultiRoutes(content) {
  const routes = [];
  const idRe = /id:\s*"([^"]+)"/g;
  const ids = [...content.matchAll(idRe)].map((m) => m[1]);

  for (const id of ids) {
    const blockRe = new RegExp(
      `id:\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?legs:\\s*\\[([\\s\\S]*?)\\]\\s*,\\s*\\}`,
    );
    const block = content.match(blockRe);
    if (!block) continue;

    const legsSection = block[1];
    const legBlocks = legsSection.split(/\),\s*\n\s*leg\(/).map((part, i) => (i === 0 ? part : "leg(" + part));

    const legs = [];
    const stops = {};
    let order = 1;

    for (const lb of legBlocks) {
      const leg = parseLegBlock(lb);
      legs.push(leg);

      const stopsMatch = lb.match(/\[\s*([\s\S]*)\]\s*(?:,\s*"[^"]*"\s*)?\)\s*,?\s*$/);
      if (!stopsMatch) continue;

      const stopCalls = stopsMatch[1].split(/\),\s*\n\s*(?=s\(|patong)/);
      for (const sc of stopCalls) {
        let call = sc.trim();
        if (call.startsWith("patongStart()")) {
          call = 's("Patong — Çıkış", "Beach Roundabout\'tan tur başlangıcı.", 0, 0, 15, { destinationSlug: "patong-beach" })';
        } else if (call.startsWith("patongReturn")) {
          call = 's("Patong — Dönüş", "Tur sonu Beach Roundabout\'a varış.", 0, 0, 0, { destinationSlug: "patong-beach" })';
        }
        if (!call.includes("s(")) continue;
        const stop = parseStopCall(call + ")");
        if (!stop.destinationSlug) {
          stops[String(order)] = stop;
        }
        order++;
      }
    }

    routes.push({ id, legs, stops });
  }
  return routes;
}

function extractDayRouteStops(content) {
  const routes = [];
  const routeRe = /id:\s*"([^"]+)"[\s\S]*?stops:\s*\[([\s\S]*?)\]\s*,\s*safetyTips/g;
  let m;
  while ((m = routeRe.exec(content))) {
    const id = m[1];
    const stopsBlock = m[2];
    const stops = {};
    let order = 0;

    const stopRe = /buildStop\(\{([\s\S]*?)\}\)/g;
    let sm;
    while ((sm = stopRe.exec(stopsBlock))) {
      const inner = sm[1];
      const name = unescape(inner.match(/name:\s*"((?:\\.|[^"\\])*)"/)?.[1] ?? "");
      const desc = unescape(inner.match(/description:\s*\n?\s*"((?:\\.|[^"\\])*)"/)?.[1] ?? inner.match(/description:\s*"((?:\\.|[^"\\])*)"/)?.[1] ?? "");
      const slug = inner.match(/destinationSlug:\s*"([^"]+)"/)?.[1];
      const tips = inner.match(/tips:\s*"((?:\\.|[^"\\])*)"/)?.[1];
      order = Number(inner.match(/order:\s*(\d+)/)?.[1] ?? order + 1);
      if (!slug && name) {
        stops[String(order)] = {
          name,
          description: desc,
          tips: tips ? unescape(tips) : undefined,
        };
      }
    }
    if (Object.keys(stops).length) routes.push({ id, legs: [], stops });
  }
  return routes;
}

const multiContent = fs.readFileSync(path.join(ROOT, "multi-route-catalog.ts"), "utf8");
const dayContent = fs.readFileSync(path.join(ROOT, "day-routes.ts"), "utf8");

const multi = extractMultiRoutes(multiContent);
const day = extractDayRouteStops(dayContent);

const merged = {};
for (const r of [...multi, ...day]) {
  if (!merged[r.id]) merged[r.id] = { id: r.id, legs: r.legs, stops: r.stops };
  else {
    merged[r.id].legs.push(...r.legs);
    Object.assign(merged[r.id].stops, r.stops);
  }
}

const out = Object.values(merged);
const legCount = out.reduce((n, r) => n + r.legs.length, 0);
const stopCount = out.reduce((n, r) => n + Object.keys(r.stops).length, 0);

console.log(`Extracted ${out.length} routes, ${legCount} legs, ${stopCount} stops needing i18n`);

fs.writeFileSync(
  path.resolve("scripts/route-i18n-source.json"),
  JSON.stringify(out, null, 2),
  "utf8",
);
console.log("Wrote scripts/route-i18n-source.json");
