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

/** Leaflet grid/flex içinde boyutu doğru hesaplasın */
function InvalidateMapSize() {
  const map = useMap();
  useEffect(() => {
    const refresh = () => map.invalidateSize();
    const t1 = window.setTimeout(refresh, 0);
    const t2 = window.setTimeout(refresh, 250);
    window.addEventListener("resize", refresh);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", refresh);
    };
  }, [map]);
  return null;
}

export function DestinationMiniMap({
  lat,
  lng,
  name,
  className = "",
}: {
  lat: number;
  lng: number;
  name: string;
  className?: string;
}) {
  const mapsUrl = buildGoogleMapsDirectionsUrl(lat, lng);

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`destination-mini-map group relative isolate block overflow-hidden rounded-2xl border border-neutral-200 shadow-lift dark:border-ink-600 ${className}`}
      aria-label={`${name} — Google Maps`}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        className="!absolute inset-0 z-0 h-full w-full"
        style={{ background: "#e8f6fc" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CenterMap lat={lat} lng={lng} />
        <InvalidateMapSize />
        <CircleMarker
          center={[lat, lng]}
          radius={10}
          pathOptions={{ color: "#0077b6", fillColor: "#1aa8db", fillOpacity: 1, weight: 2 }}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            <span className="text-xs font-semibold">{name}</span>
          </Tooltip>
        </CircleMarker>
      </MapContainer>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink-950/80 to-transparent px-3 py-2">
        <p className="text-center text-xs font-bold text-white group-hover:underline">Google Maps →</p>
      </div>
    </a>
  );
}
