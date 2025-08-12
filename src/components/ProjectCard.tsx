"use client";

import React, { useEffect } from "react";
import { motion, useSpring, MotionProps } from "framer-motion";
import { Project } from "@/lib/projectsData";

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

export function ProjectCard({
  project,
  isSelected,
  onClick,
  ...props
}: ProjectCardProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps>) {
  const springConfig = { stiffness: 300, damping: 30 };
  const scale = useSpring(1, springConfig);
  const x = useSpring(0, springConfig);

  useEffect(() => {
    scale.set(isSelected ? 1.05 : 1);
    x.set(isSelected ? 5 : 0);
  }, [isSelected, scale, x]);

  return (
    <motion.div
      style={{ scale, x }}
      className="relative overflow-hidden rounded-lg cursor-pointer group w-full p-4 bg-white dark:bg-neutral-800 shadow-sm ring-1 ring-gray-200/60 dark:ring-neutral-700/60"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div className="relative z-10">
        <h3 className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
          {project.name}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 font-light mb-2 line-clamp-2 min-h-[36px]">
          {project.description}
        </p>
        <div className="flex items-center gap-2 text-[11px]"></div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300/60 dark:bg-neutral-600/60"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
