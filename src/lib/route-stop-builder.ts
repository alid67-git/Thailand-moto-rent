import { getDestinationCoordinates } from "@/lib/destination-coordinates";
import { getDestinationImageSet } from "@/lib/destination-images";
import { DESTINATION_SPOTS } from "@/lib/destinations";
import type { RouteStop } from "@/lib/routes-types";

type StopInput = {
  order: number;
  name: string;
  description: string;
  driveKm: number;
  driveMin: number;
  visitMin: number;
  destinationSlug?: string;
  lat?: number;
  lng?: number;
  access?: RouteStop["access"];
  tips?: string;
};

export function buildStop(input: StopInput): RouteStop {
  const coords = input.destinationSlug
    ? getDestinationCoordinates(input.destinationSlug)
    : null;

  return {
    ...input,
    lat: input.lat ?? coords?.lat,
    lng: input.lng ?? coords?.lng,
  };
}

export function routeHeroImage(slug: string, fallback: string): string {
  const spot = DESTINATION_SPOTS.find((s) => s.slug === slug);
  if (!spot) return fallback;
  return getDestinationImageSet(slug, spot.image, spot.images).hero;
}

export function sumStops(stops: RouteStop[]) {
  const totalDriveKm = stops.reduce((a, s) => a + s.driveKm, 0);
  const totalDriveMin = stops.reduce((a, s) => a + s.driveMin, 0);
  const totalVisitMin = stops.reduce((a, s) => a + s.visitMin, 0);
  return {
    totalDriveKm,
    totalDriveMin,
    totalVisitMin,
    totalDayMin: totalDriveMin + totalVisitMin,
  };
}

export function formatDurationFromMin(totalMin: number): string {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m} dk`;
  if (m === 0) return `${h} saat`;
  return `${h} saat ${m} dk`;
}
