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

const _PATONG_WP = { name: "Patong", lat: 7.8961, lng: 98.2953 };
const _PATONG_RET = { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 };

const MULTI_ROUTE_WAYPOINTS: Record<string, RouteWaypoint[]> = {
  "khao-sok-adventure": [_PATONG_WP, { name: "Takua Pa", lat: 8.867, lng: 98.343 }, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, { name: "Cheow Lan Gölü", lat: 8.972, lng: 98.805, access: "boat" }, _PATONG_RET],
  "krabi-highlights": [_PATONG_WP, { name: "Ao Nang", lat: 8.045, lng: 98.81 }, { name: "Railay", lat: 8.012, lng: 98.838, access: "boat" }, { name: "Tiger Cave", lat: 8.123, lng: 98.925 }, { name: "Emerald Pool", lat: 8.134, lng: 98.938 }, _PATONG_RET],
  "phang-nga-bay-explorer": [_PATONG_WP, { name: "Sarasin Bridge", lat: 8.265, lng: 98.342 }, { name: "Samet Nangshe", lat: 8.245, lng: 98.402 }, { name: "Maymun Mağarası", lat: 8.424, lng: 98.758 }, { name: "James Bond", lat: 8.275, lng: 98.501, access: "boat" }, _PATONG_RET],
  "andaman-coast-discovery": [_PATONG_WP, { name: "Ao Nang", lat: 8.045, lng: 98.81 }, { name: "Railay", lat: 8.012, lng: 98.838, access: "boat" }, { name: "Phang Nga Bay", lat: 8.25, lng: 98.5 }, { name: "Samet Nangshe", lat: 8.245, lng: 98.402 }, _PATONG_RET],
  "samet-nangshe-sunrise": [_PATONG_WP, { name: "Bang Rong", lat: 8.075, lng: 98.42 }, { name: "Samet Nangshe", lat: 8.245, lng: 98.402 }, { name: "Phang Nga Bay", lat: 8.25, lng: 98.5, access: "boat" }, _PATONG_RET],
  "khao-lak-coastal": [_PATONG_WP, { name: "Mai Khao", lat: 8.095, lng: 98.298 }, { name: "Khao Lak", lat: 8.67, lng: 98.25 }, { name: "Lam Ru Park", lat: 8.64, lng: 98.28 }, _PATONG_RET],
  "khao-sok-krabi-adventure": [_PATONG_WP, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, { name: "Cheow Lan", lat: 8.972, lng: 98.805 }, { name: "Krabi / Ao Nang", lat: 8.045, lng: 98.81 }, { name: "Tiger Cave", lat: 8.123, lng: 98.925 }, _PATONG_RET],
  "andaman-coast-explorer-3d": [_PATONG_WP, { name: "Khao Lak", lat: 8.67, lng: 98.25 }, { name: "Krabi", lat: 8.086, lng: 98.906 }, { name: "Railay", lat: 8.012, lng: 98.838, access: "boat" }, _PATONG_RET],
  "phang-nga-khao-sok-discovery": [_PATONG_WP, { name: "Samet Nangshe", lat: 8.245, lng: 98.402 }, { name: "Phang Nga", lat: 8.451, lng: 98.53 }, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, _PATONG_RET],
  "krabi-ultimate-explorer": [_PATONG_WP, { name: "Ao Nang", lat: 8.045, lng: 98.81 }, { name: "Railay", lat: 8.012, lng: 98.838, access: "boat" }, { name: "Emerald Pool", lat: 8.134, lng: 98.938 }, { name: "Hot Springs", lat: 7.905, lng: 99.107 }, _PATONG_RET],
  "ultimate-south-adventure": [_PATONG_WP, { name: "Krabi", lat: 8.086, lng: 98.906 }, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, { name: "Samet Nangshe", lat: 8.245, lng: 98.402 }, _PATONG_RET],
  "ultimate-phuket-loop": [_PATONG_WP, { name: "Samet Nangshe", lat: 8.245, lng: 98.402 }, { name: "Phang Nga", lat: 8.451, lng: 98.53 }, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, { name: "Krabi", lat: 8.086, lng: 98.906 }, _PATONG_RET],
  "andaman-coast-grand-tour": [_PATONG_WP, { name: "Khao Lak", lat: 8.67, lng: 98.25 }, { name: "Krabi", lat: 8.086, lng: 98.906 }, { name: "Trang", lat: 7.556, lng: 99.611 }, { name: "Phang Nga", lat: 8.451, lng: 98.53 }, _PATONG_RET],
  "khao-sok-gulf-coast": [_PATONG_WP, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, { name: "Surat Thani", lat: 9.138, lng: 99.333 }, { name: "Khanom", lat: 9.183, lng: 99.867 }, _PATONG_RET],
  "southern-thailand-discovery": [_PATONG_WP, { name: "Phang Nga", lat: 8.451, lng: 98.53 }, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, { name: "Khanom", lat: 9.183, lng: 99.867 }, _PATONG_RET],
  "southern-thailand-grand-tour": [_PATONG_WP, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, { name: "Krabi", lat: 8.086, lng: 98.906 }, { name: "Trang", lat: 7.556, lng: 99.611 }, { name: "Phang Nga", lat: 8.451, lng: 98.53 }, _PATONG_RET],
  "andaman-coast-complete": [_PATONG_WP, { name: "Khao Lak", lat: 8.67, lng: 98.25 }, { name: "Krabi", lat: 8.086, lng: 98.906 }, { name: "Trang", lat: 7.556, lng: 99.611 }, { name: "Satun", lat: 6.623, lng: 100.067 }, _PATONG_RET],
  "khao-sok-gulf-expedition": [_PATONG_WP, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, { name: "Surat Thani", lat: 9.138, lng: 99.333 }, { name: "Khanom", lat: 9.183, lng: 99.867 }, { name: "Chumphon", lat: 10.493, lng: 99.18 }, _PATONG_RET],
  "luxury-south-thailand": [_PATONG_WP, { name: "Khao Lak", lat: 8.67, lng: 98.25 }, { name: "Krabi", lat: 8.086, lng: 98.906 }, { name: "Koh Lanta", lat: 7.565, lng: 99.042, access: "boat" }, _PATONG_RET],
  "phuket-to-satun": [_PATONG_WP, { name: "Krabi", lat: 8.086, lng: 98.906 }, { name: "Trang", lat: 7.556, lng: 99.611 }, { name: "Satun", lat: 6.623, lng: 100.067 }, _PATONG_RET],
  "ultimate-andaman-tour": [_PATONG_WP, { name: "Krabi", lat: 8.086, lng: 98.906 }, { name: "Koh Lanta", lat: 7.565, lng: 99.042 }, { name: "Trang", lat: 7.556, lng: 99.611 }, { name: "Satun", lat: 6.623, lng: 100.067 }, _PATONG_RET],
  "southern-thailand-loop-7d": [_PATONG_WP, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, { name: "Surat Thani", lat: 9.138, lng: 99.333 }, { name: "Khanom", lat: 9.183, lng: 99.867 }, { name: "Chumphon", lat: 10.493, lng: 99.18 }, { name: "Ranong", lat: 9.965, lng: 98.635 }, _PATONG_RET],
  "koh-samui-adventure": [_PATONG_WP, { name: "Khao Sok", lat: 8.912, lng: 98.526 }, { name: "Donsak Feribot", lat: 9.317, lng: 99.731 }, { name: "Koh Samui", lat: 9.512, lng: 100.013, access: "boat" }, _PATONG_RET],
  "deep-south-explorer": [_PATONG_WP, { name: "Krabi", lat: 8.086, lng: 98.906 }, { name: "Trang", lat: 7.556, lng: 99.611 }, { name: "Hat Yai", lat: 7.008, lng: 100.475 }, { name: "Nakhon Si Thammarat", lat: 8.432, lng: 99.963 }, _PATONG_RET],
  "south-thailand-expedition": [_PATONG_WP, { name: "Krabi", lat: 8.086, lng: 98.906 }, { name: "Hat Yai", lat: 7.008, lng: 100.475 }, { name: "Songkhla", lat: 7.198, lng: 100.595 }, { name: "Surat Thani", lat: 9.138, lng: 99.333 }, _PATONG_RET],
};

export function getRouteWaypoints(routeId: string): RouteWaypoint[] {
  return ROUTE_WAYPOINTS[routeId] ?? MULTI_ROUTE_WAYPOINTS[routeId] ?? [];
}

export function getMotoWaypoints(waypoints: RouteWaypoint[]): RouteWaypoint[] {
  return waypoints.filter((w) => w.access !== "boat");
}
