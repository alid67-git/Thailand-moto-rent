/** Motosiklet + tekne ile ulaşım rehberi (ada ve körfez destinasyonları). */
export interface IslandAccessGuide {
  motoEndpoint: string;
  motoFromPatong: string;
  boatPier: string;
  boatType: string;
  boatDuration: string;
  summary: string;
  steps: string[];
  tips: string[];
}

export const ISLAND_ACCESS_GUIDES: Record<string, IslandAccessGuide> = {
  "james-bond-island": {
    motoEndpoint: "Phang Nga — Surakul Pier (Phang Nga Bay Marina)",
    motoFromPatong: "~95 km · 2–2,5 saat (Sarasit / 402 yolu)",
    boatPier: "Surakul Pier veya Phuket doğu kıyısı: Ao Po / Laem Sai",
    boatType: "Longtail veya hızlı tekne (grup turu)",
    boatDuration: "Tekne: 20–40 dk (körfez içi)",
    summary:
      "James Bond Adası (Khao Phing Kan) karada değil; motosikletle iskele noktasına kadar gidilir, ada tekne turu ile geçilir.",
    steps: [
      "Patong'dan motosikletle Phang Nga ilçe merkezine veya Surakul Pier'e sür (otopark mevcut).",
      "İskelede James Bond / Phang Nga Bay turu al (longtail veya speedboat).",
      "Tur: Khao Phing Kan (James Bond kayası), Koh Panyee köyü ve mağara geçişleri.",
      "Motosiklet iskele otoparkında kalır; adaya motor çıkarılmaz.",
    ],
    tips: [
      "Sabah erken (08:00–09:00) turlar daha sakin ve serin.",
      "Surakul Pier'de güvenli otopark var; kask ve eşyaları kilitle.",
      "Alternatif: Phuket'ten Ao Po Grand Marina çıkışlı turlar da var (~40 km Patong).",
    ],
  },
  "phang-nga-bay": {
    motoEndpoint: "Phang Nga — Surakul Pier",
    motoFromPatong: "~90 km · 2–2,5 saat",
    boatPier: "Surakul Pier (ana) · Ao Po / Yamuu (Phuket alternatif)",
    boatType: "Longtail tekne veya organize körfez turu",
    boatDuration: "3–5 saat (tam körfez turu)",
    summary:
      "Phang Nga Körfezi karayolu ile gezilemez; motosikletle iskeleye kadar, körfez tekne ile.",
    steps: [
      "Patong → Phang Nga (Sarasit Köprüsü üzerinden) — Surakul Pier'e park et.",
      "Longtail kiralayın veya grup turuna katılın.",
      "Duraklar: Hong Mağarası, Koh Panyee, James Bond kayası, mangrov kanalları.",
      "Dönüşte aynı iskeleye inilir; motosiklet otoparkta bekler.",
    ],
    tips: [
      "Gelgit saatlerine dikkat — bazı mağaralar sadece düşük gelgitte geçilir.",
      "Maymun Mağarası (Wat Suwan Kuha) dönüşte motosikletle uğranabilir (~15 km).",
    ],
  },
  "similan-islands": {
    motoEndpoint: "Tap Lamu Pier (Khao Lak / Thai Mueang)",
    motoFromPatong: "~85 km · 2 saat (402 karayolu kuzey)",
    boatPier: "Tap Lamu (Thap Lamu) Naval Pier",
    boatType: "Hızlı tekne / dalış teknesi (sadece tur operatörü)",
    boatDuration: "Tekne: ~1,5–2 saat açık deniz",
    summary:
      "Similan açık denizde; motosikletle Tap Lamu iskelesine kadar, ada feribotu veya tur teknesi şart.",
    steps: [
      "Patong'dan 402 ile kuzeye — Khao Lak geçiş — Tap Lamu Pier.",
      "Önceden tur rezervasyonu yap (genelde 07:30–08:00 kalkış).",
      "Speedboat ile Similan Adaları Milli Parkı'na transfer.",
      "Motosiklet Tap Lamu otoparkında; adaya motor götürülemez.",
    ],
    tips: [
      "Similan Ekim–Mayıs açık; sezon dışı kapalı olabilir.",
      "Millî park giriş ücreti + tekne ayrı faturalandırılır.",
      "Khao Lak plajında geceleme için motosikletle konaklama mümkün.",
    ],
  },
  "coral-island": {
    motoEndpoint: "Rawai Beach veya Chalong Pier",
    motoFromPatong: "~22–28 km · 45–55 dk (güney sahil yolu)",
    boatPier: "Rawai Longtail İskelesi · Chalong Pier",
    boatType: "Longtail veya speedboat",
    boatDuration: "Tekne: 15–25 dk",
    summary:
      "Koh Hae (Coral Island) Phuket'in hemen güneyinde; motosikletle Rawai/Chalong'a, oradan tekne.",
    steps: [
      "Patong → Rawai Sahili (sahil yolu veya Chalong üzerinden).",
      "Rawai'de longtail teknecilerle fiyat pazarlığı (~300–600 THB gidiş-dönüş).",
      "Koh Hae: Long Beach veya Banana Beach'e iniş.",
      "Dönüş aynı iskele; motosiklet Rawai otoparkında.",
    ],
    tips: [
      "Chalong'dan da düzenli speedboat seferleri var.",
      "Öğleden sonra deniz daha dalgalı olabilir; sabah tercih edin.",
      "Rawai aynı zamanda Koh Racha / Phi Phi turlarının da kalkış noktası.",
    ],
  },
  "bamboo-island": {
    motoEndpoint: "Phang Nga Surakul Pier veya Phi Phi tur iskelesi",
    motoFromPatong: "Phang Nga: ~95 km · Phi Phi iskelesi: ~45 km",
    boatPier: "Surakul Pier (Koh Panak mağarası) · Rassada Pier (Koh Mai Phai)",
    boatType: "Körfez turu + kano veya Phi Phi hızlı tekne",
    boatDuration: "20 dk – 1 saat (rotaya göre)",
    summary:
      "“Bambu Adası” genelde Koh Mai Phai (Phi Phi yakını) veya Phang Nga'daki Koh Panak ile karıştırılır — ikisi de tekne şart.",
    steps: [
      "Koh Panak (mağara): Motosikletle Phang Nga Surakul Pier → körfez turu + kano ile mağara.",
      "Koh Mai Phai (Bamboo): Motosikletle Rassada Pier (Phuket Town) → Phi Phi tekne turuna katıl.",
      "Her iki durumda ada kıyısına motosiklet çıkarılmaz.",
    ],
    tips: [
      "Hangi adayı kastettiğinizi tur operatörüne net söyleyin.",
      "Koh Panak için kano deneyimi Phang Nga paket turlarında.",
    ],
  },
  "koh-phi-phi": {
    motoEndpoint: "Rassada Pier (Phuket Town) veya Chalong Pier",
    motoFromPatong: "~45–50 km · 1–1,5 saat",
    boatPier: "Rassada Pier (ana feribot) · Chalong (speedboat)",
    boatType: "Feribot (2 saat) veya speedboat (45–90 dk)",
    boatDuration: "45 dk – 2 saat",
    summary:
      "Phi Phi adalarına karayolu yok; motosikletle iskeleye kadar, feribot veya speedboat ile geçilir.",
    steps: [
      "Patong → Rassada Pier (Phuket Town) — büyük otopark mevcut.",
      "Feribot bileti al (Phi Phi Don); günde 2–3 sefer.",
      "Speedboat ile günübirlik tur da mümkün (Maya Bay, Monkey Beach).",
      "Motosiklet Rassada otoparkında; adada scooter kiralanabilir ama Phuket motoru feribota alınmaz.",
    ],
    tips: [
      "Feribot için pasaport yanınızda olsun.",
      "Sabah erken feribot daha az kalabalık.",
      "Konaklama planlıyorsanız bavul + feribot; günübirlik için speedboat pratik.",
    ],
  },
  "koh-naka-island": {
    motoEndpoint: "Ao Po Grand Marina / Boat Lagoon (doğu Phuket)",
    motoFromPatong: "~35–40 km · 50–70 dk",
    boatPier: "Ao Po Grand Marina veya The Naka Island resort transfer iskelesi",
    boatType: "Resort shuttle veya özel tekne",
    boatDuration: "Tekne: 10–15 dk",
    summary:
      "Koh Naka Yai özel ada; motosikletle doğu kıyı marinasına, oradan kısa tekne transferi.",
    steps: [
      "Patong → Ao Po / Pa Klok (doğu kıyı, havalimanı yönü).",
      "The Naka Island resort transferi veya charter tekne ayarla.",
      "Kısa tekne geçişi (~1 km açık su).",
      "Motosiklet marina otoparkında kalır.",
    ],
    tips: [
      "Çoğu ziyaretçi resort günlük paketi ile gider.",
      "Ao Po'dan Phi Phi / körfez turları da kalkar — kombine plan yapılabilir.",
    ],
  },
  "lanta-island": {
    motoEndpoint: "Ban Hua Hin Pier (Ko Lanta — Saladan feribot iskelesi)",
    motoFromPatong: "~150 km · 3–3,5 saat (Krabi üzerinden)",
    boatPier: "Hua Hin Pier (Lanta) → Saladan (Koh Lanta)",
    boatType: "Araç feribotu (motosiklet binişe uygun)",
    boatDuration: "Feribot: 15–20 dk",
    summary:
      "Koh Lanta'ya motosikletle karayolu + feribot mümkün; adada scooter ile gezmeye devam edilir.",
    steps: [
      "Patong → Krabi → 4206 ile güneye (Khlong Thom, Lanta yönü).",
      "Ban Hua Hin Pier'e var — motosiklet feribot biletine dahil edilir.",
      "15–20 dk feribot → Saladan (Lanta ana iskele).",
      "Adada Long Beach, Klong Dao motosikletle gezilir.",
    ],
    tips: [
      "Feribot 24 saat çalışır; gece geç saatte sefer sıklığı azalır.",
      "Alternatif: Krabi Klong Jilad Pier → Koh Lanta (araç feribotu, farklı rota).",
      "Uzun yol — Forza 350 veya ADV 160 konforlu; yakıt Krabi'de doldurun.",
    ],
  },
  "cheow-lan-lake": {
    motoEndpoint: "Ratchaprapha Dam — Cheow Lan Pier (Rajjaprabha Barajı)",
    motoFromPatong: "~130 km · 3 saat (Khao Sok yönü)",
    boatPier: "Ratchaprapha Dam ana iskele",
    boatType: "Uzun kuyruk tekne (göl turu / floating bungalow transfer)",
    boatDuration: "Göl içi: 30 dk – 2 saat (tura göre)",
    summary:
      "Cheow Lan Gölü baraj arkasında; motosikletle baraj iskelesine, göl tekne ile gezilir.",
    steps: [
      "Patong → Khao Sok Milli Parkı yönü → Ratchaprapha Dam girişi.",
      "Motosiklet baraj otoparkına park.",
      "Göl turu veya floating bungalow transfer teknesi.",
      "Khao Sok orman yürüyüşü dönüşte motosikletle yapılabilir.",
    ],
    tips: [
      "Göl turu sabah erken en güzel ışık.",
      "Baraj girişinde millî park ücreti alınır.",
      "Geceleme floating bungalow ise tekne transferi pakete dahil.",
    ],
  },
  "phang-nga-cave": {
    motoEndpoint: "Phang Nga — Surakul Pier",
    motoFromPatong: "~92 km · 2–2,5 saat",
    boatPier: "Surakul Pier (Koh Panak turları)",
    boatType: "Longtail + kano (mağara içi)",
    boatDuration: "Tur: yarım gün",
    summary:
      "Panak Mağarası (Phang Nga) deniz seviyesinde; motosikletle iskeleye, mağaraya kano/tekne ile.",
    steps: [
      "Patong → Phang Nga Surakul Pier — motosiklet park.",
      "Phang Nga Bay turu al; Koh Panak duraklı paket seç.",
      "Tekne ile adaya, kano ile mağara içine girilir.",
      "Mağara içi bazen yüzme gerekir — kıyafet hazırlayın.",
    ],
    tips: [
      "Su geçirmez telefon kılıfı veya dry bag alın.",
      "James Bond + Panak kombine turlar ekonomik.",
    ],
  },
};

export function getIslandAccess(slug: string): IslandAccessGuide | undefined {
  return ISLAND_ACCESS_GUIDES[slug];
}

export function hasIslandAccess(slug: string): boolean {
  return slug in ISLAND_ACCESS_GUIDES;
}
