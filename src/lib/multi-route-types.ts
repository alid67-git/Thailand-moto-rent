import type { SafetyTip } from "@/lib/routes-types";
import type { StopAccess } from "@/lib/routes-types";
import type { TourDays } from "@/lib/route-tours";

export interface MultiRouteStopDef {
  name: string;
  description: string;
  driveKm: number;
  driveMin: number;
  visitMin: number;
  destinationSlug?: string;
  lat?: number;
  lng?: number;
  access?: StopAccess;
  tips?: string;
}

export interface MultiRouteLegDef {
  day: number;
  title: string;
  description: string;
  places: string[];
  stay?: string;
  stops: MultiRouteStopDef[];
}

export interface MultiRouteDef {
  id: string;
  tourDays: TourDays;
  name: string;
  tagline: string;
  routeLine: string;
  totalDriveKm: number;
  driveTimeLabel: string;
  difficulty: "Kolay" | "Orta" | "Zor";
  heroSlug: string;
  description: string;
  highlights: string;
  recommendedBike: string;
  bestTime: string;
  elevation: string;
  parkingInfo: string;
  fuelEstimate: string;
  featured?: boolean;
  legs: MultiRouteLegDef[];
  safetyTips: SafetyTip[];
}
