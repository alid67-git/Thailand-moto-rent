export interface RouteWaypoint {
  name: string;
  lat: number;
  lng: number;
}

/**
 * Rota haritası koordinatları — yalnızca motosikletle ulaşılabilen duraklar.
 * Ada, tekne veya yürüyüş/teleferik gerektiren noktalar (James Bond Adası,
 * Similan, Freedom Beach vb.) haritaya eklenmez.
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
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "krabi-day": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phang Nga", lat: 8.4509, lng: 98.5298 },
    { name: "Tiger Cave Temple", lat: 8.1233, lng: 98.9253 },
    { name: "Emerald Pool", lat: 8.1342, lng: 98.9381 },
    { name: "Khlong Thom Hot Springs", lat: 7.6426, lng: 99.1365 },
    { name: "Krabi Town", lat: 8.0863, lng: 98.9063 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "tiger-cave": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Tiger Cave Otopark", lat: 8.1233, lng: 98.9253 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "phuket-sunset": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Samet Nangshe Viewpoint", lat: 8.2453, lng: 98.4025 },
    { name: "Promthep Cape", lat: 7.7625, lng: 98.3063 },
    { name: "Karon Viewpoint", lat: 7.8336, lng: 98.2982 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "khao-sok": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phang Nga", lat: 8.4509, lng: 98.5298 },
    { name: "Khao Sok Köyü", lat: 8.914, lng: 98.529 },
    { name: "Ratchaprapa Barajı (Cheow Lan — moto son durak)", lat: 8.9722, lng: 98.8053 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "phang-nga-scenic": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phang Nga Town", lat: 8.4509, lng: 98.5298 },
    { name: "Samet Nangshe Viewpoint", lat: 8.2453, lng: 98.4025 },
    { name: "Ban Pak Khok (körfez manzarası)", lat: 8.268, lng: 98.425 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "similan-islands": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Phang Nga", lat: 8.4509, lng: 98.5298 },
    { name: "Thap Lamu İskelesi (moto son durak)", lat: 8.655, lng: 98.241 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "viewpoints-loop": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Radar Hill (Khao Khad)", lat: 7.8814, lng: 98.4012 },
    { name: "Windmill Viewpoint", lat: 7.77, lng: 98.303 },
    { name: "Karon Viewpoint", lat: 7.8336, lng: 98.2982 },
    { name: "Samet Nangshe Viewpoint", lat: 8.2453, lng: 98.4025 },
    { name: "Promthep Cape", lat: 7.7625, lng: 98.3063 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "beaches-hopping": [
    { name: "Patong Beach", lat: 7.8961, lng: 98.2953 },
    { name: "Kata Beach", lat: 7.8175, lng: 98.2988 },
    { name: "Karon Beach", lat: 7.846, lng: 98.294 },
    { name: "Bang Tao Beach", lat: 7.99, lng: 98.292 },
    { name: "Nai Harn Beach", lat: 7.778, lng: 98.304 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "hidden-gems": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Soi Dog Foundation", lat: 7.9803, lng: 98.3167 },
    { name: "Wat Phra Thong (Bang Tao)", lat: 8.016, lng: 98.318 },
    { name: "Sirinat National Park (Nai Yang)", lat: 8.0953, lng: 98.2978 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "night-ride": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Bangla Road", lat: 7.895, lng: 98.298 },
    { name: "Old Phuket Town", lat: 7.888, lng: 98.392 },
    { name: "Chillva Market", lat: 7.884, lng: 98.395 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "couple-romance": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Samet Nangshe Viewpoint", lat: 8.2453, lng: 98.4025 },
    { name: "Karon Beach (sahil restoranları)", lat: 7.846, lng: 98.294 },
    { name: "Promthep Cape", lat: 7.7625, lng: 98.3063 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
  "adventure-extreme": [
    { name: "Patong", lat: 7.8961, lng: 98.2953 },
    { name: "Big Buddha Yolu", lat: 7.8276, lng: 98.3125 },
    { name: "Cape Panwa", lat: 7.801, lng: 98.41 },
    { name: "Khao Rang", lat: 7.892, lng: 98.388 },
    { name: "Patong (Dönüş)", lat: 7.8961, lng: 98.2953 },
  ],
};

export function getRouteWaypoints(routeId: string): RouteWaypoint[] {
  return ROUTE_WAYPOINTS[routeId] ?? [];
}
