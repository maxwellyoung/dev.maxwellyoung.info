import { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/lib/caseStudies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dev.maxwellyoung.info";

  const staticRoutes = [
    {
      url: baseUrl,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/craft`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/resume`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/basketcase`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/basketcase/privacy`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/basketcase/terms`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/basketcase/support`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  const caseStudyRoutes = getAllCaseStudySlugs().map((slug) => ({
    url: `${baseUrl}/case-study/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const essayRoutes = [
    "the-invisible-details-of-interaction-design",
    "motion-grammar-for-humane-interfaces",
    "the-typography-system-behind-strawhouse",
  ].map((slug) => ({
    url: `${baseUrl}/craft/essay/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...essayRoutes];
}
