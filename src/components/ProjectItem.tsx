import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

export const ProjectItem = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  const isFirst = index === 0;
  const thumbWidth = isFirst ? 180 : 160;
  const thumbHeight = isFirst ? 135 : 120; // Maintain 4:3 aspect ratio

  return (
    <li
      ref={ref}
      className={`proj group relative py-1 text-base section-fade-in ${
        isVisible ? "is-visible" : ""
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-link relative inline-block font-semibold"
      >
        {project.name}
        {project.description && (
          <span className="ml-2 text-muted font-normal">
            {project.description}
          </span>
        )}
      </Link>
      <div
        className="thumb-wrapper absolute left-[calc(100%_+_24px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      >
        {
          <Image
            src={
              project.thumb ||
              project.screenshots?.[0] ||
              "/projectImages/placeholder.webp"
            }
            alt={`${project.name} thumbnail`}
            width={thumbWidth}
            height={thumbHeight}
            loading="lazy"
            className="thumb rounded-md shadow-lg object-cover"
          />
        }
      </div>
    </li>
  );
};
