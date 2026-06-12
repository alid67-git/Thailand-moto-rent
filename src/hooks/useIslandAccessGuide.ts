"use client";

import { useMemo } from "react";
import { useLocale } from "@/context/LocaleContext";
import { dictionaries } from "@/i18n";
import { getLocalizedIslandAccess } from "@/lib/island-access-i18n";
import type { IslandAccessGuide } from "@/lib/island-access";

export function useIslandAccessGuide(slug: string | undefined): IslandAccessGuide | undefined {
  const { locale } = useLocale();
  return useMemo(() => {
    if (!slug) return undefined;
    return getLocalizedIslandAccess(slug, dictionaries[locale]);
  }, [slug, locale]);
}
