import { Metadata } from "next";
import {
  getCaseStudy,
  getAllCaseStudySlugs,
} from "@/lib/caseStudies";
import { CaseStudyContent } from "./CaseStudyContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {
      title: "Case Study Coming Soon",
      description: "This case study is being written.",
    };
  }

  // Use overview for description (min 120 chars for SEO)
  const description = study.overview.length >= 120
    ? study.overview.slice(0, 160)
    : `${study.subtitle}. ${study.overview}`.slice(0, 160);

  return {
    title: `${study.title} — Case Study`,
    description,
    alternates: {
      canonical: `https://dev.maxwellyoung.info/case-study/${study.slug}`,
    },
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.overview.slice(0, 160),
      url: `https://dev.maxwellyoung.info/case-study/${study.slug}`,
      type: "article",
      siteName: "Maxwell Young",
      images: [
        {
          url: study.heroImage || "/meta.png",
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Case Study`,
      description: study.subtitle,
      images: [study.heroImage || "/meta.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  const structuredData = study
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        headline: `${study.title} — Case Study`,
        name: study.title,
        description: study.overview,
        url: `https://dev.maxwellyoung.info/case-study/${study.slug}`,
        image: study.heroImage
          ? `https://dev.maxwellyoung.info${study.heroImage}`
          : "https://dev.maxwellyoung.info/meta.png",
        author: {
          "@type": "Person",
          name: "Maxwell Young",
          url: "https://dev.maxwellyoung.info",
        },
        about: study.tools,
      }
    : null;

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      <CaseStudyContent slug={slug} study={study} />
    </>
  );
}
