import { TRAVEL_GUIDE_ARTICLES } from "@/lib/articles";

const COMPANY_POLICY = `
## Thailand Moto Rent politikası

- **Pasaport bırakma yapmıyoruz.** Depozito için kredi kartınıza **bloke (pre-authorization)** uygulanır; motor tesliminde bloke çözülür.
- **IDP (Uluslararası Sürücü Belgesi) zorunludur.** Kendi ülkenizde geçerli motosiklet/scooter ehliyetinizi gösteremeyen müşterilere kiralama yapılmaz.
- **IDP olmadan sürüş** veya polis cezaları müşteri sorumluluğundadır; yenilenebilir cezalar kiracıya yansıtılabilir.
- **Hasar:** Sigortasız veya kapsam dışı hasarda motor yetkili servise götürülür; onarım bedeli + motorun kullanılamadığı gün sayısı × günlük kira bedeli tahsil edilir. **Tam kapsamlı sigorta** en mantıklı seçenektir.
- **Alkollü sürüş** Tayland'da çok ağır cezalar içerir; sıfır tolerans yaklaşımıyla kontrol edilir.
`;

const ARTICLE_BODIES: Record<string, string> = {
  "international-license": `
Tayland'da motosiklet veya scooter kullanmak için **yalnızca pasaport veya yalnızca uluslararası ehliyet yeterli değildir.**

## IDP neden şart?

Tayland trafik polisi turistlere yönelik **çok ciddi ve sık kontroller** yapar. Ülkenize göre değişse de pratikte şunlar istenir:

- Geçerli **pasaport**
- Ülkenizde alınmış **motosiklet/scooter sürücü belgesi** (B sınıfı veya yerel eşdeğeri)
- Bu belgeye bağlı **IDP (International Driving Permit / Uluslararası Sürücü Belgesi)**

**Sadece otomobil ehliyeti** veya **sadece pasaport** ile scooter sürmek yasal değildir ve ceza riski çok yüksektir.

## Tayland'a gelmeden önce alın

IDP'yi **Tayland'a varmadan önce** kendi ülkenizde almalısınız (Türkiye'de noter, otomobil kulübü veya yetkili kurumlar). Tayland'da turist olarak IDP çıkarmak pratikte mümkün değildir.

## Ceza riski

IDP veya uygun ehliyet olmadan yakalanırsanız:

- Anında para cezası (çoğu zaman **1.000–2.000+ THB**)
- Motosikletin trafikten men edilmesi
- Sigorta geçersiz sayılabilir — kaza durumunda tüm masraf sizde kalır

${COMPANY_POLICY}

## Kiralama şartımız

Kendi ülkesinde geçerli **yerel motosiklet ehliyetini** ve **IDP**'yi birlikte gösteremeyen müşterilere **motosiklet kiralanmaz.** Bu kural hem sizin hem bizim güvenliğimiz içindir.
`,

  "thai-laws": `
Tayland'da motosiklet kullanırken bilmeniz gereken temel kurallar ve cezalar.

## Ehliyet ve belgeler

- **IDP + ülke ehliyeti** taşıyın (motosiklet sınıfı)
- Pasaport veya fotokopisi yanınızda olsun
- Kiralama sözleşmesi ve sigorta belgesi

## Sık uygulanan cezalar

| İhlal | Yaklaşık ceza |
|-------|----------------|
| Ehliyet/IDP yok | 1.000–2.000+ THB |
| Kask yok | 500–1.000 THB |
| Alkollü sürüş | 5.000–20.000+ THB, hapis riski |
| Hız / kırmızı ışık | 500–2.000 THB |
| Plaka/ sigorta sorunu | Araç bağlanabilir |

## Polis kontrolleri

Turist yoğun bölgelerde (Patong, Kata, havalimanı yolu, Phang Nga) **motosiklet kontrolleri çok sıktır.** Sakin ve saygılı olun; belgeleri hazır tutun.

${COMPANY_POLICY}
`,

  "drunk-driving": `
Tayland'da **alkollü motosiklet kullanmak** son derece riskli ve **çok yüksek cezaları** vardır.

## Yasal sınır

Kan yasasındaki alkol sınırı düşüktür; pratikte turistler için **sıfıra yakın tolerans** vardır. Bir kadeh bile sorun çıkarabilir.

## Cezalar

- Para cezası: **5.000 THB ve üzeri** (tekrarda artar)
- Ehliyet geçici olarak alınabilir
- Ağır vakalarda **hapis** ve sınır dışı riski
- Kaza halinde **sigorta geçersiz** — tüm tıbbi ve onarım masrafları size kalır

## Motosiklet özel risk

Dengeniz alkolden etkilenir; Phuket'teki trafik kaotiktir. Full moon partisi, bar turu sonrası **asla** motor kullanmayın — Grab veya taksi kullanın.

${COMPANY_POLICY}
`,

  "police-checkpoints": `
Phuket ve çevresinde motosiklet kontrol noktaları yaygındır.

## Ne kontrol edilir?

- IDP ve ülke ehliyeti
- Kask (sürücü ve yolcu)
- Plaka ve kiralama belgesi
- Alkol (rastgele nefes testi)

## Kontrolde yapılacaklar

1. Yavaşlayıp güvenli şekilde durun
2. Kaskı çıkarmayın (önce durun)
3. Pasaport, IDP, ehliyet ve kiralama evrakını gösterin
4. Sakin ve saygılı olun — tartışma cezayı artırır

## Sık lokasyonlar

- Patong giriş/çıkış
- Chalong dairevi
- Havalimanı yolu
- Phang Nga / Krabi yönü karayolu

${COMPANY_POLICY}
`,

  "insurance-claims": `
Motosiklet kiralarken sigorta seçimi hayati önem taşır.

## Sigorta türleri

- **Temel (yasal zorunlu):** Üçüncü şahıs — hasar limiti düşük, kendi motor hasarınızı kapsamaz
- **Standart paket:** Muafiyet düşer, hırsızlık koruması
- **Premium / tam kapsam:** Minimum muafiyet, yol yardımı — **turistler için önerilir**

## Hasar olmadan sigortasız senaryo

Sigorta yoksa veya kapsam dışı hasar varsa Thailand Moto Rent uygulaması:

1. Motor yetkili servise götürülür
2. Servisin talep ettiği **onarım bedeli** tahsil edilir
3. Onarım süresince motor kiralanamadığı **gün sayısı × günlük kira** eklenir

Bu nedenle **tam kapsamlı sigorta** en mantıklı seçenektir.

## Kaza sonrası

- Polis raporu (1000 THB üzeri hasar)
- Fotoğraf, tanık bilgisi
- Bize ve sigorta şirketine derhal bildirim

${COMPANY_POLICY}
`,

  "safety-phuket": `
Phuket'te motosiklet milyonlarca turist tarafından kullanılır; dikkatli sürücüler için güvenlidir.

## Temel kurallar

1. **Kask** — sürücü ve yolcu (yasal zorunluluk)
2. **IDP + ehliyet** her zaman yanınızda
3. **Alkol yok** — ağır ceza ve kaza riski
4. Gündüz bile **farlar açık**
5. Şehirde 50 km/s, otoyolda dikkatli hız

## Trafik gerçekleri

- Ani şerit değişimleri
- Soldan/sağdan geçiş
- Köpekler ve turistler yolda

## İlk kez kiralarsanız

- Click 160 veya ADV 160 ile başlayın
- İlk gün Patong çevresinde alışın
- Tam sigorta seçin
- ${"IDP'yi Tayland'a gelmeden önce alın"}

${COMPANY_POLICY}
`,

  "best-scooter": `
Thailand Moto Rent filosu — Phuket için optimize edilmiş 5 model:

## Honda Click 160 — 350 THB/gün
Şehir, kısa mesafe, bütçe dostu. İlk kez kullananlar için ideal.

## Honda ADV 160 — 490 THB/gün
Yüksek sele, depolama, hafif tur ve virajlı yollar. En çok tercih edilen model.

## Honda ADV 350 — 690 THB/gün
Daha güçlü, uzun mesafe ve iki kişi için konforlu.

## Honda Forza 350 — 790 THB/gün
Maxi scooter — otoyol, Krabi/Phang Nga günübirlik turlar.

## Yamaha XMAX 300 — 750 THB/gün
Spor maxi, stabil sürüş, geniş sele.

**Not:** Outdoor, enduro veya BMW tipi büyük motosiklet **kiralamıyoruz** — filomuz scooter/maxi odaklıdır. Yönetim panelinden ileride yeni modeller eklenebilir.

${COMPANY_POLICY}
`,

  "fuel-guide": `
## Benzin türü
Scooter'lar **benzin 91/95** kullanır (dizel değil).

## Fiyat
2026 itibarıyla litre fiyatı yaklaşık **35–40 THB** (dalgalanır).

## İstasyonlar
Shell, PTT, Bangchak — Patong, Chalong, 402 otoyolu üzerinde bol.

## İpuçları
- Uzun tur öncesi **tam depo**
- Khao Sok / orman yollarında istasyon az — Phang Nga'da doldurun
- Küçük şişe benzin yol kenarında pahalı — istasyon tercih edin
`,

  "accident-procedure": `
## Kaza anında

1. Güvenli yere çekin, yaralı varsa **1669** ambulans
2. Polis: **191** — hasar 1000 THB üzerindeyse rapor şart
3. Fotoğraf (tüm açılar, plaka, belgeler)
4. Thailand Moto Rent WhatsApp hattına bildirin

## Sigorta

Polis raporu olmadan tam tazminat zordur. Premium sigorta ile süreç hızlanır.

${COMPANY_POLICY}
`,

  "helmet-laws": `
Tayland'da kask **yasal zorunluluk** — sürücü ve yolcu.

## Ceza
500–1.000 THB; tekrarda artar.

## Tür
DOT onaylı; bizim kiralamalarda **kask dahil**.

## İpucu
Çene kayışını sıkı bağlayın — polis gevşek kaska da ceza yazar.
`,

  "rental-vs-buying": `
Turistler için **kiralama** neredeyse her zaman daha mantıklı:

- Bakım, sigorta, plaka derdi yok
- Kısa süreli kalışta ekonomik
- Arıza durumunda değişim imkânı

## Depozito modelimiz
Pasaport **almıyoruz** — kredi kartı **bloke**; teslimde çözülür.

${COMPANY_POLICY}
`,
};

function categoryTemplate(id: string, category: string, title: string): string {
  return `
# ${title}

Bu rehber Phuket ve çevresinde motosikletle gezmeyi planlayan turistler için hazırlanmıştır.

## Genel bilgi

${category} kategorisindeki bu yazı; güvenli sürüş, IDP gerekliliği ve Thailand Moto Rent kiralama koşullarıyla uyumlu pratik bilgiler içerir.

## Önemli hatırlatmalar

- Tayland'a gelmeden **IDP** alın
- **Alkollü sürüş** ağır ceza
- **Tam sigorta** önerilir
- Pasaport bırakmıyoruz — **kredi kartı bloke** sistemi

## Daha fazla bilgi

İlgili makaleler: Uluslararası Ehliyet, Tayland Cezaları, Sigorta Rehberi.

Detaylı sorular için WhatsApp üzerinden bize ulaşın.

${COMPANY_POLICY}
`;
}

export function getArticleBody(articleId: string): string | null {
  if (ARTICLE_BODIES[articleId]) return ARTICLE_BODIES[articleId].trim();

  const meta = TRAVEL_GUIDE_ARTICLES.find((a) => a.id === articleId);
  if (!meta) return null;

  return categoryTemplate(articleId, meta.category, meta.title).trim();
}

export function getAllArticleIds(): string[] {
  return TRAVEL_GUIDE_ARTICLES.map((a) => a.id);
}
