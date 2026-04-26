"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectMedia } from "@/components/ProjectMedia";
import type { Project } from "@/lib/projects";

interface ProjectHoverPreviewProps {
  children: React.ReactNode;
  project: Pick<Project, "name" | "description" | "screenshots" | "thumb" | "cover" | "tags">;
}

export function ProjectHoverPreview({
  children,
  project,
}: ProjectHoverPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const hasPreview = Boolean(project.cover || project.thumb || project.screenshots?.[0]);

  useEffect(() => {
    if (!isHovered || !hasPreview) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const previewWidth = 280;
      const previewHeight = 180;
      const offset = 20;

      // Calculate position relative to viewport
      let x = e.clientX + offset;
      let y = e.clientY - previewHeight / 2;

      // Keep preview within viewport bounds
      if (x + previewWidth > window.innerWidth - 20) {
        x = e.clientX - previewWidth - offset;
      }
      if (y < 20) {
        y = 20;
      }
      if (y + previewHeight > window.innerHeight - 20) {
        y = window.innerHeight - previewHeight - 20;
      }

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered, hasPreview]);

  if (!hasPreview) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
          >
            <div className="relative w-[280px] h-[180px] rounded-lg overflow-hidden shadow-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
              <ProjectMedia project={project} variant="hover" sizes="280px" />
              <div className="absolute bottom-2 left-3 right-3">
                <p className="text-xs text-white/90 font-medium truncate">
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
