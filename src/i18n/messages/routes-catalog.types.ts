export type RouteCatalogEntry = {
  name: string;
  tagline: string;
  description: string;
  highlights: string;
  bestTime: string;
  parkingInfo: string;
  fuelEstimate: string;
  recommendedBike: string;
  startPoint?: string;
  elevation?: string;
  difficulty?: string;
};

export type RouteCatalog = Record<string, RouteCatalogEntry>;
