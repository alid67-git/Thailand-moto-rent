export type TourDays = 1 | 2 | 3 | 4 | 5;

export interface MultiDayLeg {
  day: number;
  title: string;
  description: string;
  stayOptions?: string[];
}

export interface RouteTourMeta {
  tourDays: TourDays;
  multiDayItinerary?: MultiDayLeg[];
}

/** Tek günlük rotalar */
const DAY_ROUTE_IDS = [
  "south-phuket",
  "phuket-sunset",
  "viewpoints-loop",
  "beaches-hopping",
  "phang-nga-day",
  "hidden-gems",
  "culture-town",
] as const;

export const ROUTE_TOUR_META: Record<string, RouteTourMeta> = {
  ...Object.fromEntries(DAY_ROUTE_IDS.map((id) => [id, { tourDays: 1 as TourDays }])),
  "phang-nga-scenic": {
    tourDays: 2,
    multiDayItinerary: [
      {
        day: 1,
        title: "Patong → Samet Nangshe & körfez turu",
        description: "Sabah erken Samet Nangshe; öğleden sonra Surakul İskelesi'nden James Bond / Phang Nga körfez turu.",
        stayOptions: [
          "Samet Nangshe Viewpoint çevresi — boutique oteller",
          "Phang Nga Town — merkezi konaklama",
          "Ban Pak Khok sahil bungalovları",
        ],
      },
      {
        day: 2,
        title: "Maymun Mağarası & Patong'a dönüş",
        description: "Wat Suwan Kuha ziyareti; öğleden sonra 402 ile Phuket'e dönüş.",
        stayOptions: ["Dönüş günü — Patong konaklama"],
      },
    ],
  },
  "samet-nangshe-2day": {
    tourDays: 2,
    multiDayItinerary: [
      {
        day: 1,
        title: "Patong → Samet Nangshe",
        description: "Öğleden önce çıkış; viewpoint ve akşam konaklama.",
        stayOptions: ["The Samet Nangshe", "9 Hornbills Tented Camp", "Phang Nga Town"],
      },
      {
        day: 2,
        title: "Gün doğumu & dönüş",
        description: "Sabah viewpoint; öğleden sonra Patong'a dönüş.",
        stayOptions: ["Dönüş — Patong"],
      },
    ],
  },
  "khao-sok": {
    tourDays: 2,
    multiDayItinerary: [
      {
        day: 1,
        title: "Patong → Khao Sok Köyü",
        description: "Orman yolu; akşam bungalov konaklama.",
        stayOptions: ["Khao Sok Köyü bungalovları", "Riverside cottages"],
      },
      {
        day: 2,
        title: "Cheow Lan Gölü & dönüş",
        description: "Sabah tekne turu; öğleden sonra Patong.",
        stayOptions: ["Dönüş — Phuket"],
      },
    ],
  },
  "similan-islands": {
    tourDays: 2,
    multiDayItinerary: [
      {
        day: 1,
        title: "Patong → Khao Lak / Thap Lamu",
        description: "Tur kalkış noktasına motosikletle varış.",
        stayOptions: ["Khao Lak", "Takua Pa"],
      },
      {
        day: 2,
        title: "Similan turu & dönüş",
        description: "Sabah tekne; öğleden sonra veya ertesi gün Patong.",
        stayOptions: ["Dönüş — Patong"],
      },
    ],
  },
  "krabi-day": {
    tourDays: 5,
    multiDayItinerary: [
      {
        day: 1,
        title: "Patong → Ao Nang",
        description: "Gidiş ve konaklama.",
        stayOptions: ["Ao Nang", "Krabi Town"],
      },
      {
        day: 2,
        title: "Tiger Cave & Emerald Pool",
        description: "Tapınak tırmanışı ve turkuaz havuz.",
        stayOptions: ["Ao Nang / Krabi Town"],
      },
      {
        day: 3,
        title: "Hot Springs",
        description: "Khlong Thom sıcak kaynakları.",
        stayOptions: ["Ao Nang / Krabi Town"],
      },
      {
        day: 4,
        title: "Railay",
        description: "Longtail ile kireçtaşı plajı.",
        stayOptions: ["Railay veya Ao Nang"],
      },
      {
        day: 5,
        title: "Patong'a dönüş",
        description: "402 ile Phuket.",
        stayOptions: ["Dönüş — Patong"],
      },
    ],
  },
};

export function getRouteTourMeta(routeId: string): RouteTourMeta {
  return ROUTE_TOUR_META[routeId] ?? { tourDays: 1 };
}

export const TOUR_DAY_GROUPS: TourDays[] = [1, 2, 3, 4, 5];
