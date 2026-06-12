import type { IslandAccessGuide } from "@/lib/island-access";
import { ISLAND_ACCESS_GUIDES } from "@/lib/island-access";

export type IslandAccessGuideCatalog = Record<string, IslandAccessGuide>;

type MessagesWithIsland = {
  islandAccessGuides?: IslandAccessGuideCatalog;
};

export function getLocalizedIslandAccess(
  slug: string,
  messages: MessagesWithIsland,
): IslandAccessGuide | undefined {
  return messages.islandAccessGuides?.[slug] ?? ISLAND_ACCESS_GUIDES[slug];
}

export function shouldShowIslandAccess(slug: string | undefined, access?: string): boolean {
  if (!slug) return access === "boat";
  return access === "boat" || slug in ISLAND_ACCESS_GUIDES;
}
