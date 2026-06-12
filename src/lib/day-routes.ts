import type { MotorcycleRoute, SafetyTip } from "@/lib/routes-types";
import {
  buildStop,
  formatDurationFromMin,
  routeHeroImage,
  sumStops,
} from "@/lib/route-stop-builder";

const PATONG = { lat: 7.8961, lng: 98.2953 };

const DEFAULT_SAFETY: SafetyTip[] = [
  { icon: "⛑️", title: "Kask zorunlu", text: "Tayland'da polis kask kontrolü yapar; tam yüz veya açık kask kabul edilir." },
  { icon: "⛽", title: "Yakıt", text: "Patong'dan çıkmadan depoyu doldurun; güney rotalarında Rawai/Chalong'da istasyon var." },
  { icon: "🌡️", title: "Güneş & su", text: "SPF 50+ ve en az 2 L su; öğle 11:00–15:00 arası gölgede mola verin." },
];

const NIGHT_SAFETY: SafetyTip[] = [
  { icon: "💡", title: "Farlar", text: "Gece sürüşünde uzun far kullanın; virajlı yollarda hızı düşürün." },
  { icon: "🍺", title: "Alkol", text: "Alkol aldıysanız motosiklet sürmeyin; Grab veya taksi kullanın." },
  { icon: "👀", title: "Bangla & Patong", text: "Kalabalık bölgelerde motosikleti güvenli park edin; eşyaları göz önünde bırakmayın." },
];

function finalize(
  base: Omit<
    MotorcycleRoute,
    "totalDriveKm" | "totalDriveMin" | "totalVisitMin" | "totalDayMin" | "duration" | "distance"
  > & { totalDriveKm: number },
): MotorcycleRoute {
  const totals = sumStops(base.stops);
  return {
    ...base,
    ...totals,
    totalDriveKm: base.totalDriveKm,
    distance: `${base.totalDriveKm} km`,
    duration: formatDurationFromMin(totals.totalDayMin),
  };
}

const patongStart = (visitMin = 10) =>
  buildStop({
    order: 0,
    name: "Patong — Sabah çıkış",
    description:
      "Patong Beach Roundabout'tan motosikleti alın; kask, su ve güneş kremi kontrolü. Sabah 08:00–09:00 ideal — trafik hafif, güneş henüz sert değil.",
    driveKm: 0,
    driveMin: 0,
    visitMin,
    lat: PATONG.lat,
    lng: PATONG.lng,
    tips: "Kiralama noktasından çıkış fotoğrafı çekin; hasar kaydı için faydalı.",
  });

const patongReturn = (order: number, driveKm: number, driveMin: number, note: string) =>
  buildStop({
    order,
    name: "Patong — Akşam dönüş",
    description: note,
    driveKm,
    driveMin,
    visitMin: 0,
    lat: PATONG.lat,
    lng: PATONG.lng,
  });

// ——— 1. Güney Phuket Loop ———
const southPhuketStops = [
  patongStart(),
  buildStop({
    order: 1,
    name: "Chalong Pier",
    description:
      "Phuket'in ana tekne iskelelerinden biri; Chalong Körfezi manzarası. Kısa mola, fotoğraf ve yakıt kontrolü için ideal ilk durak.",
    driveKm: 12,
    driveMin: 25,
    visitMin: 15,
    lat: 7.8286,
    lng: 98.3547,
    tips: "Wat Chalong yanında — yanlışlıkla tapınağa sapmayın, pier tabelasını takip edin.",
  }),
  buildStop({
    order: 2,
    name: "Big Buddha",
    description:
      "45 m mermer Buda heykeli; Patong, Karon ve Chalong'un 360° panoraması. Omuz ve diz kapalı giysi şart.",
    driveKm: 6,
    driveMin: 18,
    visitMin: 50,
    destinationSlug: "big-buddha",
    tips: "Ücretsiz otopark; sabah erken en sakin saat.",
  }),
  buildStop({
    order: 3,
    name: "Kata Viewpoint",
    description:
      "Kata Noi ve Kata plajlarına bakan seyir terası; sörf dalgalarını ve koyu kuşbakışı izleyin.",
    driveKm: 8,
    driveMin: 20,
    visitMin: 25,
    lat: 7.812,
    lng: 98.299,
    tips: "Karon Viewpoint ile karıştırmayın — bu durak Kata tarafında.",
  }),
  buildStop({
    order: 4,
    name: "Nai Harn Beach",
    description:
      "Yerel favori koy; turkuaz su, palmiyeli sahil. Yüzme molası ve plaj kafelerinde öğle dinlenmesi.",
    driveKm: 5,
    driveMin: 12,
    visitMin: 55,
    destinationSlug: "nai-harn-beach",
  }),
  buildStop({
    order: 5,
    name: "Windmill Viewpoint",
    description: "Rüzgar türbini ve Ya Nui koyuna bakan geniş Andaman panoraması.",
    driveKm: 4,
    driveMin: 10,
    visitMin: 25,
    destinationSlug: "windmill-viewpoint",
  }),
  buildStop({
    order: 6,
    name: "Promthep Cape",
    description:
      "Phuket'in en güney ucu — gün batımı efsanesi, deniz feneri ve buddha. Rotanın en fotojenik durağı.",
    driveKm: 3,
    driveMin: 8,
    visitMin: 70,
    destinationSlug: "promthep-cape",
    tips: "17:00–18:30 en kalabalık; hafta içi daha sakin.",
  }),
  buildStop({
    order: 7,
    name: "Rawai Seafood Market",
    description:
      "Balık seçip restoranda pişirtin veya hazır deniz ürünü tadın. Akşam yemeği için mükemmel durak.",
    driveKm: 6,
    driveMin: 15,
    visitMin: 50,
    destinationSlug: "rawai-beach",
    tips: "Fiyat sorun; kilo başına pazarlık normal.",
  }),
  buildStop({
    order: 8,
    name: "Karon Viewpoint",
    description: "Kata, Karon ve Kata Noi plajlarını tek karede gösteren klasik Phuket kartpostalı.",
    driveKm: 10,
    driveMin: 22,
    visitMin: 20,
    destinationSlug: "karon-viewpoint",
  }),
  patongReturn(9, 14, 28, "Karon–Patong sahil yolu ile kiralama noktasına dönüş. Gece farlarını açık tutun."),
].map((s, i) => ({ ...s, order: i + 1 }));

export const SOUTH_PHUKET_LOOP = finalize({
  id: "south-phuket-loop",
  name: "Güney Phuket Loop",
  tagline: "Big Buddha, gün batımı ve deniz ürünleri — Phuket'in en popüler gün turu",
  difficulty: "Kolay",
  elevation: "~450 m",
  bestTime: "Sabah 08:30 çıkış — Promthep'te 17:30–18:30",
  image: routeHeroImage("promthep-cape", ""),
  totalDriveKm: 85,
  description:
    "Phuket'e ilk kez gelenlerin \"mutlaka yapmalıyım\" dediği rota. Sabah Patong'dan çıkıp akşam aynı noktaya dönersiniz: ikonik Buda, kartpostal manzaralar, gün batımı ve Rawai'de taze deniz ürünleri tek günde. İyi asfalt, net tabelalar — Click veya ADV 160 ile rahat sürülür.",
  highlights: "Phuket kartpostal manzaraları · Gün batımı · Rawai deniz ürünleri",
  recommendedBike: "Honda Click 160 / ADV 160",
  startPoint: "Patong Beach Roundabout",
  parkingInfo: "Tüm duraklarda motosiklet parkı mevcut; Promthep akşamüstü dolabilir",
  fuelEstimate: "~7 L benzin · 300–400 THB",
  stops: southPhuketStops,
  safetyTips: DEFAULT_SAFETY,
});

// ——— 2. Viewpoints Loop ———
const viewpointsStops = [
  patongStart(5),
  buildStop({ order: 2, name: "Monkey Hill (Toh Sae)", description: "Phuket Town manzarası ve maymunlar; sabah erken sakin.", driveKm: 10, driveMin: 22, visitMin: 30, destinationSlug: "monkey-hill" }),
  buildStop({ order: 3, name: "Khao Rang Viewpoint", description: "Şehir panoraması, restoran terası ve çay bahçesi.", driveKm: 3, driveMin: 8, visitMin: 30, destinationSlug: "khao-rang" }),
  buildStop({ order: 4, name: "Radar Hill (Khao Khad)", description: "360° şehir, Big Buddha ve Chalong körfezi manzarası.", driveKm: 8, driveMin: 18, visitMin: 35, destinationSlug: "radar-hill-viewpoint" }),
  buildStop({ order: 5, name: "Karon Viewpoint", description: "Üç plaj manzarası — Instagram'ın Phuket klasiği.", driveKm: 14, driveMin: 30, visitMin: 25, destinationSlug: "karon-viewpoint" }),
  buildStop({ order: 6, name: "Windmill Viewpoint", description: "Güney yarımada panoraması; öğleden sonra ışık güzel.", driveKm: 10, driveMin: 22, visitMin: 25, destinationSlug: "windmill-viewpoint" }),
  buildStop({ order: 7, name: "Promthep Cape", description: "Son durak: Andaman ve gün batımı.", driveKm: 6, driveMin: 14, visitMin: 60, destinationSlug: "promthep-cape" }),
  patongReturn(8, 16, 35, "Güney sahil yolu ile Patong'a dönüş."),
].map((s, i) => ({ ...s, order: i + 1 }));

export const PHUKET_VIEWPOINTS_LOOP = finalize({
  id: "phuket-viewpoints-loop",
  name: "Phuket Viewpoints Loop",
  tagline: "6 seyir noktası — şehir, okyanus ve altın saat fotoğrafları",
  difficulty: "Kolay",
  elevation: "~400 m",
  bestTime: "Sabah 09:00 — gün batımı için programı ters çevirin",
  image: routeHeroImage("karon-viewpoint", ""),
  totalDriveKm: 72,
  description:
    "Fotoğraf tutkunları için tasarlandı. Monkey Hill'den Promthep'e kadar Phuket'in en iyi seyir noktalarını tek günde birleştirir. Her durakta en az 25 dakika ayırın; acele etmeyin.",
  highlights: "En iyi fotoğraf noktaları · Şehir ve okyanus manzaraları",
  recommendedBike: "Honda Click 160",
  startPoint: "Patong Beach",
  parkingInfo: "Her viewpoint'te otopark; Radar Hill dar yol",
  fuelEstimate: "~5 L · 250 THB",
  stops: viewpointsStops,
  safetyTips: DEFAULT_SAFETY,
});

// ——— 3. Beach Hopping ———
const beachHoppingStops = [
  buildStop({ order: 1, name: "Patong Beach", description: "Başlangıç — kısa plaj yürüyüşü veya kahve.", driveKm: 0, driveMin: 0, visitMin: 20, destinationSlug: "patong-beach", lat: PATONG.lat, lng: PATONG.lng }),
  buildStop({ order: 2, name: "Freedom Beach", description: "Turkuaz koy; longtail veya patika ile ulaşım. Phuket'in en güzel plajlarından biri.", driveKm: 6, driveMin: 15, visitMin: 90, destinationSlug: "freedom-beach", access: "boat", tips: "Longtail ~300 THB; mayo ve havlu şart." }),
  buildStop({ order: 3, name: "Karon Beach", description: "Uzun kum şeridi; yüzme ve öğle molası.", driveKm: 8, driveMin: 18, visitMin: 45, destinationSlug: "karon-beach" }),
  buildStop({ order: 4, name: "Kata Beach", description: "Sörf ve yüzme; canlı plaj atmosferi.", driveKm: 4, driveMin: 10, visitMin: 45, destinationSlug: "kata-beach" }),
  buildStop({ order: 5, name: "Kata Noi Beach", description: "Kata'nın küçük kardeşi — daha sakin, lüks resort hattı.", driveKm: 2, driveMin: 5, visitMin: 35, lat: 7.814, lng: 98.298 }),
  buildStop({ order: 6, name: "Nai Harn Beach", description: "Yerel favori; yüzme için ideal.", driveKm: 6, driveMin: 14, visitMin: 50, destinationSlug: "nai-harn-beach" }),
  buildStop({ order: 7, name: "Rawai Beach", description: "Balıkçı limanı; kısa mola ve longtail manzarası.", driveKm: 5, driveMin: 12, visitMin: 25, destinationSlug: "rawai-beach" }),
  buildStop({ order: 8, name: "Ya Nui Beach", description: "Snorkel ve kayalık koy; kompakt ama etkileyici.", driveKm: 4, driveMin: 10, visitMin: 40, destinationSlug: "yanui-beach" }),
  patongReturn(9, 12, 25, "Chalong üzerinden Patong'a dönüş."),
];

export const PHUKET_BEACH_HOPPING = finalize({
  id: "phuket-beach-hopping",
  name: "Phuket Beach Hopping Tour",
  tagline: "Bir günde 8 plaj — yüzme molalarıyla güney sahili",
  difficulty: "Kolay",
  elevation: "~200 m",
  bestTime: "Sabah 08:00 — plaj saatleri 10:00–17:00",
  image: routeHeroImage("kata-beach", ""),
  totalDriveKm: 65,
  description:
    "\"Phuket beaches by scooter\" aramasının tam karşılığı: Patong'dan Ya Nui'ye kadar 8 farklı plaj. Mayo, havlu, güneş kremi ve su şişesi şart. Freedom Beach için tekne bütçesi ayırın.",
  highlights: "Bir günde 8 plaj · Yüzme molaları",
  recommendedBike: "Honda Click 160 / ADV 160",
  startPoint: "Patong Beach",
  parkingInfo: "Plaj otoparkları 20–40 THB",
  fuelEstimate: "~4 L · 200 THB + Freedom tekne ~300 THB",
  stops: beachHoppingStops,
  safetyTips: [
    { icon: "🏊", title: "Deniz", text: "Kırmızı bayrak varsa yüzmeyin; monsoon döneminde akıntı güçlü." },
    ...DEFAULT_SAFETY.slice(1),
  ],
});

// ——— 4. Sunset Route ———
const sunsetStops = [
  patongStart(5),
  buildStop({ order: 2, name: "Phuket Old Town", description: "Sino-Portekiz mimarisi; öğleden önce sokakları gez, kafe molası.", driveKm: 16, driveMin: 30, visitMin: 75, destinationSlug: "old-phuket-town" }),
  buildStop({ order: 3, name: "Karon Viewpoint", description: "Altın saat ışığında üç plaj manzarası.", driveKm: 12, driveMin: 25, visitMin: 25, destinationSlug: "karon-viewpoint" }),
  buildStop({ order: 4, name: "Windmill Viewpoint", description: "Güney yarımada panoraması; gün batımına doğru ışık mükemmel.", driveKm: 10, driveMin: 22, visitMin: 25, destinationSlug: "windmill-viewpoint" }),
  buildStop({ order: 5, name: "Ya Nui Beach", description: "Kayalık koy; gün batımı öncesi kısa yüzme veya fotoğraf.", driveKm: 6, driveMin: 14, visitMin: 35, destinationSlug: "yanui-beach" }),
  buildStop({ order: 6, name: "Promthep Cape", description: "Rotanın finale — Andaman günbatımı. Tripod getirenler için cennet.", driveKm: 4, driveMin: 10, visitMin: 75, destinationSlug: "promthep-cape" }),
  patongReturn(7, 14, 30, "Günbatımından sonra Patong'a dönüş; farları açın."),
].map((s, i) => ({ ...s, order: i + 1 }));

export const PHUKET_SUNSET_ROUTE = finalize({
  id: "phuket-sunset-route",
  name: "Phuket Sunset Route",
  tagline: "Old Town'dan Promthep'e altın saat ve gün batımı",
  difficulty: "Kolay",
  elevation: "~350 m",
  bestTime: "12:00 çıkış — Promthep'te 17:30–18:30",
  image: routeHeroImage("promthep-cape", ""),
  totalDriveKm: 78,
  description:
    "Phuket sunset ride arayanlar için: öğleden sonra çıkış, Old Town'da gezinti, akşam Promthep'te finale. Google'da en çok aranan \"Phuket sunset scooter\" rotası.",
  highlights: "Gün batımı fotoğrafçılığı · Altın saat manzaraları",
  recommendedBike: "Honda Click 160 / ADV 160",
  startPoint: "Patong Beach",
  parkingInfo: "Promthep akşamüstü park yeri sınırlı — erken gelin",
  fuelEstimate: "~5 L · 250 THB",
  stops: sunsetStops,
  safetyTips: [
    { icon: "🌅", title: "Işık", text: "Günbatımından sonra hızlı kararır; yansıtıcı veya açık renk kıyafet." },
    ...DEFAULT_SAFETY.slice(1),
  ],
});

// ——— 5. Big Buddha & Culture ———
const cultureStops = [
  patongStart(),
  buildStop({ order: 2, name: "Wat Chalong", description: "Phuket'in en büyük budist tapınağı; pagoda ve bahçeler.", driveKm: 14, driveMin: 28, visitMin: 55, destinationSlug: "wat-chalong", tips: "Omuz ve diz kapalı." }),
  buildStop({ order: 3, name: "Big Buddha", description: "Dev Buda heykeli ve panoramik manzara.", driveKm: 6, driveMin: 16, visitMin: 50, destinationSlug: "big-buddha" }),
  buildStop({ order: 4, name: "Phuket Old Town", description: "Renkli sokaklar, kafe ve sanat galerileri.", driveKm: 10, driveMin: 22, visitMin: 90, destinationSlug: "old-phuket-town" }),
  buildStop({ order: 5, name: "Thai Hua Museum", description: "Sino-Portekiz mirası ve Phuket'in çin kökenli tarihi.", driveKm: 1, driveMin: 3, visitMin: 45, lat: 7.886, lng: 98.392, tips: "Pazartesi kapalı olabilir — web'den kontrol edin." }),
  buildStop({ order: 6, name: "Sunday Walking Street", description: "Pazar günleri Thalang Road'da sokak yemekleri ve el sanatları. Diğer günler Old Town gezintisi.", driveKm: 0, driveMin: 0, visitMin: 60, destinationSlug: "old-phuket-town", tips: "Pazar değilse bu süreyi Old Town kafelerine ayırın." }),
  patongReturn(7, 18, 32, "Akşam trafiğine dikkat — Patong'a dönüş."),
].map((s, i) => ({ ...s, order: i + 1 }));

export const BIG_BUDDHA_CULTURE = finalize({
  id: "big-buddha-culture",
  name: "Big Buddha & Culture Tour",
  tagline: "Tapınak, Buda heykeli ve Old Town — Tay kültürü gün turu",
  difficulty: "Kolay",
  elevation: "~300 m",
  bestTime: "Sabah 09:00 — Pazar günü Walking Street için ideal",
  image: routeHeroImage("big-buddha", ""),
  totalDriveKm: 55,
  description:
    "Phuket'i plajların ötesinde keşfetmek isteyenler için kültür rotası. Wat Chalong'dan Big Buddha'ya, ardından Old Town ve müze — sabah başlayıp akşam Patong'dasınız.",
  highlights: "Tay kültürü · Tarihi yapılar · Old Town",
  recommendedBike: "Honda Click 160",
  startPoint: "Patong Beach",
  parkingInfo: "Old Town'da Thepkasattri otopark kullanın",
  fuelEstimate: "~3 L · 150 THB",
  stops: cultureStops,
  safetyTips: [
    { icon: "👔", title: "Tapınak kıyafeti", text: "Wat Chalong ve Big Buddha'da mütevazı giyinin." },
    ...DEFAULT_SAFETY.slice(1),
  ],
});

// ——— 6. Hidden Phuket ———
const hiddenStops = [
  patongStart(5),
  buildStop({ order: 2, name: "Black Rock Viewpoint", description: "Naithon tarafında turistlerin az bildiği dramatik kayalık manzara.", driveKm: 22, driveMin: 40, visitMin: 35, lat: 7.988, lng: 98.28 }),
  buildStop({ order: 3, name: "Ao Sane Beach", description: "Cape Panwa yakınında sakin, snorkel dostu küçük koy.", driveKm: 18, driveMin: 35, visitMin: 50, lat: 7.805, lng: 98.415 }),
  buildStop({ order: 4, name: "Laem Ka Beach", description: "Yerel balıkçıların kullandığı sakin plaj; kalabalıktan uzak.", driveKm: 8, driveMin: 18, visitMin: 45, lat: 7.789, lng: 98.335 }),
  buildStop({ order: 5, name: "Sirinat National Park", description: "Havaalanına yakın uzun plaj; deniz kaplumbağası koruma alanı.", driveKm: 20, driveMin: 35, visitMin: 55, destinationSlug: "sirinat-national-park" }),
  buildStop({ order: 6, name: "Mai Khao Beach", description: "Uçak iniş manzaralı uzun kum şeridi; sessiz plaj molası.", driveKm: 5, driveMin: 10, visitMin: 40, destinationSlug: "mai-khao-plane-spot" }),
  buildStop({ order: 7, name: "Soi Dog Foundation", description: "Köpek kurtarma merkezi; duyarlı ziyaret ve gönüllü bağış.", driveKm: 25, driveMin: 40, visitMin: 40, destinationSlug: "soi-dog-foundation", tips: "Ziyaret saatlerini web'den kontrol edin." }),
  patongReturn(8, 22, 38, "Kuzey-güney bağlantı yolu ile Patong'a dönüş."),
].map((s, i) => ({ ...s, order: i + 1 }));

export const HIDDEN_PHUKET = finalize({
  id: "hidden-phuket",
  name: "Hidden Phuket Route",
  tagline: "Turist kalabalığından uzak 6 gizli köşe",
  difficulty: "Orta",
  elevation: "~350 m",
  bestTime: "Sabah 08:00",
  image: routeHeroImage("sirinat-national-park", ""),
  totalDriveKm: 80,
  description:
    "\"Phuket hidden gems by scooter\" arayanlar için: Black Rock'tan Ao Sane'e, Sirinat'tan Soi Dog'a — çoğu tur paketinde olmayan duraklar. Dar köy yollarında GPS kullanın.",
  highlights: "Az bilinen yerler · Sessiz plajlar",
  recommendedBike: "Honda ADV 160",
  startPoint: "Patong Beach",
  parkingInfo: "Sirinat ve Mai Khao resmi otopark",
  fuelEstimate: "~5 L · 250 THB",
  stops: hiddenStops,
  safetyTips: [
    { icon: "🗺️", title: "GPS", text: "Köy yollarında offline harita kullanın." },
    ...DEFAULT_SAFETY.slice(1),
  ],
});

// ——— 7. North Phuket Explorer ———
const northStops = [
  patongStart(),
  buildStop({ order: 2, name: "Bang Tao Beach", description: "Geniş kum, resort hattı; sabah kahvesi molası.", driveKm: 14, driveMin: 28, visitMin: 45, destinationSlug: "bang-tao-beach" }),
  buildStop({ order: 3, name: "Surin Beach", description: "Şık plaj ve beach club atmosferi.", driveKm: 3, driveMin: 8, visitMin: 40, destinationSlug: "surin-beach" }),
  buildStop({ order: 4, name: "Kamala Beach", description: "Aile dostu, sakin plaj; öğle molası.", driveKm: 4, driveMin: 10, visitMin: 45, destinationSlug: "kamala-beach" }),
  buildStop({ order: 5, name: "Mai Khao Beach", description: "Phuket'in en uzun plajı; uçak manzarası bonus.", driveKm: 12, driveMin: 22, visitMin: 50, destinationSlug: "mai-khao-plane-spot" }),
  buildStop({ order: 6, name: "Splash Beach Resort", description: "Su parkı ve resort bölgesi; fotoğraf molası veya öğle yemeği.", driveKm: 3, driveMin: 8, visitMin: 30, lat: 8.085, lng: 98.275 }),
  buildStop({ order: 7, name: "Sarasin Bridge", description: "Phuket–mainland bağlantı köprüsü; Andaman manzarası.", driveKm: 8, driveMin: 15, visitMin: 25, lat: 8.265, lng: 98.342 }),
  patongReturn(8, 28, 48, "402 ve sahil yolu ile Patong'a dönüş."),
].map((s, i) => ({ ...s, order: i + 1 }));

export const NORTH_PHUKET_EXPLORER = finalize({
  id: "north-phuket-explorer",
  name: "North Phuket Explorer",
  tagline: "Bang Tao'dan Sarasin Köprüsü'ne kuzey sahili",
  difficulty: "Kolay",
  elevation: "~150 m",
  bestTime: "Sabah 08:30",
  image: routeHeroImage("bang-tao-beach", ""),
  totalDriveKm: 95,
  description:
    "Phuket'in daha sakin kuzeyini keşfedin. Resort plajları, Mai Khao'nun sonsuz kumu ve Sarasin Köprüsü manzarası — sabah Patong, akşam Patong.",
  highlights: "Kuzey Phuket · Daha sakin yollar",
  recommendedBike: "Honda Click 160 / Forza 350",
  startPoint: "Patong Beach",
  parkingInfo: "Resort bölgelerinde ücretsiz moto park genelde mevcut",
  fuelEstimate: "~6 L · 300 THB",
  stops: northStops,
  safetyTips: DEFAULT_SAFETY,
});

// ——— 8. Old Town & Cafe ———
const cafeStops = [
  patongStart(5),
  buildStop({ order: 2, name: "Phuket Old Town", description: "Renkli cepheler, galeriler ve kahve kültürü.", driveKm: 16, driveMin: 30, visitMin: 60, destinationSlug: "old-phuket-town" }),
  buildStop({ order: 3, name: "Thalang Road", description: "Old Town'un ana arteri; Instagram duvarları ve butikler.", driveKm: 0, driveMin: 0, visitMin: 45, destinationSlug: "old-phuket-town" }),
  buildStop({ order: 4, name: "Soi Romanee", description: "Pastel renkli tarihi sokak — Phuket'in en çok fotoğraflanan köşesi.", driveKm: 0, driveMin: 0, visitMin: 30, lat: 7.884, lng: 98.389 }),
  buildStop({ order: 5, name: "Chillva Market", description: "Gece pazarı ve sokak yemekleri; öğleden sonra canlanır.", driveKm: 2, driveMin: 6, visitMin: 50, lat: 7.884, lng: 98.395, tips: "Salı–Pazar 17:00–23:00; gündüz alternatif kafe turu yapın." }),
  buildStop({ order: 6, name: "Central Phuket", description: "Alışveriş ve klimali mola; Festival veya Floresta.", driveKm: 4, driveMin: 10, visitMin: 45, destinationSlug: "central-festival-phuket" }),
  buildStop({ order: 7, name: "Khao Rang Viewpoint", description: "Gün batımı çayı ve şehir manzarası.", driveKm: 6, driveMin: 14, visitMin: 35, destinationSlug: "khao-rang" }),
  patongReturn(8, 16, 30, "Patong gece trafiğine dikkat."),
].map((s, i) => ({ ...s, order: i + 1 }));

export const PHUKET_OLD_TOWN_CAFE = finalize({
  id: "phuket-old-town-cafe",
  name: "Phuket Old Town & Cafe Tour",
  tagline: "Kafeler, Instagram noktaları ve gece pazarı",
  difficulty: "Kolay",
  elevation: "~200 m",
  bestTime: "11:00 çıkış — Chillva için 17:00+",
  image: routeHeroImage("old-phuket-town", ""),
  totalDriveKm: 40,
  description:
    "Phuket Old Town tour sevenler için: Thalang Road, Soi Romanee, Chillva Market ve Khao Rang — kısa mesafe, çok fotoğraf. Çiftler ve influencer'lar için ideal gün turu.",
  highlights: "Kafeler · Instagram noktaları · Chillva Market",
  recommendedBike: "Honda Click 160",
  startPoint: "Patong Beach",
  parkingInfo: "Old Town'da Thepkasattri veya Robinson otopark",
  fuelEstimate: "~2 L · 100 THB",
  stops: cafeStops,
  safetyTips: DEFAULT_SAFETY,
});

// ——— 9. Family Friendly ———
const familyStops = [
  patongStart(),
  buildStop({ order: 2, name: "Phuket Aquarium", description: "Çocuklar için deniz canlıları ve tünel akvaryum.", driveKm: 14, driveMin: 28, visitMin: 90, destinationSlug: "phuket-aquarium" }),
  buildStop({ order: 3, name: "Rawai Beach", description: "Sığ, sakin sahil; çocuklarla güvenli oyun.", driveKm: 10, driveMin: 22, visitMin: 45, destinationSlug: "rawai-beach" }),
  buildStop({ order: 4, name: "Nai Harn Beach", description: "Aile plajı; yüzme ve kum kaleleri.", driveKm: 6, driveMin: 14, visitMin: 60, destinationSlug: "nai-harn-beach" }),
  buildStop({ order: 5, name: "Windmill Viewpoint", description: "Kısa fotoğraf molası; çocuklar manzarayı sever.", driveKm: 5, driveMin: 12, visitMin: 20, destinationSlug: "windmill-viewpoint" }),
  buildStop({ order: 6, name: "Karon Viewpoint", description: "Son durak — üç plaj manzarası.", driveKm: 10, driveMin: 22, visitMin: 20, destinationSlug: "karon-viewpoint" }),
  patongReturn(7, 12, 25, "Kısa mesafe ile Patong'a dönüş."),
].map((s, i) => ({ ...s, order: i + 1 }));

export const FAMILY_FRIENDLY_ROUTE = finalize({
  id: "family-friendly-route",
  name: "Family Friendly Route",
  tagline: "Akvaryum, plajlar ve kısa sürüşler — çocuklu aileler için",
  difficulty: "Kolay",
  elevation: "~250 m",
  bestTime: "Sabah 09:00 — akvaryum 08:30 açılış",
  image: routeHeroImage("phuket-aquarium", ""),
  totalDriveKm: 50,
  description:
    "Çocuklu aileler için yorucu olmayan rota: kısa sürüş segmentleri, akvaryum ve güvenli plajlar. Öğle sıcağında akvaryum veya plaj gölgesi tercih edin.",
  highlights: "Çocuklu aileler · Kısa sürüşler · Akvaryum",
  recommendedBike: "Honda Click 160 (2 kişi) / Forza 350 (aile)",
  startPoint: "Patong Beach",
  parkingInfo: "Akvaryum ve plajlarda moto park mevcut",
  fuelEstimate: "~3 L · 150 THB",
  stops: familyStops,
  safetyTips: [
    { icon: "👶", title: "Çocuk güvenliği", text: "Çocuk kaskı ve güneş şapkası; ekstra su getirin." },
    ...DEFAULT_SAFETY.slice(1),
  ],
});

// ——— 10. Night Ride ———
const nightStops = [
  buildStop({
    order: 1,
    name: "Patong — Öğleden sonra çıkış",
    description: "16:00–17:00 arası çıkış; gündüz rotalarını tamamlayanlar için ideal gece turu.",
    driveKm: 0,
    driveMin: 0,
    visitMin: 5,
    lat: PATONG.lat,
    lng: PATONG.lng,
  }),
  buildStop({ order: 2, name: "Phuket Old Town", description: "Gece aydınlatmalı sokaklar ve akşam kafeleri.", driveKm: 16, driveMin: 30, visitMin: 60, destinationSlug: "old-phuket-town" }),
  buildStop({ order: 3, name: "Patong Beach", description: "Gece plaj yürüyüşü ve neon ışıkları.", driveKm: 16, driveMin: 30, visitMin: 30, destinationSlug: "patong-beach" }),
  buildStop({ order: 4, name: "Bangla Road", description: "Phuket gece hayatının kalbi; fotoğraf ve atmosfer.", driveKm: 1, driveMin: 5, visitMin: 45, destinationSlug: "bangla-road", tips: "Motosikleti güvenli park edin; eşya bırakmayın." }),
  buildStop({ order: 5, name: "Kalim Viewpoint", description: "Patong körfezinin gece ışıkları — spektaküler manzara.", driveKm: 4, driveMin: 12, visitMin: 30, lat: 7.905, lng: 98.285 }),
  buildStop({ order: 6, name: "Kamala Beach", description: "Sakin gece plajı; son mola veya içecek.", driveKm: 8, driveMin: 18, visitMin: 25, destinationSlug: "kamala-beach" }),
  patongReturn(7, 10, 22, "Gece Patong'a dönüş — hız limitine dikkat."),
];

export const PHUKET_NIGHT_RIDE = finalize({
  id: "phuket-night-ride",
  name: "Phuket Night Ride",
  tagline: "Old Town'dan Bangla'ya gece ışıkları turu",
  difficulty: "Kolay",
  elevation: "~200 m",
  bestTime: "16:00–17:00 çıkış — gece 22:00'ye kadar",
  image: routeHeroImage("old-phuket-town", ""),
  totalDriveKm: 35,
  description:
    "Gündüz plaj rotalarını bitirdikten sonra \"akşam ne yapalım?\" sorusunun cevabı. Old Town gece ışıkları, Bangla Road enerjisi ve Kalim'den Patong manzarası — kısa mesafe, büyük etki.",
  highlights: "Gece fotoğrafları · Eğlence hayatı · Kalim manzarası",
  recommendedBike: "Honda Click 160",
  startPoint: "Patong Beach",
  parkingInfo: "Bangla çevresinde ücretli moto park",
  fuelEstimate: "~2 L · 100 THB",
  stops: nightStops,
  safetyTips: NIGHT_SAFETY,
});

// ——— 11. Luxury Route ———
const luxuryStops = [
  patongStart(5),
  buildStop({ order: 2, name: "Boat Avenue", description: "Laguna bölgesi alışveriş ve fine dining caddesi.", driveKm: 12, driveMin: 25, visitMin: 40, lat: 7.985, lng: 98.285 }),
  buildStop({ order: 3, name: "Laguna Phuket", description: "Resort kompleksi; lüks otel ve golf manzarası.", driveKm: 2, driveMin: 5, visitMin: 25, destinationSlug: "bang-tao-beach" }),
  buildStop({ order: 4, name: "Bang Tao Beach", description: "Geniş plaj ve premium beach club bölgesi.", driveKm: 2, driveMin: 5, visitMin: 60, destinationSlug: "bang-tao-beach" }),
  buildStop({ order: 5, name: "Catch Beach Club", description: "Lüks beach club; öğle yemeği veya kokteyl molası.", driveKm: 1, driveMin: 3, visitMin: 75, lat: 7.98, lng: 98.278, tips: "Minimum harcama olabilir; rezervasyon önerilir." }),
  buildStop({ order: 6, name: "Surin Beach", description: "Şık plaj ve boutique oteller.", driveKm: 3, driveMin: 8, visitMin: 45, destinationSlug: "surin-beach" }),
  buildStop({ order: 7, name: "Café Del Mar", description: "Ibiza tarzı beach club; gün batımı ve DJ.", driveKm: 2, driveMin: 5, visitMin: 60, lat: 7.976, lng: 98.279 }),
  patongReturn(8, 14, 28, "Akşam Patong'a dönüş."),
].map((s, i) => ({ ...s, order: i + 1 }));

export const LUXURY_PHUKET_ROUTE = finalize({
  id: "luxury-phuket-route",
  name: "Luxury Phuket Route",
  tagline: "Beach club'lar ve premium restoranlar — lüks gün turu",
  difficulty: "Kolay",
  elevation: "~100 m",
  bestTime: "11:00 çıkış — beach club 12:00–18:00",
  image: routeHeroImage("surin-beach", ""),
  totalDriveKm: 60,
  description:
    "Phuket'in lüks yüzünü motosikletle keşfedin: Boat Avenue, Catch Beach Club, Surin ve Café Del Mar. Kiralama maliyetinin yanında club harcaması bütçesi ayırın.",
  highlights: "Lüks beach club'lar · Premium restoranlar",
  recommendedBike: "Honda Forza 350 / ADV 160",
  startPoint: "Patong Beach",
  parkingInfo: "Beach club'larda vale veya ücretsiz moto park",
  fuelEstimate: "~4 L · 200 THB + club harcaması",
  stops: luxuryStops,
  safetyTips: DEFAULT_SAFETY,
});

// ——— 12. Airport Plane Spotting ———
const planeSpottingStops = [
  patongStart(),
  buildStop({ order: 2, name: "Nai Yang Beach", description: "Havaalanına yakın uzun plaj; uçak sesi ve kum.", driveKm: 28, driveMin: 45, visitMin: 40, destinationSlug: "nai-yang-beach" }),
  buildStop({ order: 3, name: "Mai Khao Beach", description: "Pist üzerinden alçalan dev uçakları izleme noktası.", driveKm: 5, driveMin: 10, visitMin: 50, destinationSlug: "mai-khao-plane-spot", tips: "Flightradar ile iniş saatlerini takip edin." }),
  buildStop({ order: 4, name: "Airport Viewpoint", description: "Resmi plane spotting alanı; tripod için ideal.", driveKm: 2, driveMin: 5, visitMin: 45, destinationSlug: "mai-khao-plane-spot" }),
  buildStop({ order: 5, name: "Sarasin Bridge", description: "Köprü manzarası ve fotoğraf molası.", driveKm: 12, driveMin: 22, visitMin: 25, lat: 8.265, lng: 98.342 }),
  patongReturn(6, 30, 50, "402 ile Patong'a dönüş."),
].map((s, i) => ({ ...s, order: i + 1 }));

export const AIRPORT_PLANE_SPOTTING = finalize({
  id: "airport-plane-spotting",
  name: "Airport Plane Spotting Tour",
  tagline: "Mai Khao uçak manzarası ve Sarasin Köprüsü",
  difficulty: "Kolay",
  elevation: "~100 m",
  bestTime: "Sabah 08:00 — öğleden sonra iniş trafiği yoğun",
  image: routeHeroImage("mai-khao-plane-spot", ""),
  totalDriveKm: 90,
  description:
    "Aviation tutkunları için: Nai Yang'dan Mai Khao plane spotting'e, Sarasin Köprüsü ile finale. Google'da \"Phuket airport plane spotting scooter\" aramasının tam cevabı.",
  highlights: "Uçak fotoğrafçılığı · Kuzey Phuket manzaraları",
  recommendedBike: "Honda Click 160 / ADV 160",
  startPoint: "Patong Beach",
  parkingInfo: "Mai Khao spotting alanında ücretsiz park",
  fuelEstimate: "~5 L · 250 THB",
  stops: planeSpottingStops,
  safetyTips: [
    { icon: "✈️", title: "Güvenlik", text: "Pist çitine yaklaşmayın; sadece izin verilen alanlarda durun." },
    ...DEFAULT_SAFETY.slice(1),
  ],
});

export const DAY_TRIP_ROUTES = [
  SOUTH_PHUKET_LOOP,
  PHUKET_VIEWPOINTS_LOOP,
  PHUKET_BEACH_HOPPING,
  PHUKET_SUNSET_ROUTE,
  BIG_BUDDHA_CULTURE,
  HIDDEN_PHUKET,
  NORTH_PHUKET_EXPLORER,
  PHUKET_OLD_TOWN_CAFE,
  FAMILY_FRIENDLY_ROUTE,
  PHUKET_NIGHT_RIDE,
  LUXURY_PHUKET_ROUTE,
  AIRPORT_PLANE_SPOTTING,
];
