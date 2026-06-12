import type { TranslationKey } from "@/i18n/translate";

/** slug → destinations.i18n.ts anahtarı */
export const DESTINATION_I18N_KEYS: Record<string, string> = {
  "big-buddha": "bigBuddha",
  "promthep-cape": "promthep",
  "phrom-thep-cape-lighthouse": "promthep",
  "windmill-viewpoint": "windmillViewpoint",
  "karon-viewpoint": "karonViewpoint",
  "karon-beach": "karonBeach",
  "khao-rang": "khaoRang",
  "yanui-beach": "yanui",
  "mai-khao-plane-spot": "maiKhaoPlanes",
  "central-festival-phuket": "centralFestival",
  "bangla-road": "banglaRoad",
  "nai-yang-beach": "naiYang",
  "monkey-cave": "monkeyCave",
  "donsak-samui-ferry": "donsakSamuiFerry",
  "kata-beach": "kataBeach",
  "kamala-beach": "kamalaBeach",
  "patong-beach": "patongSign",
  "bang-tao-beach": "bangTao",
  "surin-beach": "surinBeach",
  "rawai-beach": "rawai",
  "nai-harn-beach": "naiHarn",
  "old-phuket-town": "oldTown",
  "wat-chalong": "chalong",
  "monkey-hill": "monkeyHill",
  "freedom-beach": "freedomBeach",
  "banana-beach": "bananaBeach",
  "paradise-beach": "paradiseBeach",
  "samet-nangshe": "sametNangshe",
  "phang-nga-bay": "phangNga",
  "james-bond-island": "phangNga",
  "khao-sok-national-park": "phangNga",
  "radar-hill-viewpoint": "nakkerdView",
  "khao-yai-viewpoint": "blackRock",
  "thalang-viewpoint": "nakkerdView",
};

export function destinationI18nBase(slug: string): string | null {
  return DESTINATION_I18N_KEYS[slug] ?? null;
}

export function destinationNameKey(slug: string): TranslationKey | null {
  const base = destinationI18nBase(slug);
  if (!base) return null;
  return `destinations.${base}.name` as TranslationKey;
}

export function destinationDescKey(slug: string): TranslationKey | null {
  const base = destinationI18nBase(slug);
  if (!base) return null;
  return `destinations.${base}.description` as TranslationKey;
}

export function destinationFieldKey(
  slug: string,
  field: "distance" | "duration" | "bestFor",
): TranslationKey | null {
  const base = destinationI18nBase(slug);
  if (!base) return null;
  return `destinations.${base}.${field}` as TranslationKey;
}
