import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { IslandAccessSection } from "@/components/IslandAccessSection";
import { DESTINATION_SPOTS } from "@/lib/destinations";
import { getIslandAccess } from "@/lib/island-access";

export function generateStaticParams() {
  return DESTINATION_SPOTS.map((spot) => ({
    slug: spot.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = DESTINATION_SPOTS.find((spot) => spot.slug === slug);

  if (!destination) {
    return {
      title: "Sayfa Bulunamadı",
    };
  }

  return {
    title: `${destination.name} | Phuket Motosiklet Rehberi`,
    description: `${destination.name}'a motosikletle nasıl gidilir? ${destination.distance}, ${destination.duration}, ${destination.bestFor}. Komple rehber ve tavsiyeler.`,
    keywords: [destination.name, "Phuket", "motosiklet", "rota", "sürüş rehberi"].join(", "),
    openGraph: {
      title: `${destination.name} | Motosiklet Rehberi`,
      description: destination.description,
      images: [destination.image],
      type: "article",
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = DESTINATION_SPOTS.find((spot) => spot.slug === slug);

  if (!destination) {
    notFound();
  }

  const islandAccess = getIslandAccess(slug);

  // BreadcrumbList Schema
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
        name: "Destinasyonlar",
        item: "https://thailand-moto-rent.com/destinations",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.name,
        item: `https://thailand-moto-rent.com/destinations/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
      {/* Hero */}
      <section className="relative h-96 overflow-hidden bg-ink-950 md:h-[500px]">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-12 lg:px-6">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/destinations"
              className="mb-5 inline-flex items-center gap-2 text-white/60 hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Gezilecek Yerler
            </Link>
            <h1 className="font-heading text-4xl font-extrabold text-white md:text-5xl">
              {destination.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/70">
              {destination.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-neutral-50 px-4 py-16 dark:bg-ink-900 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {destination.images.map((img, idx) => (
              <div
                key={idx}
                className={`overflow-hidden rounded-2xl shadow-lift ${
                  idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <Image
                  src={img}
                  alt={`${destination.name} ${idx + 1}`}
                  width={idx === 0 ? 600 : 300}
                  height={idx === 0 ? 600 : 300}
                  className="h-48 w-full object-cover md:h-64 lg:h-80"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="bg-white px-4 py-16 dark:bg-ink-950 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:grid-cols-3 dark:border-ink-700 dark:bg-ink-800">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Patong'dan Mesafe
              </p>
              <p className="mt-2 text-lg font-bold text-ink-950 dark:text-white">
                {destination.distance}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Sürüş Süresi
              </p>
              <p className="mt-2 text-lg font-bold text-ink-950 dark:text-white">
                {destination.duration}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                İdeal Motosiklet
              </p>
              <p className="mt-2 text-lg font-bold text-brand-600 dark:text-brand-400">
                ADV 160
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-12 space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-white">
                Hakkında
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
                {destination.description}
                {islandAccess
                  ? " Bu destinasyona motosikletle iskele noktasına kadar gidilir; adaya veya körfeze tekne ile geçilir."
                  : " Phuket'in en güzel gezilecek yerlerinden biridir — motosikletle doğrudan ulaşılabilir."}
              </p>
            </div>

            {islandAccess && <IslandAccessSection guide={islandAccess} />}

            <div>
              <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-white">
                Yapılacak Aktiviteler
              </h2>
              <ul className="mt-4 space-y-3 text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    ✓
                  </span>
                  Fotoğraf çekim noktaları
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    ✓
                  </span>
                  Yerel restoranlar ve kafeler
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    ✓
                  </span>
                  Manzara ve doğa
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    ✓
                  </span>
                  Sosyal deneyimler
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-white">
                İpuçları
              </h2>
              <div className="mt-4 space-y-3 rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-900 dark:bg-brand-950/20">
                <p className="text-sm text-brand-900 dark:text-brand-100">
                  <span className="font-semibold">Güvenlik:</span> Yerel trafik kurallarına uyun, her zaman kask takın
                </p>
                <p className="text-sm text-brand-900 dark:text-brand-100">
                  <span className="font-semibold">En İyi Zaman:</span> Sabah erken veya öğleden sonra kalabalık olmayan saatler
                </p>
                <p className="text-sm text-brand-900 dark:text-brand-100">
                  <span className="font-semibold">Hava Durumu:</span> Yaz aylarında güneş koruyucu kullanın
                </p>
                <p className="text-sm text-brand-900 dark:text-brand-100">
                  <span className="font-semibold">Yakıt:</span> Gidişte yakıt doldurmasını tavsiye ederiz
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Bike */}
          <div className="mt-8 rounded-xl border-2 border-brand-200 bg-brand-50 p-6 dark:border-brand-900 dark:bg-brand-950/20">
            <p className="text-sm font-semibold text-brand-900 dark:text-brand-100">
              💡 Bu yer için önerilen motosiklet:
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-ink-950 dark:text-white">Honda ADV 160</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  490 THB/gün • Rahat ve güvenilir
                </p>
              </div>
              <Link
                href="/book"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700"
              >
                Kirala
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col gap-4 border-t border-neutral-200 pt-8 sm:flex-row dark:border-ink-700">
            <Link
              href="/book"
              className="flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3 font-bold text-white transition hover:bg-brand-600"
            >
              ✓ Motosiklet Kirala
            </Link>
            <Link
              href="/motorcycles"
              className="flex items-center justify-center rounded-xl border border-brand-300 bg-brand-50 px-6 py-3 font-bold text-brand-600 transition hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-400 dark:hover:bg-brand-900"
            >
              🏍️ Tüm Modelleri Gör
            </Link>
            <Link
              href="/destinations"
              className="flex items-center justify-center rounded-xl border border-neutral-200 px-6 py-3 font-bold text-ink-900 transition hover:border-neutral-300 hover:bg-neutral-50 dark:border-ink-700 dark:text-white dark:hover:bg-ink-800"
            >
              🗺️ Diğer Yerler
            </Link>
          </div>

          {/* Internal Links Section */}
          <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-ink-700">
            <h3 className="font-heading text-lg font-bold text-ink-950 dark:text-white mb-4">
              Benzer Destinasyonlar & Rotalar
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/routes"
                className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition hover:border-brand-500 hover:bg-neutral-50 dark:border-ink-700 dark:hover:bg-ink-800"
              >
                <span className="font-semibold text-ink-950 dark:text-white">Rotalar</span>
                <span className="text-brand-600 dark:text-brand-400">→</span>
              </Link>
              <Link
                href="/travel-guide"
                className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition hover:border-brand-500 hover:bg-neutral-50 dark:border-ink-700 dark:hover:bg-ink-800"
              >
                <span className="font-semibold text-ink-950 dark:text-white">Sürüş Rehberi</span>
                <span className="text-brand-600 dark:text-brand-400">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
