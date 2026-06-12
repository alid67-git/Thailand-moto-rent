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

interface RouteMapProps {
  waypoints: RouteWaypoint[];
}

export function RouteMap({ waypoints }: RouteMapProps) {
  const positions = waypoints.map((w) => [w.lat, w.lng] as [number, number]);
  const center = waypoints[0] ?? { lat: 7.88, lng: 98.39 };

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
      {positions.length > 1 && (
        <Polyline
          positions={positions}
          pathOptions={{ color: "#0077b6", weight: 5, opacity: 0.85, lineCap: "round", lineJoin: "round" }}
        />
      )}
      {waypoints.map((wp, i) => (
        <CircleMarker
          key={`${wp.name}-${i}`}
          center={[wp.lat, wp.lng]}
          radius={i === 0 || i === waypoints.length - 1 ? 10 : 8}
          pathOptions={{
            color: i === 0 ? "#40916c" : "#0077b6",
            fillColor: i === 0 ? "#52b788" : "#1aa8db",
            fillOpacity: 1,
            weight: 2,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
            <span className="text-xs font-semibold">
              {i + 1}. {wp.name}
            </span>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
