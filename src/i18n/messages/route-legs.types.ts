export type RouteLegEntry = {
  title: string;
  description: string;
  places?: string[];
  stayOptions?: string[];
};

export type RouteStopEntry = {
  name: string;
  description: string;
  tips?: string;
};

export type RouteLegsCatalog = Record<string, Record<string, RouteLegEntry>>;
export type RouteStopsCatalog = Record<string, Record<string, RouteStopEntry>>;
