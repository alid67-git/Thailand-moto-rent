/** Rota durak adı → destinasyon slug eşlemesi */
const STOP_TO_SLUG: Record<string, string> = {
  "big buddha": "big-buddha",
  "big buddha (phuket)": "big-buddha",
  "samet nangshe": "samet-nangshe",
  "samet nangshe viewpoint": "samet-nangshe",
  "promthep cape": "promthep-cape",
  "karon viewpoint": "karon-viewpoint",
  "karon viewpoint (üç plaj)": "karon-viewpoint",
  "kata beach": "kata-beach",
  "karon beach": "karon-beach",
  "rawai beach": "rawai-beach",
  "patong beach": "patong-beach",
  "windmill viewpoint": "windmill-viewpoint",
  "wat chalong": "wat-chalong",
  "old phuket town": "old-phuket-town",
  "maymun mağarası": "monkey-cave",
  "maymun mağarası (wat suwan kuha)": "monkey-cave",
  "james bond adası": "james-bond-island",
  "james bond adası & körfez turu": "james-bond-island",
  "freedom beach": "freedom-beach",
  "bang tao beach": "bang-tao-beach",
  "surin beach": "surin-beach",
  "nai harn beach": "nai-harn-beach",
  "monkey hill": "monkey-hill",
  "monkey hill (toh sae)": "monkey-hill",
  "khao rang viewpoint": "khao-rang",
  "khao rang": "khao-rang",
  "radar hill": "radar-hill-viewpoint",
  "radar hill (khao khad)": "radar-hill-viewpoint",
  "soi dog foundation": "soi-dog-foundation",
  "wat phra thong": "bang-tao-temple",
  "wat phra thong (bang tao)": "bang-tao-temple",
  "sirinat milli parkı": "sirinat-national-park",
  "sirinat milli parkı (nai yang)": "sirinat-national-park",
  "mai khao": "mai-khao-plane-spot",
  "mai khao — uçak manzarası": "mai-khao-plane-spot",
  "tiger cave": "tiger-cave-krabi",
  "emerald pool": "emerald-pool",
  "hot springs": "hot-springs",
  "railay": "railay-beach",
  "ao nang": "ao-nang",
  "khao sok": "khao-sok-national-park",
  "khao sok köyü": "khao-sok-national-park",
  "cheow lan gölü": "cheow-lan-lake",
  "similan": "similan-islands",
  "khao lak": "khao-lak",
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

/** Durakta slug yoksa isimden çöz */
export function enrichStopSlug(name: string, destinationSlug?: string): string | undefined {
  return destinationSlug ?? resolveStopDestinationSlug(name);
}
