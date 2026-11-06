import { type CaseStudy, caseStudies } from "./caseStudies";
import { rankedProjects } from "./projects";

/**
 * Case studies in the owner's project order (projects.ts priority), limited to
 * projects that are listed publicly, so related links follow the curation
 * instead of the data file's insertion order and never promote parked work.
 */
export const orderedCaseStudies: CaseStudy[] = rankedProjects
  .map((project) => (project.caseStudySlug ? caseStudies[project.caseStudySlug] : undefined))
  .filter((study): study is CaseStudy => Boolean(study));

/** The next study in that order, wrapping around, so the chain reaches every study. */
export function nextCaseStudy(slug: string): CaseStudy | undefined {
  if (orderedCaseStudies.length < 2) return undefined;
  const index = orderedCaseStudies.findIndex((study) => study.slug === slug);
  return orderedCaseStudies[(index + 1) % orderedCaseStudies.length];
}

/** Other studies to suggest, skipping this one and the "next" one already linked above them. */
export function relatedCaseStudies(slug: string, count = 4): CaseStudy[] {
  const next = nextCaseStudy(slug)?.slug;
  return orderedCaseStudies.filter((study) => study.slug !== slug && study.slug !== next).slice(0, count);
}
