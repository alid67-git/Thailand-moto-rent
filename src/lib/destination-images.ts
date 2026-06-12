import destinationGalleries from "@/data/destination-galleries.json";
import { DESTINATION_WIKIMEDIA, PHUKET_FALLBACK_IMAGES } from "@/lib/destination-wikimedia";

const galleries = destinationGalleries as Record<string, string[]>;

/** Yerel dosya veya Wikimedia — gerçek yer fotoğrafları (Pexels son çare) */
export function getDestinationImageSet(
  slug: string,
  fallbackImage: string,
  fallbackImages: string[] = [],
): { hero: string; gallery: string[] } {
  const local = galleries[slug]?.filter(Boolean) ?? [];
  const wikimedia = DESTINATION_WIKIMEDIA[slug] ?? [];
  const pool = [...wikimedia, ...local, ...PHUKET_FALLBACK_IMAGES, fallbackImage, ...fallbackImages].filter(Boolean);

  const unique = [...new Set(pool)];
  const hero = unique[0] ?? fallbackImage;
  const gallery: string[] = [];
  for (let i = 0; i < 5; i++) {
    gallery.push(unique[i % unique.length] ?? fallbackImage);
  }
  return { hero, gallery };
}
