import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DestinationDetailView } from "@/components/DestinationDetailView";
import { DESTINATION_SPOTS } from "@/lib/destinations";

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
      <DestinationDetailView spot={destination} />
    </>
  );
}
