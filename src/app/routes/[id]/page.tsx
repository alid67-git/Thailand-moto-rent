import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MOTORCYCLE_ROUTES } from "@/lib/routes";
import { getRouteWaypoints } from "@/lib/route-maps";
import { getRouteTourMeta } from "@/lib/route-tours";
import { RouteMapHero } from "@/components/RouteMapHero";

export function generateStaticParams() {
  return MOTORCYCLE_ROUTES.map((route) => ({ id: route.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const route = MOTORCYCLE_ROUTES.find((r) => r.id === id);
  if (!route) return { title: "Rota bulunamadı" };
  return {
    title: `${route.name} | Phuket Motosiklet Rotası`,
    description: route.description.slice(0, 160),
  };
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const route = MOTORCYCLE_ROUTES.find((r) => r.id === id);

  if (!route) {
    notFound();
  }

  const tourMeta = getRouteTourMeta(id);

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
        name: "Rotalar",
        item: "https://thailand-moto-rent.com/routes",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: route.name,
        item: `https://thailand-moto-rent.com/routes/${id}`,
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
        <RouteMapHero
          routeName={route.name}
          tagline={route.tagline}
          fallbackImage={route.image}
          waypoints={getRouteWaypoints(id)}
        />

        <section className="bg-white px-4 py-12 dark:bg-ink-950 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            <div className="rounded-xl border border-neutral-200 p-4 dark:border-ink-700">
              <p className="text-xs font-bold uppercase text-neutral-400">Mesafe</p>
              <p className="mt-2 text-lg font-bold text-ink-950 dark:text-white">{route.distance}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-4 dark:border-ink-700">
              <p className="text-xs font-bold uppercase text-neutral-400">Süre</p>
              <p className="mt-2 text-lg font-bold text-ink-950 dark:text-white">{route.duration}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-4 dark:border-ink-700">
              <p className="text-xs font-bold uppercase text-neutral-400">Zorluk</p>
              <p className="mt-2 text-lg font-bold text-brand-600">{route.difficulty}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-4 dark:border-ink-700">
              <p className="text-xs font-bold uppercase text-neutral-400">Yükseklik</p>
              <p className="mt-2 text-lg font-bold text-ink-950 dark:text-white">{route.elevation}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-4 dark:border-ink-700">
              <p className="text-xs font-bold uppercase text-neutral-400">En İyi Zaman</p>
              <p className="mt-2 text-sm font-bold text-ink-950 dark:text-white">{route.bestTime}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-16 dark:bg-ink-900 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-white">Rota Hakkında</h2>
            <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-100">
              {route.description}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-heading font-bold text-ink-950 dark:text-white">Başlangıç Noktası</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-100">{route.startPoint}</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-ink-950 dark:text-white">Tavsiye Edilen Motosiklet</h3>
                <p className="mt-2 font-bold text-brand-600 dark:text-brand-400">{route.recommendedBike}</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-ink-950 dark:text-white">Otopark Bilgisi</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-100">{route.parkingInfo}</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-ink-950 dark:text-white">Vurgular</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-100">{route.highlights}</p>
            </div>
          </div>
        </div>
      </section>

      {tourMeta.multiDayItinerary && tourMeta.multiDayItinerary.length > 0 && (
        <section className="panel-section bg-surface">
          <div className="mx-auto max-w-4xl">
            <div className="mb-2 inline-flex rounded-full bg-brand-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {tourMeta.tourDays} günlük tur
            </div>
            <h2 className="font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50">Günlük program</h2>
            <p className="mt-2 text-sm text-body">
              Konaklama ve yakıt planını önceden yapın; motosiklet otoparkı çoğu otelde mevcut.
            </p>
            <div className="mt-8 space-y-4">
              {tourMeta.multiDayItinerary.map((leg) => (
                <div key={leg.day} className="panel p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-thai-gradient text-sm font-bold text-white">
                      G{leg.day}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-lg font-bold text-ink-950 dark:text-neutral-50">{leg.title}</h3>
                      <p className="mt-2 text-body">{leg.description}</p>
                      {leg.stayOptions && leg.stayOptions.length > 0 && (
                        <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/80 p-4 dark:border-brand-700 dark:bg-ink-700/60">
                          <p className="text-label text-brand-800 dark:text-brand-300">Nerede kalınabilir?</p>
                          <ul className="mt-2 space-y-1.5">
                            {leg.stayOptions.map((stay) => (
                              <li key={stay} className="flex items-start gap-2 text-sm text-body">
                                <span className="mt-0.5 text-brand-600 dark:text-brand-400" aria-hidden>
                                  🏨
                                </span>
                                {stay}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-heading text-2xl font-bold text-ink-950 dark:text-white">Duraklar</h2>
          <div className="space-y-6">
            {route.stops.map((stop) => (
              <div
                key={stop.order}
                className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-800"
              >
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-thai-gradient font-bold text-white">
                    {stop.order}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold text-ink-950 dark:text-white">
                      {stop.name}
                    </h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-100">
                        {stop.distance} · {stop.duration}
                      </p>
                      <p className="mt-3 text-neutral-600 dark:text-neutral-100">{stop.description}</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-16 dark:bg-ink-900 lg:px-6">
        <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-heading text-2xl font-bold text-ink-950 dark:text-white">
              Güvenlik İpuçları
            </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {route.safetyTips.map((tip, i) => (
              <div
                key={i}
                className="panel-accent p-6"
              >
                <div className="text-3xl">{tip.icon}</div>
                  <h3 className="mt-3 font-heading font-bold text-ink-950 dark:text-white">{tip.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-100">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-12 dark:bg-ink-900 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="panel-accent p-6">
            <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">
                Bu rota için önerilen motosiklet:
            </p>
              <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                  <p className="text-lg font-bold text-ink-950 dark:text-white">{route.recommendedBike}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-100">
                  Rahatlık, güvenlik ve kontrol için optimize edilmiş
                </p>
              </div>
              <Link
                href="/book"
                  className="whitespace-nowrap rounded-lg bg-thai-gradient px-6 py-3 font-bold text-white hover:opacity-95"
              >
                Hemen Kirala
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-thai-gradient p-8 text-center text-white md:p-12">
            <h2 className="font-heading text-3xl font-bold">Bu Rotayı Sürmeye Hazır mısınız?</h2>
            <p className="mt-3 text-white/90">
              {route.name} rotasını keşfetmek için bugün motosiklet kiralayın.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/book"
                className="inline-flex justify-center rounded-lg bg-white px-6 py-3 font-bold text-brand-600 hover:bg-neutral-100"
              >
                  Motosiklet Kirala
              </Link>
              <Link
                href="/routes"
                className="inline-flex justify-center rounded-lg border border-white px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                  Diğer Rotalar
              </Link>
              <Link
                href="/travel-guide"
                className="inline-flex justify-center rounded-lg border border-white px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                  Sürüş Rehberi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
