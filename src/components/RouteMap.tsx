"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, useMap } from "react-leaflet";
import type { RouteWaypoint } from "@/lib/route-maps";
import "leaflet/dist/leaflet.css";

function FitBounds({ waypoints }: { waypoints: RouteWaypoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (waypoints.length === 0) return;
    const bounds = waypoints.map((w) => [w.lat, w.lng] as [number, number]);
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 });
  }, [map, waypoints]);
  return null;
}

function motoSegments(waypoints: RouteWaypoint[]): [number, number][][] {
  const segments: [number, number][][] = [];
  let current: [number, number][] = [];

  for (const wp of waypoints) {
    const point: [number, number] = [wp.lat, wp.lng];
    if (wp.access === "boat") {
      if (current.length > 1) segments.push(current);
      current = [];
      continue;
    }
    current.push(point);
  }
  if (current.length > 1) segments.push(current);

  return segments;
}

interface RouteMapProps {
  waypoints: RouteWaypoint[];
}

export function RouteMap({ waypoints }: RouteMapProps) {
  const center = waypoints[0] ?? { lat: 7.88, lng: 98.39 };
  const segments = motoSegments(waypoints);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={11}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ height: "100%", width: "100%", background: "#e8f6fc" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds waypoints={waypoints} />
      {segments.map((positions, i) => (
        <Polyline
          key={`seg-${i}`}
          positions={positions}
          pathOptions={{ color: "#0077b6", weight: 5, opacity: 0.85, lineCap: "round", lineJoin: "round" }}
        />
      ))}
      {waypoints.map((wp, i) => {
        const isBoat = wp.access === "boat";
        const isStart = i === 0;
        const isEnd = i === waypoints.length - 1;

        return (
          <CircleMarker
            key={`${wp.name}-${i}`}
            center={[wp.lat, wp.lng]}
            radius={isStart || isEnd ? 10 : 8}
            pathOptions={{
              color: isBoat ? "#e85d04" : isStart ? "#40916c" : "#0077b6",
              fillColor: isBoat ? "#f48c06" : isStart ? "#52b788" : "#1aa8db",
              fillOpacity: 1,
              weight: 2,
              dashArray: isBoat ? "4 3" : undefined,
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
              <span className="text-xs font-semibold">
                {isBoat ? "⛵ " : ""}
                {i + 1}. {wp.name}
              </span>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
