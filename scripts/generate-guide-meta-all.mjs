/**
 * Generates guide-articles.tr.i18n.ts and meta for de/fr/ar/zh/th.
 * Run: node scripts/generate-guide-meta-all.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("src");

// Parse TR from articles.ts
const articlesTs = fs.readFileSync(path.join(ROOT, "lib/articles.ts"), "utf8");
const trArticles = [];
const trRe = /id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?readTime:\s*"([^"]+)"[\s\S]*?publishDate:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"/g;
let m;
while ((m = trRe.exec(articlesTs))) {
  trArticles.push({ id: m[1], title: m[2], category: m[3], readTime: m[4], publishDate: m[5], excerpt: m[6] });
}

// Parse EN
const enFile = fs.readFileSync(path.join(ROOT, "i18n/messages/guide-articles.en.i18n.ts"), "utf8");
const enArticles = [];
const enRe = /"([^"]+)":\s*\{\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*readTime:\s*"([^"]+)",\s*publishDate:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)"/g;
while ((m = enRe.exec(enFile))) {
  enArticles.push({ id: m[1], title: m[2], category: m[3], readTime: m[4], publishDate: m[5], excerpt: m[6] });
}

const CAT = {
  de: { Safety: "Sicherheit", Legal: "Recht", Documents: "Dokumente", Practical: "Praktisch", Tips: "Tipps", Culture: "Kultur", Motorcycles: "Motorräder", Gear: "Ausrüstung", Guide: "Reiseführer", Comparison: "Vergleich", Experience: "Erfahrung" },
  fr: { Safety: "Sécurité", Legal: "Juridique", Documents: "Documents", Practical: "Pratique", Tips: "Conseils", Culture: "Culture", Motorcycles: "Motos", Gear: "Équipement", Guide: "Guide", Comparison: "Comparaison", Experience: "Expérience" },
  ar: { Safety: "السلامة", Legal: "القانون", Documents: "المستندات", Practical: "عملي", Tips: "نصائح", Culture: "الثقافة", Motorcycles: "الدراجات", Gear: "المعدات", Guide: "دليل", Comparison: "مقارنة", Experience: "تجربة" },
  zh: { Safety: "安全", Legal: "法律", Documents: "证件", Practical: "实用", Tips: "技巧", Culture: "文化", Motorcycles: "摩托车", Gear: "装备", Guide: "指南", Comparison: "对比", Experience: "体验" },
  th: { Safety: "ความปลอดภัย", Legal: "กฎหมาย", Documents: "เอกสาร", Practical: "ปฏิบัติ", Tips: "เคล็ดลับ", Culture: "วัฒนธรรม", Motorcycles: "มอเตอร์ไซค์", Gear: "อุปกรณ์", Guide: "คู่มือ", Comparison: "เปรียบเทียบ", Experience: "ประสบการณ์" },
};

// Full translations: id -> { de, fr, ar, zh, th: { title, excerpt } }
const T = {
  "safety-phuket": {
    de: { title: "Ist Motorradfahren in Phuket sicher?", excerpt: "Sicherheit beim Motorradfahren in Phuket und wichtige Regeln" },
    fr: { title: "Conduire une moto à Phuket est-il sûr ?", excerpt: "Sécurité de la conduite moto à Phuket et règles essentielles" },
    ar: { title: "هل قيادة الدراجة في بوكيت آمنة؟", excerpt: "سلامة قيادة الدراجة في بوكيت والقواعد الأساسية" },
    zh: { title: "在普吉岛骑摩托车安全吗？", excerpt: "普吉摩托车骑行安全与基本规则" },
    th: { title: "ขี่มอเตอร์ไซค์ในภูเก็ตปลอดภัยไหม?", excerpt: "ความปลอดภัยและกฎสำคัญในการขี่มอเตอร์ไซค์ภูเก็ต" },
  },
  "thai-laws": {
    de: { title: "Motorradregeln und Bußgelder in Thailand", excerpt: "Verkehrsrecht, Führerscheinpflicht und Strafsystem" },
    fr: { title: "Règles moto et amendes en Thaïlande", excerpt: "Code de la route, permis et système de pénalités" },
    ar: { title: "قوانين الدراجات والغرامات في تايلاند", excerpt: "قوانين المرور ومتطلبات الرخصة والعقوبات" },
    zh: { title: "泰国摩托车规则与罚款", excerpt: "交通法规、驾照要求与处罚制度" },
    th: { title: "กฎมอเตอร์ไซค์และค่าปรับในไทย", excerpt: "กฎจราจร ใบขับขี่ และระบบลงโทษ" },
  },
  "international-license": {
    de: { title: "Ist ein internationaler Führerschein in Thailand nötig?", excerpt: "IDP-Anforderungen, Beantragung und Gültigkeit" },
    fr: { title: "Permis international requis en Thaïlande ?", excerpt: "Exigences IDP, obtention et validité" },
    ar: { title: "هل الرخصة الدولية مطلوبة في تايلاند؟", excerpt: "متطلبات IDP وكيفية الحصول عليه وصلاحيته" },
    zh: { title: "泰国需要国际驾照吗？", excerpt: "IDP 要求、办理方式及在泰有效性" },
    th: { title: "ต้องมีใบขับขี่สากลในไทยไหม?", excerpt: "ข้อกำหนด IDP วิธีขอ และความถูกต้องในไทย" },
  },
  "police-checkpoints": {
    de: { title: "Polizeikontrollen in Thailand — Was Sie wissen müssen", excerpt: "Verhalten an Kontrollen, Bußgelder und Rechte" },
    fr: { title: "Contrôles de police en Thaïlande — L'essentiel", excerpt: "Que faire, amendes et vos droits" },
    ar: { title: "نقاط تفتيش الشرطة في تايلاند", excerpt: "ماذا تفعل والغرامات وحقوقك" },
    zh: { title: "泰国警察检查点须知", excerpt: "如何应对、罚款与权利" },
    th: { title: "ด่านตำรวจในไทย — สิ่งที่ต้องรู้", excerpt: "ทำอย่างไร ค่าปรับ และสิทธิของคุณ" },
  },
  "drunk-driving": {
    de: { title: "Alkoholfahrt in Thailand — Strafen und Folgen", excerpt: "Alkohollimits, Bußgelder und rechtliche Konsequenzen" },
    fr: { title: "Conduite en état d'ivresse en Thaïlande", excerpt: "Limites, amendes et conséquences juridiques" },
    ar: { title: "القيادة تحت تأثير الكحول في تايلاند", excerpt: "الحدود والغرامات والعواقب القانونية" },
    zh: { title: "泰国酒驾处罚与后果", excerpt: "酒精限制、罚款及法律后果" },
    th: { title: "ขี่ขณะเมาในไทย — โทษและผล", excerpt: "ขีดจำกัดแอลกอhol ค่าปรับ และผลทางกฎหมาย" },
  },
  "helmet-laws": {
    de: { title: "Helmregeln und Durchsetzung in Thailand", excerpt: "Helmtypen, Anforderungen und Bußgelder" },
    fr: { title: "Règles du casque en Thaïlande", excerpt: "Types, obligations et amendes" },
    ar: { title: "قوانين الخوذة في تايلاند", excerpt: "أنواع الخوذة والمتطلبات والغرامات" },
    zh: { title: "泰国头盔规定与执法", excerpt: "头盔类型、要求与罚款" },
    th: { title: "กฎหมวกกันน็อคในไทย", excerpt: "ประเภท ข้อกำหนด และค่าปรับ" },
  },
  "accident-procedure": {
    de: { title: "Was tun nach einem Motorradunfall?", excerpt: "Schritte unmittelbar nach einem Unfall" },
    fr: { title: "Que faire après un accident moto ?", excerpt: "Étapes immédiates après un crash" },
    ar: { title: "ماذا تفعل بعد حادث دراجة؟", excerpt: "خطوات فورية بعد الحادث" },
    zh: { title: "摩托车事故后怎么办？", excerpt: "事故后立即采取的步骤" },
    th: { title: "ทำอย่างไรหลังอุบัติเหตุมอเตอร์ไซค์", excerpt: "ขั้นตอนทันทีหลังเกิดเหตุ" },
  },
  "insurance-claims": {
    de: { title: "Motorradversicherung in Thailand — Schaden melden", excerpt: "Versicherungsarten und Schadenprozess" },
    fr: { title: "Assurance moto en Thaïlande — Réclamation", excerpt: "Types d'assurance et procédure" },
    ar: { title: "تأمين الدراجة في تايلاند — المطالبات", excerpt: "أنواع التأمين وإجراءات المطالبة" },
    zh: { title: "泰国摩托车保险与理赔", excerpt: "保险类型与理赔流程" },
    th: { title: "ประกันมอเตอร์ไซค์ในไทย — การเคลม", excerpt: "ประเภทประกันและขั้นตอนเคลม" },
  },
  "fuel-guide": {
    de: { title: "Tankstellen und Benzinpreise in Thailand", excerpt: "Tanken finden, Preise und Zahlungsmethoden" },
    fr: { title: "Stations-service et prix de l'essence", excerpt: "Où faire le plein, prix et paiement" },
    ar: { title: "محطات الوقود وأسعار البنزين", excerpt: "إيجاد الوقود والأسعار وطرق الدفع" },
    zh: { title: "泰国加油站与油价", excerpt: "找油站、价格与支付方式" },
    th: { title: "ปั๊มน้ำมันและราคาน้ำมันในไทย", excerpt: "หาปั๊ม ราคา และวิธีชำระ" },
  },
  "parking-guide": {
    de: { title: "Motorradparken in Phuket", excerpt: "Sichere Parkplätze und Sicherheitstipps" },
    fr: { title: "Stationnement moto à Phuket", excerpt: "Emplacements sûrs et conseils" },
    ar: { title: "مواقف الدراجات في بوكيت", excerpt: "أماكن آمنة ونصائح الأمان" },
    zh: { title: "普吉摩托车停车指南", excerpt: "安全停车点与防盗建议" },
    th: { title: "ที่จอดมอเตอร์ไซค์ในภูเก็ต", excerpt: "จุดจอดปลอดภัยและเคล็ดลับ" },
  },
  "atm-locations": {
    de: { title: "Geldautomaten in Phuket", excerpt: "ATM-Standorte und Geld-Tipps" },
    fr: { title: "Distributeurs à Phuket", excerpt: "Emplacements ATM et conseils" },
    ar: { title: "أجهزة الصراف في بوكيت", excerpt: "مواقع الصراف ونصائح مالية" },
    zh: { title: "普吉 ATM 与取现指南", excerpt: "ATM 位置与现金建议" },
    th: { title: "ตู้ ATM ภูเก็ต", excerpt: "ตำแหน่ง ATM และเคล็ดลับเงินสด" },
  },
  "sim-card": {
    de: { title: "SIM-Karten in Thailand — Verbunden bleiben", excerpt: "SIM kaufen und aktivieren" },
    fr: { title: "Cartes SIM en Thaïlande", excerpt: "Achat et activation" },
    ar: { title: "شرائح SIM في تايلاند", excerpt: "شراء وتفعيل الشريحة" },
    zh: { title: "泰国 SIM 卡指南", excerpt: "购买与激活" },
    th: { title: "ซิมการ์ดในไทย", excerpt: "ซื้อและเปิดใช้งาน" },
  },
  "weather-preparation": {
    de: { title: "Wetter in Phuket vorbereiten", excerpt: "Jahreszeiten, Regen und Hitze" },
    fr: { title: "Se préparer au climat de Phuket", excerpt: "Saisons, pluie et chaleur" },
    ar: { title: "الاستعداد لطقس بوكيت", excerpt: "المواسم والمطر والحر" },
    zh: { title: "普吉天气准备", excerpt: "季节、降雨与高温" },
    th: { title: "เตรียมตัวสภาพอากาศภูเก็ต", excerpt: "ฤดูกาล ฝน และความร้อน" },
  },
  "toll-roads": {
    de: { title: "Autobahnen und Mautstraßen in Thailand", excerpt: "Autobahnsystem und Gebühren" },
    fr: { title: "Autoroutes et péages en Thaïlande", excerpt: "Système et tarifs" },
    ar: { title: "الطرق السريعة والرسوم في تايلاند", excerpt: "نظام الطرق والرسوم" },
    zh: { title: "泰国高速与收费公路", excerpt: "高速系统与费用" },
    th: { title: "ทางด่วนและค่าผ่านทางในไทย", excerpt: "ระบบทางด่วนและค่าใช้จ่าย" },
  },
  "petrol-vs-diesel": {
    de: { title: "Benzin vs Diesel — Bike-Wahl", excerpt: "Kraftstoffwahl und Effizienz" },
    fr: { title: "Essence vs diesel — choix du véhicule", excerpt: "Type de carburant et efficacité" },
    ar: { title: "بنزين مقابل ديزل", excerpt: "اختيار نوع الوقود والكفاءة" },
    zh: { title: "汽油与柴油选择", excerpt: "燃料类型与效率" },
    th: { title: "น้ำมันเบนซิน vs ดีเซล", excerpt: "เลือกประเภทเชื้อเพลิงและประสิทธิภาพ" },
  },
  "night-riding": {
    de: { title: "Nachtfahren in Phuket — Sicherheitstipps", excerpt: "Techniken und Gefahren bei Nacht" },
    fr: { title: "Conduite de nuit à Phuket", excerpt: "Techniques et dangers nocturnes" },
    ar: { title: "القيادة الليلية في بوكيت", excerpt: "تقنيات ومخاطر الليل" },
    zh: { title: "普吉夜间骑行安全", excerpt: "夜间技巧与危险" },
    th: { title: "ขี่กลางคืนในภูเก็ต", excerpt: "เทคนิคและอันตรายตอนกลางคืน" },
  },
  "monsoon-riding": {
    de: { title: "Fahren in der Regenzeit in Phuket", excerpt: "Sichere Techniken bei Regen" },
    fr: { title: "Conduire sous la mousson à Phuket", excerpt: "Techniques sûres sous la pluie" },
    ar: { title: "القيادة في موسم الأمطار", excerpt: "تقنيات آمنة تحت المطر" },
    zh: { title: "雨季普吉骑行", excerpt: "雨中安全骑行技巧" },
    th: { title: "ขี่ในฤดูฝนภูเก็ต", excerpt: "เทคนิคขี่ปลอดภัยในฝน" },
  },
  "temple-visits": {
    de: { title: "Tempel-Etikette für Motorradfahrer", excerpt: "Was beim Tempelbesuch zu beachten ist" },
    fr: { title: "Étiquette des temples pour motards", excerpt: "À savoir lors d'une visite" },
    ar: { title: "آداب زيارة المعابد للدراجين", excerpt: "ما يجب معرفته عند الزيارة" },
    zh: { title: "摩托车手寺庙礼仪", excerpt: "参观寺庙须知" },
    th: { title: "มารยาทวัดสำหรับนักขี่", excerpt: "สิ่งที่ต้องรู้เมื่อไปวัด" },
  },
  "local-restaurants": {
    de: { title: "Lokale Küche in Phuket für Biker", excerpt: "Sichere und leckere Restaurants" },
    fr: { title: "Restaurants locaux à Phuket pour motards", excerpt: "Adresses sûres et savoureuses" },
    ar: { title: "دليل المطاعم المحلية في بوكيت", excerpt: "مطاعم آمنة ولذيذة" },
    zh: { title: "普吉本地美食骑手指南", excerpt: "安全美味的本地餐厅" },
    th: { title: "ร้านอาหารท้องถิ่นภูเก็ตสำหรับนักขี่", excerpt: "ร้านปลอดภัยและอร่อย" },
  },
  "photography-spots": {
    de: { title: "Fotografie per Motorrad — Top-Spots Phuket", excerpt: "Beste Fotoorte und Techniken" },
    fr: { title: "Photographie à moto — Meilleurs spots", excerpt: "Lieux photo et techniques" },
    ar: { title: "التصوير بالدراجة — أفضل المواقع", excerpt: "أفضل مواقع الصور والتقنيات" },
    zh: { title: "摩托车摄影 — 普吉最佳机位", excerpt: "最佳拍摄点与技巧" },
    th: { title: "ถ่ายรูปด้วยมอเตอร์ไซค์ — จุดเด็ดภูเก็ต", excerpt: "จุดถ่ายรูปและเทคนิค" },
  },
  "best-scooter": {
    de: { title: "Welchen Scooter in Phuket wählen?", excerpt: "Click vs ADV vs Forza — Vergleich" },
    fr: { title: "Quel scooter choisir à Phuket ?", excerpt: "Click vs ADV vs Forza — comparatif" },
    ar: { title: "أي سكوتر تختار في بوكيت؟", excerpt: "Click مقابل ADV مقابل Forza" },
    zh: { title: "普吉选哪款踏板？", excerpt: "Click、ADV、Forza 对比" },
    th: { title: "เลือกสกู๊ตเตอร์อะไรในภูเก็ต?", excerpt: "Click vs ADV vs Forza — เปรียบเทียบ" },
  },
  "click-vs-adv": {
    de: { title: "Click 160 vs ADV 160 — Vergleich", excerpt: "Detaillierter Modellvergleich" },
    fr: { title: "Click 160 vs ADV 160 — Comparatif", excerpt: "Comparaison détaillée" },
    ar: { title: "Click 160 مقابل ADV 160", excerpt: "مقارنة تفصيلية" },
    zh: { title: "Click 160 对比 ADV 160", excerpt: "两款车型深度对比" },
    th: { title: "Click 160 vs ADV 160", excerpt: "เปรียบเทียบรุ่นยอดนิยม" },
  },
  "couples-motorcycle": {
    de: { title: "Bestes Motorrad für Paare", excerpt: "Komfort und Sicherheit zu zweit" },
    fr: { title: "Meilleure moto pour les couples", excerpt: "Confort et sécurité à deux" },
    ar: { title: "أفضل دراجة للأزواج", excerpt: "الراحة والأمان لشخصين" },
    zh: { title: "情侣最佳摩托车", excerpt: "双人舒适与安全" },
    th: { title: "มอเตอร์ไซค์ที่ดีที่สุดสำหรับคู่รัก", excerpt: "ความสะดวกและความปลอดภัยสองคน" },
  },
  "solo-traveler": {
    de: { title: "Motorradwahl für Alleinreisende", excerpt: "Ideales Modell für Solo-Fahrten" },
    fr: { title: "Moto pour voyageurs solo", excerpt: "Modèle idéal en solo" },
    ar: { title: "اختيار الدراجة للمسافر المنفرد", excerpt: "الموديل المثالي للسolo" },
    zh: { title: "独行旅客摩托车选择", excerpt: "单人骑行理想车型" },
    th: { title: "เลือกมอเตอร์ไซค์สำหรับเดินทางคนเดียว", excerpt: "รุ่นเหมาะสำหรับขี่คนเดียว" },
  },
  "beginner-bike": {
    de: { title: "Bestes Bike für Erstmieter", excerpt: "Anfängerfreundliche Modelle" },
    fr: { title: "Meilleure moto pour débutants", excerpt: "Modèles adaptés aux novices" },
    ar: { title: "أفضل دراجة للمبتدئين", excerpt: "موديلات مناسبة للمبتدئين" },
    zh: { title: "新手租车最佳车型", excerpt: "适合初学者的车型" },
    th: { title: "มอเตอร์ไซค์ดีที่สุดสำหรับมือใหม่", excerpt: "รุ่นเหมาะกับผู้เริ่มเช่า" },
  },
  "long-distance-bike": {
    de: { title: "Bestes Motorrad für Langstrecke", excerpt: "Komfort und Effizienz" },
    fr: { title: "Meilleure moto longue distance", excerpt: "Confort et efficacité" },
    ar: { title: "أفضل دراجة للمسافات الطويلة", excerpt: "الراحة والكفاءة" },
    zh: { title: "长途骑行最佳摩托车", excerpt: "舒适与效率优先" },
    th: { title: "มอเตอร์ไซค์ดีที่สุดสำหรับทริปไกล", excerpt: "ความสะดวกและประสิทธิภาพ" },
  },
  "automatic-vs-manual": {
    de: { title: "Automatik vs Schaltung in Phuket?", excerpt: "Vor- und Nachteile" },
    fr: { title: "Automatique vs manuelle à Phuket ?", excerpt: "Avantages et inconvénients" },
    ar: { title: "أوتومatik مقابل يدوي", excerpt: "الإيجابيات والسلبيات" },
    zh: { title: "自动 vs 手动 — 普吉怎么选？", excerpt: "各自优缺点" },
    th: { title: "ออโต้ vs เกียร์ — เลือกอย่างไร?", excerpt: "ข้อดีข้อเสีย" },
  },
  "helmet-types": {
    de: { title: "Motorradhelm wählen — Typen und Preise", excerpt: "Helmtypen und Zertifizierungen" },
    fr: { title: "Choisir un casque moto", excerpt: "Types et certifications" },
    ar: { title: "اختيار خوذة الدراجة", excerpt: "الأنواع والشهادات" },
    zh: { title: "摩托车头盔选择", excerpt: "类型与安全认证" },
    th: { title: "เลือกหมวกกันน็อค", excerpt: "ประเภทและมาตรฐาน" },
  },
  "complete-phuket": {
    de: { title: "Kompletter Phuket-Führer", excerpt: "Jede Ecke Phuket aus Biker-Sicht" },
    fr: { title: "Guide complet de Phuket", excerpt: "Tout Phuket du point de vue moto" },
    ar: { title: "دليل بوكيت الشامل", excerpt: "كل زاوية من منظور الدراج" },
    zh: { title: "普吉完整指南", excerpt: "骑手视角走遍普吉" },
    th: { title: "คู่มือภูเก็ตฉบับสมบูรณ์", excerpt: "ทุกมุมภูเก็ตในมุมมองนักขี่" },
  },
  "complete-krabi": {
    de: { title: "Krabi per Motorrad entdecken", excerpt: "Alle Highlights in Krabi" },
    fr: { title: "Découvrir Krabi à moto", excerpt: "Tous les incontournables" },
    ar: { title: "اكتشف كرابي بالدراجة", excerpt: "جميع معالم كرابي" },
    zh: { title: "摩托车探索甲米", excerpt: "甲米全部亮点" },
    th: { title: "สำรวจกระบี่ด้วยมอเตอร์ไซค์", excerpt: "ไฮไลท์ทั้งหมดของกระบี่" },
  },
  "complete-khao-sok": {
    de: { title: "Khao Sok Nationalpark — Abenteuerführer", excerpt: "Dschungel- und Naturfahrten" },
    fr: { title: "Parc national de Khao Sok", excerpt: "Aventure jungle et nature" },
    ar: { title: "منتزه kao Sok — دليل المغامرة", excerpt: "تجربة الغابة والطبيعة" },
    zh: { title: "考索国家公园冒险指南", excerpt: "丛林与自然骑行" },
    th: { title: "อุทยานเขาสok — คู่มือผจญภัย", excerpt: "ป่าและธรรมชาติ" },
  },
  "complete-phang-nga": {
    de: { title: "Phang Nga Bucht — Kalkstein-Wunderland", excerpt: "Einzigartige Geographie" },
    fr: { title: "Baie de Phang Nga", excerpt: "Géographie unique" },
    ar: { title: "خليج Phang Nga", excerpt: "جغرافيا فريدة" },
    zh: { title: "攀牙湾 — 石灰岩仙境", excerpt: "独特地理风貌" },
    th: { title: "อ่าวพังงา — มหัศจรรย์หินปูน", excerpt: "ภูมิศาสตร์ที่เป็นเอกลักษณ์" },
  },
  "phuket-town": {
    de: { title: "Was in Phuket Town sehen?", excerpt: "Alt und neu im Vergleich" },
    fr: { title: "Que voir à Phuket Town ?", excerpt: "Ancien et nouveau comparés" },
    ar: { title: "ماذا ترى في مدينة بوكيت؟", excerpt: "القديم والجديد" },
    zh: { title: "普吉镇看什么？", excerpt: "新旧普吉对比" },
    th: { title: "ดูอะไรในเมืองภูเก็ต", excerpt: "เปรียบเทียบเก่าและใหม่" },
  },
  "patong-guide": {
    de: { title: "Patong Beach — Im Touristenzentrum", excerpt: "Tag und Nacht in Patong" },
    fr: { title: "Plage de Patong", excerpt: "Patong jour et nuit" },
    ar: { title: "شاطئ باتونغ", excerpt: "باتونغ نهاراً وليلاً" },
    zh: { title: "芭东海滩指南", excerpt: "芭东昼夜生活" },
    th: { title: "หาดป่าตอง", excerpt: "ป่าตองกลางวันและกลางคืน" },
  },
  "kata-karon": {
    de: { title: "Kata und Karon — Ruhigere Alternativen", excerpt: "Ruhigere Strände als Patong" },
    fr: { title: "Plages de Kata et Karon", excerpt: "Plus calmes que Patong" },
    ar: { title: "شاطئا كاتا وكارون", excerpt: "أهدأ من باتونغ" },
    zh: { title: "卡塔与卡伦海滩", excerpt: "比芭东更安静" },
    th: { title: "หาดกะตะและกะรน", excerpt: "เงียบกว่าป่าตอง" },
  },
  "rawai-guide": {
    de: { title: "Rawai — Lokaler Strand und Meeresfrüchte", excerpt: "Geheimtipp im Süden" },
    fr: { title: "Rawai — Plage locale et fruits de mer", excerpt: "Perle cachée au sud" },
    ar: { title: "راواي — شاطئ محلي ومأكولات بحرية", excerpt: " جوهرة جنوب بوكيت" },
    zh: { title: "拉威 — 本地海滩与海鲜", excerpt: "普吉南端秘境" },
    th: { title: "RAWAI — หาดท้องถิ่นและอาหารทะเล", excerpt: "อัญมณีลับทางใต้" },
  },
  "bang-tao": {
    de: { title: "Bang Tao — Luxus-Resort-Strand", excerpt: "Premium-Strand und Resorts" },
    fr: { title: "Bang Tao — Plage de luxe", excerpt: "Plage premium et resorts" },
    ar: { title: "بانغ تاو — شاطئ فاخر", excerpt: "تجربة منتجعات مميزة" },
    zh: { title: "邦涛 — 豪华 resort 海滩", excerpt: "高端海滩体验" },
    th: { title: "หาดบางเทา — รีสอร์ทหรู", excerpt: "ชายหาดพรีเมียม" },
  },
  "old-phuket-town": {
    de: { title: "Old Phuket Town — Sino-portugiesische Architektur", excerpt: "Historisches Phuket entdecken" },
    fr: { title: "Vieille ville de Phuket", excerpt: "Architecture sino-portugaise" },
    ar: { title: "المدينة القديمة في بوكيت", excerpt: "اكتشف تاريخ بوكيت" },
    zh: { title: "普吉老镇 — 中葡建筑", excerpt: "探索历史普吉" },
    th: { title: "เมืองเก่าภูเก็ต", excerpt: "สถาปัตยกรรมจีน-โปรตุเกส" },
  },
  "scooter-vs-motorcycle": {
    de: { title: "Scooter vs Motorrad in Phuket?", excerpt: "Automatik vs Schaltung" },
    fr: { title: "Scooter vs moto à Phuket ?", excerpt: "Automatique vs manuelle" },
    ar: { title: "سكوتر مقابل دراجة في بوكيت", excerpt: "أوتومatik مقابل يدوي" },
    zh: { title: "踏板 vs 摩托车 — 普吉怎么选？", excerpt: "自动 vs 手动" },
    th: { title: "สกู๊ตเตอร์ vs มอเตอร์ไซค์", excerpt: "ออโต้ vs เกียร์" },
  },
  "rental-vs-buying": {
    de: { title: "Mieten vs Kaufen — Langaufenthalt", excerpt: "Was ist langfristig günstiger?" },
    fr: { title: "Louer vs acheter en Thaïlande", excerpt: "Qu'est-ce qui coûte moins ?" },
    ar: { title: "تأجير مقابل شراء — إقامة طويلة", excerpt: "ما الأوفر على المدى الطويل؟" },
    zh: { title: "租车 vs 买车 — 长期留泰", excerpt: "长期哪个更划算？" },
    th: { title: "เช่า vs ซื้อ — พักยาว", excerpt: "อะไรคุ้มกว่าในระยะยาว?" },
  },
  "tourist-vs-local": {
    de: { title: "Tourist vs lokale Preise — Verhandeln", excerpt: "Wie man in Thailand feilscht" },
    fr: { title: "Prix touristes vs locaux", excerpt: "Comment négocier" },
    ar: { title: "أسعار السياح مقابل المحليين", excerpt: "كيف تفاوض في تايلاند" },
    zh: { title: "游客价 vs 本地价", excerpt: "泰国砍价技巧" },
    th: { title: "ราคานักท่องเที่ยว vs คนท้องถิ่น", excerpt: "วิธีต่อรองในไทย" },
  },
  "high-vs-low-season": {
    de: { title: "Hochsaison vs Nebensaison", excerpt: "Welche Zeit ist besser?" },
    fr: { title: "Haute vs basse saison", excerpt: "Quelle période choisir ?" },
    ar: { title: "الموسم العالي مقابل المنخفض", excerpt: "أي وقت أفضل؟" },
    zh: { title: "旺季 vs 淡季", excerpt: "什么时候更好？" },
    th: { title: "ไฮซีซั่น vs โลว์ซีซั่น", excerpt: "ช่วงไหนดีกว่า?" },
  },
  "package-vs-diy": {
    de: { title: "Pauschalreise vs DIY", excerpt: "Geführt vs selbst organisiert" },
    fr: { title: "Circuits vs DIY", excerpt: "Guidé vs autonome" },
    ar: { title: "جولات منظمة مقابل DIY", excerpt: "مرشد مقابل ذاتي" },
    zh: { title: "跟团 vs 自由行", excerpt: "导游带队 vs 自助骑行" },
    th: { title: "ทัวร์แพ็ก vs DIY", excerpt: "มีไกด์ vs ขี่เอง" },
  },
  "group-vs-solo": {
    de: { title: "Gruppenfahrt vs Solo", excerpt: "Was macht mehr Spaß?" },
    fr: { title: "Groupe vs solo", excerpt: "Le plus amusant ?" },
    ar: { title: "ركوب جماعي مقابل منفرد", excerpt: "أيهما أكثر متعة؟" },
    zh: { title: "组队 vs 独行", excerpt: "哪个更有趣？" },
    th: { title: "ขี่เป็นกลุ่ม vs คนเดียว", excerpt: "อันไหนสนุกกว่า?" },
  },
  "daytrip-vs-multiday": {
    de: { title: "Tagestour vs Mehrtagestour", excerpt: "Fahrtdauer planen" },
    fr: { title: "Excursion d'un jour vs plusieurs jours", excerpt: "Planifier la durée" },
    ar: { title: "رحلة يوم vs عدة أيام", excerpt: "تخطيط مدة الرحلة" },
    zh: { title: "一日游 vs 多日游", excerpt: "规划骑行时长" },
    th: { title: "ทริปวันเดียว vs หลายวัน", excerpt: "วางแผนระยะเวลา" },
  },
  "backpacker-vs-luxury": {
    de: { title: "Backpacker-Tour vs Luxus-Motorradtour", excerpt: "Budget im Vergleich" },
    fr: { title: "Backpacker vs tour moto luxe", excerpt: "Options budget comparées" },
    ar: { title: "رحلة باكpacker مقابل فاخرة", excerpt: "مقارنة الخيارات" },
    zh: { title: "背包客 vs 豪华摩托游", excerpt: "预算方案对比" },
    th: { title: "แบ็คแพ็ค vs ทัวร์หรู", excerpt: "เปรียบเทียบงบประมาณ" },
  },
  "beginner-pov": {
    de: { title: "Erstmieter in Phuket — Anfängergeschichte", excerpt: "Erfolge und Fehler von Anfängern" },
    fr: { title: "Première location à Phuket", excerpt: "Succès et erreurs des débutants" },
    ar: { title: "أول تأجير في بوكيت — قصة مبتدئ", excerpt: "نجاحات وأخطاء المبتدئين" },
    zh: { title: "普吉首次租车 — 新手故事", excerpt: "新手的成功与失误" },
    th: { title: "เช่าครั้งแรกในภูเก็ต", excerpt: "ความสำเร็จและความผิดพลาดของมือใหม่" },
  },
  "worst-mistakes": {
    de: { title: "Meine schlimmsten Mietfehler in Phuket", excerpt: "Warnungen und Lektionen" },
    fr: { title: "Mes pires erreurs de location", excerpt: "Avertissements et leçons" },
    ar: { title: "أسوأ أخطائي في التأجير", excerpt: "تحذيرات ودروس" },
    zh: { title: "我在普吉租车的最大错误", excerpt: "警示与教训" },
    th: { title: "ความผิดพลาดที่แย่ที่สุดของฉัน", excerpt: "คำเตือนและบทเรียน" },
  },
  "sunset-spots": {
    de: { title: "Schönste Sonnenuntergänge per Motorrad", excerpt: "Fotos und Erinnerungen" },
    fr: { title: "Plus beaux couchers de soleil à moto", excerpt: "Photos et souvenirs" },
    ar: { title: "أجمل غروب رأيته بالدراجة", excerpt: "صور وذكريات" },
    zh: { title: "摩托车上看过的最美日落", excerpt: "照片与回忆" },
    th: { title: "พระอาทิตย์ตกที่สวยที่สุดที่ขี่ไป", excerpt: "รูปและความทรงจำ" },
  },
  "solo-female": {
    de: { title: "Solo-Frauen fahren in Phuket", excerpt: "Sicherheit und Unabhängigkeit" },
    fr: { title: "Femme seule à moto à Phuket", excerpt: "Sécurité et indépendance" },
    ar: { title: "سolo أنثى في بوكيت", excerpt: "الأمان والاستقلالية" },
    zh: { title: "女性独自普吉骑行", excerpt: "安全与独立" },
    th: { title: "ผู้หญิงขี่คนเดียวในภูเก็ต", excerpt: "ความปลอดภัยและอิสระ" },
  },
  "first-time-riding": {
    de: { title: "Erstes Mal Motorrad in Thailand", excerpt: "Verkehrsschock und Anpassung" },
    fr: { title: "Première fois à moto en Thaïlande", excerpt: "Choc du trafic et adaptation" },
    ar: { title: "أول مرة أقود في تايلاند", excerpt: "صدمة المرور والتكيف" },
    zh: { title: "第一次在泰国骑车", excerpt: "交通冲击与适应" },
    th: { title: "ขี่ครั้งแรกในไทย", excerpt: "ช็อกจราจรและการปรับตัว" },
  },
  "phuket-to-krabi": {
    de: { title: "Phuket nach Krabi — Biker-Abenteuer", excerpt: "Mehrtagestour-Erfahrung" },
    fr: { title: "Phuket à Krabi — Aventure moto", excerpt: "Expérience multi-jours" },
    ar: { title: "من بوكيت إلى كرابي", excerpt: "تجربة رحلة متعددة الأيام" },
    zh: { title: "普吉到甲米 — 骑手冒险", excerpt: "多日路线体验" },
    th: { title: "ภูเก็ตถึงกระบี่ — ผจญภัยนักขี่", excerpt: "ประสบการณ์ทริปหลายวัน" },
  },
  "budget-trip": {
    de: { title: "5 Tage Phuket mit 100 USD Budget", excerpt: "Budget-Reisetipps" },
    fr: { title: "5 jours à Phuket avec 100 USD", excerpt: "Conseils voyage économique" },
    ar: { title: "5 أيام في بوكيت بميزانية 100 دولار", excerpt: "نصائح سفر اقتصادي" },
    zh: { title: "100 美元预算普吉 5 天", excerpt: "经济旅行技巧" },
    th: { title: "5 วันภูเก็ตงบ 100 USD", excerpt: "เคล็ดลับท่องเที่ยวประหยัด" },
  },
  "luxury-tour": {
    de: { title: "Luxus-Motorradtour in Phuket", excerpt: "Premium-Mietservice" },
    fr: { title: "Tour moto luxe à Phuket", excerpt: "Service de location premium" },
    ar: { title: "جولة دراجة فاخرة في بوكيت", excerpt: "خدمات تأجير مميزة" },
    zh: { title: "普吉豪华摩托车之旅", excerpt: "高端租赁服务" },
    th: { title: "ทัวร์มอเตอร์ไซค์หรูภูเก็ต", excerpt: "บริการเช่าระดับพรีเมียม" },
  },
};

function readTime(locale, enRt) {
  const n = enRt.match(/(\d+)/)?.[1] ?? "5";
  if (locale === "de") return `${n} Min.`;
  if (locale === "fr") return `${n} min`;
  if (locale === "ar") return `${n} د`;
  if (locale === "zh") return `${n} 分钟`;
  if (locale === "th") return `${n} นาที`;
  return enRt;
}

function emitTr() {
  const lines = [
    `import type { GuideArticleEntry } from "./guide-articles.types";`,
    "",
    `export const guideArticlesTr: Record<string, GuideArticleEntry> = {`,
  ];
  for (const a of trArticles) {
    lines.push(`  "${a.id}": {`);
    lines.push(`    title: ${JSON.stringify(a.title)},`);
    lines.push(`    category: ${JSON.stringify(a.category)},`);
    lines.push(`    readTime: ${JSON.stringify(a.readTime)},`);
    lines.push(`    publishDate: ${JSON.stringify(a.publishDate)},`);
    lines.push(`    excerpt: ${JSON.stringify(a.excerpt)},`);
    lines.push(`  },`);
  }
  lines.push("};", "");
  fs.writeFileSync(path.join(ROOT, "i18n/messages/guide-articles.tr.i18n.ts"), lines.join("\n"));
  console.log(`guide-articles.tr.i18n.ts (${trArticles.length})`);
}

function emitLocale(locale) {
  const catMap = CAT[locale];
  const exportName = `guideArticles${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
  const lines = [
    `import type { GuideArticleEntry } from "./guide-articles.types";`,
    "",
    `export const ${exportName}: Record<string, GuideArticleEntry> = {`,
  ];
  for (const a of enArticles) {
    const loc = T[a.id]?.[locale] ?? { title: a.title, excerpt: a.excerpt };
    const category = catMap[a.category] ?? a.category;
    lines.push(`  "${a.id}": {`);
    lines.push(`    title: ${JSON.stringify(loc.title)},`);
    lines.push(`    category: ${JSON.stringify(category)},`);
    lines.push(`    readTime: ${JSON.stringify(readTime(locale, a.readTime))},`);
    lines.push(`    publishDate: ${JSON.stringify(a.publishDate)},`);
    lines.push(`    excerpt: ${JSON.stringify(loc.excerpt)},`);
    lines.push(`  },`);
  }
  lines.push("};", "");
  fs.writeFileSync(path.join(ROOT, `i18n/messages/guide-articles.${locale}.i18n.ts`), lines.join("\n"));
  console.log(`guide-articles.${locale}.i18n.ts (${enArticles.length})`);
}

emitTr();
for (const loc of ["de", "fr", "ar", "zh", "th"]) emitLocale(loc);
