import { notFound } from "next/navigation";
import Link from "next/link";

const articlesData = {
  "safety-phuket": {
    title: "Phuket'te Motosiklet Kullanmak Güvenli Mi?",
    category: "Güvenlik",
    readTime: "8 min",
    publishDate: "2026-06-01",
    excerpt: "Phuket'te motosiklet sürüşünün güvenliği hakkında bilmeniz gereken her şey",
    content: `
Phuket'te motosiklet sürüşü milyonlarca turist tarafından yapılmaktadır ve genel olarak güvenlidir.
Ancak bazı önemli güvenlik önlemleri almanız gerekmektedir.

## Temel Güvenlik Kuralları

1. **Her zaman kask takın** - Tayland'da kask takmamak yasal olarak suçtur
2. **Işık söndürmeyin** - Gündüz bile ışık açık tutun
3. **Hız sınırına uyun** - Şehirde 50 km/s, otoyolda 100 km/s
4. **Alkol almayın** - Trafik polisi sıklıkla kontrol yapar

## Trafik Özellikleri

Phuket'teki trafik kaotik olabilir. Bazı dikkat edilmesi gereken noktalar:
- Sürücüler ani manevra yapabilir
- Motosikletler her yandan gelebilir
- Işık kırmızı bile bazıları geçebilir

## İlk Kez Motosiklet Kiralayacaksanız

- Aşırı hız yapmayın
- Dönerken yavaş gidin
- Bir yerel rehber eşliğinde sürün
- Sigorta seçeneğini tercih edin

Özetle: Dikkatli ve saygılı sürüş yaparsanız Phuket'te motosiklet sürüşü çok güvenlidir.
    `,
  },
  "thai-laws": {
    title: "Tayland'da Motosiklet Kuralları ve Cezalar",
    category: "Hukuk",
    readTime: "10 min",
    publishDate: "2026-05-28",
    excerpt: "Tayland trafik kanunları, ehliyet gereksinimleri ve ceza sistemi",
    content: `
Tayland'da motosiklet sürüşü için belirli kurallar ve cezalar vardır.
Bunları bilmek önemlidir.

## Ehliyet Gereksinimleri

- Uluslararası ehliyet (IDP) kabul edilir
- Yerel ehliyet de gerekebilir (polise göre değişir)
- Bazı polisler sadece pasaporta bakabilir

## Cezalar

- Kask takmamak: 1,000 THB
- Işık açık olmamak: 500 THB
- Hız aşımı: 500-2,000 THB
- Alkollü sürüş: 3,000+ THB

## Kiralamadan Önce

- Demiryolu öncesi tüm belgelerinizi kontrol edin
- Sigorta poliçesini okuyun
- Araba kontrol sertifikasını alın

Önemli: Tayland'da trafik polisi çok aktiftir. Kurallara uymak zekice bir tercih.
    `,
  },
  "international-license": {
    title: "Uluslararası Ehliyet (IDP) Tayland'da Gerekli Mi?",
    category: "Dokümanlar",
    readTime: "6 min",
    publishDate: "2026-05-25",
    excerpt: "IDL gereksinimleri, nasıl alınır ve Tayland'da geçerliliği",
    content: `
Uluslararası Ehliyet (IDP) Tayland'da kullanmak legal mi? Yanıt: evet, ancak bazı koşullarla.

## IDP'nin Geçerliliği

- Tayland'da IDP kabul edilir
- Ancak yerel ehliyet de olması tavsiye edilir
- Bazı polisler IDP'yi tanımayabilir

## Alternatifler

1. **IDP Almak**: Evvela ülkede herhangi bir itfaiye dairesi veya CAA'ya başvurun
2. **Tayland Ehliyeti Almak**: 3-5 gün sürer, test gerekli
3. **Sadece Pasaport**: Bazı kiralama şirketleri bunu kabul eder

## En İyi Çözüm

IDP + Pasaport kombinasyonu en güvenli seçenektir. Hiçbir polis sorunu çıkarmaz.

## Kiralama Şirketleri

Çoğu kiralama şirketi IDP'yi kabul eder, ancak bazıları yerel ehliyeti de talep edebilir.
    `,
  },
  "best-scooter": {
    title: "Phuket'te Hangi Scooter Seçmeliyim?",
    category: "Motosikletler",
    readTime: "9 min",
    publishDate: "2026-05-22",
    excerpt: "Click, PCX, ADV 160 ve diğer modeller arasında karşılaştırma",
    content: `
Phuket'te çeşitli scooter modelleri bulunmaktadır. Hangi birini seçmeniz gerektiği ihtiyaçlarınıza bağlıdır.

## Click 160 - Ekonomik Seçim
- Günde 350 THB
- Şehir sürüşü için ideal
- Düşük yakıt tüketimi
- Az depozito (3,000 THB)

Kimin için: Kısa turlar, şehir gezintileri, bütçe sınırlı

## ADV 160 - Çok Amaçlı
- Günde 490 THB
- Daha rahat
- Engebeli yollara da uygun
- Daha iyi aydınlatma

Kimin için: Tüm gün turları, uzun yolculuklar, macera

## Forza 350 - Premium
- Günde 790 THB
- Güçlü motor
- Yüksek hız ve rahat
- Otoyol sürüşü optimal

Kimin için: Uzak destinasyonlar, otoyol, lüks

## Önerimiz

İlk kez ise ADV 160 en iyi seçimdir: ekonomik ama yeterince rahat.
    `,
  },
  "rainy-season": {
    title: "Yağmur Sezonunda Phuket'te Sürüş Rehberi",
    category: "İpuçları",
    readTime: "7 min",
    publishDate: "2026-05-20",
    excerpt: "May-Ekim arasında güvenli sürüş ipuçları ve teknikleri",
    content: `
Tayland'ın yağmur mevsimi (May-Ekim) Phuket'te nispeten az yağış alır, ancak ani fırtınalar olabilir.

## Yağmur Sezonunda Sürüş İpuçları

1. **Erken başlayın** - Akşam fırtınaları daha yaygındır
2. **Hızınızı azaltın** - Islak yollarda denge kolay kaybedilir
3. **Işık açık tutun** - Görünürlük azalır
4. **Mola verin** - Fırtınadan kaçının

## Teçhizat

- Su geçirmez ceket zorunlu
- Gözlük temiz tutun
- Ayakkabı kaymayan olmalı
- Kitlerle sürüş yapın

## En İyi Yollar

- Taller yollar daha kuru olur
- Kıyı yollarından kaçının
- Ormanlık alanlar tehlikeli

## İyileştirmeler

Yağmur sezonunda phuket'in daha az turist var, daha huzurlu bir deneyim olabilir.
    `,
  },
  "fuel-guide": {
    title: "Tayland'da Yakıt İstasyonları ve Benzin Fiyatları",
    category: "Pratik",
    readTime: "5 min",
    publishDate: "2026-05-18",
    excerpt: "Phuket'te yakıt bulma, fiyat beklentileri ve ödeme yöntemleri",
    content: `
Phuket'te yakıt bulmak çok kolaydır. PTT, Shell ve Caltex her yerde bulunmaktadır.

## Fiyatlar (Yaklaşık)

- Regular 91: 35-37 THB/liter
- Premium 95: 38-40 THB/liter
- Diesel: 33-35 THB/liter

Fiyatlar dalgalanabilir, ancak yakıl istasyonları arasında minimal fark vardır.

## En Yaygın İstasyonlar

- **PTT** - En yaygın ve güvenilir
- **Shell** - Kalite garantisi
- **Caltex** - Biraz pahalı ama iyi

## Ödeme Yöntemleri

- Nakit (THB)
- Kredi kartı kabul edilir
- Bazı istasyonlarda Alipay ve WeChat Pay

## Yakıt Verimliliği

- Click 160: 40-50 km/liter
- ADV 160: 35-40 km/liter
- Forza 350: 30-35 km/liter

## İpucu

Hızlı sürüş yakıt tüketimini arttırır. Ölçülü sürüş daha ekonomiktir.
    `,
  },
};

export default async function TravelGuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articlesData[id as keyof typeof articlesData];

  if (!article) {
    notFound();
  }

  // Schema Markups
  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Anasayfa",
        item: "https://thailand-moto-rent.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sürüş Rehberi",
        item: "https://thailand-moto-rent.com/travel-guide",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://thailand-moto-rent.com/travel-guide/${id}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishDate,
    author: {
      "@type": "Organization",
      name: "Thailand Moto Rent",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-900 to-sky-800 px-4 py-20 text-white lg:px-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/travel-guide" className="mb-4 inline-flex items-center gap-2 text-white/80 hover:text-white">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12L6 8l4-4" strokeLinecap="round" />
            </svg>
            Seyahat Rehberi
          </Link>

          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
            {article.category}
          </span>

          <h1 className="mt-4 font-heading text-4xl font-extrabold md:text-5xl">
            {article.title}
          </h1>

          <div className="mt-6 flex items-center gap-4 text-white/70">
            <span>{article.readTime}</span>
            <span>·</span>
            <span>{article.publishDate}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-invert max-w-none dark:prose-invert">
            {article.content.split("\n").map((paragraph, i) => {
              if (paragraph.startsWith("##")) {
                return (
                  <h2 key={i} className="mt-8 font-heading text-2xl font-bold text-ink-950 dark:text-white first:mt-0">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("-")) {
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6 text-neutral-600 dark:text-neutral-400">
                    <li>{paragraph.replace("- ", "")}</li>
                  </ul>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={i} className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-brand-500 p-8 text-center text-white">
            <h3 className="font-heading text-2xl font-bold">
              Phuket'i Keşfetmeye Hazır mısınız?
            </h3>
            <p className="mt-2 text-white/90">
              Yazıda okuduğunuz rotaları kendi motosikletinizle sürün.
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex rounded-lg bg-white px-6 py-3 font-bold text-brand-600 hover:bg-neutral-100"
            >
              Motosiklet Kirala
            </Link>
          </div>

          {/* Related Links */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Link
              href="/routes"
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition hover:border-brand-500 hover:bg-neutral-50 dark:border-ink-700 dark:hover:bg-ink-800"
            >
              <span className="font-semibold text-ink-950 dark:text-white">Rotalar</span>
              <span className="text-brand-600 dark:text-brand-400">→</span>
            </Link>
            <Link
              href="/destinations"
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition hover:border-brand-500 hover:bg-neutral-50 dark:border-ink-700 dark:hover:bg-ink-800"
            >
              <span className="font-semibold text-ink-950 dark:text-white">Destinasyonlar</span>
              <span className="text-brand-600 dark:text-brand-400">→</span>
            </Link>
            <Link
              href="/motorcycles"
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition hover:border-brand-500 hover:bg-neutral-50 dark:border-ink-700 dark:hover:bg-ink-800"
            >
              <span className="font-semibold text-ink-950 dark:text-white">Motosikletler</span>
              <span className="text-brand-600 dark:text-brand-400">→</span>
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-ink-700">
            <h3 className="font-heading text-lg font-bold text-ink-950 dark:text-white">
              İlgili Makaleler
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Object.entries(articlesData)
                .filter(([articleId]) => articleId !== id)
                .slice(0, 2)
                .map(([articleId, art]) => (
                  <Link
                    key={articleId}
                    href={`/travel-guide/${articleId}`}
                    className="rounded-xl border border-neutral-200 p-4 transition hover:border-brand-500 hover:shadow-lift dark:border-ink-700"
                  >
                    <h4 className="font-bold text-ink-950 dark:text-white line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                      {art.readTime}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
