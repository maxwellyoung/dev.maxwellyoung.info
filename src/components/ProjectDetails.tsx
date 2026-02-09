"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, FileText } from "lucide-react";
import { Project } from "@/lib/projects";
import { spring } from "@/lib/motion";

interface ProjectDetailsProps {
  project: Project | null;
  onCarouselOpen: () => void;
}

export function ProjectDetails({
  project,
  onCarouselOpen,
}: ProjectDetailsProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset image loaded state when project changes
  useEffect(() => {
    setImageLoaded(false);
  }, [project?.name]);

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={spring.gentle}
          className="bg-[hsl(var(--card))] rounded-xl p-4 sm:p-6 border border-[hsl(var(--border))]"
        >
          {project.screenshots && project.screenshots.length > 0 && (
            <button
              type="button"
              className="relative w-full cursor-pointer mb-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
              onClick={onCarouselOpen}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-[hsl(var(--border))] transition-all duration-300 group-hover:ring-[hsl(var(--accent))]/40 group-hover:shadow-lg bg-[hsl(var(--muted))]">
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[hsl(var(--muted))] via-[hsl(var(--muted))]/50 to-[hsl(var(--muted))]" />
                )}
                <Image
                  src={project.screenshots[0]}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className={`object-cover transition-all duration-500 group-hover:scale-[1.02] ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              {project.screenshots.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-background/90 text-foreground px-2 py-1 rounded-full text-xs border border-[hsl(var(--border))]">
                  +{project.screenshots.length - 1}
                </div>
              )}
            </button>
          )}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg md:text-xl font-medium leading-tight text-foreground">
              {project.name}
            </h2>
            {project.status && (
              <span className={`shrink-0 px-2 py-0.5 text-xs rounded-full ${
                project.status === "Active" || project.status === "WIP"
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-[hsl(var(--muted))] text-muted-foreground"
              }`}>
                {project.status === "WIP" ? "In Progress" : project.status}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground font-light">
            {project.longDescription || project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-md bg-[hsl(var(--muted))] text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
            {project.caseStudySlug && (
              <Link
                href={`/case-study/${project.caseStudySlug}`}
                className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
              >
                <FileText className="mr-1.5 h-3.5 w-3.5" />
                Read Case Study
              </Link>
            )}
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                whileHover={{ x: 3 }}
              >
                View Live
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </motion.a>
            )}
            {project.codeLink && (
              <motion.a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                whileHover={{ x: 3 }}
              >
                Source
                <Github className="ml-1 h-3 w-3" />
              </motion.a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
