export type WaypointAccess = "moto" | "boat";

export interface RouteWaypoint {
  name: string;
  lat: number;
  lng: number;
  /** Varsayılan: motosikletle gidilebilir */
  access?: WaypointAccess;
}

/**
 * Rota haritası koordinatları.
 * `moto` — motosikletle gidilebilir; `boat` — tekne/longtail (haritada ayrı işaretlenir).
 */
export const ROUTE_WAYPOINTS: Record<string, RouteWaypoint[]> = {
  "south-phuket": [
    { name: "Patong (Başlangıç)", lat: 7.8961, lng: 98.2953 },
    { name: "Big Buddha", lat: 7.8276, lng: 98.3125 },
    { name: "Karon Viewpoint", lat: 7.8336, lng: 98.2982 },
    { name: "Kata Beach", lat: 7.8175, lng: 98.2988 },
    { name: "Windmill Viewpoint", lat: 7.77, lng: 98.303 },
    { name: "Promthep Cape", lat: 7.7625, lng: 98.3063 },
    { name: "Rawai Beach", lat: 7.7809, lng: 98.3251 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "krabi-day": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phang Nga", lat: 8.4509, lng: 98.5298 },
    { name: "Tiger Cave Temple", lat: 8.1233, lng: 98.9253 },
    { name: "Emerald Pool", lat: 8.1342, lng: 98.9381 },
    { name: "Khlong Thom Hot Springs", lat: 7.6426, lng: 99.1365 },
    { name: "Krabi Town", lat: 8.0863, lng: 98.9063 },
    { name: "Ao Nang (moto park)", lat: 8.0451, lng: 98.8103 },
    {
      name: "Railay Plajı (longtail)",
      lat: 8.0104,
      lng: 98.8386,
      access: "boat",
    },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "tiger-cave": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Tiger Cave Otopark", lat: 8.1233, lng: 98.9253 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "phuket-sunset": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Samet Nangshe Viewpoint", lat: 8.2453, lng: 98.4025 },
    { name: "Promthep Cape", lat: 7.7625, lng: 98.3063 },
    { name: "Karon Viewpoint", lat: 7.8336, lng: 98.2982 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "khao-sok": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phang Nga", lat: 8.4509, lng: 98.5298 },
    { name: "Khao Sok Köyü", lat: 8.914, lng: 98.529 },
    { name: "Ratchaprapa Barajı (Cheow Lan — moto son durak)", lat: 8.9722, lng: 98.8053 },
    {
      name: "Cheow Lan Gölü (tekne turu)",
      lat: 8.9728,
      lng: 98.815,
      access: "boat",
    },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "samet-nangshe-2day": [
    { name: "Patong (Başlangıç)", lat: 7.8961, lng: 98.2953 },
    { name: "Samet Nangshe Viewpoint", lat: 8.2453, lng: 98.4025 },
    { name: "Ban Pak Khok", lat: 8.268, lng: 98.425 },
    { name: "Konaklama (Samet Nangshe)", lat: 8.243, lng: 98.405 },
    { name: "Maymun Mağarası (isteğe bağlı)", lat: 8.4722, lng: 98.5319 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "phang-nga-scenic": [
    { name: "Patong (Başlangıç)", lat: 7.8961, lng: 98.2953 },
    { name: "Samet Nangshe Viewpoint", lat: 8.2453, lng: 98.4025 },
    { name: "Ban Pak Khok (körfez manzarası)", lat: 8.268, lng: 98.425 },
    { name: "Maymun Mağarası (Wat Suwan Kuha)", lat: 8.4722, lng: 98.5319 },
    { name: "Phang Nga Town", lat: 8.4509, lng: 98.5298 },
    { name: "Surakul İskelesi (moto park)", lat: 8.2755, lng: 98.512 },
    {
      name: "James Bond Adası (tekne)",
      lat: 8.2752,
      lng: 98.5,
      access: "boat",
    },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "similan-islands": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phang Nga", lat: 8.4509, lng: 98.5298 },
    { name: "Thap Lamu İskelesi (moto son durak)", lat: 8.655, lng: 98.241 },
    {
      name: "Similan Adaları (tekne)",
      lat: 8.65,
      lng: 97.64,
      access: "boat",
    },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "viewpoints-loop": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Radar Hill (Khao Khad)", lat: 7.8814, lng: 98.4012 },
    { name: "Windmill Viewpoint", lat: 7.77, lng: 98.303 },
    { name: "Karon Viewpoint", lat: 7.8336, lng: 98.2982 },
    { name: "Samet Nangshe Viewpoint", lat: 8.2453, lng: 98.4025 },
    { name: "Promthep Cape", lat: 7.7625, lng: 98.3063 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "beaches-hopping": [
    { name: "Patong Beach", lat: 7.8961, lng: 98.2953 },
    { name: "Kata Beach", lat: 7.8175, lng: 98.2988 },
    { name: "Karon Beach", lat: 7.846, lng: 98.294 },
    { name: "Bang Tao Beach", lat: 7.99, lng: 98.292 },
    { name: "Nai Harn Beach", lat: 7.778, lng: 98.304 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "hidden-gems": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Soi Dog Foundation", lat: 7.9803, lng: 98.3167 },
    { name: "Wat Phra Thong (Bang Tao)", lat: 8.016, lng: 98.318 },
    { name: "Sirinat National Park (Nai Yang)", lat: 8.0953, lng: 98.2978 },
    {
      name: "Freedom Beach (tekne/yürüyüş)",
      lat: 7.8885,
      lng: 98.278,
      access: "boat",
    },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "night-ride": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Bangla Road", lat: 7.895, lng: 98.298 },
    { name: "Old Phuket Town", lat: 7.888, lng: 98.392 },
    { name: "Chillva Market", lat: 7.884, lng: 98.395 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "couple-romance": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Samet Nangshe Viewpoint", lat: 8.2453, lng: 98.4025 },
    { name: "Karon Beach (sahil restoranları)", lat: 7.846, lng: 98.294 },
    { name: "Promthep Cape", lat: 7.7625, lng: 98.3063 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
  "adventure-extreme": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Big Buddha Yolu", lat: 7.8276, lng: 98.3125 },
    { name: "Cape Panwa", lat: 7.801, lng: 98.41 },
    { name: "Khao Rang", lat: 7.892, lng: 98.388 },
    { name: "Patong (Dönüş)", lat: 7.8963, lng: 98.2955 },
  ],
};

export function getRouteWaypoints(routeId: string): RouteWaypoint[] {
  return ROUTE_WAYPOINTS[routeId] ?? [];
}

/** Google Maps / Waze yönlendirmesi için yalnızca motosiklet durakları */
export function getMotoWaypoints(waypoints: RouteWaypoint[]): RouteWaypoint[] {
  return waypoints.filter((w) => w.access !== "boat");
}
