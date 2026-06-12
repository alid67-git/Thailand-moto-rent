"use client";

import { getDestinationImageSet } from "@/lib/destination-images";
import type { DestinationSpot } from "@/lib/destinations";

export function useDestinationImage(spot: DestinationSpot): string {
  return getDestinationImageSet(spot.slug, spot.image, spot.images).hero;
}
