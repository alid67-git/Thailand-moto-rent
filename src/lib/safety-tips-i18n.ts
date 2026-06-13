import type { Locale } from "@/i18n/config";
import type { SafetyTip } from "@/lib/routes-types";

type TipCopy = { title: string; text: string };

/** Keys = Turkish title from route source data */
const TIPS: Record<Locale, Record<string, TipCopy>> = {
  tr: {
    Kask: { title: "Kask", text: "Tam yüz veya jet kask şart; gece sürüşünde reflektör kullanın." },
    "Kask zorunlu": { title: "Kask zorunlu", text: "Tayland'da polis kask kontrolü yapar; tam yüz veya açık kask kabul edilir." },
    Yağmur: { title: "Yağmur", text: "Tropikal sağanak için yağmurluk ve su geçirmez çanta taşıyın." },
    Yakıt: { title: "Yakıt", text: "Uzun yollarda depoyu dolu tutun; dağ yollarında istasyon seyrek olabilir." },
    "Uzun yol": { title: "Uzun yol", text: "Her 2 saatte mola verin; yorgun sürüşten kaçının." },
    Muson: { title: "Muson", text: "Yağmurda virajlı dağ yollarında hızı düşürün; fren mesafesini artırın." },
    GPS: { title: "GPS", text: "Çok günlük turlarda offline harita indirin; sinyal kesilebilir." },
    "Derin güney": { title: "Derin güney", text: "Satun ve Hat Yai bölgesinde güncel güvenlik uyarılarını kontrol edin; gece sürüşünden kaçının." },
    İletişim: { title: "İletişim", text: "Uzak bölgelerde mobil sinyal zayıf; offline harita ve acil numaraları kaydedin." },
    Konaklama: { title: "Konaklama", text: "Otel moto parkını önceden teyit edin." },
    "Güneş & su": { title: "Güneş & su", text: "SPF 50+ ve en az 2 L su; öğle 11:00–15:00 arası gölgede mola verin." },
    Farlar: { title: "Farlar", text: "Gece sürüşünde uzun far kullanın; virajlı yollarda hızı düşürün." },
    Alkol: { title: "Alkol", text: "Alkol aldıysanız motosiklet sürmeyin; Grab veya taksi kullanın." },
    "Bangla & Patong": { title: "Bangla & Patong", text: "Kalabalık bölgelerde motosikleti güvenli park edin; eşyaları göz önünde bırakmayın." },
    Deniz: { title: "Deniz", text: "Kırmızı bayrak varsa yüzmeyin; monsoon döneminde akıntı güçlü." },
    Işık: { title: "Işık", text: "Günbatımından sonra hızlı kararır; yansıtıcı veya açık renk kıyafet." },
    "Tapınak kıyafeti": { title: "Tapınak kıyafeti", text: "Wat Chalong ve Big Buddha'da mütevazı giyinin." },
    "Çocuk güvenliği": { title: "Çocuk güvenliği", text: "Çocuk kaskı ve güneş şapkası; ekstra su getirin." },
    Güvenlik: { title: "Güvenlik", text: "Pist çitine yaklaşmayın; sadece izin verilen alanlarda durun." },
  },
  en: {
    Kask: { title: "Helmet", text: "Full-face or open-face helmet required; use reflective gear at night." },
    "Kask zorunlu": { title: "Helmet required", text: "Thai police check helmets; full-face or open-face accepted." },
    Yağmur: { title: "Rain", text: "Carry rain gear and a waterproof bag for tropical downpours." },
    Yakıt: { title: "Fuel", text: "Keep the tank full on long rides; stations can be sparse on mountain roads." },
    "Uzun yol": { title: "Long ride", text: "Take a break every 2 hours; avoid riding when tired." },
    Muson: { title: "Monsoon", text: "Slow down on winding mountain roads in rain; increase braking distance." },
    GPS: { title: "GPS", text: "Download offline maps for multi-day tours; signal may drop." },
    "Derin güney": { title: "Deep south", text: "Check current travel advisories for Satun and Hat Yai; avoid night riding." },
    İletişim: { title: "Communication", text: "Mobile signal is weak in remote areas; save offline maps and emergency numbers." },
    Konaklama: { title: "Accommodation", text: "Confirm hotel scooter parking in advance." },
    "Güneş & su": { title: "Sun & water", text: "SPF 50+ and at least 2 L water; rest in shade 11:00–15:00." },
    Farlar: { title: "Lights", text: "Use high beam at night where safe; reduce speed on winding roads." },
    Alkol: { title: "Alcohol", text: "Do not ride after drinking; use Grab or a taxi." },
    "Bangla & Patong": { title: "Bangla & Patong", text: "Park securely in busy areas; do not leave belongings visible." },
    Deniz: { title: "Sea", text: "Do not swim if red flags are up; monsoon currents are strong." },
    Işık: { title: "Light", text: "It gets dark quickly after sunset; wear reflective or light-coloured clothing." },
    "Tapınak kıyafeti": { title: "Temple dress", text: "Dress modestly at Wat Chalong and Big Buddha." },
    "Çocuk güvenliği": { title: "Child safety", text: "Child helmet and sun hat; bring extra water." },
    Güvenlik: { title: "Safety", text: "Do not approach the runway fence; stop only in permitted areas." },
  },
  de: {
    Kask: { title: "Helm", text: "Voll- oder Jethelm Pflicht; reflektierende Kleidung nachts." },
    "Kask zorunlu": { title: "Helm Pflicht", text: "Thai-Polizei kontrolliert Helme; Voll- oder Jethelm akzeptiert." },
    Yağmur: { title: "Regen", text: "Regenausrüstung und wasserdichte Tasche für tropische Schauer." },
    Yakıt: { title: "Kraftstoff", text: "Tank auf Langstrecken voll halten; Bergstraßen haben wenige Tankstellen." },
    "Uzun yol": { title: "Langstrecke", text: "Alle 2 Stunden Pause; nicht müde fahren." },
    Muson: { title: "Monsun", text: "Bei Regen auf Bergstraßen langsamer; Bremsweg verlängern." },
    GPS: { title: "GPS", text: "Offline-Karten für Mehrtagestouren; Empfang kann ausfallen." },
    "Derin güney": { title: "Tiefster Süden", text: "Reisewarnungen für Satun/Hat Yai prüfen; Nachtfahrten vermeiden." },
    İletişim: { title: "Kommunikation", text: "Schwaches Mobilnetz in abgelegenen Gegenden; Notrufnummern speichern." },
    Konaklama: { title: "Unterkunft", text: "Scooter-Parkplatz im Hotel vorab bestätigen." },
    "Güneş & su": { title: "Sonne & Wasser", text: "LSF 50+ und min. 2 L Wasser; 11–15 Uhr Schattenpause." },
    Farlar: { title: "Licht", text: "Nachts Fernlicht wo sicher; Tempo in Kurven reduzieren." },
    Alkol: { title: "Alkohol", text: "Nach Alkohol nicht fahren; Grab oder Taxi nutzen." },
    "Bangla & Patong": { title: "Bangla & Patong", text: "Sicher parken; keine sichtbaren Wertsachen." },
    Deniz: { title: "Meer", text: "Bei roter Flagge nicht schwimmen; Monsun-Strömungen stark." },
    Işık: { title: "Licht", text: "Nach Sonnenuntergang schnell dunkel; reflektierende Kleidung." },
    "Tapınak kıyafeti": { title: "Tempelkleidung", text: "Dezent kleiden bei Wat Chalong und Big Buddha." },
    "Çocuk güvenliği": { title: "Kindersicherheit", text: "Kinderhelm und Sonnenhut; extra Wasser mitnehmen." },
    Güvenlik: { title: "Sicherheit", text: "Nicht an Zaun der Landebahn; nur erlaubte Bereiche." },
  },
  fr: {
    Kask: { title: "Casque", text: "Casque intégral ou jet obligatoire; équipement réfléchissant la nuit." },
    "Kask zorunlu": { title: "Casque obligatoire", text: "La police thaïlandaise contrôle les casques." },
    Yağmur: { title: "Pluie", text: "Équipement pluie et sac étanche pour averses tropicales." },
    Yakıt: { title: "Carburant", text: "Réservoir plein sur longues routes; stations rares en montagne." },
    "Uzun yol": { title: "Longue route", text: "Pause toutes les 2 h; ne pas rouler fatigué." },
    Muson: { title: "Mousson", text: "Ralentir sur routes de montagne sous la pluie." },
    GPS: { title: "GPS", text: "Cartes offline pour tours multi-jours; signal peut couper." },
    "Derin güney": { title: "Extrême sud", text: "Vérifier les alertes Satun/Hat Yai; éviter la nuit." },
    İletişim: { title: "Communication", text: "Signal faible en zones reculées; numéros d'urgence enregistrés." },
    Konaklama: { title: "Hébergement", text: "Confirmer le parking moto à l'hôtel." },
    "Güneş & su": { title: "Soleil & eau", text: "SPF 50+ et 2 L d'eau; pause à l'ombre 11h–15h." },
    Farlar: { title: "Feux", text: "Feux de route la nuit si sûr; ralentir en virage." },
    Alkol: { title: "Alcool", text: "Ne pas rouler après alcool; Grab ou taxi." },
    "Bangla & Patong": { title: "Bangla & Patong", text: "Stationnement sécurisé; pas d'objets visibles." },
    Deniz: { title: "Mer", text: "Pas de baignade si drapeau rouge; courants forts en mousson." },
    Işık: { title: "Lumière", text: "Obscurité rapide après le coucher du soleil; vêtements clairs." },
    "Tapınak kıyafeti": { title: "Tenue temple", text: "Tenue modeste à Wat Chalong et Big Buddha." },
    "Çocuk güvenliği": { title: "Sécurité enfant", text: "Casque enfant et chapeau; eau supplémentaire." },
    Güvenlik: { title: "Sécurité", text: "Ne pas approcher la clôture de piste." },
  },
  ar: {
    Kask: { title: "خوذة", text: "خوذة كاملة أو مفتوحة إلزامية؛ ملابس عاكسة ليلاً." },
    "Kask zorunlu": { title: "الخوذة إلزامية", text: "الشرطة التايلاندية تفحص الخوذات." },
    Yağmur: { title: "مطر", text: "معدات مطر وحقيبة مقاومة للماء." },
    Yakıt: { title: "وقود", text: "املأ الخزان في الرحلات الطويلة؛ محطات نادرة في الجبال." },
    "Uzun yol": { title: "رحلة طويلة", text: "استراحة كل ساعتين؛ تجنب القيادة متعباً." },
    Muson: { title: "موسم الأمطار", text: "أبطئ على طرق الجبال تحت المطر." },
    GPS: { title: "GPS", text: "حمّل خرائط offline للجولات متعددة الأيام." },
    "Derin güney": { title: "الجنوب العميق", text: "تحقق من تحذيرات السفر لـ Satun و Hat Yai." },
    İletişim: { title: "اتصال", text: "إشارة ضعيفة في المناطق النائية؛ احفظ أرقام الطوارئ." },
    Konaklama: { title: "إقامة", text: "أكد موقف الدراجة في الفندق مسبقاً." },
    "Güneş & su": { title: "شمس وماء", text: "SPF 50+ ولتران ماء؛ استراحة ظل 11–15." },
    Farlar: { title: "أضواء", text: "استخدم الضوء العالي ليلاً؛ أبطئ في المنعطفات." },
    Alkol: { title: "كحول", text: "لا تقود بعد الشرب؛ استخدم Grab أو taxi." },
    "Bangla & Patong": { title: "Bangla و Patong", text: "اركن بأمان؛ لا تترك أمتعة ظاهرة." },
    Deniz: { title: "البحر", text: "لا تسبح عند الراية الحمراء؛ تيارات قوية في الموسم." },
    Işık: { title: "إضاءة", text: "يحل الظلام بسرعة بعد الغروب؛ ملابس فاتحة." },
    "Tapınak kıyafeti": { title: "ملابس المعبد", text: "لباس محتشم في Wat Chalong و Big Buddha." },
    "Çocuk güvenliği": { title: "سلامة الأطفال", text: "خوذة طفل وقبعة شمس؛ ماء إضافي." },
    Güvenlik: { title: "سلامة", text: "لا تقترب من سياج المدرج." },
  },
  zh: {
    Kask: { title: "头盔", text: "必须佩戴全盔或半盔；夜间使用反光装备。" },
    "Kask zorunlu": { title: "必须戴头盔", text: "泰国警察会检查头盔；全盔或半盔均可。" },
    Yağmur: { title: "雨天", text: "携带雨具和防水包应对热带暴雨。" },
    Yakıt: { title: "燃油", text: "长途保持满油；山区加油站稀少。" },
    "Uzun yol": { title: "长途", text: "每2小时休息；避免疲劳骑行。" },
    Muson: { title: "雨季", text: "雨中山路减速；增加刹车距离。" },
    GPS: { title: "GPS", text: "多日游下载离线地图；信号可能中断。" },
    "Derin güney": { title: "深南地区", text: "查询 Satun/Hat Yai 旅行警告；避免夜间骑行。" },
    İletişim: { title: "通讯", text: "偏远地区信号弱；保存离线地图和紧急号码。" },
    Konaklama: { title: "住宿", text: "提前确认酒店摩托车停车位。" },
    "Güneş & su": { title: "防晒与饮水", text: "SPF50+ 和至少2升水；11–15点阴凉处休息。" },
    Farlar: { title: "灯光", text: "夜间合理使用远光灯；弯道减速。" },
    Alkol: { title: "酒精", text: "饮酒后勿骑行；使用 Grab 或出租车。" },
    "Bangla & Patong": { title: "Bangla 与 Patong", text: "繁忙区域安全停车；勿留可见物品。" },
    Deniz: { title: "海洋", text: "红旗时勿游泳；季风期水流强。" },
    Işık: { title: "光线", text: "日落后迅速变暗；穿浅色或反光衣物。" },
    "Tapınak kıyafeti": { title: "寺庙着装", text: "查龙寺和 Big Buddha 需穿着得体。" },
    "Çocuk güvenliği": { title: "儿童安全", text: "儿童头盔和遮阳帽；多带水。" },
    Güvenlik: { title: "安全", text: "勿靠近跑道围栏；仅在允许区域停留。" },
  },
  th: {
    Kask: { title: "หมวกกันน็อค", text: "ต้องสวมหมวกเต็มใบหรือเปิดหน้า ใช้เสื้อสะท้อนแสงตอนกลางคืน" },
    "Kask zorunlu": { title: "หมวกบังคับ", text: "ตำรวจไทยตรวจหมวก รับหมวกเต็มใบหรือเปิดหน้า" },
    Yağmur: { title: "ฝน", text: "เตรียมเสื้อกันฝนและกระเป๋ากันน้ำ" },
    Yakıt: { title: "น้ำมัน", text: "เติมให้เต็มทริปไกล ปั๊มบนภูเขาห่าง" },
    "Uzun yol": { title: "ทางไกล", text: "พักทุก 2 ชม. อย่าขี่เมื่อเหนื่อย" },
    Muson: { title: "มรสุม", text: "ชะลอบนถนนภูเขาเมื่อฝนตก" },
    GPS: { title: "GPS", text: "ดาวน์โหลดแผนที่ออฟไลน์สำหรับทัวร์หลายวัน" },
    "Derin güney": { title: "ใต้ลึก", text: "ตรวจคำเตือนท่องเที่ยว Satun/Hat Yai หลีกเลี่ยงขี่กลางคืน" },
    İletişim: { title: "การสื่อสาร", text: "สัญญาอ่อนในพื้นที่ห่างไกล บันทึกเบอร์ฉุกเฉิน" },
    Konaklama: { title: "ที่พัก", text: "ยืนยนที่จอดมอเตอร์ไซค์ที่โรงแรมล่วงหน้า" },
    "Güneş & su": { title: "แดด & น้ำ", text: "SPF 50+ และน้ำ 2 ล. พักร่ม 11–15 น." },
    Farlar: { title: "ไฟ", text: "ใช้ไฟสูงตอนกลางคืน ชะลอในโค้ง" },
    Alkol: { title: "แอลกอhol", text: "อย่าขี่หลังดื่ม ใช้ Grab หรือแท็กซี่" },
    "Bangla & Patong": { title: "Bangla & Patong", text: "จอดปลอดภัย อย่าทิ้งของให้เห็น" },
    Deniz: { title: "ทะเล", text: "อย่าว่ายเมื่อธงแดง กระแสมรสุมแรง" },
    Işık: { title: "แสง", text: "มืดเร็วหลังพระอาทิตย์ตก ใส่เสื้อสีสว่าง" },
    "Tapınak kıyafeti": { title: "ชุดวัด", text: "แต่งกายสุภาพที่วัดฉลองและ Big Buddha" },
    "Çocuk güvenliği": { title: "ความปลอดภัยเด็ก", text: "หมวกเด็กและหมวกกันแดด น้ำเพิ่ม" },
    Güvenlik: { title: "ความปลอดภัย", text: "อย่าเข้าใกล้รั้วรันเวย์" },
  },
};

/** Alternate Yakıt text for day routes (Patong departures) */
const YAKIT_DAY: Partial<Record<Locale, TipCopy>> = {
  tr: { title: "Yakıt", text: "Patong'dan çıkmadan depoyu doldurun; güney rotalarında Rawai/Chalong'da istasyon var." },
  en: { title: "Fuel", text: "Fill up before leaving Patong; stations at Rawai/Chalong on south routes." },
  de: { title: "Kraftstoff", text: "Vor Abfahrt aus Patong tanken; Stationen in Rawai/Chalong." },
  fr: { title: "Carburant", text: "Faites le plein avant de quitter Patong; stations à Rawai/Chalong." },
  ar: { title: "وقود", text: "املأ الخزان قبل مغادرة Patong؛ محطات في Rawai/Chalong." },
  zh: { title: "燃油", text: "离开芭东前加满油；南部路线在 Rawai/Chalong 有站。" },
  th: { title: "น้ำมัน", text: "เติมก่อนออกจากป่าตอง มีปั๊มที่ Rawai/Chalong" },
};

/** Alternate Kask text (multi-route-extra) */
const KASK_IDP: Partial<Record<Locale, TipCopy>> = {
  tr: { title: "Kask", text: "Tam kask ve geçerli IDP şart." },
  en: { title: "Helmet", text: "Full helmet and valid IDP required." },
  de: { title: "Helm", text: "Vollhelm und gültiger IDP Pflicht." },
  fr: { title: "Casque", text: "Casque complet et IDP valide requis." },
  ar: { title: "خوذة", text: "خوذة كاملة و IDP صالح مطلوبان." },
  zh: { title: "头盔", text: "须佩戴全盔并持有效 IDP。" },
  th: { title: "หมวกกันน็อค", text: "หมวกเต็มใบและ IDP ที่ถูกต้อง" },
};

/** Alternate GPS for day routes */
const GPS_VILLAGE: Partial<Record<Locale, TipCopy>> = {
  tr: { title: "GPS", text: "Köy yollarında offline harita kullanın." },
  en: { title: "GPS", text: "Use offline maps on village roads." },
  de: { title: "GPS", text: "Offline-Karten auf Dorfstraßen nutzen." },
  fr: { title: "GPS", text: "Cartes offline sur routes de village." },
  ar: { title: "GPS", text: "استخدم خرائط offline على طرق القرى." },
  zh: { title: "GPS", text: "乡村道路使用离线地图。" },
  th: { title: "GPS", text: "ใช้แผนที่ออฟไลน์บนถนนหมู่บ้าน" },
};

function resolveTip(tip: SafetyTip, locale: Locale): TipCopy {
  if (tip.title === "Yakıt" && tip.text.includes("Patong")) {
    return YAKIT_DAY[locale] ?? YAKIT_DAY.en!;
  }
  if (tip.title === "Kask" && tip.text.includes("IDP")) {
    return KASK_IDP[locale] ?? KASK_IDP.en!;
  }
  if (tip.title === "GPS" && tip.text.includes("Köy")) {
    return GPS_VILLAGE[locale] ?? GPS_VILLAGE.en!;
  }
  return TIPS[locale][tip.title] ?? TIPS.en[tip.title] ?? { title: tip.title, text: tip.text };
}

export function localizeSafetyTips(tips: SafetyTip[], locale: Locale): SafetyTip[] {
  return tips.map((tip) => {
    const copy = resolveTip(tip, locale);
    return { icon: tip.icon, title: copy.title, text: copy.text };
  });
}
