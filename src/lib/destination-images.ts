import destinationGalleries from "@/data/destination-galleries.json";
import { DESTINATION_WIKIMEDIA } from "@/lib/destination-wikimedia";

const galleries = destinationGalleries as Record<string, string[]>;

/** Slug'a özel görseller — başka destinasyonun fotoğrafı karıştırılmaz */
export function getDestinationImageSet(
  slug: string,
  fallbackImage: string,
  fallbackImages: string[] = [],
): { hero: string; gallery: string[] } {
  const wikimedia = DESTINATION_WIKIMEDIA[slug] ?? [];
  const local = galleries[slug]?.filter(Boolean) ?? [];
  const slugSpecific = [...wikimedia, ...local];
  const unique = [...new Set(slugSpecific)];

  if (unique.length > 0) {
    const hero = unique[0];
    const gallery = Array.from({ length: 5 }, (_, i) => unique[i % unique.length]);
    return { hero, gallery };
  }

  const fallback = [fallbackImage, ...fallbackImages].filter(Boolean);
  const hero = fallback[0] ?? fallbackImage;
  const gallery = Array.from({ length: 5 }, (_, i) => fallback[i % fallback.length] ?? hero);
  return { hero, gallery };
}
