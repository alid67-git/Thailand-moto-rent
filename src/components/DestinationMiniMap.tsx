"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import { buildGoogleMapsDirectionsUrl } from "@/lib/destination-places";
import "leaflet/dist/leaflet.css";

function CenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [map, lat, lng]);
  return null;
}

export function DestinationMiniMap({
  lat,
  lng,
  name,
}: {
  lat: number;
  lng: number;
  name: string;
}) {
  const mapsUrl = buildGoogleMapsDirectionsUrl(lat, lng);

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full min-h-[200px] overflow-hidden rounded-2xl border border-neutral-200 shadow-lift dark:border-ink-600"
      aria-label={`${name} — Google Maps`}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        className="h-full w-full"
        style={{ height: "100%", minHeight: 200, background: "#e8f6fc" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CenterMap lat={lat} lng={lng} />
        <CircleMarker
          center={[lat, lng]}
          radius={10}
          pathOptions={{ color: "#0077b6", fillColor: "#1aa8db", fillOpacity: 1, weight: 2 }}
        >
          <Tooltip direction="top" offset={[0, -8]} permanent>
            <span className="text-xs font-semibold">{name}</span>
          </Tooltip>
        </CircleMarker>
      </MapContainer>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent px-3 py-2">
        <p className="text-center text-xs font-bold text-white group-hover:underline">
          Google Maps →
        </p>
      </div>
    </a>
  );
}
