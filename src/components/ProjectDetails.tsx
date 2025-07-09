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
          <h2 className="text-2xl font-light mb-3 text-gray-700 dark:text-gray-300">
            {project.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 font-light">
            {project.longDescription || project.description}
          </p>
          {project.screenshots && project.screenshots.length > 0 && (
            <div
              className="relative cursor-pointer mb-4"
              onClick={onCarouselOpen}
            >
              <Image
                src={project.screenshots[0]}
                alt={`${project.name} screenshot`}
                width={800}
                height={450}
                objectFit="cover"
                className="rounded-lg"
              />
              {project.screenshots.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
                  +{project.screenshots.length - 1}
                </div>
              )}
            </div>
          )}
          <div className="flex space-x-4">
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
