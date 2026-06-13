import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TRAVEL_GUIDE_ARTICLES } from "@/lib/articles";
import { getAllArticleIds } from "@/lib/travel-guide-content";
import { getLocalizedArticle } from "@/lib/article-i18n";
import { defaultLocale } from "@/i18n/config";
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
  const article = getLocalizedArticle(id, defaultLocale);
  if (!article) return { title: "Article not found" };
  return {
    title: `${article.title} | Travel Guide`,
    description: article.excerpt,
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
