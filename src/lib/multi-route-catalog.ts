import type {
  MultiRouteDef,
  MultiRouteLegDef,
  MultiRouteStopDef,
} from "@/lib/multi-route-types";
import type { SafetyTip } from "@/lib/routes-types";

const PATONG = { lat: 7.8961, lng: 98.2953 };

const MOTO_SAFETY: SafetyTip[] = [
  { icon: "🪖", title: "Kask", text: "Tam yüz veya jet kask şart; gece sürüşünde reflektör kullanın." },
  { icon: "🌧️", title: "Yağmur", text: "Tropikal sağanak için yağmurluk ve su geçirmez çanta taşıyın." },
  { icon: "⛽", title: "Yakıt", text: "Uzun yollarda depoyu dolu tutun; dağ yollarında istasyon seyrek olabilir." },
];

const LONG_SAFETY: SafetyTip[] = [
  ...MOTO_SAFETY,
  { icon: "🛞", title: "Uzun yol", text: "Her 2 saatte mola verin; yorgun sürüşten kaçının." },
  { icon: "🌧️", title: "Muson", text: "Yağmurda virajlı dağ yollarında hızı düşürün; fren mesafesini artırın." },
  { icon: "🧭", title: "GPS", text: "Çok günlük turlarda offline harita indirin; sinyal kesilebilir." },
];

function leg(
  day: number,
  title: string,
  description: string,
  places: string[],
  stops: MultiRouteStopDef[],
  stay?: string,
): MultiRouteLegDef {
  return { day, title, description, places, stops, ...(stay ? { stay } : {}) };
}

function s(
  name: string,
  desc: string,
  driveKm: number,
  driveMin: number,
  visitMin: number,
  extra?: Partial<MultiRouteStopDef>,
): MultiRouteStopDef {
  return { name, description: desc, driveKm, driveMin, visitMin, ...extra };
}

const patongStart = () =>
  s("Patong — Çıkış", "Beach Roundabout'tan tur başlangıcı.", 0, 0, 15, {
    ...PATONG,
    destinationSlug: "patong-beach",
  });

const patongReturn = (km: number, min: number) =>
  s("Patong — Dönüş", "Tur sonu Beach Roundabout'a varış.", km, min, 0, {
    ...PATONG,
    destinationSlug: "patong-beach",
  });

// ─── 2-DAY ROUTES ───────────────────────────────────────────────────────────

const TWO_DAY: MultiRouteDef[] = [
  {
    id: "khao-sok-adventure",
    tourDays: 2,
    name: "Khao Sok 2 Günlük Macera",
    tagline: "Orman bungalov + Cheow Lan Gölü",
    routeLine: "Phuket → Khao Sok → Cheow Lan → Phuket",
    totalDriveKm: 320,
    driveTimeLabel: "~6 saat toplam sürüş",
    difficulty: "Zor",
    heroSlug: "khao-sok-national-park",
    featured: true,
    description:
      "İki günlük motosiklet kiralama ile Khao Sok'un yağmur ormanını ve Cheow Lan'ın turkuaz sularını keşfedin. Bir gece bungalov veya floating raft'ta kalın; göl turu ve orman yürüyüşü için zaman ayırın.",
    highlights: "Khao Sok, Cheow Lan Gölü, Orman bungalov, Yağmur ormanı",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan (kuru sezon); yağmurda dikkat",
    elevation: "~800 m",
    parkingInfo: "Park girişi ve baraj otoparkı ücretsiz",
    fuelEstimate: "~12 L · 520 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(
        1,
        "Phuket'ten Khao Sok'a",
        "Sabah erken çıkış; Phang Nga üzerinden orman yoluna giriş.",
        ["Patong", "Phang Nga", "Khao Sok Köyü"],
        [
          patongStart(),
          s("Phang Nga Town", "Yakıt ve mola; körfez manzarası.", 55, 60, 30, {
            destinationSlug: "phang-nga-bay",
          }),
          s("Khao Sok Milli Park Girişi", "Orman yolu başlangıcı; bilet alımı.", 75, 90, 45, {
            destinationSlug: "khao-sok-national-park",
          }),
          s("Khao Sok Köyü — Konaklama", "1. gece bungalov veya raft house.", 0, 0, 720),
        ],
        "Khao Sok Köyü bungalov / floating raft",
      ),
      leg(
        2,
        "Cheow Lan ve dönüş",
        "Sabah erken göl turu; öğleden sonra Phuket'e dönüş.",
        ["Cheow Lan Gölü", "Ratchaprapha Barajı", "Patong"],
        [
          s("Cheow Lan Gölü", "Baraj iskelesi tekne turu; kaya formasyonları.", 15, 30, 180, {
            destinationSlug: "cheow-lan-lake",
            access: "boat",
          }),
          s("Ton Prai Şelalesi", "Kısa yürüyüş ve serinleme.", 8, 15, 45, {
            destinationSlug: "ton-prai-waterfall",
          }),
          s("Phang Nga — Mola", "Dönüş yolunda öğle molası.", 70, 80, 30),
          patongReturn(130, 150),
        ],
      ),
    ],
  },
  {
    id: "krabi-highlights",
    tourDays: 2,
    name: "Krabi Öne Çıkanlar 2 Gün",
    tagline: "Tiger Cave, Emerald Pool, Ao Nang",
    routeLine: "Phuket → Krabi → Ao Nang → Phuket",
    totalDriveKm: 360,
    driveTimeLabel: "~7 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "emerald-pool",
    featured: true,
    description:
      "Krabi'nin en ikonik duraklarını iki günde motosikletle gezin. Tiger Cave manzarası, Emerald Pool'da yüzme ve Ao Nang'da gün batımı — konaklamalı tur için ideal kısa program.",
    highlights: "Tiger Cave, Emerald Pool, Hot Springs, Ao Nang",
    recommendedBike: "Honda ADV 160 / Forza 350",
    bestTime: "Kasım–Nisan; sabah erken sürüş",
    elevation: "~700 m",
    parkingInfo: "Milli park ve otel otoparkları ücretsiz",
    fuelEstimate: "~14 L · 600 THB",
    safetyTips: MOTO_SAFETY,
    legs: [
      leg(
        1,
        "Krabi'ye varış",
        "Phuket'ten 402 ile Krabi'ye; öğleden sonra Ao Nang.",
        ["Patong", "Krabi Town", "Ao Nang"],
        [
          patongStart(),
          s("Krabi Town", "Şehir merkezi mola; gece pazarı akşamı.", 155, 170, 60, {
            destinationSlug: "krabi-town",
          }),
          s("Tiger Cave Tapınağı", "1260 basamak; panoramik manzara.", 12, 18, 120, {
            destinationSlug: "tiger-cave-krabi",
          }),
          s("Ao Nang — Konaklama", "1. gece plaj kenarı otel.", 18, 25, 60, {
            destinationSlug: "ao-nang",
          }),
        ],
        "Ao Nang veya Krabi Town otel",
      ),
      leg(
        2,
        "Doğa ve dönüş",
        "Emerald Pool sabah; Hot Springs ve Phuket dönüşü.",
        ["Emerald Pool", "Hot Springs", "Patong"],
        [
          s("Emerald Pool", "Turkuaz doğal havuz; sabah erken daha sakin.", 35, 45, 90, {
            destinationSlug: "emerald-pool",
          }),
          s("Khlong Thom Hot Springs", "Doğal sıcak kaynak havuzları.", 20, 30, 90, {
            destinationSlug: "hot-springs",
          }),
          s("Krabi — Yakıt molası", "Dönüş öncesi son yakıt.", 40, 45, 20),
          patongReturn(155, 170),
        ],
      ),
    ],
  },
  {
    id: "phang-nga-bay-explorer",
    tourDays: 2,
    name: "Phang Nga Körfezi 2 Gün",
    tagline: "Samet Nangshe, James Bond, Maymun Mağarası",
    routeLine: "Phuket → Samet Nangshe → Phang Nga Körfezi → Phuket",
    totalDriveKm: 240,
    driveTimeLabel: "~5 saat toplam sürüş",
    difficulty: "Kolay",
    heroSlug: "james-bond-island",
    featured: true,
    description:
      "Phang Nga körfezinin en güzel noktalarını iki günde keşfedin. Samet Nangshe'de gün doğumu, James Bond Adası tekne turu ve Maymun Mağarası — minimal sürüş, maksimum manzara.",
    highlights: "Samet Nangshe, James Bond Adası, Maymun Mağarası, Koh Panyee",
    recommendedBike: "Honda ADV 160",
    bestTime: "Cuma çıkış veya hafta sonu; kuru sezon",
    elevation: "~350 m",
    parkingInfo: "Otel ve Surakul iskele otoparkları",
    fuelEstimate: "~10 L · 430 THB + tekne",
    safetyTips: MOTO_SAFETY,
    legs: [
      leg(
        1,
        "Körfeze giriş",
        "Samet Nangshe viewpoint ve konaklama.",
        ["Patong", "Samet Nangshe", "Phang Nga"],
        [
          patongStart(),
          s("Samet Nangshe Viewpoint", "Gün batımı manzarası; fotoğraf noktası.", 35, 50, 90, {
            destinationSlug: "samet-nangshe",
          }),
          s("Phang Nga Town", "Akşam yemeği ve konaklama hazırlığı.", 25, 35, 45),
          s("Konaklama — Samet Nangshe", "1. gece viewpoint yakını otel.", 5, 10, 720),
        ],
        "Samet Nangshe / Phang Nga Town otel",
      ),
      leg(
        2,
        "Tekne turu ve dönüş",
        "Sabah erken körfez turu; öğleden sonra Patong.",
        ["Maymun Mağarası", "James Bond Adası", "Patong"],
        [
          s("Maymun Mağarası", "Wat Suwan Kuha tapınağı ve mağara.", 25, 35, 45, {
            destinationSlug: "monkey-cave",
          }),
          s("James Bond & Phang Nga Körfezi", "Surakul iskelesi tekne turu.", 20, 30, 180, {
            destinationSlug: "james-bond-island",
            access: "boat",
          }),
          s("Phang Nga Cave (Panak)", "İsteğe bağlı kano mağara turu.", 15, 20, 60, {
            destinationSlug: "phang-nga-cave",
            access: "boat",
          }),
          patongReturn(90, 110),
        ],
      ),
    ],
  },
  {
    id: "andaman-coast-discovery",
    tourDays: 2,
    name: "Andaman Sahili Keşfi 2 Gün",
    tagline: "Khao Lak, Similan kapısı, kuzey plajlar",
    routeLine: "Phuket → Khao Lak → Thap Lamu → Phuket",
    totalDriveKm: 340,
    driveTimeLabel: "~6 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "khao-lak",
    description:
      "Andaman kıyısının sakin kuzeyini iki günde motosikletle gezin. Khao Lak'ın uzun plajları, Tsunami Anıtı ve Thap Lamu iskelesi — Similan turları için ideal konaklama noktası.",
    highlights: "Khao Lak, Bang Niang plajı, Thap Lamu, Khao Sok yakını",
    recommendedBike: "Honda ADV 160 / Forza 350",
    bestTime: "Kasım–Nisan (Similan sezonu)",
    elevation: "~200 m",
    parkingInfo: "Otel ve iskele otoparkları ücretsiz",
    fuelEstimate: "~12 L · 520 THB",
    safetyTips: MOTO_SAFETY,
    legs: [
      leg(
        1,
        "Kuzey kıyıya",
        "Phuket'ten Khao Lak'a kıyı yolu.",
        ["Patong", "Thalang", "Khao Lak"],
        [
          patongStart(),
          s("Thalang Viewpoint", "Kuzey Phuket panoraması.", 25, 30, 30, {
            destinationSlug: "thalang-viewpoint",
          }),
          s("Khao Lak Merkez", "Plaj yürüyüşü ve akşam yemeği.", 85, 100, 90, {
            destinationSlug: "khao-lak",
          }),
          s("Bang Niang Plajı — Konaklama", "1. gece sahil oteli.", 5, 10, 720),
        ],
        "Khao Lak / Bang Niang otel",
      ),
      leg(
        2,
        "Similan kapısı ve dönüş",
        "Thap Lamu iskelesi; güneye dönüş.",
        ["Thap Lamu", "Takua Pa", "Patong"],
        [
          s("Thap Lamu İskelesi", "Similan tur kalkış noktası; sabah rezervasyon.", 25, 30, 60, {
            destinationSlug: "similan-islands",
          }),
          s("Takua Pa Eski Şehir", "Tarihi ahşap evler; öğle molası.", 30, 35, 45),
          s("Phang Nga — Yakıt", "Dönüş yolunda mola.", 50, 55, 20),
          patongReturn(110, 130),
        ],
      ),
    ],
  },
  {
    id: "samet-nangshe-sunrise",
    tourDays: 2,
    name: "Samet Nangshe Gün Doğumu 2 Gün",
    tagline: "Körfez manzarasında konaklama",
    routeLine: "Phuket → Samet Nangshe → Phang Nga → Phuket",
    totalDriveKm: 200,
    driveTimeLabel: "~4 saat toplam sürüş",
    difficulty: "Kolay",
    heroSlug: "samet-nangshe",
    description:
      "Minimal sürüş, maksimum manzara. Samet Nangshe'de bir gece kalın; sabah 05:30 gün doğumunu izleyin. Phang Nga körfezinin en ikonik viewpoint'i için ideal hafta sonu turu.",
    highlights: "Samet Nangshe, Gün doğumu, Phang Nga körfezi, Big Buddha",
    recommendedBike: "Honda ADV 160",
    bestTime: "Cuma akşamı veya cumartesi sabah çıkış",
    elevation: "~350 m",
    parkingInfo: "Otel otoparkı ücretsiz",
    fuelEstimate: "~8 L · 350 THB",
    safetyTips: MOTO_SAFETY,
    legs: [
      leg(
        1,
        "Viewpoint'e varış",
        "Öğleden sonra Samet Nangshe; gün batımı.",
        ["Patong", "Big Buddha", "Samet Nangshe"],
        [
          patongStart(),
          s("Big Buddha", "Yol üstü mola; Phuket panoraması.", 12, 20, 45, {
            destinationSlug: "big-buddha",
          }),
          s("Samet Nangshe Viewpoint", "Gün batımı ve konaklama.", 30, 45, 120, {
            destinationSlug: "samet-nangshe",
          }),
          s("Konaklama — Viewpoint", "1. gece çadır veya boutique otel.", 2, 5, 720),
        ],
        "Samet Nangshe viewpoint otel / çadır",
      ),
      leg(
        2,
        "Gün doğumu ve dönüş",
        "Sabah erken viewpoint; öğleden sonra dönüş.",
        ["Samet Nangshe", "Phang Nga Bay", "Patong"],
        [
          s("Samet Nangshe — Gün Doğumu", "05:30 kalkış; sisli körfez manzarası.", 0, 0, 90, {
            destinationSlug: "samet-nangshe",
          }),
          s("Phang Nga Bay Lookout", "Körfez fotoğraf noktası.", 20, 30, 45, {
            destinationSlug: "phang-nga-bay",
          }),
          s("Koh Panyee Manzarası", "Yol üstü durak; yüzen köy.", 15, 20, 30),
          patongReturn(40, 55),
        ],
      ),
    ],
  },
  {
    id: "khao-lak-coastal",
    tourDays: 2,
    name: "Khao Lak Kıyı Turu 2 Gün",
    tagline: "Plaj, şelale ve sakin kuzey",
    routeLine: "Phuket → Khao Lak → Lam Ru → Phuket",
    totalDriveKm: 220,
    driveTimeLabel: "~4,5 saat toplam sürüş",
    difficulty: "Kolay",
    heroSlug: "khao-lak",
    description:
      "Khao Lak'ın uzun kumsalları ve Lam Ru Milli Parkı şelalelerini iki günde keşfedin. Sakin tempo, plaj molaları ve az trafikli kıyı yolu — rahat bir motosiklet kaçamağı.",
    highlights: "Khao Lak plajları, Lam Ru şelalesi, Bang Niang, Sirinat",
    recommendedBike: "Honda ADV 160",
    bestTime: "Kasım–Nisan; hafta içi daha sakin",
    elevation: "~150 m",
    parkingInfo: "Plaj ve park otoparkları ücretsiz",
    fuelEstimate: "~8 L · 350 THB",
    safetyTips: MOTO_SAFETY,
    legs: [
      leg(
        1,
        "Khao Lak'a",
        "Kıyı yolu ile kuzeye; plaj molaları.",
        ["Patong", "Sirinat Park", "Khao Lak"],
        [
          patongStart(),
          s("Sirinat Milli Parkı", "Mai Khao plajı; uçak manzarası.", 35, 45, 45, {
            destinationSlug: "sirinat-national-park",
          }),
          s("Khao Lak Ana Plaj", "Uzun kumsal yürüyüşü.", 75, 90, 60, {
            destinationSlug: "khao-lak",
          }),
          s("Bang Niang — Konaklama", "1. gece sahil resort.", 5, 10, 720),
        ],
        "Khao Lak / Bang Niang otel",
      ),
      leg(
        2,
        "Şelale ve dönüş",
        "Lam Ru şelalesi sabah; Phuket'e dönüş.",
        ["Lam Ru", "Takua Pa", "Patong"],
        [
          s("Lam Ru Milli Parkı Şelalesi", "Orman içi kısa trekking.", 20, 25, 60),
          s("Takua Pa", "Öğle yemeği; yerel pazar.", 25, 30, 45),
          s("Phang Nga — Mola", "Dönüş yolunda yakıt.", 45, 50, 20),
          patongReturn(110, 125),
        ],
      ),
    ],
  },
];

// ─── 3-DAY ROUTES ───────────────────────────────────────────────────────────

const THREE_DAY: MultiRouteDef[] = [
  {
    id: "khao-sok-krabi-adventure",
    tourDays: 3,
    name: "Khao Sok + Krabi 3 Günlük Macera",
    tagline: "Orman, göl ve Krabi plajları",
    routeLine: "Phuket → Khao Sok → Krabi → Phuket",
    totalDriveKm: 500,
    driveTimeLabel: "~9 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "cheow-lan-lake",
    featured: true,
    description:
      "Güney Tayland'ın iki doğa harikasını üç günde birleştirin. Khao Sok ormanı ve Cheow Lan gölünden Krabi'nin Emerald Pool ve Ao Nang plajlarına — çok günlük kiralama için mükemmel program.",
    highlights: "Khao Sok, Cheow Lan, Tiger Cave, Emerald Pool, Ao Nang",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan; yağmurda orman yolu dikkat",
    elevation: "~800 m",
    parkingInfo: "Park, baraj ve otel otoparkları",
    fuelEstimate: "~20 L · 880 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Khao Sok'a varış", "Orman yolu ve köy konaklaması.", ["Patong", "Phang Nga", "Khao Sok"], [
        patongStart(),
        s("Phang Nga Town", "Öğle molası.", 55, 60, 30, { destinationSlug: "phang-nga-bay" }),
        s("Khao Sok Milli Park", "Park girişi ve orman yürüyüşü.", 75, 90, 90, { destinationSlug: "khao-sok-national-park" }),
        s("Khao Sok Köyü — Konaklama", "1. gece bungalov.", 0, 0, 720),
      ], "Khao Sok bungalov / raft"),
      leg(2, "Cheow Lan ve Krabi'ye", "Sabah göl turu; öğleden sonra Krabi.", ["Cheow Lan", "Krabi Town", "Ao Nang"], [
        s("Cheow Lan Gölü", "Tekne turu ve kaya formasyonları.", 15, 30, 180, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Krabi Town", "Şehir merkezi geçiş.", 120, 140, 45, { destinationSlug: "krabi-town" }),
        s("Tiger Cave", "Akşamüstü veya ertesi sabah için.", 12, 18, 90, { destinationSlug: "tiger-cave-krabi" }),
        s("Ao Nang — Konaklama", "2. gece plaj oteli.", 18, 25, 60, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(3, "Krabi ve dönüş", "Emerald Pool sabah; Phuket dönüşü.", ["Emerald Pool", "Hot Springs", "Patong"], [
        s("Emerald Pool", "Sabah erken yüzme.", 35, 45, 90, { destinationSlug: "emerald-pool" }),
        s("Hot Springs", "Sıcak kaynak molası.", 20, 30, 60, { destinationSlug: "hot-springs" }),
        s("Krabi — Yakıt", "Dönüş öncesi mola.", 10, 15, 20),
        patongReturn(155, 170),
      ]),
    ],
  },
  {
    id: "andaman-coast-explorer-3d",
    tourDays: 3,
    name: "Andaman Sahili 3 Günlük Keşif",
    tagline: "Phang Nga, Khao Lak, Krabi",
    routeLine: "Phuket → Phang Nga → Khao Lak → Krabi → Phuket",
    totalDriveKm: 480,
    driveTimeLabel: "~9 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "phang-nga-bay",
    description:
      "Andaman kıyısının tamamını üç günde motosikletle dolaşın. Phang Nga körfezi, Khao Lak plajları ve Krabi'nin doğa harikaları — dengeli tempo ve çeşitli konaklama seçenekleri.",
    highlights: "Phang Nga Körfezi, Khao Lak, Krabi, James Bond, Ao Nang",
    recommendedBike: "Honda ADV 160 / Forza 350",
    bestTime: "Kasım–Nisan",
    elevation: "~500 m",
    parkingInfo: "Otel ve iskele otoparkları",
    fuelEstimate: "~18 L · 790 THB",
    safetyTips: MOTO_SAFETY,
    legs: [
      leg(1, "Phang Nga körfezi", "Samet Nangshe ve körfez keşfi.", ["Patong", "Samet Nangshe", "Phang Nga"], [
        patongStart(),
        s("Samet Nangshe Viewpoint", "Gün batımı manzarası.", 35, 50, 90, { destinationSlug: "samet-nangshe" }),
        s("Maymun Mağarası", "Mağara tapınağı ziyareti.", 25, 35, 45, { destinationSlug: "monkey-cave" }),
        s("Phang Nga Town — Konaklama", "1. gece.", 20, 25, 720),
      ], "Phang Nga / Samet Nangshe otel"),
      leg(2, "Khao Lak ve kuzey", "Kıyı yolu ile Khao Lak.", ["James Bond", "Khao Lak", "Thap Lamu"], [
        s("James Bond Tekne Turu", "Surakul iskelesi sabah turu.", 20, 30, 180, { destinationSlug: "james-bond-island", access: "boat" }),
        s("Khao Lak", "Plaj ve öğle molası.", 70, 85, 90, { destinationSlug: "khao-lak" }),
        s("Thap Lamu", "Similan kapısı.", 25, 30, 45, { destinationSlug: "similan-islands" }),
        s("Takua Pa — Konaklama", "2. gece.", 15, 20, 720),
      ], "Khao Lak / Takua Pa otel"),
      leg(3, "Krabi ve dönüş", "Krabi kısa durak; Phuket.", ["Krabi Town", "Ao Nang", "Patong"], [
        s("Krabi Town", "Sabah pazarı.", 90, 100, 60, { destinationSlug: "krabi-town" }),
        s("Ao Nang", "Plaj molası.", 18, 25, 60, { destinationSlug: "ao-nang" }),
        s("Phang Nga — Yakıt", "Dönüş yolu molası.", 80, 90, 20),
        patongReturn(90, 110),
      ]),
    ],
  },
  {
    id: "phang-nga-khao-sok-discovery",
    tourDays: 3,
    name: "Phang Nga + Khao Sok 3 Gün",
    tagline: "Körfez ve yağmur ormanı",
    routeLine: "Phuket → Phang Nga → Khao Sok → Phuket",
    totalDriveKm: 430,
    driveTimeLabel: "~8 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "khao-sok-national-park",
    description:
      "Phang Nga körfezinin tekne turları ile Khao Sok'un yağmur ormanını üç günde birleştirin. İki farklı doğa deneyimi, bir motosiklet turu — konaklamalı keşif için ideal.",
    highlights: "Samet Nangshe, James Bond, Khao Sok, Cheow Lan, Maymun Mağarası",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan; orman yolu için kuru sezon",
    elevation: "~800 m",
    parkingInfo: "İskele, park ve otel otoparkları",
    fuelEstimate: "~16 L · 700 THB + tekne",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Körfeze giriş", "Samet Nangshe ve konaklama.", ["Patong", "Samet Nangshe", "Phang Nga"], [
        patongStart(),
        s("Samet Nangshe Viewpoint", "Gün batımı.", 35, 50, 90, { destinationSlug: "samet-nangshe" }),
        s("Phang Nga Bay", "Körfez manzarası.", 20, 30, 45, { destinationSlug: "phang-nga-bay" }),
        s("Konaklama — Phang Nga", "1. gece.", 15, 20, 720),
      ], "Samet Nangshe / Phang Nga otel"),
      leg(2, "Tekne ve Khao Sok", "Sabah körfez; öğleden sonra orman.", ["James Bond", "Khao Sok", "Cheow Lan"], [
        s("James Bond Tekne Turu", "Sabah erken tur.", 20, 30, 180, { destinationSlug: "james-bond-island", access: "boat" }),
        s("Khao Sok Milli Park", "Orman girişi.", 80, 95, 60, { destinationSlug: "khao-sok-national-park" }),
        s("Khao Sok Köyü — Konaklama", "2. gece bungalov.", 0, 0, 720),
      ], "Khao Sok bungalov"),
      leg(3, "Göl ve dönüş", "Cheow Lan sabah; Phuket.", ["Cheow Lan", "Phang Nga", "Patong"], [
        s("Cheow Lan Gölü", "Kısa tekne turu.", 15, 30, 120, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Phang Nga — Mola", "Dönüş yolu.", 70, 80, 30),
        s("Big Buddha", "Son mola.", 50, 55, 30, { destinationSlug: "big-buddha" }),
        patongReturn(12, 20),
      ]),
    ],
  },
  {
    id: "krabi-ultimate-explorer",
    tourDays: 3,
    name: "Krabi Ultimate 3 Gün",
    tagline: "Tüm Krabi durakları",
    routeLine: "Phuket → Krabi → Railay → Phuket",
    totalDriveKm: 420,
    driveTimeLabel: "~8 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "railay-beach",
    description:
      "Krabi'nin tüm öne çıkan duraklarını üç günde tamamlayın. Tiger Cave, Emerald Pool, Hot Springs ve Railay plajı — motosikletle gidiş, longtail ile Railay macerası.",
    highlights: "Tiger Cave, Emerald Pool, Hot Springs, Railay, Ao Nang, Krabi Town",
    recommendedBike: "Honda ADV 160 / Forza 350",
    bestTime: "Kasım–Nisan",
    elevation: "~700 m",
    parkingInfo: "Ao Nang moto park; Railay için longtail",
    fuelEstimate: "~16 L · 700 THB + tekne",
    safetyTips: MOTO_SAFETY,
    legs: [
      leg(1, "Krabi'ye varış", "Ao Nang konaklama.", ["Patong", "Krabi Town", "Ao Nang"], [
        patongStart(),
        s("Krabi Town", "Şehir turu.", 155, 170, 60, { destinationSlug: "krabi-town" }),
        s("Ao Nang", "Plaj ve konaklama.", 18, 25, 90, { destinationSlug: "ao-nang" }),
        s("Ao Nang Gece Pazarı", "Akşam yemeği.", 2, 5, 60),
      ], "Ao Nang otel"),
      leg(2, "Doğa günü", "Tiger Cave, Emerald Pool, Hot Springs.", ["Tiger Cave", "Emerald Pool", "Hot Springs"], [
        s("Tiger Cave", "Sabah erken tırmanış.", 12, 18, 120, { destinationSlug: "tiger-cave-krabi" }),
        s("Emerald Pool", "Yüzme ve piknik.", 35, 45, 90, { destinationSlug: "emerald-pool" }),
        s("Hot Springs", "Sıcak kaynak.", 20, 30, 90, { destinationSlug: "hot-springs" }),
        s("Ao Nang — Dönüş", "Akşam plaj.", 55, 65, 60, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(3, "Railay ve dönüş", "Longtail ile Railay; Phuket.", ["Railay", "Krabi", "Patong"], [
        s("Railay Plajı", "Longtail ile kireçtaşı plajı.", 8, 15, 180, { destinationSlug: "railay-beach", access: "boat" }),
        s("Krabi Town", "Öğle molası.", 20, 25, 45, { destinationSlug: "krabi-town" }),
        s("Phang Nga — Yakıt", "Dönüş yolu.", 80, 90, 20),
        patongReturn(90, 110),
      ]),
    ],
  },
  {
    id: "ultimate-south-adventure",
    tourDays: 3,
    name: "Güney Ultimate 3 Günlük Macera",
    tagline: "Phang Nga, Khao Sok ve Krabi bir arada",
    routeLine: "Phuket → Phang Nga → Khao Sok → Krabi → Phuket",
    totalDriveKm: 520,
    driveTimeLabel: "~10 saat toplam sürüş",
    difficulty: "Zor",
    heroSlug: "emerald-pool",
    featured: true,
    description:
      "Güney Tayland'ın en iyi üç bölgesini üç günde motosikletle kapsayın. Yoğun ama ödüllendirici program — her gün farklı bir manzara ve deneyim.",
    highlights: "Phang Nga, Khao Sok, Cheow Lan, Krabi, Emerald Pool",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan; fit sürücüler için",
    elevation: "~800 m",
    parkingInfo: "Tüm duraklarda moto park mevcut",
    fuelEstimate: "~22 L · 970 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phang Nga keşfi", "Körfez ve konaklama.", ["Patong", "Samet Nangshe", "Phang Nga"], [
        patongStart(),
        s("Samet Nangshe", "Viewpoint molası.", 35, 50, 60, { destinationSlug: "samet-nangshe" }),
        s("Maymun Mağarası", "Mağara tapınağı.", 25, 35, 45, { destinationSlug: "monkey-cave" }),
        s("Phang Nga — Konaklama", "1. gece.", 20, 25, 720),
      ], "Phang Nga otel"),
      leg(2, "Khao Sok", "Orman ve göl.", ["Khao Sok", "Cheow Lan"], [
        s("Khao Sok Milli Park", "Orman yürüyüşü.", 80, 95, 90, { destinationSlug: "khao-sok-national-park" }),
        s("Cheow Lan Gölü", "Tekne turu.", 15, 30, 150, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Khao Sok — Konaklama", "2. gece.", 0, 0, 720),
      ], "Khao Sok bungalov"),
      leg(3, "Krabi ve dönüş", "Hızlı Krabi; Phuket.", ["Krabi", "Emerald Pool", "Patong"], [
        s("Emerald Pool", "Sabah yüzme.", 100, 115, 75, { destinationSlug: "emerald-pool" }),
        s("Krabi Town", "Öğle molası.", 40, 45, 30, { destinationSlug: "krabi-town" }),
        s("Phang Nga — Yakıt", "Son yakıt.", 80, 90, 15),
        patongReturn(90, 110),
      ]),
    ],
  },
];

// ─── 4-DAY ROUTES ───────────────────────────────────────────────────────────

const FOUR_DAY: MultiRouteDef[] = [
  {
    id: "ultimate-phuket-loop",
    tourDays: 4,
    name: "Ultimate Phuket 4 Günlük Tur",
    tagline: "Tüm Phuket: plaj, kültür, manzara",
    routeLine: "Phuket → Kuzey → Güney → Doğu → Patong",
    totalDriveKm: 700,
    driveTimeLabel: "~12 saat toplam sürüş",
    difficulty: "Kolay",
    heroSlug: "big-buddha",
    featured: true,
    description:
      "Phuket'i dört günde baştan sona motosikletle keşfedin. Her gün farklı bir bölge: kuzey plajlar, güney manzaralar, eski şehir ve gizli köşeler. Adada konaklayarak tam bir Phuket deneyimi.",
    highlights: "Big Buddha, Old Town, Kata, Promthep, Bang Tao, Sirinat",
    recommendedBike: "Honda ADV 160 / Forza 350",
    bestTime: "Kasım–Nisan; her gün sabah erken",
    elevation: "~500 m",
    parkingInfo: "Tüm plaj ve tapınak otoparkları ücretsiz",
    fuelEstimate: "~22 L · 970 THB",
    safetyTips: MOTO_SAFETY,
    legs: [
      leg(1, "Güney Phuket", "Big Buddha, Chalong, güney plajlar.", ["Patong", "Big Buddha", "Promthep Cape", "Rawai"], [
        patongStart(),
        s("Big Buddha", "Sabah panoramik manzara.", 12, 20, 60, { destinationSlug: "big-buddha" }),
        s("Wat Chalong", "Ana tapınak kompleksi.", 8, 12, 45, { destinationSlug: "wat-chalong" }),
        s("Promthep Cape", "Gün batımı noktası.", 15, 20, 60, { destinationSlug: "promthep-cape" }),
        s("Rawai — Konaklama", "1. gece güney.", 10, 15, 720, { destinationSlug: "rawai-beach" }),
      ], "Rawai / Nai Harn otel"),
      leg(2, "Batı plajlar", "Kata, Karon, Patong dışı batı.", ["Kata", "Karon", "Kamala", "Bang Tao"], [
        s("Kata Viewpoint", "Üç plaj manzarası.", 12, 18, 30, { destinationSlug: "karon-viewpoint" }),
        s("Kata & Karon Plajları", "Yüzme molası.", 5, 10, 90, { destinationSlug: "kata-beach" }),
        s("Kamala Plajı", "Sakin kumsal.", 12, 18, 45, { destinationSlug: "kamala-beach" }),
        s("Bang Tao — Konaklama", "2. gece.", 10, 15, 720, { destinationSlug: "bang-tao-beach" }),
      ], "Bang Tao / Laguna otel"),
      leg(3, "Kuzey ve eski şehir", "Sirinat, Old Town.", ["Sirinat", "Old Phuket Town", "Monkey Hill"], [
        s("Sirinat Milli Parkı", "Mai Khao plajı.", 25, 35, 60, { destinationSlug: "sirinat-national-park" }),
        s("Old Phuket Town", "Sino-Portekiz mimarisi.", 35, 45, 120, { destinationSlug: "old-phuket-town" }),
        s("Monkey Hill", "Maymunlar ve şehir manzarası.", 8, 12, 45, { destinationSlug: "monkey-hill" }),
        s("Phuket Town — Konaklama", "3. gece.", 5, 10, 720),
      ], "Phuket Old Town butik otel"),
      leg(4, "Doğu ve dönüş", "Şelale, doğu kıyısı, Patong.", ["Bang Pae", "Cape Panwa", "Patong"], [
        s("Bang Pae Şelalesi", "Orman şelalesi.", 25, 35, 60, { destinationSlug: "bang-pae-waterfall" }),
        s("Cape Panwa", "Deniz feneri manzarası.", 30, 40, 45),
        s("Windmill Viewpoint", "Yalıkavak manzarası.", 15, 20, 30, { destinationSlug: "windmill-viewpoint" }),
        patongReturn(18, 25),
      ]),
    ],
  },
  {
    id: "andaman-coast-grand-tour",
    tourDays: 4,
    name: "Andaman Sahili 4 Günlük Grand Tur",
    tagline: "Phang Nga'dan Krabi'ye tam kıyı",
    routeLine: "Phuket → Phang Nga → Khao Lak → Krabi → Phuket",
    totalDriveKm: 850,
    driveTimeLabel: "~15 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "phang-nga-bay",
    description:
      "Andaman kıyısının tamamını dört günde motosikletle gezin. Phang Nga körfezinden Khao Lak'ın sakin plajlarına, Krabi'nin doğa harikalarına — kapsamlı bir güney turu.",
    highlights: "Phang Nga, James Bond, Khao Lak, Krabi, Emerald Pool, Ao Nang",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan",
    elevation: "~700 m",
    parkingInfo: "Otel ve park otoparkları",
    fuelEstimate: "~28 L · 1230 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phang Nga", "Körfez keşfi.", ["Patong", "Samet Nangshe", "Phang Nga"], [
        patongStart(),
        s("Samet Nangshe", "Viewpoint.", 35, 50, 90, { destinationSlug: "samet-nangshe" }),
        s("Maymun Mağarası", "Mağara tapınağı.", 25, 35, 45, { destinationSlug: "monkey-cave" }),
        s("Phang Nga — Konaklama", "1. gece.", 20, 25, 720),
      ], "Phang Nga otel"),
      leg(2, "Khao Lak", "Kuzey kıyı.", ["James Bond", "Khao Lak", "Thap Lamu"], [
        s("James Bond Tekne", "Sabah turu.", 20, 30, 180, { destinationSlug: "james-bond-island", access: "boat" }),
        s("Khao Lak", "Plaj günü.", 70, 85, 120, { destinationSlug: "khao-lak" }),
        s("Thap Lamu", "İskele molası.", 25, 30, 45, { destinationSlug: "similan-islands" }),
        s("Khao Lak — Konaklama", "2. gece.", 5, 10, 720),
      ], "Khao Lak otel"),
      leg(3, "Krabi", "Doğa durakları.", ["Krabi Town", "Tiger Cave", "Ao Nang"], [
        s("Krabi Town", "Şehir merkezi.", 90, 100, 60, { destinationSlug: "krabi-town" }),
        s("Tiger Cave", "Manzara tırmanışı.", 12, 18, 90, { destinationSlug: "tiger-cave-krabi" }),
        s("Ao Nang — Konaklama", "3. gece.", 18, 25, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(4, "Krabi ve dönüş", "Emerald Pool; Phuket.", ["Emerald Pool", "Hot Springs", "Patong"], [
        s("Emerald Pool", "Sabah yüzme.", 35, 45, 90, { destinationSlug: "emerald-pool" }),
        s("Hot Springs", "Sıcak kaynak.", 20, 30, 60, { destinationSlug: "hot-springs" }),
        s("Phang Nga — Mola", "Dönüş yolu.", 80, 90, 30),
        patongReturn(90, 110),
      ]),
    ],
  },
  {
    id: "khao-sok-gulf-coast",
    tourDays: 4,
    name: "Khao Sok + Körfez 4 Gün",
    tagline: "Orman, göl ve Andaman kıyısı",
    routeLine: "Phuket → Khao Sok → Khao Lak → Phang Nga → Phuket",
    totalDriveKm: 900,
    driveTimeLabel: "~16 saat toplam sürüş",
    difficulty: "Zor",
    heroSlug: "cheow-lan-lake",
    description:
      "Khao Sok'un yağmur ormanı ile Andaman kıyısını dört günde birleştirin. Cheow Lan gölü, Khao Lak plajları ve Phang Nga körfezi — doğa tutkunları için kapsamlı program.",
    highlights: "Khao Sok, Cheow Lan, Khao Lak, Phang Nga, James Bond",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan; orman yolu için kuru sezon şart",
    elevation: "~800 m",
    parkingInfo: "Park, baraj ve otel otoparkları",
    fuelEstimate: "~30 L · 1320 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Khao Sok", "Orman varışı.", ["Patong", "Phang Nga", "Khao Sok"], [
        patongStart(),
        s("Phang Nga Town", "Öğle molası.", 55, 60, 30, { destinationSlug: "phang-nga-bay" }),
        s("Khao Sok Milli Park", "Orman girişi.", 75, 90, 90, { destinationSlug: "khao-sok-national-park" }),
        s("Khao Sok — Konaklama", "1. gece.", 0, 0, 720),
      ], "Khao Sok bungalov"),
      leg(2, "Cheow Lan", "Göl turu.", ["Cheow Lan", "Ton Prai", "Khao Lak"], [
        s("Cheow Lan Gölü", "Tam gün tekne turu.", 15, 30, 240, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Ton Prai Şelalesi", "Serinleme molası.", 8, 15, 45, { destinationSlug: "ton-prai-waterfall" }),
        s("Khao Lak — Konaklama", "2. gece sahil.", 90, 105, 720, { destinationSlug: "khao-lak" }),
      ], "Khao Lak otel"),
      leg(3, "Khao Lak ve Phang Nga", "Kıyı ve körfez.", ["Khao Lak", "Thap Lamu", "Phang Nga"], [
        s("Khao Lak Plajları", "Sabah yüzme.", 5, 10, 90, { destinationSlug: "khao-lak" }),
        s("Thap Lamu", "İskele.", 25, 30, 45, { destinationSlug: "similan-islands" }),
        s("Samet Nangshe", "Gün batımı.", 60, 70, 60, { destinationSlug: "samet-nangshe" }),
        s("Phang Nga — Konaklama", "3. gece.", 20, 25, 720),
      ], "Phang Nga otel"),
      leg(4, "Körfez ve dönüş", "Tekne turu; Phuket.", ["James Bond", "Maymun Mağarası", "Patong"], [
        s("James Bond Tekne", "Sabah turu.", 20, 30, 180, { destinationSlug: "james-bond-island", access: "boat" }),
        s("Maymun Mağarası", "Mağara ziyareti.", 25, 35, 45, { destinationSlug: "monkey-cave" }),
        s("Big Buddha", "Son mola.", 50, 55, 30, { destinationSlug: "big-buddha" }),
        patongReturn(12, 20),
      ]),
    ],
  },
  {
    id: "southern-thailand-discovery",
    tourDays: 4,
    name: "Güney Tayland Keşfi 4 Gün",
    tagline: "Krabi, Lanta kapısı, Phang Nga",
    routeLine: "Phuket → Krabi → Lanta → Phang Nga → Phuket",
    totalDriveKm: 800,
    driveTimeLabel: "~14 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "lanta-island",
    description:
      "Güney Tayland'ın çeşitli yüzlerini dört günde keşfedin. Krabi'nin doğası, Koh Lanta feribot kapısı ve Phang Nga körfezi — ada ve kıyı kombinasyonu.",
    highlights: "Krabi, Emerald Pool, Railay, Lanta feribot, Phang Nga",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan",
    elevation: "~600 m",
    parkingInfo: "Feribot iskelesi moto park mevcut",
    fuelEstimate: "~26 L · 1140 THB + feribot",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Krabi varış", "Ao Nang konaklama.", ["Patong", "Krabi Town", "Ao Nang"], [
        patongStart(),
        s("Krabi Town", "Şehir turu.", 155, 170, 60, { destinationSlug: "krabi-town" }),
        s("Tiger Cave", "Manzara.", 12, 18, 90, { destinationSlug: "tiger-cave-krabi" }),
        s("Ao Nang — Konaklama", "1. gece.", 18, 25, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(2, "Krabi doğa", "Emerald Pool ve Railay.", ["Emerald Pool", "Hot Springs", "Railay"], [
        s("Emerald Pool", "Sabah yüzme.", 35, 45, 90, { destinationSlug: "emerald-pool" }),
        s("Hot Springs", "Sıcak kaynak.", 20, 30, 60, { destinationSlug: "hot-springs" }),
        s("Railay Plajı", "Longtail turu.", 8, 15, 150, { destinationSlug: "railay-beach", access: "boat" }),
        s("Ao Nang", "Akşam.", 8, 15, 60, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(3, "Lanta kapısı", "Hua Hin Pier ve Phang Nga.", ["Hua Hin Pier", "Lanta", "Phang Nga"], [
        s("Hua Hin Pier (Lanta)", "Feribot kalkış noktası; moto park.", 50, 60, 60, { destinationSlug: "lanta-island" }),
        s("Khlong Thom", "Yol üstü mola.", 30, 35, 30),
        s("Samet Nangshe", "Viewpoint.", 80, 90, 60, { destinationSlug: "samet-nangshe" }),
        s("Phang Nga — Konaklama", "3. gece.", 20, 25, 720),
      ], "Phang Nga otel"),
      leg(4, "Körfez ve dönüş", "Phang Nga; Phuket.", ["Maymun Mağarası", "Phang Nga Bay", "Patong"], [
        s("Maymun Mağarası", "Sabah ziyaret.", 25, 35, 45, { destinationSlug: "monkey-cave" }),
        s("Phang Nga Bay", "Körfez manzarası.", 15, 20, 45, { destinationSlug: "phang-nga-bay" }),
        s("Big Buddha", "Mola.", 50, 55, 30, { destinationSlug: "big-buddha" }),
        patongReturn(12, 20),
      ]),
    ],
  },
];

// ─── 5-DAY ROUTES ───────────────────────────────────────────────────────────

const FIVE_DAY: MultiRouteDef[] = [
  {
    id: "southern-thailand-grand-tour",
    tourDays: 5,
    name: "Güney Tayland Grand Tur 5 Gün",
    tagline: "Phang Nga, Khao Sok, Krabi, Lanta",
    routeLine: "Phuket → Phang Nga → Khao Sok → Krabi → Lanta → Phuket",
    totalDriveKm: 1050,
    driveTimeLabel: "~18 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "khao-sok-national-park",
    featured: true,
    description:
      "Güney Tayland'ın en iyi duraklarını beş günde motosikletle kapsayın. Rahat tempo, her gece farklı konaklama — çok günlük kiralama ile tam bir güney keşfi.",
    highlights: "Phang Nga, Khao Sok, Cheow Lan, Krabi, Lanta, Emerald Pool",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan",
    elevation: "~800 m",
    parkingInfo: "Tüm duraklarda moto park",
    fuelEstimate: "~35 L · 1540 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phang Nga", "Körfez keşfi.", ["Patong", "Samet Nangshe", "Phang Nga"], [
        patongStart(),
        s("Samet Nangshe", "Viewpoint.", 35, 50, 90, { destinationSlug: "samet-nangshe" }),
        s("Maymun Mağarası", "Mağara.", 25, 35, 45, { destinationSlug: "monkey-cave" }),
        s("Phang Nga — Konaklama", "1. gece.", 20, 25, 720),
      ], "Phang Nga otel"),
      leg(2, "Khao Sok", "Orman.", ["James Bond", "Khao Sok"], [
        s("James Bond Tekne", "Sabah turu.", 20, 30, 180, { destinationSlug: "james-bond-island", access: "boat" }),
        s("Khao Sok Milli Park", "Orman yürüyüşü.", 80, 95, 90, { destinationSlug: "khao-sok-national-park" }),
        s("Khao Sok — Konaklama", "2. gece.", 0, 0, 720),
      ], "Khao Sok bungalov"),
      leg(3, "Cheow Lan", "Göl turu.", ["Cheow Lan", "Khao Lak"], [
        s("Cheow Lan Gölü", "Tekne turu.", 15, 30, 240, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Ton Prai Şelalesi", "Serinleme.", 8, 15, 45, { destinationSlug: "ton-prai-waterfall" }),
        s("Khao Lak — Konaklama", "3. gece.", 90, 105, 720, { destinationSlug: "khao-lak" }),
      ], "Khao Lak otel"),
      leg(4, "Krabi", "Doğa günü.", ["Krabi Town", "Tiger Cave", "Ao Nang"], [
        s("Krabi Town", "Şehir.", 90, 100, 60, { destinationSlug: "krabi-town" }),
        s("Tiger Cave", "Tırmanış.", 12, 18, 90, { destinationSlug: "tiger-cave-krabi" }),
        s("Emerald Pool", "Yüzme.", 35, 45, 90, { destinationSlug: "emerald-pool" }),
        s("Ao Nang — Konaklama", "4. gece.", 55, 65, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(5, "Lanta ve dönüş", "Feribot kapısı; Phuket.", ["Lanta Pier", "Hot Springs", "Patong"], [
        s("Hua Hin Pier (Lanta)", "Feribot noktası.", 50, 60, 60, { destinationSlug: "lanta-island" }),
        s("Hot Springs", "Son doğa molası.", 40, 45, 60, { destinationSlug: "hot-springs" }),
        s("Phang Nga — Yakıt", "Dönüş yolu.", 80, 90, 20),
        patongReturn(90, 110),
      ]),
    ],
  },
  {
    id: "andaman-coast-complete",
    tourDays: 5,
    name: "Andaman Sahili Komple 5 Gün",
    tagline: "Körfezden Krabi'ye tam program",
    routeLine: "Phuket → Phang Nga → Khao Lak → Krabi → Railay → Phuket",
    totalDriveKm: 1250,
    driveTimeLabel: "~22 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "railay-beach",
    description:
      "Andaman kıyısının her köşesini beş günde motosikletle gezin. Tekne turları, plaj molaları ve doğa durakları — kapsamlı kıyı turu.",
    highlights: "James Bond, Khao Lak, Similan kapısı, Krabi, Railay, Emerald Pool",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan",
    elevation: "~700 m",
    parkingInfo: "Otel ve iskele otoparkları",
    fuelEstimate: "~40 L · 1760 THB + tekne",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phang Nga başlangıç", "Körfez.", ["Patong", "Samet Nangshe", "Phang Nga"], [
        patongStart(),
        s("Samet Nangshe", "Gün batımı.", 35, 50, 90, { destinationSlug: "samet-nangshe" }),
        s("Phang Nga Bay", "Körfez.", 20, 30, 45, { destinationSlug: "phang-nga-bay" }),
        s("Phang Nga — Konaklama", "1. gece.", 15, 20, 720),
      ], "Phang Nga otel"),
      leg(2, "Tekne ve Khao Lak", "James Bond; kuzey.", ["James Bond", "Khao Lak", "Thap Lamu"], [
        s("James Bond Tekne", "Tam gün turu.", 20, 30, 240, { destinationSlug: "james-bond-island", access: "boat" }),
        s("Khao Lak", "Akşam plaj.", 70, 85, 60, { destinationSlug: "khao-lak" }),
        s("Thap Lamu", "İskele.", 25, 30, 30, { destinationSlug: "similan-islands" }),
        s("Khao Lak — Konaklama", "2. gece.", 5, 10, 720),
      ], "Khao Lak otel"),
      leg(3, "Krabi varış", "Şehir ve Tiger Cave.", ["Krabi Town", "Tiger Cave", "Ao Nang"], [
        s("Krabi Town", "Şehir turu.", 90, 100, 90, { destinationSlug: "krabi-town" }),
        s("Tiger Cave", "Manzara.", 12, 18, 90, { destinationSlug: "tiger-cave-krabi" }),
        s("Ao Nang — Konaklama", "3. gece.", 18, 25, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(4, "Krabi doğa", "Emerald Pool ve Railay.", ["Emerald Pool", "Hot Springs", "Railay"], [
        s("Emerald Pool", "Sabah.", 35, 45, 90, { destinationSlug: "emerald-pool" }),
        s("Hot Springs", "Sıcak kaynak.", 20, 30, 90, { destinationSlug: "hot-springs" }),
        s("Railay Plajı", "Longtail.", 8, 15, 180, { destinationSlug: "railay-beach", access: "boat" }),
        s("Ao Nang", "Akşam.", 8, 15, 60, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(5, "Dönüş", "Phuket.", ["Krabi", "Phang Nga", "Patong"], [
        s("Krabi Town", "Son alışveriş.", 18, 25, 45, { destinationSlug: "krabi-town" }),
        s("Phang Nga — Mola", "Yol üstü.", 80, 90, 30),
        s("Big Buddha", "Mola.", 50, 55, 30, { destinationSlug: "big-buddha" }),
        patongReturn(12, 20),
      ]),
    ],
  },
  {
    id: "khao-sok-gulf-expedition",
    tourDays: 5,
    name: "Khao Sok + Körfez Expedition 5 Gün",
    tagline: "Orman, göl ve tam Andaman",
    routeLine: "Phuket → Khao Sok → Cheow Lan → Khao Lak → Phang Nga → Phuket",
    totalDriveKm: 1300,
    driveTimeLabel: "~23 saat toplam sürüş",
    difficulty: "Zor",
    heroSlug: "cheow-lan-lake",
    description:
      "Khao Sok ormanını Andaman kıyısıyla beş günde derinlemesine keşfedin. İki gece orman, üç gece kıyı — doğa tutkunları için expedition tarzı tur.",
    highlights: "Khao Sok, Cheow Lan, Ton Prai, Khao Lak, Phang Nga, James Bond",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan; yağmurda orman yolu riskli",
    elevation: "~800 m",
    parkingInfo: "Park ve otel otoparkları",
    fuelEstimate: "~42 L · 1850 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Khao Sok varış", "Orman.", ["Patong", "Phang Nga", "Khao Sok"], [
        patongStart(),
        s("Phang Nga Town", "Mola.", 55, 60, 30, { destinationSlug: "phang-nga-bay" }),
        s("Khao Sok Milli Park", "Giriş.", 75, 90, 90, { destinationSlug: "khao-sok-national-park" }),
        s("Khao Sok — Konaklama", "1. gece.", 0, 0, 720),
      ], "Khao Sok bungalov"),
      leg(2, "Cheow Lan", "Göl.", ["Cheow Lan", "Ton Prai"], [
        s("Cheow Lan Gölü", "Tam gün tekne.", 15, 30, 300, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Ton Prai Şelalesi", "Şelale.", 8, 15, 60, { destinationSlug: "ton-prai-waterfall" }),
        s("Khao Sok — Konaklama", "2. gece.", 0, 0, 720),
      ], "Khao Sok raft / bungalov"),
      leg(3, "Khao Lak", "Kıyıya iniş.", ["Khao Lak", "Thap Lamu", "Similan"], [
        s("Khao Lak", "Plaj günü.", 90, 105, 120, { destinationSlug: "khao-lak" }),
        s("Thap Lamu", "İskele.", 25, 30, 45, { destinationSlug: "similan-islands" }),
        s("Takua Pa", "Eski şehir.", 30, 35, 45),
        s("Khao Lak — Konaklama", "3. gece.", 30, 35, 720),
      ], "Khao Lak otel"),
      leg(4, "Phang Nga", "Körfez.", ["Samet Nangshe", "James Bond", "Phang Nga"], [
        s("Samet Nangshe", "Viewpoint.", 60, 70, 90, { destinationSlug: "samet-nangshe" }),
        s("James Bond Tekne", "Körfez turu.", 20, 30, 180, { destinationSlug: "james-bond-island", access: "boat" }),
        s("Maymun Mağarası", "Mağara.", 25, 35, 45, { destinationSlug: "monkey-cave" }),
        s("Phang Nga — Konaklama", "4. gece.", 15, 20, 720),
      ], "Phang Nga otel"),
      leg(5, "Dönüş", "Phuket.", ["Phang Nga Cave", "Big Buddha", "Patong"], [
        s("Phang Nga Cave", "Kano turu.", 15, 20, 60, { destinationSlug: "phang-nga-cave", access: "boat" }),
        s("Big Buddha", "Mola.", 50, 55, 30, { destinationSlug: "big-buddha" }),
        s("Karon Viewpoint", "Son manzara.", 8, 12, 30, { destinationSlug: "karon-viewpoint" }),
        patongReturn(10, 15),
      ]),
    ],
  },
  {
    id: "luxury-south-thailand",
    tourDays: 5,
    name: "Lüks Güney Tayland 5 Gün",
    tagline: "Premium konaklama ve seçkin duraklar",
    routeLine: "Phuket → Bang Tao → Phang Nga → Khao Lak → Krabi → Patong",
    totalDriveKm: 900,
    driveTimeLabel: "~16 saat toplam sürüş",
    difficulty: "Kolay",
    heroSlug: "bang-tao-beach",
    description:
      "Güney Tayland'ı lüks konaklama ve seçkin duraklarla beş günde keşfedin. Rahat tempo, resort molaları ve premium deneyimler — konforlu çok günlük tur.",
    highlights: "Bang Tao, Sirinat, Khao Lak resort, Krabi, Ao Nang",
    recommendedBike: "Honda Forza 350",
    bestTime: "Kasım–Nisan; hafta içi daha sakin",
    elevation: "~400 m",
    parkingInfo: "Resort vale ve otopark",
    fuelEstimate: "~30 L · 1320 THB",
    safetyTips: MOTO_SAFETY,
    legs: [
      leg(1, "Batı Phuket", "Bang Tao lüks.", ["Patong", "Surin", "Bang Tao"], [
        patongStart(),
        s("Surin Plajı", "Sakin plaj.", 15, 20, 45, { destinationSlug: "surin-beach" }),
        s("Bang Tao Plajı", "Uzun kumsal.", 8, 12, 90, { destinationSlug: "bang-tao-beach" }),
        s("Bang Tao — Konaklama", "1. gece resort.", 2, 5, 720),
      ], "Bang Tao / Laguna resort"),
      leg(2, "Kuzey ve Phang Nga", "Sirinat ve körfez.", ["Sirinat", "Samet Nangshe", "Phang Nga"], [
        s("Sirinat Milli Parkı", "Mai Khao.", 30, 40, 60, { destinationSlug: "sirinat-national-park" }),
        s("Samet Nangshe", "Viewpoint.", 50, 60, 60, { destinationSlug: "samet-nangshe" }),
        s("Phang Nga — Konaklama", "2. gece boutique.", 20, 25, 720),
      ], "Phang Nga boutique otel"),
      leg(3, "Khao Lak", "Resort günü.", ["Khao Lak", "Thap Lamu"], [
        s("Khao Lak", "Spa ve plaj.", 70, 85, 180, { destinationSlug: "khao-lak" }),
        s("Thap Lamu", "İskele yürüyüşü.", 25, 30, 45, { destinationSlug: "similan-islands" }),
        s("Khao Lak — Konaklama", "3. gece resort.", 25, 30, 720),
      ], "Khao Lak beach resort"),
      leg(4, "Krabi", "Ao Nang.", ["Krabi Town", "Ao Nang", "Railay"], [
        s("Krabi Town", "Öğle.", 90, 100, 60, { destinationSlug: "krabi-town" }),
        s("Ao Nang", "Plaj.", 18, 25, 90, { destinationSlug: "ao-nang" }),
        s("Railay Plajı", "Longtail.", 8, 15, 120, { destinationSlug: "railay-beach", access: "boat" }),
        s("Ao Nang — Konaklama", "4. gece.", 8, 15, 720),
      ], "Ao Nang resort"),
      leg(5, "Dönüş", "Phuket.", ["Emerald Pool", "Patong"], [
        s("Emerald Pool", "Sabah yüzme.", 35, 45, 75, { destinationSlug: "emerald-pool" }),
        s("Big Buddha", "Mola.", 100, 110, 30, { destinationSlug: "big-buddha" }),
        s("Old Phuket Town", "Kahve molası.", 15, 20, 45, { destinationSlug: "old-phuket-town" }),
        patongReturn(12, 18),
      ]),
    ],
  },
  {
    id: "phuket-to-satun",
    tourDays: 5,
    name: "Phuket'ten Satun'a 5 Gün",
    tagline: "Güney sınırına uzun yol",
    routeLine: "Phuket → Krabi → Trang → Satun → Phuket",
    totalDriveKm: 1150,
    driveTimeLabel: "~20 saat toplam sürüş",
    difficulty: "Zor",
    heroSlug: "lanta-island",
    description:
      "Phuket'ten Tayland'ın güney sınırına kadar beş günde motosikletle yolculuk. Krabi, Trang ve Satun üzerinden geri dönüş — uzun yol deneyimi arayanlar için.",
    highlights: "Krabi, Lanta kapısı, Trang, Satun, Emerald Pool, güney kıyısı",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan; uzun günlük sürüş",
    elevation: "~600 m",
    parkingInfo: "Otel ve benzin istasyonu otoparkları",
    fuelEstimate: "~38 L · 1670 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Krabi", "İlk gece.", ["Patong", "Krabi Town", "Ao Nang"], [
        patongStart(),
        s("Krabi Town", "Şehir.", 155, 170, 60, { destinationSlug: "krabi-town" }),
        s("Tiger Cave", "Manzara.", 12, 18, 90, { destinationSlug: "tiger-cave-krabi" }),
        s("Ao Nang — Konaklama", "1. gece.", 18, 25, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(2, "Güneye", "Lanta ve Trang.", ["Lanta Pier", "Trang"], [
        s("Hua Hin Pier (Lanta)", "Feribot noktası.", 50, 60, 60, { destinationSlug: "lanta-island" }),
        s("Khlong Thom", "Mola.", 30, 35, 30),
        s("Trang", "Şehir merkezi.", 80, 90, 90),
        s("Trang — Konaklama", "2. gece.", 5, 10, 720),
      ], "Trang otel"),
      leg(3, "Satun", "Sınır bölgesi.", ["Satun", "Pakbara"], [
        s("Satun", "Güney şehir.", 60, 70, 120),
        s("Pakbara Pier", "Malaysia feribot kapısı.", 40, 50, 60),
        s("Satun — Konaklama", "3. gece.", 50, 60, 720),
      ], "Satun otel"),
      leg(4, "Kuzey dönüş", "Krabi'ye.", ["Emerald Pool", "Hot Springs", "Krabi"], [
        s("Emerald Pool", "Yol üstü.", 120, 140, 75, { destinationSlug: "emerald-pool" }),
        s("Hot Springs", "Mola.", 20, 30, 60, { destinationSlug: "hot-springs" }),
        s("Krabi Town", "Akşam.", 40, 45, 60, { destinationSlug: "krabi-town" }),
        s("Ao Nang — Konaklama", "4. gece.", 18, 25, 720),
      ], "Ao Nang otel"),
      leg(5, "Phuket dönüş", "Son gün.", ["Railay", "Phang Nga", "Patong"], [
        s("Railay Plajı", "Sabah longtail.", 8, 15, 120, { destinationSlug: "railay-beach", access: "boat" }),
        s("Phang Nga — Yakıt", "Dönüş.", 80, 90, 20),
        s("Big Buddha", "Mola.", 50, 55, 30, { destinationSlug: "big-buddha" }),
        patongReturn(12, 20),
      ]),
    ],
  },
];

// ─── 7-DAY ROUTES ───────────────────────────────────────────────────────────

const SEVEN_DAY: MultiRouteDef[] = [
  {
    id: "ultimate-andaman-tour",
    tourDays: 7,
    name: "Ultimate Andaman 7 Gün",
    tagline: "Tam Andaman kıyısı turu",
    routeLine: "Phuket → Phang Nga → Khao Sok → Khao Lak → Krabi → Lanta → Phuket",
    totalDriveKm: 1500,
    driveTimeLabel: "~27 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "phang-nga-bay",
    featured: true,
    description:
      "Andaman kıyısının tamamını yedi günde motosikletle keşfedin. Her gün farklı bölge, dengeli tempo ve çeşitli konaklama — çok günlük kiralama ile en kapsamlı güney programı.",
    highlights: "Phang Nga, Khao Sok, Cheow Lan, Khao Lak, Krabi, Lanta, Railay",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan",
    elevation: "~800 m",
    parkingInfo: "Tüm duraklarda moto park",
    fuelEstimate: "~50 L · 2200 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Phang Nga", "Körfez başlangıç.", ["Patong", "Samet Nangshe", "Phang Nga"], [
        patongStart(),
        s("Samet Nangshe", "Viewpoint.", 35, 50, 90, { destinationSlug: "samet-nangshe" }),
        s("Maymun Mağarası", "Mağara.", 25, 35, 45, { destinationSlug: "monkey-cave" }),
        s("Phang Nga — Konaklama", "1. gece.", 20, 25, 720),
      ], "Phang Nga otel"),
      leg(2, "James Bond", "Tekne günü.", ["James Bond", "Koh Panyee", "Phang Nga"], [
        s("James Bond Tekne", "Tam gün turu.", 20, 30, 300, { destinationSlug: "james-bond-island", access: "boat" }),
        s("Phang Nga Cave", "Kano.", 15, 20, 60, { destinationSlug: "phang-nga-cave", access: "boat" }),
        s("Phang Nga — Konaklama", "2. gece.", 20, 25, 720),
      ], "Phang Nga otel"),
      leg(3, "Khao Sok", "Orman.", ["Khao Sok", "Ton Prai"], [
        s("Khao Sok Milli Park", "Orman.", 80, 95, 120, { destinationSlug: "khao-sok-national-park" }),
        s("Ton Prai Şelalesi", "Şelale.", 8, 15, 60, { destinationSlug: "ton-prai-waterfall" }),
        s("Khao Sok — Konaklama", "3. gece.", 0, 0, 720),
      ], "Khao Sok bungalov"),
      leg(4, "Cheow Lan", "Göl.", ["Cheow Lan", "Khao Lak"], [
        s("Cheow Lan Gölü", "Tekne turu.", 15, 30, 240, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Khao Lak", "Akşam plaj.", 90, 105, 60, { destinationSlug: "khao-lak" }),
        s("Khao Lak — Konaklama", "4. gece.", 5, 10, 720),
      ], "Khao Lak otel"),
      leg(5, "Krabi", "Şehir ve Tiger Cave.", ["Krabi Town", "Tiger Cave", "Ao Nang"], [
        s("Krabi Town", "Şehir.", 90, 100, 90, { destinationSlug: "krabi-town" }),
        s("Tiger Cave", "Tırmanış.", 12, 18, 90, { destinationSlug: "tiger-cave-krabi" }),
        s("Ao Nang — Konaklama", "5. gece.", 18, 25, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(6, "Krabi doğa", "Emerald Pool ve Railay.", ["Emerald Pool", "Hot Springs", "Railay"], [
        s("Emerald Pool", "Yüzme.", 35, 45, 90, { destinationSlug: "emerald-pool" }),
        s("Hot Springs", "Sıcak kaynak.", 20, 30, 90, { destinationSlug: "hot-springs" }),
        s("Railay Plajı", "Longtail.", 8, 15, 180, { destinationSlug: "railay-beach", access: "boat" }),
        s("Ao Nang", "Akşam.", 8, 15, 60, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(7, "Lanta ve dönüş", "Feribot; Phuket.", ["Lanta Pier", "Phang Nga", "Patong"], [
        s("Hua Hin Pier (Lanta)", "Feribot noktası.", 50, 60, 60, { destinationSlug: "lanta-island" }),
        s("Phang Nga — Mola", "Dönüş.", 100, 110, 30),
        s("Big Buddha", "Son mola.", 50, 55, 30, { destinationSlug: "big-buddha" }),
        patongReturn(12, 20),
      ]),
    ],
  },
  {
    id: "southern-thailand-loop-7d",
    tourDays: 7,
    name: "Güney Tayland Loop 7 Gün",
    tagline: "Tam güney çember turu",
    routeLine: "Phuket → Khao Lak → Krabi → Trang → Phang Nga → Khao Sok → Phuket",
    totalDriveKm: 1400,
    driveTimeLabel: "~25 saat toplam sürüş",
    difficulty: "Zor",
    heroSlug: "khao-sok-national-park",
    description:
      "Güney Tayland'ı yedi günde tam bir çember turuyla keşfedin. Kıyı, orman ve iç kesimleri kapsayan yoğun ama ödüllendirici program.",
    highlights: "Khao Lak, Krabi, Trang, Phang Nga, Khao Sok, Cheow Lan",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan; deneyimli sürücüler",
    elevation: "~800 m",
    parkingInfo: "Otel otoparkları",
    fuelEstimate: "~48 L · 2110 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Khao Lak", "Kuzey kıyı.", ["Patong", "Sirinat", "Khao Lak"], [
        patongStart(),
        s("Sirinat Milli Parkı", "Mai Khao.", 35, 45, 45, { destinationSlug: "sirinat-national-park" }),
        s("Khao Lak", "Plaj.", 75, 90, 90, { destinationSlug: "khao-lak" }),
        s("Khao Lak — Konaklama", "1. gece.", 5, 10, 720),
      ], "Khao Lak otel"),
      leg(2, "Krabi", "Doğuya.", ["Krabi Town", "Tiger Cave", "Ao Nang"], [
        s("Krabi Town", "Şehir.", 90, 100, 60, { destinationSlug: "krabi-town" }),
        s("Tiger Cave", "Manzara.", 12, 18, 90, { destinationSlug: "tiger-cave-krabi" }),
        s("Ao Nang — Konaklama", "2. gece.", 18, 25, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(3, "Krabi doğa", "Emerald Pool.", ["Emerald Pool", "Hot Springs", "Lanta"], [
        s("Emerald Pool", "Sabah.", 35, 45, 90, { destinationSlug: "emerald-pool" }),
        s("Hot Springs", "Kaynak.", 20, 30, 60, { destinationSlug: "hot-springs" }),
        s("Hua Hin Pier (Lanta)", "Feribot kapısı.", 50, 60, 60, { destinationSlug: "lanta-island" }),
        s("Khlong Thom — Konaklama", "3. gece.", 30, 35, 720),
      ], "Khlong Thom / Lanta yakını otel"),
      leg(4, "Trang", "Güneye.", ["Trang", "Pak Meng"], [
        s("Trang", "Şehir.", 80, 90, 90),
        s("Pak Meng Plajı", "Sakin kıyı.", 30, 35, 60),
        s("Trang — Konaklama", "4. gece.", 30, 35, 720),
      ], "Trang otel"),
      leg(5, "Phang Nga", "Kuzeybatı.", ["Phang Nga", "Samet Nangshe"], [
        s("Phang Nga Town", "Şehir.", 120, 140, 60, { destinationSlug: "phang-nga-bay" }),
        s("Samet Nangshe", "Viewpoint.", 25, 35, 90, { destinationSlug: "samet-nangshe" }),
        s("Phang Nga — Konaklama", "5. gece.", 15, 20, 720),
      ], "Phang Nga otel"),
      leg(6, "Khao Sok", "Orman.", ["Khao Sok", "Cheow Lan"], [
        s("Khao Sok Milli Park", "Orman.", 80, 95, 90, { destinationSlug: "khao-sok-national-park" }),
        s("Cheow Lan Gölü", "Tekne.", 15, 30, 180, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Khao Sok — Konaklama", "6. gece.", 0, 0, 720),
      ], "Khao Sok bungalov"),
      leg(7, "Dönüş", "Phuket.", ["Ton Prai", "Big Buddha", "Patong"], [
        s("Ton Prai Şelalesi", "Sabah.", 8, 15, 45, { destinationSlug: "ton-prai-waterfall" }),
        s("Big Buddha", "Mola.", 130, 150, 30, { destinationSlug: "big-buddha" }),
        s("Karon Viewpoint", "Son manzara.", 8, 12, 30, { destinationSlug: "karon-viewpoint" }),
        patongReturn(10, 15),
      ]),
    ],
  },
  {
    id: "koh-samui-adventure",
    tourDays: 7,
    name: "Koh Samui Macerası 7 Gün",
    tagline: "Anakara + feribot ile Samui",
    routeLine: "Phuket → Surat Thani → Koh Samui → Krabi → Phuket",
    totalDriveKm: 1200,
    driveTimeLabel: "~22 saat toplam sürüş",
    difficulty: "Orta",
    heroSlug: "koh-phi-phi",
    description:
      "Phuket'ten Surat Thani'ye motosikletle, feribotla Koh Samui'ye ve geri dönüş. Yedi günlük ada ve anakara kombinasyonu — çok günlük kiralama ile benzersiz bir güney deneyimi.",
    highlights: "Surat Thani, Koh Samui feribot, Khao Sok, Krabi, Chumphon kıyısı",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan; feribot saatlerini kontrol edin",
    elevation: "~600 m",
    parkingInfo: "Feribot terminali moto park; Samui'de scooter kiralama alternatif",
    fuelEstimate: "~42 L · 1850 THB + feribot",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Khao Sok", "Orman başlangıç.", ["Patong", "Phang Nga", "Khao Sok"], [
        patongStart(),
        s("Phang Nga Town", "Mola.", 55, 60, 30, { destinationSlug: "phang-nga-bay" }),
        s("Khao Sok Milli Park", "Orman.", 75, 90, 90, { destinationSlug: "khao-sok-national-park" }),
        s("Khao Sok — Konaklama", "1. gece.", 0, 0, 720),
      ], "Khao Sok bungalov"),
      leg(2, "Cheow Lan", "Göl.", ["Cheow Lan", "Surat Thani"], [
        s("Cheow Lan Gölü", "Tekne.", 15, 30, 180, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Surat Thani", "Feribot şehri.", 100, 115, 90),
        s("Surat Thani — Konaklama", "2. gece.", 5, 10, 720),
      ], "Surat Thani otel"),
      leg(3, "Koh Samui", "Feribot günü.", ["Donsak Pier", "Koh Samui", "Chaweng"], [
        s("Donsak Pier", "Samui feribot.", 60, 70, 120),
        s("Koh Samui — Chaweng", "Ada keşfi (moto veya scooter).", 20, 30, 240),
        s("Koh Samui — Konaklama", "3. gece.", 5, 10, 720),
      ], "Koh Samui otel"),
      leg(4, "Samui keşif", "Ada turu.", ["Lamai", "Big Buddha Samui", "Fisherman Village"], [
        s("Lamai Plajı", "Sabah yüzme.", 10, 15, 90),
        s("Big Buddha Samui", "Tapınak.", 8, 12, 60),
        s("Fisherman Village", "Akşam pazarı.", 15, 20, 90),
        s("Koh Samui — Konaklama", "4. gece.", 10, 15, 720),
      ], "Koh Samui otel"),
      leg(5, "Anakaraya dönüş", "Surat Thani.", ["Donsak", "Chumphon", "Krabi"], [
        s("Donsak Pier", "Anakaraya feribot.", 20, 30, 120),
        s("Chumphon", "Yol üstü mola.", 180, 200, 60),
        s("Krabi Town", "Akşam.", 200, 220, 60, { destinationSlug: "krabi-town" }),
        s("Ao Nang — Konaklama", "5. gece.", 18, 25, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(6, "Krabi", "Doğa.", ["Emerald Pool", "Hot Springs", "Railay"], [
        s("Emerald Pool", "Sabah.", 35, 45, 90, { destinationSlug: "emerald-pool" }),
        s("Hot Springs", "Kaynak.", 20, 30, 60, { destinationSlug: "hot-springs" }),
        s("Railay Plajı", "Longtail.", 8, 15, 150, { destinationSlug: "railay-beach", access: "boat" }),
        s("Ao Nang", "Akşam.", 8, 15, 60, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(7, "Phuket dönüş", "Son gün.", ["Tiger Cave", "Phang Nga", "Patong"], [
        s("Tiger Cave", "Sabah.", 12, 18, 75, { destinationSlug: "tiger-cave-krabi" }),
        s("Phang Nga — Yakıt", "Dönüş.", 80, 90, 20),
        s("Big Buddha", "Mola.", 50, 55, 30, { destinationSlug: "big-buddha" }),
        patongReturn(12, 20),
      ]),
    ],
  },
];

// ─── 10-DAY ROUTES ──────────────────────────────────────────────────────────

const TEN_DAY: MultiRouteDef[] = [
  {
    id: "deep-south-explorer",
    tourDays: 10,
    name: "Derin Güney Kaşifi 10 Gün",
    tagline: "Satun, Trang ve tam güney",
    routeLine: "Phuket → Krabi → Trang → Satun → Hat Yai → Phuket",
    totalDriveKm: 2200,
    driveTimeLabel: "~40 saat toplam sürüş",
    difficulty: "Zor",
    heroSlug: "lanta-island",
    description:
      "Tayland'ın en güneyini on günde motosikletle keşfedin. Satun, Trang ve Hat Yai'ye uzanan epik yolculuk — deneyimli sürücüler ve uzun süreli kiralama için tasarlandı.",
    highlights: "Krabi, Lanta, Trang, Satun, Hat Yai, Emerald Pool, güney plajları",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan; günlük 200+ km planlayın",
    elevation: "~800 m",
    parkingInfo: "Şehir otelleri ve benzin istasyonları",
    fuelEstimate: "~75 L · 3300 THB",
    safetyTips: LONG_SAFETY,
    legs: [
      leg(1, "Krabi", "Başlangıç.", ["Patong", "Krabi Town", "Ao Nang"], [
        patongStart(),
        s("Krabi Town", "Şehir.", 155, 170, 60, { destinationSlug: "krabi-town" }),
        s("Tiger Cave", "Manzara.", 12, 18, 90, { destinationSlug: "tiger-cave-krabi" }),
        s("Ao Nang — Konaklama", "1. gece.", 18, 25, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(2, "Krabi doğa", "Emerald Pool.", ["Emerald Pool", "Hot Springs", "Lanta"], [
        s("Emerald Pool", "Sabah.", 35, 45, 90, { destinationSlug: "emerald-pool" }),
        s("Hot Springs", "Kaynak.", 20, 30, 60, { destinationSlug: "hot-springs" }),
        s("Hua Hin Pier (Lanta)", "Feribot.", 50, 60, 60, { destinationSlug: "lanta-island" }),
        s("Khlong Thom — Konaklama", "2. gece.", 30, 35, 720),
      ], "Lanta yakını otel"),
      leg(3, "Trang", "Güneye.", ["Trang", "Pak Meng"], [
        s("Trang", "Şehir.", 80, 90, 90),
        s("Pak Meng Plajı", "Plaj.", 30, 35, 90),
        s("Trang — Konaklama", "3. gece.", 30, 35, 720),
      ], "Trang otel"),
      leg(4, "Satun", "Sınır.", ["Satun", "Pakbara"], [
        s("Satun", "Güney şehir.", 60, 70, 120),
        s("Pakbara Pier", "Malaysia kapısı.", 40, 50, 60),
        s("Satun — Konaklama", "4. gece.", 50, 60, 720),
      ], "Satun otel"),
      leg(5, "Hat Yai", "Doğuya.", ["Hat Yai", "Songkhla"], [
        s("Hat Yai", "Büyük şehir.", 120, 140, 120),
        s("Songkhla Eski Şehir", "Tarihi merkez.", 30, 35, 90),
        s("Hat Yai — Konaklama", "5. gece.", 30, 35, 720),
      ], "Hat Yai otel"),
      leg(6, "Geri batı", "Trang'e.", ["Phatthalung", "Trang"], [
        s("Phatthalung", "Göl şehri.", 80, 90, 60),
        s("Trang", "Dönüş molası.", 60, 70, 60),
        s("Trang — Konaklama", "6. gece.", 5, 10, 720),
      ], "Trang otel"),
      leg(7, "Krabi", "Kuzeybatı.", ["Krabi Town", "Ao Nang"], [
        s("Krabi Town", "Şehir.", 80, 90, 90, { destinationSlug: "krabi-town" }),
        s("Railay Plajı", "Longtail.", 20, 30, 150, { destinationSlug: "railay-beach", access: "boat" }),
        s("Ao Nang — Konaklama", "7. gece.", 8, 15, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(8, "Phang Nga", "Körfez.", ["Phang Nga", "Samet Nangshe"], [
        s("Samet Nangshe", "Viewpoint.", 100, 110, 90, { destinationSlug: "samet-nangshe" }),
        s("Maymun Mağarası", "Mağara.", 25, 35, 45, { destinationSlug: "monkey-cave" }),
        s("Phang Nga — Konaklama", "8. gece.", 20, 25, 720),
      ], "Phang Nga otel"),
      leg(9, "Khao Sok", "Orman.", ["Khao Sok", "Cheow Lan"], [
        s("Khao Sok Milli Park", "Orman.", 80, 95, 90, { destinationSlug: "khao-sok-national-park" }),
        s("Cheow Lan Gölü", "Tekne.", 15, 30, 180, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Khao Sok — Konaklama", "9. gece.", 0, 0, 720),
      ], "Khao Sok bungalov"),
      leg(10, "Phuket dönüş", "Son gün.", ["Khao Lak", "Big Buddha", "Patong"], [
        s("Khao Lak", "Son plaj molası.", 90, 105, 60, { destinationSlug: "khao-lak" }),
        s("Big Buddha", "Mola.", 80, 90, 30, { destinationSlug: "big-buddha" }),
        s("Old Phuket Town", "Kahve.", 15, 20, 45, { destinationSlug: "old-phuket-town" }),
        patongReturn(12, 18),
      ]),
    ],
  },
  {
    id: "south-thailand-expedition",
    tourDays: 10,
    name: "Güney Tayland Expedition 10 Gün",
    tagline: "Epik güney turu — derin güney dahil",
    routeLine: "Phuket → Andaman → Satun → Hat Yai → Samui → Krabi → Phuket",
    totalDriveKm: 3000,
    driveTimeLabel: "~55 saat toplam sürüş",
    difficulty: "Zor",
    heroSlug: "cheow-lan-lake",
    description:
      "Güney Tayland'ın en kapsamlı on günlük motosiklet expedition'ı. Andaman kıyısından derin güneye (Satun, Hat Yai) uzanan rota güvenlik açısından dikkat gerektirir — güncel seyahat uyarılarını kontrol edin, gece sürüşünden kaçının ve yerel haberleri takip edin. Deneyimli sürücüler için epik bir macera.",
    highlights: "Khao Sok, Krabi, Satun, Hat Yai, Koh Samui, Phang Nga, tam güney",
    recommendedBike: "Honda ADV 350 / Forza 350",
    bestTime: "Kasım–Nisan; derin güney için güncel güvenlik bilgisi şart",
    elevation: "~1000 m",
    parkingInfo: "Feribot terminalleri ve otel otoparkları",
    fuelEstimate: "~100 L · 4400 THB + feribot",
    safetyTips: [
      ...LONG_SAFETY,
      { icon: "⚠️", title: "Derin güney", text: "Satun ve Hat Yai bölgesinde güncel güvenlik uyarılarını kontrol edin; gece sürüşünden kaçının." },
      { icon: "📱", title: "İletişim", text: "Uzak bölgelerde mobil sinyal zayıf; offline harita ve acil numaraları kaydedin." },
    ],
    legs: [
      leg(1, "Phang Nga", "Körfez.", ["Patong", "Samet Nangshe", "Phang Nga"], [
        patongStart(),
        s("Samet Nangshe", "Viewpoint.", 35, 50, 90, { destinationSlug: "samet-nangshe" }),
        s("Maymun Mağarası", "Mağara.", 25, 35, 45, { destinationSlug: "monkey-cave" }),
        s("Phang Nga — Konaklama", "1. gece.", 20, 25, 720),
      ], "Phang Nga otel"),
      leg(2, "Khao Sok", "Orman.", ["Khao Sok", "Cheow Lan"], [
        s("Khao Sok Milli Park", "Orman.", 80, 95, 90, { destinationSlug: "khao-sok-national-park" }),
        s("Cheow Lan Gölü", "Tekne.", 15, 30, 180, { destinationSlug: "cheow-lan-lake", access: "boat" }),
        s("Khao Sok — Konaklama", "2. gece.", 0, 0, 720),
      ], "Khao Sok bungalov"),
      leg(3, "Khao Lak", "Kıyı.", ["Khao Lak", "Thap Lamu"], [
        s("Khao Lak", "Plaj.", 90, 105, 120, { destinationSlug: "khao-lak" }),
        s("Thap Lamu", "İskele.", 25, 30, 45, { destinationSlug: "similan-islands" }),
        s("Khao Lak — Konaklama", "3. gece.", 5, 10, 720),
      ], "Khao Lak otel"),
      leg(4, "Krabi", "Doğa.", ["Krabi Town", "Tiger Cave", "Ao Nang"], [
        s("Krabi Town", "Şehir.", 90, 100, 60, { destinationSlug: "krabi-town" }),
        s("Tiger Cave", "Tırmanış.", 12, 18, 90, { destinationSlug: "tiger-cave-krabi" }),
        s("Emerald Pool", "Yüzme.", 35, 45, 75, { destinationSlug: "emerald-pool" }),
        s("Ao Nang — Konaklama", "4. gece.", 55, 65, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(5, "Güneye", "Trang ve Satun.", ["Trang", "Satun"], [
        s("Hua Hin Pier (Lanta)", "Feribot noktası.", 50, 60, 45, { destinationSlug: "lanta-island" }),
        s("Trang", "Şehir.", 80, 90, 60),
        s("Satun", "Güney sınır.", 60, 70, 90),
        s("Satun — Konaklama", "5. gece.", 5, 10, 720),
      ], "Satun otel"),
      leg(6, "Hat Yai", "Derin güney.", ["Hat Yai", "Songkhla"], [
        s("Hat Yai", "Büyük şehir; güvenlik bilgisi güncel tutun.", 120, 140, 120),
        s("Songkhla", "Eski şehir ve göl.", 30, 35, 90),
        s("Hat Yai — Konaklama", "6. gece.", 30, 35, 720),
      ], "Hat Yai otel"),
      leg(7, "Doğu kıyı", "Surat Thani.", ["Surat Thani", "Donsak"], [
        s("Surat Thani", "Feribot şehri.", 180, 200, 90),
        s("Donsak Pier", "Samui feribot.", 60, 70, 60),
        s("Surat Thani — Konaklama", "7. gece.", 60, 70, 720),
      ], "Surat Thani otel"),
      leg(8, "Koh Samui", "Ada günü.", ["Donsak", "Koh Samui", "Chaweng"], [
        s("Donsak — Samui Feribot", "Sabah feribot.", 60, 70, 150),
        s("Koh Samui Chaweng", "Ada keşfi.", 20, 30, 240),
        s("Koh Samui — Konaklama", "8. gece.", 5, 10, 720),
      ], "Koh Samui otel"),
      leg(9, "Anakaraya", "Krabi'ye.", ["Donsak", "Krabi"], [
        s("Donsak Pier", "Anakaraya feribot.", 20, 30, 120),
        s("Chumphon", "Mola.", 180, 200, 45),
        s("Krabi Town", "Akşam.", 200, 220, 60, { destinationSlug: "krabi-town" }),
        s("Ao Nang — Konaklama", "9. gece.", 18, 25, 720, { destinationSlug: "ao-nang" }),
      ], "Ao Nang otel"),
      leg(10, "Phuket dönüş", "Son gün.", ["Hot Springs", "Phang Nga", "Patong"], [
        s("Hot Springs", "Sabah.", 55, 65, 60, { destinationSlug: "hot-springs" }),
        s("Phang Nga — Yakıt", "Dönüş.", 80, 90, 20),
        s("Big Buddha", "Mola.", 50, 55, 30, { destinationSlug: "big-buddha" }),
        patongReturn(12, 20),
      ]),
    ],
  },
];

export const MULTI_ROUTE_CATALOG: MultiRouteDef[] = [
  ...TWO_DAY,
  ...THREE_DAY,
  ...FOUR_DAY,
  ...FIVE_DAY,
  ...SEVEN_DAY,
  ...TEN_DAY,
];
