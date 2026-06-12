/** Rota durak adı → destinasyon slug eşlemesi */
const STOP_TO_SLUG: Record<string, string> = {
  "big buddha": "big-buddha",
  "samet nangshe": "samet-nangshe",
  "promthep cape": "promthep-cape",
  "karon viewpoint": "karon-viewpoint",
  "kata viewpoint": "karon-viewpoint",
  "kata beach": "kata-beach",
  "kata noi beach": "kata-beach",
  "karon beach": "karon-beach",
  "rawai beach": "rawai-beach",
  "rawai seafood market": "rawai-beach",
  "patong beach": "patong-beach",
  "windmill viewpoint": "windmill-viewpoint",
  "wat chalong": "wat-chalong",
  "phuket old town": "old-phuket-town",
  "old phuket town": "old-phuket-town",
  "thalang road": "old-phuket-town",
  "sunday walking street": "old-phuket-town",
  "freedom beach": "freedom-beach",
  "bang tao beach": "bang-tao-beach",
  "bang tao": "bang-tao-beach",
  "surin beach": "surin-beach",
  "kamala beach": "kamala-beach",
  "nai harn beach": "nai-harn-beach",
  "nai yang beach": "nai-yang-beach",
  "mai khao beach": "mai-khao-plane-spot",
  "airport viewpoint": "mai-khao-plane-spot",
  "monkey hill": "monkey-hill",
  "khao rang viewpoint": "khao-rang",
  "khao rang": "khao-rang",
  "radar hill": "radar-hill-viewpoint",
  "soi dog foundation": "soi-dog-foundation",
  "sirinat national park": "sirinat-national-park",
  "phuket aquarium": "phuket-aquarium",
  "bangla road": "bangla-road",
  "ya nui beach": "yanui-beach",
  "central phuket": "central-festival-phuket",
  "laguna phuket": "bang-tao-beach",
  "catch beach club": "bang-tao-beach",
  "café del mar": "surin-beach",
  "cafe del mar": "surin-beach",
};

export function resolveStopDestinationSlug(name: string, explicit?: string): string | undefined {
  if (explicit) return explicit;
  const key = name
    .toLowerCase()
    .replace(/\(.*\)/g, "")
    .replace(/—.*/g, "")
    .trim();
  if (STOP_TO_SLUG[key]) return STOP_TO_SLUG[key];
  for (const [pattern, slug] of Object.entries(STOP_TO_SLUG)) {
    if (key.includes(pattern)) return slug;
  }
  return undefined;
}

export function enrichStopSlug(name: string, destinationSlug?: string): string | undefined {
  return destinationSlug ?? resolveStopDestinationSlug(name);
}
