"use client";

import { useLocale } from "@/context/LocaleContext";
import {
  BOOKABLE_LOCATIONS,
  SERVICE_LOCATIONS,
} from "@/lib/catalog";
import { formatLocationLabel } from "@/lib/locations";

interface LocationSelectProps {
  value: string;
  onChange: (locationId: string) => void;
  className?: string;
}

export function LocationSelect({ value, onChange, className = "" }: LocationSelectProps) {
  const { t } = useLocale();
  const comingSoon = SERVICE_LOCATIONS.filter((l) => l.comingSoon);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      {BOOKABLE_LOCATIONS.map((loc) => (
        <option key={loc.id} value={loc.id}>
          {formatLocationLabel(t, loc)}
        </option>
      ))}
      {comingSoon.length > 0 && (
        <optgroup label={t("location.comingSoon")}>
          {comingSoon.map((loc) => (
            <option key={loc.id} value={loc.id} disabled>
              {formatLocationLabel(t, loc)} — {t("location.comingSoon")}
            </option>
          ))}
        </optgroup>
      )}
    </select>
  );
}
