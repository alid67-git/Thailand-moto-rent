/** Rota durak adı → destinasyon slug eşlemesi */
const STOP_TO_SLUG: Record<string, string> = {
  "big buddha": "big-buddha",
  "büyük buda": "big-buddha",
  "samet nangshe": "samet-nangshe",
  "samet nangshe viewpoint": "samet-nangshe",
  "promthep cape": "promthep-cape",
  "karon viewpoint": "karon-viewpoint",
  "kata beach": "kata-beach",
  "karon beach": "karon-beach",
  "rawai beach": "rawai-beach",
  "windmill viewpoint": "windmill-viewpoint",
  "wat chalong": "wat-chalong",
  "maymun mağarası": "monkey-cave",
  "maymun mağarası (wat suwan kuha)": "monkey-cave",
  "phang nga town": "phang-nga-bay",
  "james bond adası": "phang-nga-bay",
  "freedom beach": "freedom-beach",
  "banana beach": "banana-beach",
  "old phuket town": "old-phuket-town",
  "monkey hill": "monkey-hill",
  "mai khao": "mai-khao-plane-spot",
  "khao sok": "khao-sok-national-park",
  "khao sok köyü": "khao-sok-national-park",
};

export function resolveStopDestinationSlug(name: string, explicit?: string): string | undefined {
  if (explicit) return explicit;
  const key = name.toLowerCase().replace(/\(.*\)/g, "").trim();
  if (STOP_TO_SLUG[key]) return STOP_TO_SLUG[key];
  for (const [pattern, slug] of Object.entries(STOP_TO_SLUG)) {
    if (key.includes(pattern)) return slug;
  }
  return undefined;
}
