"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { useRef, useState } from "react";
import { ParallaxHover } from "@/components/ParallaxHover";

type ProjectShowcaseCardProps = {
  project: Project;
  className?: string;
};

export function ProjectShowcaseCard({
  project,
  className,
}: ProjectShowcaseCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const mediaSrc =
    project.links?.video || project.thumb || project.screenshots?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block ${className ?? ""}`}
    >
      <ParallaxHover className="">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          className="relative overflow-hidden rounded-sm border border-[var(--surface)] bg-[var(--bg)]"
        >
          <div className="relative aspect-[4/3] w-full">
            {project.links?.video ? (
              <video
                src={project.links.video}
                muted
                loop
                playsInline
                autoPlay={isHover}
                className="h-full w-full object-cover"
              />
            ) : (
              mediaSrc && (
                <Image
                  src={mediaSrc}
                  alt={`${project.name} preview`}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              )
            )}
          </div>

          <div className="p-3 sm:p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm sm:text-base font-medium">
                <span className="project-link">{project.name}</span>
              </h3>
              {project.startDate && (
                <span className="text-[10px] sm:text-xs text-muted">
                  {new Date(project.startDate).getFullYear()}
                </span>
              )}
            </div>
            {project.description && (
              <p className="mt-1 text-xs sm:text-sm text-muted line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
        </motion.div>
      </ParallaxHover>
    </Link>
  );
}
