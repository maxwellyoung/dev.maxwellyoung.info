"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ProjectMedia } from "@/components/ProjectMedia";
import type { Project } from "@/lib/projects";

interface ProjectHoverPreviewProps {
  children: React.ReactNode;
  project: Pick<Project, "slug" | "name" | "description" | "screenshots" | "thumb" | "cover" | "tags">;
}

export function ProjectHoverPreview({
  children,
  project,
}: ProjectHoverPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion() ?? false;

  const hasPreview = Boolean(project.cover || project.thumb || project.screenshots?.[0]);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncHoverCapability = () => {
      setCanHoverPreview(hoverQuery.matches);
      if (!hoverQuery.matches) {
        setIsHovered(false);
      }
    };

    syncHoverCapability();
    hoverQuery.addEventListener("change", syncHoverCapability);
    return () => hoverQuery.removeEventListener("change", syncHoverCapability);
  }, []);

  const showPreview = (e: React.MouseEvent<HTMLDivElement>) => {
    const previewWidth = 280;
    const previewHeight = 180;
    const margin = 20;
    const x = e.clientX + margin + previewWidth <= window.innerWidth - margin
      ? e.clientX + margin
      : e.clientX - previewWidth - margin;
    const y = Math.max(
      margin,
      Math.min(e.clientY - previewHeight / 2, window.innerHeight - previewHeight - margin),
    );

    // Place it before mounting so the first frame never appears at the origin.
    setPreviewPosition({ x, y });
    setIsHovered(true);
  };

  if (!hasPreview || !canHoverPreview) {
    return <>{children}</>;
  }

  return (
    <div
      onMouseEnter={showPreview}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            transition={shouldReduceMotion
              ? { duration: 0.1 }
              : { duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: previewPosition.x,
              top: previewPosition.y,
            }}
          >
            <div className="relative h-[180px] w-[280px] overflow-hidden rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-2xl">
              <ProjectMedia project={project} variant="hover" sizes="280px" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8">
                <p className="truncate text-xs font-medium text-white/90">
                  {project.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
