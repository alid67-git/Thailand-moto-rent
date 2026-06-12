import type { MotorcycleRoute } from "@/lib/routes-types";
import {
  buildStop,
  formatDurationFromMin,
  routeHeroImage,
  sumStops,
} from "@/lib/route-stop-builder";

const PATONG = { lat: 7.8961, lng: 98.2953 };

function finalize(
  base: Omit<
    MotorcycleRoute,
    "totalDriveKm" | "totalDriveMin" | "totalVisitMin" | "totalDayMin" | "duration" | "distance"
  > & { totalDriveKm?: number },
): MotorcycleRoute {
  const totals = sumStops(base.stops);
  const totalDriveKm = base.totalDriveKm ?? totals.totalDriveKm;
  return {
    ...base,
    ...totals,
    totalDriveKm,
    distance: `${totalDriveKm} km`,
    duration: formatDurationFromMin(totals.totalDayMin),
  };
}

/** ——— 1 GÜNLÜK ROTALAR ——— */

const southPhuketStops = [
  buildStop({
    order: 1,
    name: "Patong — Çıkış",
    description:
      "Patong Beach Roundabout'tan çıkış. Bangla Road yönünden Chaloem Phrakiat Ratchakan Thi 9 Rd (4021) ile Big Buddha yoluna bağlanın. Yakıt ve su alın.",
    driveKm: 0,
    driveMin: 0,
    visitMin: 10,
    lat: PATONG.lat,
    lng: PATONG.lng,
    tips: "Sabah 08:00–09:00 ideal; öğleden sonra Big Buddha kalabalık olur.",
  }),
  buildStop({
    order: 2,
    name: "Big Buddha (Phuket)",
    description:
      "45 m yüksekliğindeki mermer Buda heykeli ve panoramik Patong–Karon manzarası. Tapınak alanında mütevazı kıyafet; omuz ve diz kapalı olmalı.",
    driveKm: 8,
    driveMin: 25,
    visitMin: 60,
    destinationSlug: "big-buddha",
    tips: "Ücretsiz otopark; bağış kutusu isteğe bağlı.",
  }),
  buildStop({
    order: 3,
    name: "Karon Viewpoint (Üç Plaj)",
    description:
      "Kata Noi, Karon ve Kata plajlarını aynı karede gören ünlü seyir noktası. Kısa yürüyüş ve fotoğraf molası.",
    driveKm: 6,
    driveMin: 15,
    visitMin: 25,
    destinationSlug: "karon-viewpoint",
  }),
  buildStop({
    order: 4,
    name: "Kata Beach",
    description:
      "Sörf ve yüzme için popüler koy. Sahil boyunca kafe ve kiralama noktaları; öğle molası için uygun.",
    driveKm: 4,
    driveMin: 12,
    visitMin: 45,
    destinationSlug: "kata-beach",
  }),
  buildStop({
    order: 5,
    name: "Windmill Viewpoint",
    description:
      "Ya Nui ve Rawai yarımadasına bakan rüzgar türbini seyir terası. Güney Phuket'in en geniş panoramalarından biri.",
    driveKm: 5,
    driveMin: 15,
    visitMin: 30,
    destinationSlug: "windmill-viewpoint",
  }),
  buildStop({
    order: 6,
    name: "Promthep Cape",
    description:
      "Phuket'in en güney ucunda gün batımı noktası, deniz feneri ve Andaman manzarası. Akşamüstü en kalabalık saat 17:00–18:30.",
    driveKm: 6,
    driveMin: 15,
    visitMin: 75,
    destinationSlug: "promthep-cape",
    tips: "Günbatımı için 45 dk erken gelin; park yeri sınırlı.",
  }),
  buildStop({
    order: 7,
    name: "Rawai Beach",
    description:
      "Balıkçı limanı, taze deniz ürünü restoranları ve longtail iskeleleri. Akşam yemeği veya kısa sahil yürüyüşü.",
    driveKm: 8,
    driveMin: 18,
    visitMin: 45,
    destinationSlug: "rawai-beach",
  }),
  buildStop({
    order: 8,
    name: "Patong — Dönüş",
    description: "Rawai–Chalong–Patong hattı ile kiralama noktasına dönüş. Gece sürüşünde farları açık tutun.",
    driveKm: 14,
    driveMin: 30,
    visitMin: 0,
    lat: PATONG.lat,
    lng: PATONG.lng,
  }),
];

export const SOUTH_PHUKET_ROUTE = finalize({
  id: "south-phuket",
  name: "Güney Phuket Klasik Loop",
  tagline: "Big Buddha → viewpoint'ler → Promthep gün batımı → Rawai",
  difficulty: "Kolay",
  elevation: "~500 m",
  bestTime: "Sabah 08:00 çıkış; Promthep için 17:00–18:30",
  image: routeHeroImage("promthep-cape", ""),
  description:
    "Patong'dan başlayan Phuket'in en popüler güney yarımada turu. İyi asfalt, net tabelalar ve her durakta otopark. İlk kez Phuket'e gelenler için ideal: ikonik Buda heykeli, üç plaj manzarası, günbatımı ve balıkçı köyü tek rotada. Toplam sürüş rahat tempoda; duraklarda fotoğraf ve yemek molaları planlayın.",
  highlights: "Big Buddha, Karon Viewpoint, Kata, Windmill, Promthep Cape, Rawai",
  recommendedBike: "Honda Click 160 / ADV 160",
  startPoint: "Patong Beach Roundabout",
  parkingInfo: "Tüm duraklarda ücretsiz/ücretli motosiklet parkı mevcut",
  fuelEstimate: "~7 L benzin · 300–400 THB",
  stops: southPhuketStops,
  safetyTips: [
    { icon: "⚠️", title: "Virajlı yollar", text: "Big Buddha yokuşu ve güney sahil yolu dönemecidir; hızı düşürün." },
    { icon: "🌡️", title: "Güneş", text: "SPF 50+ ve bol su; öğle saatlerinde gölgede mola verin." },
    { icon: "⛽", title: "Yakıt", text: "Patong'dan çıkmadan depoyu doldurun; Rawai'de istasyon var." },
  ],
});

const sunsetStops = [
  buildStop({
    order: 1,
    name: "Patong — Çıkış",
    description: "Öğleden sonra çıkış; kuzey Phang Nga yönü için 402 karayoluna bağlanın.",
    driveKm: 0,
    driveMin: 0,
    visitMin: 5,
    lat: PATONG.lat,
    lng: PATONG.lng,
  }),
  buildStop({
    order: 2,
    name: "Samet Nangshe Viewpoint",
    description:
      "Phang Nga körfezi ve kireçtaşı adalarının 360° panoraması. Gün batımı rotasında öğleden önce veya gün doğusu için sabah alternatifi.",
    driveKm: 35,
    driveMin: 55,
    visitMin: 60,
    destinationSlug: "samet-nangshe",
    tips: "Giriş ~50 THB; drone yasak olabilir.",
  }),
  buildStop({
    order: 3,
    name: "Promthep Cape",
    description: "Phuket güney ucunda Andaman günbatımı. Fener, buddha ve seyir terası.",
    driveKm: 48,
    driveMin: 70,
    visitMin: 90,
    destinationSlug: "promthep-cape",
  }),
  buildStop({
    order: 4,
    name: "Karon Viewpoint",
    description: "Dönüş yolunda üç plaj manzarası; alacakaranlıkta son fotoğraflar.",
    driveKm: 12,
    driveMin: 25,
    visitMin: 20,
    destinationSlug: "karon-viewpoint",
  }),
  buildStop({
    order: 5,
    name: "Patong — Dönüş",
    description: "Karon–Patong sahil yolu; gece sürüşünde dikkat.",
    driveKm: 8,
    driveMin: 18,
    visitMin: 0,
    lat: PATONG.lat,
    lng: PATONG.lng,
  }),
];

export const PHUKET_SUNSET_ROUTE = finalize({
  id: "phuket-sunset",
  name: "Günbatış & Körfez Manzarası",
  tagline: "Samet Nangshe panoraması + Promthep Cape gün batımı",
  difficulty: "Kolay",
  elevation: "~400 m",
  bestTime: "14:00 çıkış — Promthep'te 17:30–18:30",
  image: routeHeroImage("samet-nangshe", ""),
  description:
    "Fotoğraf ve manzara odaklı yarım gün rotası. Sabah erken Samet Nangshe alternatifi de mümkün; bu program öğleden sonra çıkışla Promthep günbatımına odaklanır. 402 ve sahil yolları iyi durumda; ADV 160 ile rahat sürülür.",
  highlights: "Samet Nangshe, Promthep Cape, Karon Viewpoint",
  recommendedBike: "Honda Click 160 / ADV 160",
  startPoint: "Patong Beach",
  parkingInfo: "Viewpoint'lerde ücretli otopark; Promthep akşamüstü dolabilir",
  fuelEstimate: "~5 L · 250–300 THB",
  stops: sunsetStops,
  safetyTips: [
    { icon: "🌅", title: "Işık", text: "Gün batımından sonra farları açın; karanlık hızlı gelir." },
    { icon: "📸", title: "Durak", text: "Manzara için yol kenarına güvenli park edin." },
    { icon: "👥", title: "Kalabalık", text: "Promthep hafta sonları çok kalabalık; hafta içi sakin." },
  ],
});

const viewpointsStops = [
  buildStop({ order: 1, name: "Patong — Çıkış", description: "Radar Hill yönüne Chaloem Phrakiat yolu.", driveKm: 0, driveMin: 0, visitMin: 5, lat: PATONG.lat, lng: PATONG.lng }),
  buildStop({ order: 2, name: "Radar Hill (Khao Khad)", description: "Phuket şehir, Chalong körfezi ve Big Buddha manzarası. 360° seyir.", driveKm: 12, driveMin: 25, visitMin: 30, destinationSlug: "radar-hill-viewpoint" }),
  buildStop({ order: 3, name: "Windmill Viewpoint", description: "Güney yarımada ve Ya Nui plajı panoraması.", driveKm: 18, driveMin: 35, visitMin: 25, destinationSlug: "windmill-viewpoint" }),
  buildStop({ order: 4, name: "Karon Viewpoint", description: "Üç plaj manzarası — klasik Phuket kartpostalı.", driveKm: 10, driveMin: 20, visitMin: 25, destinationSlug: "karon-viewpoint" }),
  buildStop({ order: 5, name: "Samet Nangshe Viewpoint", description: "Phang Nga körfezi ve adalar — gün doğumu/batımı için efsane nokta.", driveKm: 35, driveMin: 50, visitMin: 45, destinationSlug: "samet-nangshe" }),
  buildStop({ order: 6, name: "Promthep Cape", description: "Son durak: günbatımı veya öğleden sonra deniz manzarası.", driveKm: 40, driveMin: 55, visitMin: 40, destinationSlug: "promthep-cape" }),
  buildStop({ order: 7, name: "Patong — Dönüş", description: "Güney sahil yolu ile dönüş.", driveKm: 15, driveMin: 30, visitMin: 0, lat: PATONG.lat, lng: PATONG.lng }),
];

export const VIEWPOINTS_LOOP_ROUTE = finalize({
  id: "viewpoints-loop",
  name: "Phuket Viewpoint Turu",
  tagline: "Radar Hill'den Samet Nangshe'ye tüm seyir noktaları",
  difficulty: "Kolay",
  elevation: "~450 m",
  bestTime: "Sabah 09:00 — gün batımı için programı ters çevirin",
  image: routeHeroImage("karon-viewpoint", ""),
  description:
    "Phuket'in fotoğraf cenneti duraklarını tek günde birleştiren rota. Her viewpoint'te 20–45 dakika ayırın; acele etmeyin. Toplam mesafe uzun görünse de yollar düzgün; molalı sürüş keyifli.",
  highlights: "Radar Hill, Windmill, Karon Viewpoint, Samet Nangshe, Promthep",
  recommendedBike: "Honda Click 160",
  startPoint: "Patong Beach",
  parkingInfo: "Her viewpoint'te otopark",
  fuelEstimate: "~6 L · 280 THB",
  stops: viewpointsStops,
  safetyTips: [
    { icon: "⏰", title: "Zaman", text: "5 viewpoint = uzun gün; erken başlayın." },
    { icon: "📸", title: "Fotoğraf", text: "Her durakta en az 20 dk kalın." },
    { icon: "🚗", title: "Park", text: "Popüler saatlerde Samet Nangshe parkı dolabilir." },
  ],
});

const beachesStops = [
  buildStop({ order: 1, name: "Patong Beach", description: "Başlangıç — kısa plaj yürüyüşü veya kahve molası.", driveKm: 0, driveMin: 0, visitMin: 20, destinationSlug: "patong-beach", lat: PATONG.lat, lng: PATONG.lng }),
  buildStop({ order: 2, name: "Kata Beach", description: "Sörf ve yüzme; dalga varsa dikkat.", driveKm: 15, driveMin: 30, visitMin: 60, destinationSlug: "kata-beach" }),
  buildStop({ order: 3, name: "Karon Beach", description: "Uzun kum şeridi, aile dostu plaj.", driveKm: 5, driveMin: 12, visitMin: 60, destinationSlug: "karon-beach" }),
  buildStop({ order: 4, name: "Bang Tao Beach", description: "Geniş plaj, resort bölgesi; öğle yemeği.", driveKm: 22, driveMin: 35, visitMin: 75, destinationSlug: "bang-tao-beach" }),
  buildStop({ order: 5, name: "Surin Beach", description: "Daha sakin, şık plaj; akşamüstü molası.", driveKm: 4, driveMin: 10, visitMin: 45, destinationSlug: "surin-beach" }),
  buildStop({ order: 6, name: "Nai Harn Beach", description: "Yerel favori koy; gün batımına yakın sakin.", driveKm: 18, driveMin: 28, visitMin: 60, destinationSlug: "nai-harn-beach" }),
  buildStop({ order: 7, name: "Patong — Dönüş", description: "Rawai–Chalong üzerinden Patong.", driveKm: 12, driveMin: 25, visitMin: 0, lat: PATONG.lat, lng: PATONG.lng }),
];

export const BEACHES_HOPPING_ROUTE = finalize({
  id: "beaches-hopping",
  name: "Phuket Plaj Turu",
  tagline: "Patong'dan Nai Harn'a en güzel koylar",
  difficulty: "Kolay",
  elevation: "~200 m",
  bestTime: "Sabah 08:00 — plaj saatleri 10:00–17:00",
  image: routeHeroImage("kata-beach", ""),
  description:
    "Phuket'in batı ve güney plajlarını motosikletle keşfedin. Her plajda farklı karakter: sörf (Kata), geniş kum (Karon), lüks (Bang Tao), sakin (Nai Harn). Mayo, havlu ve güneş kremi şart.",
  highlights: "Patong, Kata, Karon, Bang Tao, Surin, Nai Harn",
  recommendedBike: "Honda Click 160 / ADV 160",
  startPoint: "Patong Beach",
  parkingInfo: "Plaj otoparkları 20–40 THB; Bang Tao'da resort parkları",
  fuelEstimate: "~4 L · 200 THB",
  stops: beachesStops,
  safetyTips: [
    { icon: "🏊", title: "Deniz", text: "Kırmızı bayrak varsa yüzmeyin; monsoon döneminde akıntı güçlü." },
    { icon: "💰", title: "Park", text: "Bazı plajlarda otopark ücreti nakit." },
    { icon: "🚦", title: "Trafik", text: "Patong–Kata hattı öğleden sonra yoğun." },
  ],
});

const phangNgaDayStops = [
  buildStop({ order: 1, name: "Patong — Çıkış", description: "402 karayolu ile kuzeye; Sabah 07:30 ideal.", driveKm: 0, driveMin: 0, visitMin: 10, lat: PATONG.lat, lng: PATONG.lng }),
  buildStop({ order: 2, name: "Samet Nangshe Viewpoint", description: "Phang Nga körfez panoraması — rota başlangıcının en iyi fotoğraf durağı.", driveKm: 35, driveMin: 50, visitMin: 45, destinationSlug: "samet-nangshe" }),
  buildStop({ order: 3, name: "Maymun Mağarası (Wat Suwan Kuha)", description: "Mağara tapınağı, dev yatar Buda ve maymunlar. Motosikletle otoparka kadar.", driveKm: 28, driveMin: 35, visitMin: 50, destinationSlug: "monkey-cave", tips: "Maymunlara yiyecek uzatmayın; çanta sıkı kapalı." }),
  buildStop({ order: 4, name: "Phang Nga Town & Surakul İskelesi", description: "Motoru iskele otoparkına bırakın; longtail veya grup turu için bilet alın.", driveKm: 20, driveMin: 30, visitMin: 20, lat: 8.2755, lng: 98.512 }),
  buildStop({
    order: 5,
    name: "James Bond Adası & Körfez Turu",
    description: "Koh Tapu (James Bond kayası), Koh Panyee yüzen köyü ve mangrov kanalları. Tekne ~2–3 saat.",
    driveKm: 0,
    driveMin: 0,
    visitMin: 150,
    destinationSlug: "james-bond-island",
    access: "boat",
    tips: "Tur 800–1500 THB; pazarlık yapın veya paylaşımlı tur.",
  }),
  buildStop({ order: 6, name: "Patong — Dönüş", description: "402 ile güneye; akşam trafiğine dikkat.", driveKm: 90, driveMin: 110, visitMin: 0, lat: PATONG.lat, lng: PATONG.lng }),
];

export const PHANG_NGA_DAY_ROUTE = finalize({
  id: "phang-nga-day",
  name: "Phang Nga Günübirlik Tur",
  tagline: "Samet Nangshe + Maymun Mağarası + James Bond tekne turu",
  difficulty: "Orta",
  elevation: "~300 m",
  bestTime: "Sabah 07:30 çıkış — tekne turu için öğleden önce iskelede olun",
  image: routeHeroImage("james-bond-island", ""),
  description:
    "Patong'dan tek günde Phang Nga körfezinin en iyi üç deneyimini birleştirir: körfez panoraması, mağara tapınağı ve tekne ile James Bond adası. Tekne bölümü motosiklet dışı; iskelede güvenli park ve kask/eşya kilidi kullanın.",
  highlights: "Samet Nangshe, Maymun Mağarası, James Bond, Koh Panyee",
  recommendedBike: "Honda ADV 160 / Forza 350",
  startPoint: "Patong Beach Roundabout",
  parkingInfo: "Surakul İskelesi otopark ~30 THB; tekne turunda kask kilitle",
  fuelEstimate: "~5 L · 250 THB + tekne 800–1500 THB",
  stops: phangNgaDayStops,
  safetyTips: [
    { icon: "⛵", title: "Tekne", text: "Can yeleği isteyin; hava kötüyse tur iptal edilebilir." },
    { icon: "🐒", title: "Maymunlar", text: "Mağarada çanta ve telefonu koruyun." },
    { icon: "☀️", title: "Güneş", text: "Tekne turunda şapka ve SPF şart." },
  ],
});

const hiddenGemsStops = [
  buildStop({ order: 1, name: "Patong — Çıkış", description: "Kuzey ve iç kesim yollarına.", driveKm: 0, driveMin: 0, visitMin: 5, lat: PATONG.lat, lng: PATONG.lng }),
  buildStop({ order: 2, name: "Soi Dog Foundation", description: "Köpek kurtarma merkezi; ziyaret saatlerini web'den kontrol edin.", driveKm: 15, driveMin: 25, visitMin: 45, destinationSlug: "soi-dog-foundation" }),
  buildStop({ order: 3, name: "Wat Phra Thong (Bang Tao)", description: "Yarı gömülü Buda efsanesiyle ünlü tarihi tapınak.", driveKm: 22, driveMin: 35, visitMin: 30, destinationSlug: "bang-tao-temple" }),
  buildStop({ order: 4, name: "Sirinat Milli Parkı (Nai Yang)", description: "Havaalanına yakın uzun plaj, deniz kaplumbağası koruma alanı.", driveKm: 18, driveMin: 30, visitMin: 60, destinationSlug: "sirinat-national-park" }),
  buildStop({ order: 5, name: "Mai Khao — Uçak Manzarası", description: "Pist üzerinden alçalan uçakları izleme noktası (zamanlamaya bağlı).", driveKm: 5, driveMin: 10, visitMin: 40, destinationSlug: "mai-khao-plane-spot" }),
  buildStop({ order: 6, name: "Patong — Dönüş", description: "Sarasin köprüsü veya sahil yolu alternatifleri.", driveKm: 35, driveMin: 50, visitMin: 0, lat: PATONG.lat, lng: PATONG.lng }),
];

export const HIDDEN_GEMS_ROUTE = finalize({
  id: "hidden-gems",
  name: "Phuket Gizli Köşeler",
  tagline: "Turist kalabalığından uzak 4 farklı durak",
  difficulty: "Orta",
  elevation: "~350 m",
  bestTime: "Sabah 08:00",
  image: routeHeroImage("mai-khao-plane-spot", ""),
  description:
    "Patong dışında Phuket'in daha az bilinen durakları. Dar köy yolları ve GPS önerilir. Soi Dog ziyareti duygusal olabilir — gönüllü bağış isteğe bağlı.",
  highlights: "Soi Dog, Bang Tao Temple, Sirinat, Mai Khao uçak noktası",
  recommendedBike: "Honda ADV 160",
  startPoint: "Patong Beach",
  parkingInfo: "Sirinat ve Mai Khao'da resmi otopark",
  fuelEstimate: "~5 L · 250 THB",
  stops: hiddenGemsStops,
  safetyTips: [
    { icon: "🗺️", title: "GPS", text: "Köy yollarında offline harita kullanın." },
    { icon: "🛣️", title: "Dar yol", text: "Nai Yang iç yolları dar; karşıdan gelene dikkat." },
    { icon: "✈️", title: "Uçak", text: "Mai Khao'da iniş saatlerini flightradar ile takip edin." },
  ],
});

const cultureStops = [
  buildStop({ order: 1, name: "Patong — Çıkış", description: "Phuket Town yönüne.", driveKm: 0, driveMin: 0, visitMin: 5, lat: PATONG.lat, lng: PATONG.lng }),
  buildStop({ order: 2, name: "Wat Chalong", description: "Phuket'in en büyük budist tapınağı; kremasyon binası ve bahçeler.", driveKm: 18, driveMin: 30, visitMin: 60, destinationSlug: "wat-chalong" }),
  buildStop({ order: 3, name: "Old Phuket Town", description: "Sino-Portekiz mimarisi, Soi Romanee, kafe ve sanat galerileri.", driveKm: 8, driveMin: 15, visitMin: 120, destinationSlug: "old-phuket-town", tips: "Pazar günü sokak pazarı var." }),
  buildStop({ order: 4, name: "Khao Rang Viewpoint", description: "Phuket Town üzerinde şehir manzarası ve restoran.", driveKm: 3, driveMin: 8, visitMin: 30, destinationSlug: "khao-rang" }),
  buildStop({ order: 5, name: "Monkey Hill (Toh Sae)", description: "Şehir manzarası ve maymunlar; gün batımı alternatifi.", driveKm: 5, driveMin: 12, visitMin: 35, destinationSlug: "monkey-hill" }),
  buildStop({ order: 6, name: "Patong — Dönüş", description: "Akşam trafiği yoğun olabilir.", driveKm: 16, driveMin: 30, visitMin: 0, lat: PATONG.lat, lng: PATONG.lng }),
];

export const CULTURE_TOWN_ROUTE = finalize({
  id: "culture-town",
  name: "Tapınak & Eski Şehir Turu",
  tagline: "Wat Chalong, Phuket Old Town ve viewpoint'ler",
  difficulty: "Kolay",
  elevation: "~250 m",
  bestTime: "Sabah 09:00 — Old Town için öğleden sonra gölge sokaklar",
  image: routeHeroImage("old-phuket-town", ""),
  description:
    "Phuket'in kültür ve tarih odaklı gün turu. Tapınak ziyaretinde omuz/k diz kapalı; Old Town'da yürüyerek keşif için en az 2 saat ayırın.",
  highlights: "Wat Chalong, Old Phuket Town, Khao Rang, Monkey Hill",
  recommendedBike: "Honda Click 160",
  startPoint: "Patong Beach",
  parkingInfo: "Old Town'da sokak park zor; Thepkasattri otopark kullanın",
  fuelEstimate: "~3 L · 150 THB",
  stops: cultureStops,
  safetyTips: [
    { icon: "👔", title: "Kıyafet", text: "Tapınakta mütevazı giyinin." },
    { icon: "🅿️", title: "Park", text: "Old Town'da moto park yeri sınırlı." },
    { icon: "🐒", title: "Maymun", text: "Monkey Hill'de yiyecek göstermeyin." },
  ],
});

export const DAY_TRIP_ROUTES = [
  SOUTH_PHUKET_ROUTE,
  PHUKET_SUNSET_ROUTE,
  VIEWPOINTS_LOOP_ROUTE,
  BEACHES_HOPPING_ROUTE,
  PHANG_NGA_DAY_ROUTE,
  HIDDEN_GEMS_ROUTE,
  CULTURE_TOWN_ROUTE,
];
