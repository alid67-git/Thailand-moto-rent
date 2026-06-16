/**
 * Generates guide bodies for de, fr, ar, zh, th (all 54 articles).
 * Run: node scripts/generate-guide-bodies-locales.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("src");
const policiesRaw = fs.readFileSync(path.join(ROOT, "lib/guide-articles/policies.ts"), "utf8").replace(/\r\n/g, "\n");

function extractPolicy(locale) {
  const re = new RegExp(`${locale}: \`\\n([\\s\\S]*?)\`,\\n  [a-z]{2}:`, "m");
  const m = policiesRaw.match(re);
  if (m) return m[1].trim();
  const last = new RegExp(`${locale}: \`\\n([\\s\\S]*?)\`,\\n\\};`);
  return policiesRaw.match(last)?.[1]?.trim() ?? "";
}

const enMeta = fs.readFileSync(path.join(ROOT, "i18n/messages/guide-articles.en.i18n.ts"), "utf8");
const articles = [];
const re = /"([^"]+)":\s*\{\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",[\s\S]*?excerpt:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(enMeta))) {
  articles.push({ id: m[1], titleEn: m[2], category: m[3], excerptEn: m[4] });
}

const LOCALES = {
  de: {
    constName: "GUIDE_BODIES_DE",
    policy: extractPolicy("de"),
    cats: {
      Safety: (t, e) => `# ${t}\n\n${e}\n\n## Wichtige Sicherheitsregeln\n\n1. **Immer Helm** — Fahrer und Beifahrer (Pflicht)\n2. **IDP + Führerschein** stets mitführen\n3. **Kein Alkohol** beim Fahren\n4. **Licht an** auch tagsüber\n5. **Defensiv fahren** — Phuket-Verkehr ist unberechenbar\n\n## Praktische Tipps\n\n- Kurze Fahrten in Patong vor Langstrecken\n- **Premium-Versicherung** bei Buchung wählen\n- Nachtfahrten vermeiden bis Sie die Straßen kennen\n- Hunde, Sand in Kurven und plötzliche Spurwechsel beachten\n\n## Notrufnummern\n\n- Polizei: **191** | Rettung: **1669** | Touristenpolizei: **1155**`,
      Legal: (t, e) => `# ${t}\n\n${e}\n\n## Was Sie wissen müssen\n\nThailand setzt Verkehrsregeln in Touristengebieten konsequent durch. Ausländer sind **nicht ausgenommen**.\n\n## Dokumente\n\n- Gültiger **IDP (Motorrad)** oder thailändischer Führerschein\n- Reisepass\n- Mietvertrag und Versicherungsunterlagen\n\n## Typische Bußgelder\n\n| Verstoß | Ca. Bußgeld |\n|---------|-------------|\n| Kein IDP/Führerschein | 1.000–2.000+ THB |\n| Kein Helm | 500–1.000 THB |\n| Alkoholfahrt | 5.000–20.000+ THB |\n\n## An Polizeikontrollen\n\nRuhig bleiben, Dokumente zeigen, nicht diskutieren. Kontrollen sind häufig in Patong, Chalong und auf der Flughafenstraße.`,
      Documents: (t, e) => `# ${t}\n\n${e}\n\n## IDP — das einzige akzeptierte Auslandsdokument\n\n- ✅ Thailändischer Motorradführerschein\n- ✅ **IDP mit Motorradklasse**\n- ❌ Nur Heimatführerschein\n- ❌ Nur Reisepass\n\n## Vor der Reise\n\nIDP im Heimatland beantragen — als Tourist in Thailand praktisch nicht möglich.\n\n## Thailand Moto Rent\n\nMiete nur mit gültigem **Motorrad-IDP**. Ohne IDP keine Vermietung.`,
      Practical: (t, e) => `# ${t}\n\n${e}\n\n## Fahrt planen\n\nTanken, Bargeld, SIM-Daten und Wetter prüfen — besonders auf Langstrecken.\n\n## Wichtige Ratschläge\n\n- Tank voll vor Fahrten nach Krabi, Phang Nga oder Khao Sok\n- **Regenausrüstung** Mai–Oktober\n- Offline-Karten für Bergstraßen\n- Kleine THB-Scheine für Parken\n\n## Tipps von Thailand Moto Rent\n\nVersicherungsupgrade online buchen, IDP vor Abholung prüfen, bei Verspätung per WhatsApp melden.`,
      Tips: (t, e) => `# ${t}\n\n${e}\n\n## Lokale Fahrweisheit\n\n- **Früh morgens** starten — kühler und weniger Verkehr\n- Thai-Fahrer blinken oft nicht — Abstand halten\n- Wochenenden in Patong sind voll; Werktage besser zum Üben\n\n## Typische Touristenfehler\n\nBarfuß fahren, kein Helm, Handy beim Fahren, Fahren nach Partynächten.`,
      Culture: (t, e) => `# ${t}\n\n${e}\n\n## Lokale Bräuche respektieren\n\n- Schultern und Knie in Tempeln bedecken\n- Schuhe ausziehen wo erforderlich\n- Leise in Wohngebieten\n- Vor Fotos fragen\n\n## Parketikette\n\nDesignierte Scooter-Plätze nutzen; keine Eingänge blockieren.`,
      Motorcycles: (t, e) => `# ${t}\n\n${e}\n\n## Thailand Moto Rent Flotte\n\n| Modell | Tag | Ideal für |\n|--------|-----|----------|\n| Honda Click 160 | ฿350 | Stadt, Anfänger |\n| Honda ADV 160 | ฿490 | Allround-Touren |\n| Honda ADV 350 | ฿690 | Zu zweit, Hügel |\n| Honda Forza 350 | ฿790 | Autobahn, Komfort |\n| Yamaha XMAX 300 | ฿750 | Maxi-Scooter |\n\n## Auswahl\n\nPatong-only braucht weniger Leistung als Phuket→Krabi. Im Zweifel: **ADV 160**.`,
      Gear: (t, e) => `# ${t}\n\n${e}\n\n## Helmqualität\n\nDOT- oder ECE-zertifiziert. Bei uns **inklusive** — Kinnriemen fest ziehen.\n\n## Kleidung\n\n- Geschlossene Schuhe\n- Regenjacke in der Regenzeit\n- Sonnenschutz\n\n## Optional\n\nHandyhalter (nur beim Parken), Dry Bag für Dokumente.`,
      Guide: (t, e) => `# ${t}\n\n${e}\n\n## Routenplanung\n\nPatong, Kata oder Karon als Basis. Extra Zeit für Fotos und Fähren.\n\n## Highlights\n\nPromthep, Karon Viewpoint, Old Phuket Town, Wat Chalong, Freedom Beach.\n\n## Hinweise\n\nBergstraßen nach Phang Nga und Krabi — bei Tageslicht fahren, IDP mitführen.`,
      Comparison: (t, e) => `# ${t}\n\n${e}\n\n## Zusammenfassung\n\nBudget, Können und Zeit bestimmen die Wahl.\n\n## Faktoren\n\nKosten, Freiheit, Erfahrung, Dauer.\n\n## Empfehlung\n\nFür 5–10 Tage Urlaub: **2–3 Tage Scooter + Premium-Versicherung**.`,
      Experience: (t, e) => `# ${t}\n\n${e}\n\n## Echte Erfahrungen\n\nIDP vor Abreise, langsamer erster Tag, Premium-Versicherung — das hilft am meisten.\n\n## Vorsicht\n\nPlötzlicher Regen, Kies in Kurven, Sand an Strandausfahrten, Müdigkeit nach Sonnenuntergang.`,
    },
  },
  fr: {
    constName: "GUIDE_BODIES_FR",
    policy: extractPolicy("fr"),
    cats: {
      Safety: (t, e) => `# ${t}\n\n${e}\n\n## Règles de sécurité essentielles\n\n1. **Casque toujours** — conducteur et passager (obligation légale)\n2. **IDP + permis** sur vous en permanence\n3. **Zéro alcool** au guidon\n4. **Feux allumés** même de jour\n5. Conduisez **défensivement** — le trafic de Phuket est imprévisible\n\n## Conseils pratiques\n\n- Courtes sorties à Patong avant les longues routes\n- **Assurance premium** à la réservation\n- Évitez la nuit jusqu'à connaître les routes\n\n## Urgences\n\n- Police : **191** | Ambulance : **1669** | Police touristique : **1155**`,
      Legal: (t, e) => `# ${t}\n\n${e}\n\n## À savoir\n\nLa Thaïlande applique strictement le code de la route dans les zones touristiques.\n\n## Documents\n\n- **IDP moto** ou permis thaïlandais valide\n- Passeport\n- Contrat de location et assurance\n\n## Amendes courantes\n\n| Infraction | Amende approx. |\n|------------|----------------|\n| Sans IDP/permis | 1 000–2 000+ THB |\n| Sans casque | 500–1 000 THB |\n| Alcool | 5 000–20 000+ THB |`,
      Documents: (t, e) => `# ${t}\n\n${e}\n\n## IDP — seul document étranger accepté\n\n- ✅ Permis moto thaïlandais\n- ✅ **IDP classe moto**\n- ❌ Permis national seul\n- ❌ Passeport seul\n\nObtenez l'IDP **avant** le départ. Location Thailand Moto Rent : **IDP moto obligatoire**.`,
      Practical: (t, e) => `# ${t}\n\n${e}\n\n## Planifier\n\nCarburant, espèces, SIM et météo — essentiels en moto.\n\n## Conseils\n\n- Plein avant Krabi, Phang Nga, Khao Sok\n- **Équipement pluie** mai–octobre\n- Cartes offline en montagne\n- Petites coupures THB`,
      Tips: (t, e) => `# ${t}\n\n${e}\n\n## Sagesse locale\n\n- Départs **tôt le matin**\n- Les Thaïlandais tournent parfois sans clignotant\n- Week-ends chargés à Patong\n\n## Erreurs fréquentes\n\nPieds nus, pas de casque, téléphone en roulant, alcool.`,
      Culture: (t, e) => `# ${t}\n\n${e}\n\n## Respect\n\n- Épaules et genoux couverts aux temples\n- Chaussures retirées si demandé\n- Demander avant de photographier\n\n## Stationnement\n\nZones scooter désignées ; ne pas bloquer les entrées.`,
      Motorcycles: (t, e) => `# ${t}\n\n${e}\n\n## Flotte Thailand Moto Rent\n\n| Modèle | Jour | Pour qui |\n|--------|------|----------|\n| Click 160 | ฿350 | Ville, débutants |\n| ADV 160 | ฿490 | Tours polyvalents |\n| ADV 350 | ฿690 | Deux personnes |\n| Forza 350 | ฿790 | Autoroute |\n| XMAX 300 | ฿750 | Maxi-scooter |\n\nEn cas de doute : **ADV 160**.`,
      Gear: (t, e) => `# ${t}\n\n${e}\n\n## Casque\n\nCertifié DOT/ECE, **inclus** à la location. Sangle bien serrée.\n\n## Tenue\n\nChaussures fermées, veste de pluie, protection solaire.`,
      Guide: (t, e) => `# ${t}\n\n${e}\n\n## Itinéraires\n\nBase Patong/Kata/Karon. Prévoir temps pour photos et ferries.\n\n## Incontournables\n\nPromthep, Karon, Old Phuket Town, Wat Chalong.`,
      Comparison: (t, e) => `# ${t}\n\n${e}\n\n## Résumé\n\nBudget, compétence et durée guident le choix.\n\n## Recommandation\n\nSéjour 5–10 jours : **2–3 jours de location + assurance premium**.`,
      Experience: (t, e) => `# ${t}\n\n${e}\n\n## Retours d'expérience\n\nIDP avant le vol, premier jour lent, assurance premium.\n\n## Attention\n\nPluie soudaine, gravier, sable, fatigue après le coucher du soleil.`,
    },
  },
  ar: {
    constName: "GUIDE_BODIES_AR",
    policy: extractPolicy("ar"),
    cats: {
      Safety: (t, e) => `# ${t}\n\n${e}\n\n## قواعد السلامة الأساسية\n\n1. **خوذة دائماً** — السائق والراكب (إلزامي)\n2. **IDP + رخصة** معك دائماً\n3. **بدون كحول** أثناء القيادة\n4. **أضواء مفتوحة** نهاراً\n5. **قيادة دفاعية** — مرور بوكيت غير متوقع\n\n## نصائح عملية\n\n- جولات قصيرة في باتونغ قبل الرحلات الطويلة\n- **تأمين ممتاز** عند الحجز\n- تجنب القيادة ليلاً حتى تعرف الطرق\n\n## طوارئ\n\n- الشرطة: **191** | الإسعاف: **1669** | شرطة السياح: **1155**`,
      Legal: (t, e) => `# ${t}\n\n${e}\n\n## ما يجب معرفته\n\nتايلاند تطبق قوانين المرور بصرامة في المناطق السياحية.\n\n## المستندات\n\n- **IDP دراجة** أو رخصة تايلاندية\n- جواز السفر\n- عقد التأجير والتأمين\n\n## غرامات شائعة\n\n| المخالفة | الغرامة تقريباً |\n|----------|------------------|\n| بدون IDP | 1,000–2,000+ THB |\n| بدون خوذة | 500–1,000 THB |\n| كحول | 5,000–20,000+ THB |`,
      Documents: (t, e) => `# ${t}\n\n${e}\n\n## IDP — الوثيقة الأجنبية الوحيدة المقبولة\n\n- ✅ رخصة تايلاندية\n- ✅ **IDP فئة دراجة**\n- ❌ رخصة البلد فقط\n- ❌ جواز السفر فقط\n\nاحصل على IDP **قبل السفر**. التأجير يتطلب **IDP دراجة**.`,
      Practical: (t, e) => `# ${t}\n\n${e}\n\n## التخطيط\n\nوقود، نقد، SIM والطقس — ضرورية للرحلات.\n\n## نصائح\n\n- تعبئة الوقود قبل كرابي وفانغ نغا\n- **معدات مطر** مايو–أكتوبر\n- خرائط offline\n- أوراق THB صغيرة`,
      Tips: (t, e) => `# ${t}\n\n${e}\n\n## حكمة محلية\n\n- انطلق **صباحاً مبكراً**\n- سائقون تايلانديون قد ينعطفون بلا إشارة\n- عطلات نهاية الأسبوع مزدحمة في باتونغ`,
      Culture: (t, e) => `# ${t}\n\n${e}\n\n## احترام العادات\n\n- تغطية الكتفين والركبتين في المعابد\n- خلع الحذاء عند الطلب\n- اطلب الإذن قبل التصوير`,
      Motorcycles: (t, e) => `# ${t}\n\n${e}\n\n## أسطول Thailand Moto Rent\n\n| الموديل | يوم | لمن |\n|---------|-----|-----|\n| Click 160 | ฿350 | المدينة |\n| ADV 160 | ฿490 | جولات |\n| ADV 350 | ฿690 | شخصان |\n| Forza 350 | ฿790 | طرق سريعة |\n| XMAX 300 | ฿750 | ماكسي |`,
      Gear: (t, e) => `# ${t}\n\n${e}\n\n## الخوذة\n\nمعتمدة DOT/ECE، **مشمولة**. شدّ حزام الذقن.\n\n## ملابس\n\nأحذية مغلقة، معطف مطر، واقي شمس.`,
      Guide: (t, e) => `# ${t}\n\n${e}\n\n## تخطيط المسار\n\nباتونغ/كاتا/كارون كقاعدة. Promthep، Wat Chalong، Old Phuket Town.`,
      Comparison: (t, e) => `# ${t}\n\n${e}\n\n## ملخص\n\nالميزانية والمهارة والوقت تحدد الاختيار.\n\n## توصية\n\n5–10 أيام: **2–3 أيام تأجير + تأمين شامل**.`,
      Experience: (t, e) => `# ${t}\n\n${e}\n\n## تجارب حقيقية\n\nIDP قبل السفر، يوم أول بطيء، تأمين ممتاز.\n\n## انتبه\n\nمطر مفاجئ، حصى، رمال، تعب بعد الغروب.`,
    },
  },
  zh: {
    constName: "GUIDE_BODIES_ZH",
    policy: extractPolicy("zh"),
    cats: {
      Safety: (t, e) => `# ${t}\n\n${e}\n\n## 基本安全规则\n\n1. **始终戴头盔** — 驾驶员和乘客（法律要求）\n2. **随身携带 IDP + 驾照**\n3. **零酒精** 骑行\n4. **白天也开灯**\n5. **防御性驾驶** — 普吉交通难以预测\n\n## 实用建议\n\n- 长途前先在本通短途练习\n- 预订时选择 **高级保险**\n- 熟悉道路前避免夜间骑行\n\n## 紧急电话\n\n- 警察：**191** | 救护：**1669** | 旅游警察：**1155**`,
      Legal: (t, e) => `# ${t}\n\n${e}\n\n## 须知\n\n泰国在旅游区严格执行交通法规。\n\n## 证件\n\n- 有效 **摩托车 IDP** 或泰国驾照\n- 护照\n- 租赁合同和保险\n\n## 常见罚款\n\n| 违规 | 约罚款 |\n|------|--------|\n| 无 IDP | 1,000–2,000+ THB |\n| 无头盔 | 500–1,000 THB |\n| 酒驾 | 5,000–20,000+ THB |`,
      Documents: (t, e) => `# ${t}\n\n${e}\n\n## IDP — 唯一认可的外国证件\n\n- ✅ 泰国摩托车驾照\n- ✅ **摩托车类 IDP**\n- ❌ 仅本国驾照\n- ❌ 仅护照\n\n出发前在本国办理 IDP。租赁须持 **摩托车 IDP**。`,
      Practical: (t, e) => `# ${t}\n\n${e}\n\n## 行程规划\n\n燃油、现金、SIM 和天气检查很重要。\n\n## 建议\n\n- 去甲米/攀牙/考索前加满油\n- **雨具** 5–10月\n- 山区离线地图\n- 小额泰铢现金`,
      Tips: (t, e) => `# ${t}\n\n${e}\n\n## 本地经验\n\n- **清晨** 出发\n- 泰国骑手可能不打转向灯\n- 周末本通较拥挤`,
      Culture: (t, e) => `# ${t}\n\n${e}\n\n## 尊重习俗\n\n- 寺庙遮肩遮膝\n- 按要求脱鞋\n- 拍照前征得同意`,
      Motorcycles: (t, e) => `# ${t}\n\n${e}\n\n## Thailand Moto Rent 车队\n\n| 车型 | 日租 | 适合 |\n|------|------|------|\n| Click 160 | ฿350 | 市区 |\n| ADV 160 | ฿490 | 综合 |\n| ADV 350 | ฿690 | 双人 |\n| Forza 350 | ฿790 | 高速 |\n| XMAX 300 | ฿750 | 大踏板 |`,
      Gear: (t, e) => `# ${t}\n\n${e}\n\n## 头盔\n\nDOT/ECE 认证，**租赁含头盔**。系紧下巴带。\n\n## 穿着\n\n封闭鞋、雨衣、防晒。`,
      Guide: (t, e) => `# ${t}\n\n${e}\n\n## 路线\n\n以本通/卡塔/卡伦为基地。Promthep、查龙寺、普吉老镇。`,
      Comparison: (t, e) => `# ${t}\n\n${e}\n\n## 总结\n\n预算、技能和时间决定选择。\n\n## 推荐\n\n5–10天假期：**租 2–3 天 + 全险**。`,
      Experience: (t, e) => `# ${t}\n\n${e}\n\n## 真实经验\n\n出发前办 IDP、首日慢骑、选高级保险。\n\n## 注意\n\n突发降雨、弯道碎石、沙滩出口沙子、日落后疲劳。`,
    },
  },
  th: {
    constName: "GUIDE_BODIES_TH",
    policy: extractPolicy("th"),
    cats: {
      Safety: (t, e) => `# ${t}\n\n${e}\n\n## กฎความปลอดภัยสำคัญ\n\n1. **สวมหมวกกันน็อคเสมอ** — คนขี่และคนซ้อน (กฎหมาย)\n2. **IDP + ใบขับขี่** ติดตัวตลอด\n3. **ห้ามดื่มแอลกอhol** ขณะขี่\n4. **เปิดไฟ** แม้กลางวัน\n5. **ขี่แบบป้องกัน** — จราจรภูเก็ตคาดเดาได้ยาก\n\n## เคล็ดลับ\n\n- ขี่สั้นๆ รอบป่าตองก่อนทริปยาว\n- เลือก **ประกันพรีเมียม** ตอนจอง\n- หลีกเลี่ยงขี่กลางคืนจนกว่าจะคุ้นเส้นทาง\n\n## ฉุกเฉิน\n\n- ตำรวจ: **191** | รพ.: **1669** | ตำรวจท่องเที่ยว: **1155**`,
      Legal: (t, e) => `# ${t}\n\n${e}\n\n## สิ่งที่ต้องรู้\n\nไทยบังคับใช้กฎจราจรเข้มงวดในพื้นที่ท่องเที่ยว\n\n## เอกสาร\n\n- **IDP มอเตอร์ไซค์** หรือใบขับขี่ไทย\n- พาสปอร์ต\n- สัญญาเช่าและประกัน\n\n## ค่าปรับทั่วไป\n\n| ความผิด | ค่าปรับโดยประมาณ |\n|---------|-------------------|\n| ไม่มี IDP | 1,000–2,000+ THB |\n| ไม่มีหมวก | 500–1,000 THB |\n| ดื่มแล้วขี่ | 5,000–20,000+ THB |`,
      Documents: (t, e) => `# ${t}\n\n${e}\n\n## IDP — เอกสารต่างชาติที่ยอมรับ\n\n- ✅ ใบขับขี่มอเตอร์ไซค์ไทย\n- ✅ **IDP ชั้นมอเตอร์ไซค์**\n- ❌ ใบขับขี่ประเทศเดียว\n- ❌ พาสปอร์ตอย่างเดียว\n\nขอ IDP **ก่อนเดินทาง** เช่ารถต้องมี **IDP มอเตอร์ไซค์**`,
      Practical: (t, e) => `# ${t}\n\n${e}\n\n## วางแผน\n\nน้ำมัน เงินสด SIM และสภาพอากาศสำคัญ\n\n## คำแนะนำ\n\n- เติมน้ำมันก่อนไปกระบี่/พังงา/เขาสก\n- **เสื้อกันฝน** พ.ค.–ต.ค.\n- แผนที่ออฟไลน์บนภูเขา`,
      Tips: (t, e) => `# ${t}\n\n${e}\n\n## ภูมิปัญญาท้องถิ่น\n\n- ออก **เช้าตรู**\n- คนไทยอาจเลี้ยวไม่เปิดไฟ\n- วันหยุดป่าตองแออัด`,
      Culture: (t, e) => `# ${t}\n\n${e}\n\n## ความเคารพ\n\n- ปิดไหล่และเข่าในวัด\n- ถอดรองเท้าตามกฎ\n- ขออนุญาตก่อนถ่ายรูป`,
      Motorcycles: (t, e) => `# ${t}\n\n${e}\n\n## รถ Thailand Moto Rent\n\n| รุ่น | วัน | เหมาะกับ |\n|------|-----|----------|\n| Click 160 | ฿350 | เมือง |\n| ADV 160 | ฿490 | ทั่วไป |\n| ADV 350 | ฿690 | สองคน |\n| Forza 350 | ฿790 | ทางด่วน |\n| XMAX 300 | ฿750 | แม็กซี่ |`,
      Gear: (t, e) => `# ${t}\n\n${e}\n\n## หมวก\n\nDOT/ECE **รวมในการเช่า** รัดสายคางให้แน่น\n\n## เสื้อผ้า\n\nรองเท้าปิด แจ็กเก็ตกันฝน กันแดด`,
      Guide: (t, e) => `# ${t}\n\n${e}\n\n## เส้นทาง\n\nฐานป่าตอง/กะตะ/กะรน Promthep วัดฉลอง เมืองเก่าภูเก็ต`,
      Comparison: (t, e) => `# ${t}\n\n${e}\n\n## สรุป\n\nงบ ทักษะ และเวลาตัดสินใจ\n\n## แนะนำ\n\n5–10 วัน: **เช่า 2–3 วัน + ประกันเต็ม**`,
      Experience: (t, e) => `# ${t}\n\n${e}\n\n## ประสบการณ์จริง\n\nIDP ก่อนบิน วันแรกขี่ช้า ประกันพรีเมียม\n\n## ระวัง\n\nฝนท sudden กรวด ทราย ความเหนื่อยหลังพระอาทิตย์ตก`,
    },
  },
  ru: {
    constName: "GUIDE_BODIES_RU",
    policy: extractPolicy("ru"),
    cats: {
      Safety: (t, e) => `# ${t}\n\n${e}\n\n## Основные правила безопасности\n\n1. **Всегда шлем** — водитель и пассажир (закон)\n2. **IDP + права** при себе\n3. **Ноль алкоголя** за рулём\n4. **Фары включены** даже днём\n5. **Защитная езда** — трафик Пхукета непредсказуем\n\n## Практические советы\n\n- Короткие поездки вокруг Patong перед дальними маршрутами\n- **Премиум-страховка** при бронировании\n- Избегайте ночи, пока не знаете дороги\n\n## Экстренные номера\n\n- Полиция: **191** | Скорая: **1669** | Туристическая полиция: **1155**`,
      Legal: (t, e) => `# ${t}\n\n${e}\n\n## Что нужно знать\n\nТаиланд строго применяет ПДД в туристических зонах.\n\n## Документы\n\n- Действующий **IDP (мотоцикл)** или тайские права\n- Паспорт\n- Договор аренды и страховка\n\n## Типичные штрафы\n\n| Нарушение | Примерный штраф |\n|-----------|------------------|\n| Без IDP/прав | 1 000–2 000+ THB |\n| Без шлема | 500–1 000 THB |\n| Алкоголь | 5 000–20 000+ THB |`,
      Documents: (t, e) => `# ${t}\n\n${e}\n\n## IDP — единственный принимаемый иностранный документ\n\n- ✅ Тайские права на мотоцикл\n- ✅ **IDP категории мотоцикл**\n- ❌ Только права страны\n- ❌ Только паспорт\n\nОформите IDP **до поездки**. Аренда только с **мото-IDP**.`,
      Practical: (t, e) => `# ${t}\n\n${e}\n\n## Планирование\n\nТопливо, наличные, SIM и погода важны на двух колёсах.\n\n## Советы\n\n- Полный бак перед Krabi, Phang Nga, Khao Sok\n- **Дождевик** май–октябрь\n- Офлайн-карты в горах\n- Мелкие купюры THB`,
      Tips: (t, e) => `# ${t}\n\n${e}\n\n## Местный опыт\n\n- Выезжайте **рано утром**\n- Тайцы могут поворачивать без поворотника\n- Выходные в Patong многолюдны`,
      Culture: (t, e) => `# ${t}\n\n${e}\n\n## Уважение к культуре\n\n- Закрытые плечи и колени в храмах\n- Снимайте обувь где требуется\n- Спрашивайте разрешение на фото`,
      Motorcycles: (t, e) => `# ${t}\n\n${e}\n\n## Парк Thailand Moto Rent\n\n| Модель | Сутки | Для кого |\n|--------|-------|----------|\n| Click 160 | ฿350 | Город |\n| ADV 160 | ฿490 | Туры |\n| ADV 350 | ฿690 | Вдвоём |\n| Forza 350 | ฿790 | Трасса |\n| XMAX 300 | ฿750 | Макси |`,
      Gear: (t, e) => `# ${t}\n\n${e}\n\n## Шлем\n\nСертификация DOT/ECE, **включён в аренду**. Плотно затяните ремешок.\n\n## Одежда\n\nЗакрытая обувь, дождевик, защита от солнца.`,
      Guide: (t, e) => `# ${t}\n\n${e}\n\n## Маршруты\n\nБаза Patong/Kata/Karon. Promthep, Wat Chalong, Старый город.`,
      Comparison: (t, e) => `# ${t}\n\n${e}\n\n## Итог\n\nБюджет, навыки и время определяют выбор.\n\n## Рекомендация\n\n5–10 дней: **аренда 2–3 дня + полная страховка**.`,
      Experience: (t, e) => `# ${t}\n\n${e}\n\n## Реальный опыт\n\nIDP до вылета, медленный первый день, премиум-страховка.\n\n## Осторожно\n\nВнезапный дождь, гравий, песок, усталость после заката.`,
    },
  },
};

// Load localized titles from meta files if they exist, else use EN
function loadMeta(locale) {
  const p = path.join(ROOT, `i18n/messages/guide-articles.${locale}.i18n.ts`);
  if (!fs.existsSync(p)) return {};
  const raw = fs.readFileSync(p, "utf8");
  const map = {};
  const metaRe = /"([^"]+)":\s*\{\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",[\s\S]*?excerpt:\s*"([^"]+)"/g;
  while ((m = metaRe.exec(raw))) {
    map[m[1]] = { title: m[2], category: m[3], excerpt: m[4] };
  }
  return map;
}

const EN_TO_CAT_KEY = {
  Safety: "Safety", Legal: "Legal", Documents: "Documents", Practical: "Practical",
  Tips: "Tips", Culture: "Culture", Motorcycles: "Motorcycles", Gear: "Gear",
  Guide: "Guide", Comparison: "Comparison", Experience: "Experience",
};

for (const [locale, cfg] of Object.entries(LOCALES)) {
  const meta = loadMeta(locale);
  const lines = [
    `/** Auto-generated guide bodies — ${locale.toUpperCase()} — ${articles.length} articles */`,
    "",
    `export const ${cfg.constName}: Record<string, string> = {`,
  ];
  for (const art of articles) {
    const loc = meta[art.id];
    const title = loc?.title ?? art.titleEn;
    const excerpt = loc?.excerpt ?? art.excerptEn;
    const catKey = EN_TO_CAT_KEY[art.category] ?? "Practical";
    const fn = cfg.cats[catKey] ?? cfg.cats.Practical;
    const body = `${fn(title, excerpt)}\n\n${cfg.policy}`.trim();
    const escaped = body.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    lines.push(`  "${art.id}": \`${escaped}\`,`);
  }
  lines.push("};", "");
  const outDir = path.join(ROOT, "lib/guide-articles/bodies");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `${locale}.ts`), lines.join("\n"));
  console.log(`Wrote ${locale}.ts`);
}

console.log("Done locales");
