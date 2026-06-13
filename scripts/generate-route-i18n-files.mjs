/**
 * Generates route-legs and route-stops i18n TS files for all locales.
 * Run: node scripts/build-route-translations.mjs && node scripts/generate-route-i18n-files.mjs
 */
import fs from "fs";
import path from "path";

const LOCALES = ["tr", "en", "de", "fr", "ar", "zh", "th"];
const OUT = path.resolve("src/i18n/messages");
const source = JSON.parse(fs.readFileSync(path.resolve("scripts/route-i18n-source.json"), "utf8"));
const translations = JSON.parse(fs.readFileSync(path.resolve("scripts/route-i18n-translations.json"), "utf8"));

function tx(text, locale) {
  if (!text) return text;
  if (locale === "tr") return text;
  return translations[text]?.[locale] ?? text;
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function formatLegEntry(leg, locale) {
  const lines = [
    `      title: "${esc(tx(leg.title, locale))}",`,
    `      description: "${esc(tx(leg.description, locale))}",`,
  ];
  if (leg.places?.length) {
    lines.push(`      places: [${leg.places.map((p) => `"${esc(tx(p, locale))}"`).join(", ")}],`);
  }
  if (leg.stay) {
    lines.push(`      stayOptions: ["${esc(tx(leg.stay, locale))}"],`);
  }
  return lines.join("\n");
}

function formatStopEntry(stop, locale) {
  const lines = [
    `        name: "${esc(tx(stop.name, locale))}",`,
    `        description: "${esc(tx(stop.description, locale))}",`,
  ];
  if (stop.tips) lines.push(`        tips: "${esc(tx(stop.tips, locale))}",`);
  return lines.join("\n");
}

for (const locale of LOCALES) {
  const legsBlocks = [];
  const stopsBlocks = [];

  for (const route of source) {
    if (route.legs.length) {
      const legEntries = route.legs
        .map((leg) => `    "${leg.day}": {\n${formatLegEntry(leg, locale)}\n    }`)
        .join(",\n");
      legsBlocks.push(`  "${route.id}": {\n${legEntries}\n  }`);
    }

    const stopKeys = Object.keys(route.stops);
    if (stopKeys.length) {
      const stopEntries = stopKeys
        .map((k) => `    "${k}": {\n${formatStopEntry(route.stops[k], locale)}\n    }`)
        .join(",\n");
      stopsBlocks.push(`  "${route.id}": {\n${stopEntries}\n  }`);
    }
  }

  fs.writeFileSync(
    path.join(OUT, `route-legs.${locale}.i18n.ts`),
    `import type { RouteLegsCatalog } from "./route-legs.types";

export const routeLegs${locale.charAt(0).toUpperCase() + locale.slice(1)}: RouteLegsCatalog = {
${legsBlocks.join(",\n")}
};
`,
    "utf8",
  );

  fs.writeFileSync(
    path.join(OUT, `route-stops.${locale}.i18n.ts`),
    `import type { RouteStopsCatalog } from "./route-legs.types";

export const routeStops${locale.charAt(0).toUpperCase() + locale.slice(1)}: RouteStopsCatalog = {
${stopsBlocks.length ? stopsBlocks.join(",\n") : ""}
};
`,
    "utf8",
  );
}

console.log("Generated route-legs and route-stops for:", LOCALES.join(", "));
