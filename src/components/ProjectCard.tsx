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
      className="relative overflow-hidden rounded-lg cursor-pointer group w-full p-4 bg-white dark:bg-neutral-800 shadow-sm"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
        style={{
          backgroundColor:
            project.status === "Completed" ? "#4ECDC4" : "#FF6B6B",
        }}
      />
      <div className="relative z-10">
        <h3 className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
          {project.name}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 font-light mb-2 line-clamp-3">
          {project.description}
        </p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <span
            className={`mr-2 w-2 h-2 rounded-full ${
              project.status === "Completed" ? "bg-green-500" : "bg-orange-500"
            }`}
          ></span>
          {project.status}
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5"
        style={{
          backgroundColor:
            project.status === "Completed" ? "#4ECDC4" : "#FF6B6B",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
