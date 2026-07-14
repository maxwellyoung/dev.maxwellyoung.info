"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, FileText } from "lucide-react";
import {
  Project,
  getProjectContextLabel,
  getProjectStatusLabel,
  isActiveStatus,
} from "@/lib/projects";
import { ProjectMedia } from "@/components/ProjectMedia";

interface ProjectDetailsProps {
  project: Project | null;
  onCarouselOpen: () => void;
}

export function ProjectDetails({
  project,
  onCarouselOpen,
}: ProjectDetailsProps) {
  const [loadedImage, setLoadedImage] = useState<string | null>(null);
  const currentImage = project?.screenshots?.[0] ?? null;
  const imageLoaded = loadedImage === currentImage;
  const hasMedia = Boolean(
    project?.cover || project?.thumb || project?.screenshots?.length,
  );
  const screenshotCount = project?.screenshots?.length ?? 0;
  const canOpenCarousel = screenshotCount > 0;
  const visibleTags = project?.tags?.slice(0, 6) ?? [];
  const secondaryImpact = project?.impact?.slice(1, 3) ?? [];

  if (!project) return null;

  return (
    <div className="overflow-x-clip rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm transition-shadow duration-300 sm:shadow-[0_18px_50px_rgba(0,0,0,0.04)] dark:sm:shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
      <div className="h-px w-full bg-gradient-to-r from-accent/70 via-border to-transparent" />
      <div className="p-4 sm:p-5">
          {hasMedia && (
            <div className="mb-5">
              {canOpenCarousel ? (
                <button
                  type="button"
                  className="relative w-full cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                  onClick={onCarouselOpen}
                  aria-label={`Open ${project.name} screenshots`}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm ring-1 ring-[hsl(var(--border))] bg-[hsl(var(--muted))] transition-[box-shadow,--tw-ring-color] [transition-duration:180ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:ring-[hsl(var(--accent))]/45 group-hover:shadow-lg motion-reduce:transition-none">
                    {!imageLoaded && currentImage && (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[hsl(var(--muted))] via-[hsl(var(--muted))]/50 to-[hsl(var(--muted))]" />
                    )}
                    <ProjectMedia
                      project={project}
                      variant="detail"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    {currentImage && (
                      <Image
                        src={currentImage}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="opacity-0 pointer-events-none"
                        onLoad={() => setLoadedImage(currentImage)}
                      />
                    )}
                  </div>
                </button>
              ) : (
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm ring-1 ring-[hsl(var(--border))] bg-[hsl(var(--muted))]">
                  <ProjectMedia
                    project={project}
                    variant="detail"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="mb-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {getProjectContextLabel(project)}
              </p>
              <h2 className="text-lg md:text-xl font-medium leading-tight text-foreground">
                {project.name}
              </h2>
            </div>
            {getProjectStatusLabel(project) && (
              <span
                className={`shrink-0 rounded-sm border px-2 py-0.5 text-xs ${
                  isActiveStatus(project)
                    ? "border-accent/20 bg-accent/10 text-accent"
                    : "border-border/70 bg-[hsl(var(--muted))]/60 text-muted-foreground"
                }`}
              >
                {getProjectStatusLabel(project)}
              </span>
            )}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.longDescription || project.description}
          </p>

          <div className="mt-4 grid overflow-hidden rounded-sm border border-[hsl(var(--border))] text-xs sm:grid-cols-2">
            <div className="bg-[hsl(var(--muted))]/20 px-3 py-2.5 sm:border-r sm:border-[hsl(var(--border))]">
              <p className="mb-1 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                Role
              </p>
              <p className="text-sm text-foreground">{project.role || "Contributor"}</p>
            </div>
            {project.impact?.[0] && (
              <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20 px-3 py-2.5 sm:border-t-0">
                <p className="mb-1 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Proof point
                </p>
                <p className="text-sm leading-snug text-foreground">{project.impact[0]}</p>
              </div>
            )}
          </div>

          {secondaryImpact.length > 0 && (
            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {secondaryImpact.map((impact) => (
                <p key={impact} className="flex gap-2 leading-relaxed">
                  <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                  <span>{impact}</span>
                </p>
              ))}
            </div>
          )}

          {visibleTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border/50 bg-[hsl(var(--muted))]/50 px-2 py-1 text-xs text-muted-foreground transition-colors duration-200 hover:border-accent/20 hover:text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {project.caseStudySlug && (
              <Link
                href={`/case-study/${project.caseStudySlug}`}
                className="inline-flex min-h-10 items-center justify-center rounded-sm border border-accent/20 bg-accent/10 px-3 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:justify-start"
              >
                <FileText className="mr-1.5 h-3.5 w-3.5" />
                Case study
              </Link>
            )}
            {project.link &&
              (project.link.startsWith("/") ? (
                <Link
                  href={project.link}
                  className="group inline-flex min-h-10 items-center justify-center rounded-sm border border-[hsl(var(--border))] px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/30 hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:justify-start"
                >
                  View Live
                  <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-10 items-center justify-center rounded-sm border border-[hsl(var(--border))] px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/30 hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:justify-start"
                >
                  View Live
                  <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-10 items-center justify-center rounded-sm border border-[hsl(var(--border))] px-3 text-sm text-muted-foreground transition-colors duration-200 hover:border-accent/30 hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:justify-start"
              >
                Source
                <Github className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            )}
            {!project.link && (project.status === "WIP" || project.status === "Planned") && (
              <span className="inline-flex items-center text-sm text-muted-foreground">
                Launch pending
              </span>
            )}
          </div>
      </div>
    </div>
  );
}
