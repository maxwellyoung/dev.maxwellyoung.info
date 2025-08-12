import Link from "next/link";
import Image from "next/image";
import { projects as allProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

type FeaturedListMinimalProps = {
  projects?: Project[];
  limit?: number;
  className?: string;
};

export function FeaturedListMinimal({
  projects,
  limit,
  className,
}: FeaturedListMinimalProps) {
  const featured = (projects ?? allProjects)
    .filter((p) => p.featured)
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  const items = typeof limit === "number" ? featured.slice(0, limit) : featured;

  return (
    <ul className={className}>
      {items.map((project, index) => {
        const thumb = project.thumb || project.screenshots?.[0];
        const thumbWidth = index === 0 ? 180 : 160;
        const thumbHeight = index === 0 ? 135 : 120; // 4:3

        return (
          <li key={project.slug} className="group relative py-1 text-base">
            <Link
              href={`/projects/${project.slug}`}
              className="relative inline-block font-semibold"
            >
              {project.name}
              {project.description && (
                <span className="ml-2 text-muted font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  {project.description}
                </span>
              )}
            </Link>
            {thumb && (
              <div
                className="thumb-wrapper absolute left-[calc(100%_+_24px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                aria-hidden="true"
              >
                <Image
                  src={thumb}
                  alt={`${project.name} thumbnail`}
                  width={thumbWidth}
                  height={thumbHeight}
                  loading="lazy"
                  className="thumb rounded-md shadow-lg object-cover"
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
