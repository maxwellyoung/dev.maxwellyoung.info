import { projects } from "../src/lib/projects";

type Issue = {
  slug?: string;
  message: string;
};

const issues: Issue[] = [];
const seenSlugs = new Set<string>();

for (const project of projects) {
  if (seenSlugs.has(project.slug)) {
    issues.push({ slug: project.slug, message: "Duplicate slug." });
  }
  seenSlugs.add(project.slug);

  if (project.link !== project.links?.live) {
    issues.push({
      slug: project.slug,
      message: "Legacy `link` must mirror `links.live`.",
    });
  }

  if (project.codeLink !== project.links?.repo) {
    issues.push({
      slug: project.slug,
      message: "Legacy `codeLink` must mirror `links.repo`.",
    });
  }

  if (
    project.releaseStage === "in-progress" &&
    !project.allowPreviewLink &&
    project.links?.live
  ) {
    issues.push({
      slug: project.slug,
      message:
        "In-progress projects cannot expose a live link unless `allowPreviewLink` is true.",
    });
  }

  if (project.releaseStage === "planned" && project.links?.live) {
    issues.push({
      slug: project.slug,
      message: "Planned projects cannot expose a live link.",
    });
  }
}

if (issues.length > 0) {
  console.error("Project metadata check failed:");
  for (const issue of issues) {
    const prefix = issue.slug ? `[${issue.slug}]` : "[project]";
    console.error(`- ${prefix} ${issue.message}`);
  }
  process.exit(1);
}

console.log(`Project metadata check passed (${projects.length} projects).`);
