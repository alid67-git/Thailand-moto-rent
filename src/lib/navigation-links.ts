import type { RouteWaypoint } from "./route-maps";

export function buildGoogleMapsRouteUrl(waypoints: RouteWaypoint[]): string | null {
  if (waypoints.length < 2) return null;
  const origin = `${waypoints[0].lat},${waypoints[0].lng}`;
  const destination = `${waypoints[waypoints.length - 1].lat},${waypoints[waypoints.length - 1].lng}`;
  const middle = waypoints
    .slice(1, -1)
    .map((w) => `${w.lat},${w.lng}`)
    .join("|");
  let url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
  if (middle) url += `&waypoints=${encodeURIComponent(middle)}`;
  return url;
}

export function buildAppleMapsRouteUrl(waypoints: RouteWaypoint[]): string | null {
  if (waypoints.length < 2) return null;
  const start = waypoints[0];
  const end = waypoints[waypoints.length - 1];
  return `https://maps.apple.com/?saddr=${start.lat},${start.lng}&daddr=${end.lat},${end.lng}&dirflg=d`;
}

export function buildWazeUrl(waypoint: RouteWaypoint): string {
  return `https://www.waze.com/ul?ll=${waypoint.lat}%2C${waypoint.lng}&navigate=yes&zoom=14`;
}

export function buildGoogleMapsStopUrl(waypoint: RouteWaypoint): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${waypoint.lat},${waypoint.lng}&travelmode=driving`;
}
