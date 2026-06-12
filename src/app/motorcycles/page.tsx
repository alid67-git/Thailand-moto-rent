"use client";

import Link from "next/link";
import Image from "next/image";
import { MOTORCYCLE_MODELS } from "@/lib/catalog";

export default function MotorcyclesPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-950 to-ink-900 px-4 py-20 text-white lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em]">Kiralık filo</span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">Phuket motosiklet filosu</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Click 160, ADV 160, ADV 350, Forza 350 ve XMAX 300 — şehir ve ada turları için optimize edilmiş scooter/maxi modeller.
          </p>
        </div>
      </section>

      <section className="panel-section">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MOTORCYCLE_MODELS.map((moto) => (
              <div key={moto.id} className="panel overflow-hidden transition hover:-translate-y-1">
                <div className="relative h-48 bg-neutral-100 dark:bg-ink-700">
                  <Image
                    src={moto.image}
                    alt={moto.fullName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                    {moto.engineCc} cc
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-ink-950 dark:text-neutral-50">{moto.fullName}</h3>
                  <p className="mt-1 text-sm capitalize text-muted">{moto.category}</p>
                  <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-ink-600">
                    <p className="text-label">Günlük</p>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">฿{moto.dailyPriceThb}</p>
                    <p className="mt-1 text-xs text-muted">Depozito: ฿{moto.depositThb.toLocaleString()} (kart bloke)</p>
                  </div>
                  <Link href="/book" className="btn-primary mt-6 w-full text-center">
                    Hemen kirala
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-section bg-surface">
        <div className="mx-auto max-w-3xl">
          <h2 className="section-title">Kiralama koşulları</h2>
          <ul className="mt-6 space-y-3 text-body">
            <li>✓ IDP + ülke motosiklet ehliyeti zorunlu (Tayland&apos;a gelmeden önce alın)</li>
            <li>✓ Pasaport bırakmıyoruz — kredi kartı bloke, teslimde çözülür</li>
            <li>✓ Tam kapsamlı sigorta önerilir</li>
            <li>✓ Outdoor / BMW tipi büyük motosiklet kiralamıyoruz</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
