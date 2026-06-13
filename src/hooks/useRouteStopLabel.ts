"use client";

import { useMemo } from "react";
import { useLocale } from "@/context/LocaleContext";
import { dictionaries } from "@/i18n";
import {
  destinationDescKey,
  destinationNameKey,
  destinationTipsKey,
} from "@/lib/destination-i18n";
import type { RouteStop } from "@/lib/routes-types";

function isPatongStart(name: string): boolean {
  return /patong/i.test(name) && /(çıkış|start|departure|kalkış)/i.test(name);
}

function isPatongReturn(name: string): boolean {
  return /patong/i.test(name) && /(dönüş|return|varış)/i.test(name);
}

export function useRouteStopLabel(routeId: string, stop: RouteStop) {
  const { locale, t } = useLocale();

  return useMemo(() => {
    if (stop.destinationSlug) {
      const nameKey = destinationNameKey(stop.destinationSlug);
      const descKey = destinationDescKey(stop.destinationSlug);
      const tipsKey = destinationTipsKey(stop.destinationSlug);
      const name = nameKey ? t(nameKey) : stop.name;
      const description = descKey ? t(descKey) : stop.description;
      const tips =
        tipsKey && !String(t(tipsKey)).startsWith("destinations.")
          ? t(tipsKey)
          : stop.tips ?? null;
      return { name, description, tips };
    }

    if (isPatongStart(stop.name)) {
      return {
        name: t("routeDetail.stopPatongStart"),
        description: t("routeDetail.stopPatongStartDesc"),
        tips: stop.tips ?? null,
      };
    }

    if (isPatongReturn(stop.name)) {
      return {
        name: t("routeDetail.stopPatongReturn"),
        description: stop.description.includes("Beach Roundabout")
          ? t("routeDetail.stopPatongReturnDesc")
          : stop.description,
        tips: stop.tips ?? null,
      };
    }

    const dict = dictionaries[locale].routeStops as Record<string, Record<string, { name?: string; description?: string; tips?: string }>> | undefined;
    const entry = dict?.[routeId]?.[String(stop.order)];

    return {
      name: entry?.name ?? stop.name,
      description: entry?.description ?? stop.description,
      tips: entry?.tips ?? stop.tips ?? null,
    };
  }, [locale, routeId, stop, t]);
}
