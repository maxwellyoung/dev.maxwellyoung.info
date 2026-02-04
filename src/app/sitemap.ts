import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { getAllCaseStudySlugs } from "@/lib/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dev.maxwellyoung.info";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/craft`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];

  // Get all case studies from the caseStudies lib (complete list)
  const caseStudyRoutes = getAllCaseStudySlugs().map((slug) => ({
    url: `${baseUrl}/case-study/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Essay routes
  const essayRoutes = [
    "the-invisible-details-of-interaction-design",
    "motion-grammar-for-humane-interfaces",
    "the-typography-system-behind-strawhouse",
  ].map((slug) => ({
    url: `${baseUrl}/craft/essay/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...essayRoutes];
}
