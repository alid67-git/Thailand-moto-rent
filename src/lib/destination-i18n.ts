import type { TranslationKey } from "@/i18n/translate";

/** slug → destinations.i18n.ts anahtarı */
export const DESTINATION_I18N_KEYS: Record<string, string> = {
  "big-buddha": "bigBuddha",
  "promthep-cape": "promthep",
  "windmill-viewpoint": "windmillViewpoint",
  "karon-viewpoint": "karonViewpoint",
  "nai-harn-beach": "naiHarn",
  "kata-beach": "kataBeach",
  "kamala-beach": "kamalaBeach",
  "patong-beach": "patongSign",
  "bang-tao-beach": "bangTao",
  "surin-beach": "surinBeach",
  "rawai-beach": "rawai",
  "old-phuket-town": "oldTown",
  "wat-chalong": "chalong",
  "monkey-hill": "monkeyHill",
  "freedom-beach": "freedomBeach",
  "banana-beach": "bananaBeach",
  "paradise-beach": "paradiseBeach",
  "samet-nangshe": "sametNangshe",
  "phang-nga-bay": "phangNga",
  "james-bond-island": "phangNga",
  "ao-nang": "aoNang",
  "railay-beach": "aoNang",
};

export function destinationNameKey(slug: string): TranslationKey | null {
  const base = DESTINATION_I18N_KEYS[slug];
  if (!base) return null;
  return `destinations.${base}.name` as TranslationKey;
}

export function destinationDescKey(slug: string): TranslationKey | null {
  const base = DESTINATION_I18N_KEYS[slug];
  if (!base) return null;
  return `destinations.${base}.description` as TranslationKey;
}
