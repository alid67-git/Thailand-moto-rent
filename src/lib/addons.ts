import type { AddonOption } from "@/types";

export interface TopcaseOption extends AddonOption {
  image?: string;
  capacity?: string;
}

export const INSURANCE_OPTIONS: AddonOption[] = [
  {
    id: "ins-basic",
    category: "insurance",
    nameKey: "addons.insurance.basic.name",
    descriptionKey: "addons.insurance.basic.description",
    pricePerDayThb: 0,
    priceFlatThb: 0,
    included: true,
  },
  {
    id: "ins-standard",
    category: "insurance",
    nameKey: "addons.insurance.standard.name",
    descriptionKey: "addons.insurance.standard.description",
    pricePerDayThb: 120,
    priceFlatThb: 0,
    recommended: true,
  },
  {
    id: "ins-premium",
    category: "insurance",
    nameKey: "addons.insurance.premium.name",
    descriptionKey: "addons.insurance.premium.description",
    pricePerDayThb: 220,
    priceFlatThb: 0,
  },
];

export const TOPCASE_OPTIONS: TopcaseOption[] = [
  {
    id: "top-none",
    category: "topcase",
    nameKey: "addons.topcase.none.name",
    descriptionKey: "addons.topcase.none.description",
    pricePerDayThb: 0,
    priceFlatThb: 0,
    included: true,
    capacity: "Yerleşik",
  },
  {
    id: "top-35l",
    category: "topcase",
    nameKey: "addons.topcase.small.name",
    descriptionKey: "addons.topcase.small.description",
    pricePerDayThb: 60,
    priceFlatThb: 0,
    recommended: true,
    capacity: "35L",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=90&crop=entropy&cs=tinysrgb&fit=max",
  },
  {
    id: "top-45l",
    category: "topcase",
    nameKey: "addons.topcase.large.name",
    descriptionKey: "addons.topcase.large.description",
    pricePerDayThb: 90,
    priceFlatThb: 0,
    capacity: "45L",
    image: "https://images.unsplash.com/photo-1606664515524-2ddc6298996f?w=400&q=90&crop=entropy&cs=tinysrgb&fit=max",
  },
];

export const CANCELLATION_INSURANCE: AddonOption = {
  id: "cancel-ins",
  category: "cancellation",
  nameKey: "addons.cancellation.name",
  descriptionKey: "addons.cancellation.description",
  pricePerDayThb: 0,
  priceFlatThb: 350,
};

export function getAddonById(
  id: string,
  list: AddonOption[],
): AddonOption | undefined {
  return list.find((a) => a.id === id);
}
