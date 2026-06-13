import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MOTORCYCLE_ROUTES } from "@/lib/routes";
import { RouteDetailView } from "@/components/RouteDetailView";
import { dictionaries } from "@/i18n";
import { defaultLocale } from "@/i18n/config";
import { localizeRoute } from "@/lib/route-i18n";

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
  if (!route) return { title: "Route not found" };
  const localized = localizeRoute(route, dictionaries[defaultLocale], defaultLocale);
  return {
    title: `${localized.name} | Phuket Motorcycle Route`,
    description: localized.description.slice(0, 160),
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

  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://thailand-moto-rent.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Routes",
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
      <RouteDetailView routeId={id} />
    </>
  );
}
