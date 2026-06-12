import type { MultiRouteDef } from "@/lib/multi-route-types";
import type { SafetyTip } from "@/lib/routes-types";

const PATONG = { lat: 7.8961, lng: 98.2953 };

const MOTO_SAFETY: SafetyTip[] = [
  { icon: "⛑️", title: "Kask", text: "Tam kask ve geçerli IDP şart." },
  { icon: "🏨", title: "Konaklama", text: "Otel moto parkını önceden teyit edin." },
  { icon: "⛽", title: "Yakıt", text: "Her sabah depoyu doldurun." },
];

const LONG_SAFETY: SafetyTip[] = [
  ...MOTO_SAFETY,
  { icon: "🛞", title: "Uzun yol", text: "Her 2 saatte mola verin." },
  { icon: "🌧️", title: "Muson", text: "Yağmurda virajlı yollarda hızı düşürün." },
];

function leg(
  day: number,
  title: string,
  description: string,
  places: string[],
  stops: MultiRouteDef["legs"][0]["stops"],
  stay?: string,
) {
  return { day, title, description, places, stops, stay };
}

const s = (
  name: string,
  desc: string,
  driveKm: number,
  driveMin: number,
  visitMin: number,
  extra?: Partial<MultiRouteDef["legs"][0]["stops"][0]>,
) => ({ name, description: desc, driveKm, driveMin, visitMin, ...extra });

const patongStart = () =>
  s("Patong — Sabah çıkış", "Depo dolu, kask kontrolü.", 0, 0, 15, {
    ...PATONG,
    destinationSlug: "patong-beach",
  });

const patongReturn = (driveKm: number, driveMin: number) =>
  s("Patong — Akşam dönüş", "Kiralama noktasına dönüş.", driveKm, driveMin, 0, {
    ...PATONG,
    destinationSlug: "patong-beach",
  });

export const EXTRA_MULTI_ROUTES: MultiRouteDef[] = [
  {
    id: "ranong-hot-springs",
    tourDays: 2,
    name: "Ranong Hot Springs Escape",
    tagline: "Kaplıcalar ve uzun kıyı sürüşü",
    routeLine: "Phuket → Ranong → Phuket",
    totalDriveKm: 520,
    driveTimeLabel: "8-9 saat sürüş",
    difficulty: "Orta",
    heroSlug: "hot-springs",
    description:
      "Phuket'ten Ranong'a uzun kıyı yolu; Raksawarin kaplıcaları ve Andaman manzaraları. 2 gece Ranong — gerçek 2 günlük motor kiralama turu.",
    highlights: "Uzun yol · Kaplıcalar · Doğa · Az turist",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kuru sezon; hafta içi çıkış",
    elevation: "~600 m",
    parkingInfo: "Ranong otellerinde moto park",
    fuelEstimate: "~15 L · 600 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phuket → Ranong", "Kuzey kıyı yolu.", ["Khao Lak", "Ranong"], [
        patongStart(),
        s("Khao Lak", "Plaj molası.", 85, 100, 45, { destinationSlug: "khao-lak" }),
        s("Ranong — Konaklama", "Gece Ranong.", 120, 140, 30, { lat: 9.965, lng: 98.635 }),
      ], "Ranong hot spring otel"),
      leg(2, "Kaplıcalar → Phuket", "Sabah kaplıca, dönüş.", ["Hot Springs", "Patong"], [
        s("Raksawarin Hot Springs", "Doğal kaplıca.", 8, 12, 90, { destinationSlug: "hot-springs" }),
        patongReturn(260, 300),
      ]),
    ],
  },
  {
    id: "luxury-coastal-escape",
    tourDays: 2,
    name: "Luxury Coastal Escape",
    tagline: "Baba Beach Club ve Khao Lak lüks sahili",
    routeLine: "Phuket → Khao Lak → Phuket",
    totalDriveKm: 230,
    driveTimeLabel: "4-5 saat sürüş",
    difficulty: "Kolay",
    heroSlug: "khao-lak",
    description: "Premium turistler için Mai Khao, beach club ve Khao Lak resort hattı — 2 günlük lüks motor turu.",
    highlights: "Premium turistler · Lüks oteller · Çiftler",
    recommendedBike: "Honda Forza 350",
    bestTime: "Kasım–Nisan",
    elevation: "~150 m",
    parkingInfo: "Resort vale / moto park",
    fuelEstimate: "~8 L · 350 THB + club",
    safetyTips: MOTO_SAFETY,
    legs: [
      leg(1, "Phuket → Khao Lak", "Lüks kıyı.", ["Mai Khao", "Baba Beach Club", "Khao Lak"], [
        patongStart(),
        s("Mai Khao Beach", "Uçak manzarası.", 35, 45, 40, { destinationSlug: "mai-khao-plane-spot" }),
        s("Baba Beach Club", "Öğle / kokteyl.", 15, 20, 90, { lat: 8.67, lng: 98.252 }),
        s("Khao Lak — Konaklama", "Resort.", 45, 55, 30, { destinationSlug: "khao-lak" }),
      ], "Khao Lak luxury resort"),
      leg(2, "Beach clubs → Phuket", "Dönüş.", ["Beach Clubs", "Patong"], [
        s("Bang Niang Beach", "Sabah.", 5, 10, 45, { destinationSlug: "khao-lak" }),
        patongReturn(95, 110),
      ]),
    ],
  },
  {
    id: "southern-nature-loop",
    tourDays: 3,
    name: "Southern Thailand Nature Loop",
    tagline: "Khao Sok → Khanom pembe yunus bölgesi",
    routeLine: "Phuket → Khao Sok → Khanom → Phuket",
    totalDriveKm: 600,
    driveTimeLabel: "10-11 saat sürüş",
    difficulty: "Orta",
    heroSlug: "khao-sok-national-park",
    description: "Orman, göl ve Tayland Körfezi — 3 günlük tur, motosiklet 72 saat elinizde.",
    highlights: "Pembe yunuslar · Dağ ve sahil · Khao Sok",
    recommendedBike: "Honda ADV 350",
    bestTime: "Kasım–Nisan",
    elevation: "~700 m",
    parkingInfo: "Khao Sok ve Khanom otel park",
    fuelEstimate: "~18 L · 750 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phuket → Khao Sok", "Orman.", ["Khao Sok"], [
        patongStart(),
        s("Khao Sok National Park", "Orman yürüyüşü.", 130, 150, 120, { destinationSlug: "khao-sok-national-park" }),
        s("Geceleme — Khao Sok", "Bungalov.", 2, 5, 720),
      ], "Khao Sok Village"),
      leg(2, "Cheow Lan → Khanom", "Göl teknesi + körfez.", ["Cheow Lan Lake", "Khanom"], [
        s("Cheow Lan Gölü", "Tekne; moto baraj otoparkında kalır.", 15, 30, 180, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Khanom — Konaklama", "Sahil otel.", 145, 165, 30, { lat: 9.183, lng: 99.867 }),
      ], "Khanom"),
      leg(3, "Khanom → Phuket", "Yunus bölgesi ve dönüş.", ["Pink Dolphin Area", "Patong"], [
        s("Khanom Sahil Tekne", "Sabah tekne (isteğe bağlı); moto otelde park.", 5, 10, 90, { lat: 9.19, lng: 99.88, access: "boat" }),
        patongReturn(280, 320),
      ]),
    ],
  },
  {
    id: "ranong-scenic-ride",
    tourDays: 3,
    name: "Ranong Scenic Ride",
    tagline: "Kaplıcalar + Phang Nga dönüş",
    routeLine: "Phuket → Ranong → Phang Nga → Phuket",
    totalDriveKm: 650,
    driveTimeLabel: "11-12 saat sürüş",
    difficulty: "Orta",
    heroSlug: "hot-springs",
    description: "Virajlı kıyı yolları, Ranong kaplıcaları ve Samet Nangshe finale — 3 günlük tur.",
    highlights: "Kaplıcalar · Virajlı yollar · Phang Nga",
    recommendedBike: "Honda ADV 350",
    bestTime: "Kuru sezon",
    elevation: "~650 m",
    parkingInfo: "Ranong ve Phang Nga otel park",
    fuelEstimate: "~20 L · 850 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phuket → Ranong", "Kuzey.", ["Khao Lak", "Ranong"], [
        patongStart(),
        s("Khao Lak", "Mola.", 85, 100, 40, { destinationSlug: "khao-lak" }),
        s("Ranong — Konaklama", "1. gece.", 80, 95, 720),
      ], "Ranong"),
      leg(2, "Kaplıcalar", "Raksawarin.", ["Hot Springs", "Ngao Waterfall"], [
        s("Raksawarin Hot Springs", "Kaplıca.", 8, 12, 120, { destinationSlug: "hot-springs" }),
        s("Ranong — 2. gece", "Konaklama.", 5, 10, 720),
      ], "Ranong"),
      leg(3, "Phang Nga → Phuket", "Finale.", ["Samet Nangshe", "Patong"], [
        s("Samet Nangshe Viewpoint", "Panorama.", 120, 140, 60, { destinationSlug: "samet-nangshe" }),
        patongReturn(100, 115),
      ]),
    ],
  },
  {
    id: "krabi-trang-explorer",
    tourDays: 4,
    name: "Krabi & Trang Explorer",
    tagline: "Krabi + Trang gizli plajları",
    routeLine: "Phuket → Krabi → Trang → Phuket",
    totalDriveKm: 750,
    driveTimeLabel: "12-14 saat sürüş",
    difficulty: "Orta",
    heroSlug: "emerald-pool",
    description: "Krabi doğası ve Trang plajları — Railay longtail detayları durak kartında.",
    highlights: "Az turist · Sahil yolları · Trang",
    recommendedBike: "Honda ADV 350",
    bestTime: "Kasım–Nisan",
    elevation: "~700 m",
    parkingInfo: "Ao Nang + Trang otel park",
    fuelEstimate: "~22 L · 900 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phuket → Railay", "Krabi giriş.", ["Ao Nang", "Railay"], [
        patongStart(),
        s("Ao Nang", "Moto park.", 165, 180, 45, { destinationSlug: "ao-nang" }),
        s("Railay Beach", "Longtail — moto Ao Nang'da kalır.", 0, 0, 150, { destinationSlug: "railay-beach", access: "boat" }),
        s("Geceleme — Ao Nang", "1. gece.", 5, 10, 720),
      ], "Ao Nang"),
      leg(2, "Tiger Cave + Emerald Pool", "Doğa.", ["Tiger Cave", "Emerald Pool"], [
        s("Tiger Cave Temple", "1260 basamak.", 15, 20, 120, { destinationSlug: "tiger-cave-krabi" }),
        s("Emerald Pool", "Turkuaz havuz.", 25, 35, 90, { destinationSlug: "emerald-pool" }),
        s("Konaklama — Krabi", "2. gece.", 12, 20, 720),
      ], "Krabi"),
      leg(3, "Trang", "Pak Meng.", ["Trang", "Pak Meng"], [
        s("Pak Meng Beach", "Sakin plaj.", 105, 120, 90, { lat: 7.51, lng: 99.35 }),
        s("Konaklama — Trang", "3. gece.", 10, 15, 720),
      ], "Trang"),
      leg(4, "Phuket dönüş", "Dönüş.", ["Hot Springs", "Patong"], [
        s("Hot Springs", "Mola.", 55, 65, 60, { destinationSlug: "hot-springs" }),
        patongReturn(165, 180),
      ]),
    ],
  },
  {
    id: "ranong-andaman-adventure",
    tourDays: 4,
    name: "Ranong & Andaman Adventure",
    tagline: "Kaplıcalar + Khao Lak + Phang Nga",
    routeLine: "Phuket → Ranong → Khao Lak → Phang Nga → Phuket",
    totalDriveKm: 900,
    driveTimeLabel: "14-16 saat sürüş",
    difficulty: "Orta",
    heroSlug: "khao-lak",
    description: "4 günlük Ranong kaplıca ve Phang Nga körfezi macerası.",
    highlights: "Kaplıcalar · Khao Lak · Samet Nangshe",
    recommendedBike: "Honda ADV 350",
    bestTime: "Kuru sezon",
    elevation: "~700 m",
    parkingInfo: "Otellerde moto park",
    fuelEstimate: "~25 L · 1000 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phuket → Ranong", "Kuzey.", ["Khao Lak", "Ranong"], [
        patongStart(),
        s("Khao Lak", "Mola.", 85, 100, 40, { destinationSlug: "khao-lak" }),
        s("Ranong — Konaklama", "1. gece.", 80, 95, 720),
      ], "Ranong"),
      leg(2, "Kaplıca", "Raksawarin.", ["Hot Springs"], [
        s("Raksawarin Hot Springs", "Tam gün.", 8, 12, 120, { destinationSlug: "hot-springs" }),
        s("Ranong — 2. gece", "Konaklama.", 5, 10, 720),
      ], "Ranong"),
      leg(3, "Khao Lak", "Güneye.", ["Kuraburi", "Khao Lak"], [
        s("Khao Lak — Konaklama", "3. gece.", 100, 120, 720, { destinationSlug: "khao-lak" }),
      ], "Khao Lak"),
      leg(4, "Samet Nangshe → Phuket", "Finale.", ["Samet Nangshe", "Patong"], [
        s("Samet Nangshe Viewpoint", "Panorama.", 45, 55, 60, { destinationSlug: "samet-nangshe" }),
        patongReturn(100, 115),
      ]),
    ],
  },
  {
    id: "koh-lanta-explorer",
    tourDays: 5,
    name: "Koh Lanta Explorer",
    tagline: "Phuket → Krabi → Koh Lanta feribot",
    routeLine: "Phuket → Krabi → Koh Lanta → Phuket",
    totalDriveKm: 850,
    driveTimeLabel: "14-16 saat sürüş",
    difficulty: "Orta",
    heroSlug: "lanta-island",
    featured: true,
    description:
      "Motosikletinizi Hua Hin Pier feribotuna bindirip Koh Lanta'da gezmeye devam edersiniz. \"Phuket to Koh Lanta motorcycle\" aramasının tam cevabı.",
    highlights: "Railay · Lanta Old Town · Kantiang Bay · Moto feribot",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan",
    elevation: "~600 m",
    parkingInfo: "Hua Hin Pier moto feribot ~150 THB",
    fuelEstimate: "~25 L · 1000 THB + feribot",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phuket → Railay", "Krabi.", ["Ao Nang", "Railay"], [
        patongStart(),
        s("Ao Nang", "Üs.", 165, 180, 45, { destinationSlug: "ao-nang" }),
        s("Railay Beach", "Longtail; moto Ao Nang'da.", 0, 0, 150, { destinationSlug: "railay-beach", access: "boat" }),
        s("Geceleme — Ao Nang", "1. gece.", 5, 10, 720),
      ], "Ao Nang"),
      leg(2, "Krabi → Hua Hin Pier", "Feribot hazırlık.", ["Tiger Cave", "Hua Hin Pier"], [
        s("Tiger Cave", "Sabah.", 15, 20, 120, { destinationSlug: "tiger-cave-krabi" }),
        s("Hua Hin Pier (Lanta feribot)", "Moto feribot bileti; 15-20 dk geçiş.", 50, 60, 45, { destinationSlug: "lanta-island" }),
        s("Konaklama — Krabi", "2. gece.", 30, 40, 720),
      ], "Krabi"),
      leg(3, "Feribot → Koh Lanta", "Ada.", ["Saladan", "Lanta Old Town"], [
        s("Ban Hua Hin Pier — Feribot", "Motosiklet feribota biner.", 50, 60, 60, { destinationSlug: "lanta-island" }),
        s("Koh Lanta Old Town", "Tarihi sokaklar.", 8, 15, 90, { lat: 7.565, lng: 99.04 }),
        s("Konaklama — Lanta", "3. gece.", 5, 10, 720),
      ], "Koh Lanta"),
      leg(4, "Lanta keşif", "Plajlar.", ["Kantiang Bay", "National Park"], [
        s("Kantiang Bay", "Sakin koy.", 12, 20, 75, { lat: 7.55, lng: 99.05 }),
        s("Konaklama — Lanta", "4. gece.", 5, 10, 720),
      ], "Koh Lanta"),
      leg(5, "Feribot → Phuket", "Dönüş.", ["Saladan Feribot", "Patong"], [
        s("Saladan — Feribot dönüş", "Moto ile anakara.", 0, 0, 45, { destinationSlug: "lanta-island" }),
        patongReturn(215, 240),
      ]),
    ],
  },
  {
    id: "twin-coast-tour",
    tourDays: 5,
    name: "Twin Coast Tour",
    tagline: "Andaman → Tayland Körfezi",
    routeLine: "Phuket → Khao Sok → Khanom → Donsak → Phuket",
    totalDriveKm: 900,
    driveTimeLabel: "15-17 saat sürüş",
    difficulty: "Orta",
    heroSlug: "khao-sok-national-park",
    description: "Tek turda iki deniz kıyısı — Khao Sok, Khanom ve Donsak feribot bölgesi.",
    highlights: "İki kıyı · Khao Sok · Khanom · Donsak",
    recommendedBike: "Honda ADV 350",
    bestTime: "Kasım–Nisan",
    elevation: "~750 m",
    parkingInfo: "Otellerde moto park",
    fuelEstimate: "~28 L · 1100 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phuket → Khao Sok", "Orman.", ["Khao Sok"], [
        patongStart(),
        s("Khao Sok National Park", "Orman.", 130, 150, 120, { destinationSlug: "khao-sok-national-park" }),
        s("Geceleme — Khao Sok", "1. gece.", 2, 5, 720),
      ], "Khao Sok"),
      leg(2, "Cheow Lan → Surat Thani", "Göl.", ["Cheow Lan Lake", "Surat Thani"], [
        s("Cheow Lan Gölü", "Tekne; moto otoparkta.", 15, 30, 180, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Konaklama — Surat Thani", "2. gece.", 85, 95, 720, { lat: 9.138, lng: 99.333 }),
      ], "Surat Thani"),
      leg(3, "Khanom", "Körfez.", ["Khanom"], [
        s("Khanom Sahil", "Sakin körfez.", 65, 75, 90, { lat: 9.183, lng: 99.867 }),
        s("Konaklama — Khanom", "3. gece.", 5, 10, 720),
      ], "Khanom"),
      leg(4, "Donsak → Khao Lak", "Feribot terminali.", ["Donsak Pier", "Khao Lak"], [
        s("Donsak Pier", "Samui feribot; moto park.", 45, 55, 45, { destinationSlug: "donsak-samui-ferry" }),
        s("Konaklama — Khao Lak", "4. gece.", 55, 65, 720, { destinationSlug: "khao-lak" }),
      ], "Khao Lak"),
      leg(5, "Phuket dönüş", "402.", ["Patong"], [patongReturn(85, 100)]),
    ],
  },
];
