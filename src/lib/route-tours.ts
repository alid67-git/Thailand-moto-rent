export type TourDays = 1 | 2 | 3 | 4 | 5;

export interface MultiDayLeg {
  day: number;
  title: string;
  description: string;
  /** Gece nerede kalınabilir — çok günlük turlarda zorunlu bilgi */
  stayOptions?: string[];
}

export interface RouteTourMeta {
  tourDays: TourDays;
  multiDayItinerary?: MultiDayLeg[];
}

export const ROUTE_TOUR_META: Record<string, RouteTourMeta> = {
  "south-phuket": { tourDays: 1 },
  "tiger-cave": { tourDays: 1 },
  "phuket-sunset": { tourDays: 1 },
  "viewpoints-loop": { tourDays: 1 },
  "beaches-hopping": { tourDays: 1 },
  "hidden-gems": { tourDays: 1 },
  "night-ride": { tourDays: 1 },
  "couple-romance": { tourDays: 1 },
  "adventure-extreme": { tourDays: 1 },
  "phang-nga-scenic": {
    tourDays: 2,
    multiDayItinerary: [
      {
        day: 1,
        title: "Patong → Samet Nangshe & körfez turu",
        description:
          "Sabah erken Samet Nangshe'de gün doğumu; öğleden sonra Surakul İskelesi'nden James Bond / Phang Nga körfez turu.",
        stayOptions: [
          "Samet Nangshe Viewpoint çevresi — boutique oteller (The Samet Nangshe, 9 Hornbills)",
          "Phang Nga Town — merkezi konaklama, ertesi gün mağara turu için ideal",
          "Ban Pak Khok sahil bungalovları — sakin körfez manzarası",
        ],
      },
      {
        day: 2,
        title: "Maymun Mağarası & Patong'a dönüş",
        description:
          "Wat Suwan Kuha ziyareti; öğleden sonra 402 ile Phuket'e dönüş. İsteğe bağlı Ban Pak Khok fotoğraf molası.",
        stayOptions: ["Dönüş günü — Patong veya Phuket konaklama"],
      },
    ],
  },
  "samet-nangshe-2day": {
    tourDays: 2,
    multiDayItinerary: [
      {
        day: 1,
        title: "Patong → Samet Nangshe bölgesi",
        description:
          "Öğleden önce çıkış; viewpoint ve çevre köylerde keşif. Akşam körfez manzarasında dinlenme.",
        stayOptions: [
          "Samet Nangshe Viewpoint yakını — The Samet Nangshe, 9 Hornbills Tented Camp",
          "Khao Lak yönü — sahil otelleri (uzatılmış konaklama için)",
          "Phang Nga Town — bütçe dostu oteller",
        ],
      },
      {
        day: 2,
        title: "Gün doğumu & dönüş",
        description:
          "İkinci gün sabahı tekrar viewpoint veya Ban Pak Khok; öğleden sonra Patong'a rahat dönüş.",
        stayOptions: ["Dönüş — Patong / Kata / Karon"],
      },
    ],
  },
  "khao-sok": {
    tourDays: 2,
    multiDayItinerary: [
      {
        day: 1,
        title: "Patong → Khao Sok Köyü",
        description:
          "Phang Nga üzerinden orman yolu; öğleden sonra milli park girişi ve köy keşfi. Akşam orman bungalovunda konaklama.",
        stayOptions: [
          "Khao Sok Köyü — orman bungalovları ve misafirhaneler",
          "Riverside Tree House Resort, Khao Sok Riverside Cottages",
          "Cheow Lan gölü — floating raft house (önceden rezervasyon şart)",
        ],
      },
      {
        day: 2,
        title: "Cheow Lan Gölü & dönüş",
        description:
          "Sabah erken baraj iskelesinden göl turu; öğleden sonra Patong'a dönüş (~2,5 saat).",
        stayOptions: ["Dönüş günü — Phuket konaklama"],
      },
    ],
  },
  "similan-islands": {
    tourDays: 2,
    multiDayItinerary: [
      {
        day: 1,
        title: "Patong → Khao Lak / Takua Pa",
        description:
          "Kuzey Phuket üzerinden Similan tur kalkış noktasına motosikletle varış. Akşam sahil kasabasında konaklama.",
        stayOptions: [
          "Khao Lak — tur operatörlerinin çoğu buradan kalkıyor",
          "Takua Pa — daha sakin, erken kalkış için uygun",
        ],
      },
      {
        day: 2,
        title: "Similan turu & Phuket'e dönüş",
        description:
          "Sabah tekne turu (rezervasyon gerekli); öğleden sonra motosikletle Patong'a dönüş.",
        stayOptions: ["Dönüş — Patong"],
      },
    ],
  },
  "krabi-day": {
    tourDays: 5,
    multiDayItinerary: [
      {
        day: 1,
        title: "Patong → Ao Nang (gidiş)",
        description:
          "Sabah erken çıkış; Phang Nga üzerinden Krabi'ye. Akşam Ao Nang'da konaklama — motor güvenli otopark.",
        stayOptions: [
          "Ao Nang — sahil otelleri ve hosteller (moto otopark bol)",
          "Krabi Town — daha ucuz, merkezi konum",
          "Railay — longtail ile ulaşım; çanta bırakıp moto Ao Nang'da park",
        ],
      },
      {
        day: 2,
        title: "Tiger Cave & Emerald Pool",
        description: "Tiger Cave tapınağı sabah; öğleden sonra Emerald Pool ve şnorkel.",
        stayOptions: ["Ao Nang veya Krabi Town — aynı bölgede kalın"],
      },
      {
        day: 3,
        title: "Hot Springs & Krabi Town",
        description: "Khlong Thom sıcak kaynakları; akşam Krabi Town veya Ao Nang sahil.",
        stayOptions: [
          "Khlong Thom yakını — termal resort (uzatılmış mola)",
          "Krabi Town / Ao Nang — standart seçenek",
        ],
      },
      {
        day: 4,
        title: "Railay & körfez",
        description: "Ao Nang iskelesinden longtail ile Railay; kaya tırmanışı veya plaj günü.",
        stayOptions: ["Railay bungalovları veya Ao Nang'a dönüş"],
      },
      {
        day: 5,
        title: "Dönüş Patong",
        description: "Rahat sabah; 402 ile Phuket'e dönüş (~2,5 saat). İsteğe bağlı Phang Nga molası.",
        stayOptions: ["Dönüş — Patong konaklama"],
      },
    ],
  },
};

export function getRouteTourMeta(routeId: string): RouteTourMeta {
  return ROUTE_TOUR_META[routeId] ?? { tourDays: 1 };
}

export const TOUR_DAY_GROUPS: TourDays[] = [1, 2, 3, 4, 5];
