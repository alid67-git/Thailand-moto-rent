import type { MotorcycleModel, ServiceLocation } from "@/types";

export const SERVICE_LOCATIONS: ServiceLocation[] = [
  {
    id: "phuket-patong",
    provinceKey: "location.provinces.phuket",
    areaKey: "location.areas.patong",
    active: true,
  },
  {
    id: "phuket-kamala",
    provinceKey: "location.provinces.phuket",
    areaKey: "location.areas.kamala",
    active: true,
  },
  {
    id: "phuket-kata",
    provinceKey: "location.provinces.phuket",
    areaKey: "location.areas.kata",
    active: true,
  },
  {
    id: "phuket-karon",
    provinceKey: "location.provinces.phuket",
    areaKey: "location.areas.karon",
    active: true,
  },
  {
    id: "chiangmai",
    provinceKey: "location.provinces.chiangmai",
    areaKey: "location.areas.chiangmai",
    active: false,
    comingSoon: true,
  },
];

export const DEFAULT_LOCATION_ID = "phuket-patong";

export const BOOKABLE_LOCATIONS = SERVICE_LOCATIONS.filter((l) => l.active);

export const MOTORCYCLE_MODELS: MotorcycleModel[] = [
  {
    id: "click-160",
    slug: "honda-click-160",
    brand: "Honda",
    name: "Click 160",
    fullName: "Honda Click 160",
    category: "scooter",
    engineCc: 160,
    dailyPriceThb: 350,
    depositThb: 3000,
    helmetIncluded: true,
    abs: true,
    fuelCapacityL: 5.5,
    seatHeightCm: 769,
    descriptionKey: "models.click160.description",
    bestForKeys: ["models.click160.tag1", "models.click160.tag2", "models.click160.tag3"],
    accentColor: "#0ea5e9",
    image: "/images/motorcycles/click-160.jpg",
  },
  {
    id: "adv-160",
    slug: "honda-adv-160",
    brand: "Honda",
    name: "ADV 160",
    fullName: "Honda ADV 160",
    category: "adventure",
    engineCc: 160,
    dailyPriceThb: 490,
    depositThb: 5000,
    helmetIncluded: true,
    abs: true,
    fuelCapacityL: 8.1,
    seatHeightCm: 780,
    descriptionKey: "models.adv160.description",
    bestForKeys: ["models.adv160.tag1", "models.adv160.tag2", "models.adv160.tag3"],
    accentColor: "#f97316",
    image: "/images/motorcycles/adv-160.jpg",
  },
  {
    id: "adv-350",
    slug: "honda-adv-350",
    brand: "Honda",
    name: "ADV 350",
    fullName: "Honda ADV 350",
    category: "adventure",
    engineCc: 350,
    dailyPriceThb: 690,
    depositThb: 7000,
    helmetIncluded: true,
    abs: true,
    fuelCapacityL: 11.5,
    seatHeightCm: 795,
    descriptionKey: "models.adv350.description",
    bestForKeys: ["models.adv350.tag1", "models.adv350.tag2", "models.adv350.tag3"],
    accentColor: "#ea580c",
    image: "/images/motorcycles/adv-350.jpg",
  },
  {
    id: "forza-350",
    slug: "honda-forza-350",
    brand: "Honda",
    name: "Forza 350",
    fullName: "Honda Forza 350",
    category: "maxi",
    engineCc: 350,
    dailyPriceThb: 790,
    depositThb: 8000,
    helmetIncluded: true,
    abs: true,
    fuelCapacityL: 11.7,
    seatHeightCm: 780,
    descriptionKey: "models.forza350.description",
    bestForKeys: ["models.forza350.tag1", "models.forza350.tag2", "models.forza350.tag3"],
    accentColor: "#6366f1",
    image: "/images/motorcycles/forza-350.jpg",
  },
  {
    id: "xmax-300",
    slug: "yamaha-xmax-300",
    brand: "Yamaha",
    name: "XMAX 300",
    fullName: "Yamaha XMAX 300",
    category: "maxi",
    engineCc: 300,
    dailyPriceThb: 750,
    depositThb: 7500,
    helmetIncluded: true,
    abs: true,
    fuelCapacityL: 13,
    seatHeightCm: 795,
    descriptionKey: "models.xmax300.description",
    bestForKeys: ["models.xmax300.tag1", "models.xmax300.tag2", "models.xmax300.tag3"],
    accentColor: "#0d9488",
    image: "/images/motorcycles/xmax-300.jpg",
  },
];

export function getModelById(id: string): MotorcycleModel | undefined {
  return MOTORCYCLE_MODELS.find((m) => m.id === id);
}

export function getLocationById(id: string): ServiceLocation | undefined {
  return SERVICE_LOCATIONS.find((l) => l.id === id);
}

export function isBookableLocation(id: string): boolean {
  const loc = getLocationById(id);
  return Boolean(loc?.active && !loc.comingSoon);
}
