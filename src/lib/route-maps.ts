export type WaypointAccess = "moto" | "boat";

export interface RouteWaypoint {
  name: string;
  lat: number;
  lng: number;
  access?: WaypointAccess;
}

/** Rota haritası koordinatları — sabah Patong çıkış, akşam Patong dönüş */
export const ROUTE_WAYPOINTS: Record<string, RouteWaypoint[]> = {
  "south-phuket-loop": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Chalong Pier", lat: 7.8286, lng: 98.3547 },
    { name: "Big Buddha", lat: 7.8276, lng: 98.3125 },
    { name: "Kata Viewpoint", lat: 7.812, lng: 98.299 },
    { name: "Nai Harn Beach", lat: 7.7703, lng: 98.3034 },
    { name: "Windmill Viewpoint", lat: 7.7667, lng: 98.3083 },
    { name: "Promthep Cape", lat: 7.7624, lng: 98.3056 },
    { name: "Rawai Seafood Market", lat: 7.76, lng: 98.325 },
    { name: "Karon Viewpoint", lat: 7.8056, lng: 98.2983 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "phuket-viewpoints-loop": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Monkey Hill", lat: 7.8844, lng: 98.395 },
    { name: "Khao Rang", lat: 7.895, lng: 98.395 },
    { name: "Radar Hill", lat: 7.885, lng: 98.39 },
    { name: "Karon Viewpoint", lat: 7.8056, lng: 98.2983 },
    { name: "Windmill Viewpoint", lat: 7.7667, lng: 98.3083 },
    { name: "Promthep Cape", lat: 7.7624, lng: 98.3056 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "phuket-beach-hopping": [
    { name: "Patong Beach", lat: 7.8961, lng: 98.2953 },
    { name: "Freedom Beach", lat: 7.885, lng: 98.277, access: "boat" },
    { name: "Karon Beach", lat: 7.8455, lng: 98.2927 },
    { name: "Kata Beach", lat: 7.8206, lng: 98.2983 },
    { name: "Kata Noi Beach", lat: 7.814, lng: 98.298 },
    { name: "Nai Harn Beach", lat: 7.7703, lng: 98.3034 },
    { name: "Rawai Beach", lat: 7.76, lng: 98.325 },
    { name: "Ya Nui Beach", lat: 7.772, lng: 98.308 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "phuket-sunset-route": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phuket Old Town", lat: 7.8844, lng: 98.3883 },
    { name: "Karon Viewpoint", lat: 7.8056, lng: 98.2983 },
    { name: "Windmill Viewpoint", lat: 7.7667, lng: 98.3083 },
    { name: "Ya Nui Beach", lat: 7.772, lng: 98.308 },
    { name: "Promthep Cape", lat: 7.7624, lng: 98.3056 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "big-buddha-culture": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Wat Chalong", lat: 7.8467, lng: 98.335 },
    { name: "Big Buddha", lat: 7.8276, lng: 98.3125 },
    { name: "Phuket Old Town", lat: 7.8844, lng: 98.3883 },
    { name: "Thai Hua Museum", lat: 7.886, lng: 98.392 },
    { name: "Sunday Walking Street", lat: 7.8844, lng: 98.3883 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "hidden-phuket": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Black Rock Viewpoint", lat: 7.988, lng: 98.28 },
    { name: "Ao Sane Beach", lat: 7.805, lng: 98.415 },
    { name: "Laem Ka Beach", lat: 7.789, lng: 98.335 },
    { name: "Sirinat National Park", lat: 8.095, lng: 98.298 },
    { name: "Mai Khao Beach", lat: 8.095, lng: 98.298 },
    { name: "Soi Dog Foundation", lat: 7.898, lng: 98.345 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "north-phuket-explorer": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Bang Tao Beach", lat: 7.9778, lng: 98.28 },
    { name: "Surin Beach", lat: 7.9753, lng: 98.2792 },
    { name: "Kamala Beach", lat: 7.9547, lng: 98.2819 },
    { name: "Mai Khao Beach", lat: 8.095, lng: 98.298 },
    { name: "Splash Beach", lat: 8.085, lng: 98.275 },
    { name: "Sarasin Bridge", lat: 8.265, lng: 98.342 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "phuket-old-town-cafe": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phuket Old Town", lat: 7.8844, lng: 98.3883 },
    { name: "Thalang Road", lat: 7.8844, lng: 98.3883 },
    { name: "Soi Romanee", lat: 7.884, lng: 98.389 },
    { name: "Chillva Market", lat: 7.884, lng: 98.395 },
    { name: "Central Phuket", lat: 7.891, lng: 98.368 },
    { name: "Khao Rang", lat: 7.895, lng: 98.395 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "family-friendly-route": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phuket Aquarium", lat: 7.821, lng: 98.396 },
    { name: "Rawai Beach", lat: 7.76, lng: 98.325 },
    { name: "Nai Harn Beach", lat: 7.7703, lng: 98.3034 },
    { name: "Windmill Viewpoint", lat: 7.7667, lng: 98.3083 },
    { name: "Karon Viewpoint", lat: 7.8056, lng: 98.2983 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "phuket-night-ride": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phuket Old Town", lat: 7.8844, lng: 98.3883 },
    { name: "Patong Beach", lat: 7.8961, lng: 98.2953 },
    { name: "Bangla Road", lat: 7.896, lng: 98.298 },
    { name: "Kalim Viewpoint", lat: 7.905, lng: 98.285 },
    { name: "Kamala Beach", lat: 7.9547, lng: 98.2819 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "luxury-phuket-route": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Boat Avenue", lat: 7.985, lng: 98.285 },
    { name: "Laguna Phuket", lat: 7.9778, lng: 98.28 },
    { name: "Bang Tao Beach", lat: 7.9778, lng: 98.28 },
    { name: "Catch Beach Club", lat: 7.98, lng: 98.278 },
    { name: "Surin Beach", lat: 7.9753, lng: 98.2792 },
    { name: "Café Del Mar", lat: 7.976, lng: 98.279 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "airport-plane-spotting": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Nai Yang Beach", lat: 8.096, lng: 98.297 },
    { name: "Mai Khao Beach", lat: 8.095, lng: 98.298 },
    { name: "Airport Viewpoint", lat: 8.095, lng: 98.298 },
    { name: "Sarasin Bridge", lat: 8.265, lng: 98.342 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
};

export function getRouteWaypoints(routeId: string): RouteWaypoint[] {
  return ROUTE_WAYPOINTS[routeId] ?? [];
}

export function getMotoWaypoints(waypoints: RouteWaypoint[]): RouteWaypoint[] {
  return waypoints.filter((w) => w.access !== "boat");
}
