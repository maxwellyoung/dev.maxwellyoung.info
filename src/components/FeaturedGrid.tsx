import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects as allProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

type FeaturedGridProps = {
  projects?: Project[];
  limit?: number;
  className?: string;
};

export function FeaturedGrid({
  projects,
  limit,
  className,
}: FeaturedGridProps) {
  const featured = (projects ?? allProjects)
    .filter((p) => p.featured)
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  const items = typeof limit === "number" ? featured.slice(0, limit) : featured;

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block"
          >
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
}
