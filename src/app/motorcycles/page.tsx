"use client";

import Link from "next/link";
import Image from "next/image";

const motorcycles = [
  {
    id: "click-160",
    name: "Honda Click 160",
    category: "Scooter Otomatik",
    cc: 160,
    daily: 350,
    weekly: 2100,
    monthly: 7500,
    description: "Şehir ve kısa turlar için ideal. Yakıt tasarrufu ve kolay sürüş.",
    image: "https://images.unsplash.com/photo-1514594460709-461d7635ba9d?w=500&q=90",
    highlights: ["Otomatik", "Ekonomik", "Kolay çalıştırma"],
  },
  {
    id: "pcx",
    name: "Honda PCX 150",
    category: "Scooter Premium",
    cc: 150,
    daily: 450,
    weekly: 2700,
    monthly: 9000,
    description: "Konforlu sürüş, geniş depolama alanı. Günlük geziler için mükemmel.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=90",
    highlights: ["Konforlu", "Geniş depolama", "Güvenli"],
  },
  {
    id: "adv-160",
    name: "Honda ADV 160",
    category: "Adventure Scooter",
    cc: 160,
    daily: 490,
    weekly: 2940,
    monthly: 9800,
    description: "Çok amaçlı, göze güzel. Uzun turlar ve engebeli yollar için.",
    image: "https://images.unsplash.com/photo-1606664515524-2ddc6298996f?w=500&q=90",
    highlights: ["Çok amaçlı", "Konforlu", "Dayanıklı"],
  },
  {
    id: "forza-350",
    name: "Honda Forza 350",
    category: "Maxi Scooter",
    cc: 350,
    daily: 790,
    weekly: 4740,
    monthly: 15800,
    description: "Büyük, güçlü ve rahat. Uzak mesafeler ve otoyol sürüşü için.",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=90",
    highlights: ["Güçlü motor", "Çok konforlu", "Yüksek hız"],
  },
  {
    id: "nmax",
    name: "Yamaha NMAX 155",
    category: "Maxi Scooter",
    cc: 155,
    daily: 550,
    weekly: 3300,
    monthly: 11000,
    description: "Spor tasarım, güçlü performans. Hızlı ve eğlenceli sürüş.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=90",
    highlights: ["Spor tasarım", "Performans", "Güvenlik"],
  },
  {
    id: "cb500x",
    name: "Honda CB500X",
    category: "Adventure Motorcycle",
    cc: 500,
    daily: 1290,
    weekly: 7740,
    monthly: 25800,
    description: "Gerçek adventure motosikleti. Tüm yol koşullarında güvenilir.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=90",
    highlights: ["Çok amaçlı", "Off-road yetenekli", "Dayanıklı"],
  },
  {
    id: "bmw-gs",
    name: "BMW GS 310",
    category: "Adventure Touring",
    cc: 310,
    daily: 1490,
    weekly: 8940,
    monthly: 29800,
    description: "Premium adventure motosikleti. Maksimum konfor ve performans.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=90",
    highlights: ["Premium kalite", "Yüksek teknoloji", "Touring"],
  },
];

export default function MotorcyclesPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-950 to-ink-900 px-4 py-20 text-white lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em]">
              Motosiklet Envanteri
            </span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
            Phuket&apos;in En İyi Motosiklet Seçimi
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Şehir turu scooter&apos;larından adventure motosikletlerine kadar, her bütçe ve tercih için mükemmel araç.
          </p>
        </div>
      </section>

      <section className="px-4 py-24 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {motorcycles.map((moto) => (
              <div
                key={moto.id}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-lift-lg dark:border-ink-700 dark:bg-ink-800"
              >
                <div className="relative h-48 overflow-hidden bg-neutral-100 dark:bg-ink-700">
                  <Image
                    src={moto.image}
                    alt={moto.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                    {moto.cc} cc
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-ink-950 dark:text-white">
                    {moto.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-100">
                    {moto.category}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {moto.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {moto.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-ink-700 dark:text-neutral-300"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-ink-700">
                    <div className="grid grid-cols-3 gap-3 text-center text-sm">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-100">
                          Günlük
                        </p>
                        <p className="mt-0.5 font-bold text-brand-600">฿{moto.daily}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-100">
                          Haftalık
                        </p>
                        <p className="mt-0.5 font-bold text-brand-600">฿{moto.weekly}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-100">
                          Aylık
                        </p>
                        <p className="mt-0.5 font-bold text-brand-600">฿{moto.monthly}</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/book"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
                  >
                    Hemen Kirala
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3.333 8h9.334M8.667 4.667L12 8l-3.333 3.333" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-24 dark:bg-ink-900 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title">Neden Bizi Seçmelisiniz?</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "En İyi Fiyatlar",
                description: "Phuket'in en uygun kiralama fiyatları",
              },
              {
                title: "Güvenli Araçlar",
                description: "Tüm motosikletler düzenli bakımlı ve sigortalı",
              },
              {
                title: "24/7 Destek",
                description: "WhatsApp üzerinden anında yardım",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lift dark:border-ink-700 dark:bg-ink-800"
              >
                <h3 className="font-heading text-lg font-bold text-ink-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-100">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
