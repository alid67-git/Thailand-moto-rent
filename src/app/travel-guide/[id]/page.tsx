import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TRAVEL_GUIDE_ARTICLES } from "@/lib/articles";
import { getAllArticleIds } from "@/lib/travel-guide-content";
import { guideArticlesEn } from "@/i18n/messages/guide-articles.en.i18n";
import { TravelGuideArticleView } from "@/components/TravelGuideArticleView";

export function generateStaticParams() {
  return getAllArticleIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = TRAVEL_GUIDE_ARTICLES.find((a) => a.id === id);
  const en = guideArticlesEn[id];
  if (!article) return { title: "Article not found" };
  const title = en?.title ?? article.title;
  const description = en?.excerpt ?? article.excerpt;
  return {
    title: `${title} | Travel Guide`,
    description,
  };
}

export default async function TravelGuideArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = TRAVEL_GUIDE_ARTICLES.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  return <TravelGuideArticleView articleId={id} />;
}
