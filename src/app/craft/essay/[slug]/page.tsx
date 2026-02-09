import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEssay, getAllEssaySlugs } from "@/lib/essays";
import { EssayContent } from "./EssayContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEssaySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);

  if (!essay) {
    return {
      title: "Essay Not Found | Maxwell Young",
      description: "This essay could not be found.",
    };
  }

  return {
    title: `${essay.title} | Maxwell Young`,
    description: essay.excerpt,
    openGraph: {
      title: essay.title,
      description: essay.excerpt,
      type: "article",
      publishedTime: essay.date,
      images: [{ url: "/meta.png", width: 1200, height: 630, alt: essay.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: essay.title,
      description: essay.excerpt,
      images: ["/meta.png"],
    },
  };
}

export default async function EssayPage({ params }: PageProps) {
  const { slug } = await params;
  const essay = getEssay(slug);

  if (!essay) {
    notFound();
  }

  return <EssayContent essay={essay} />;
}
