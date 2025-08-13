import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { Project } from "@/lib/projectsData";

interface ProjectDetailsProps {
  project: Project | null;
  onCarouselOpen: () => void;
}

export function ProjectDetails({
  project,
  onCarouselOpen,
}: ProjectDetailsProps) {
  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
            bounce: 0.25,
          }}
          className="bg-white dark:bg-neutral-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
          {project.screenshots && project.screenshots.length > 0 && (
            <div
              className="relative cursor-pointer mb-5"
              onClick={onCarouselOpen}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10">
                <Image
                  src={project.screenshots[0]}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>
              {project.screenshots.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                  +{project.screenshots.length - 1}
                </div>
              )}
            </div>
          )}
          <h2 className="text-[22px] md:text-[24px] font-medium leading-tight text-gray-800 dark:text-gray-100">
            {project.name}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 font-light">
            {project.longDescription || project.description}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-light text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                Explore Project
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </motion.a>
            )}
            {project.codeLink && (
              <motion.a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-light text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                View Code
                <Github className="ml-1 h-3 w-3" />
              </motion.a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
