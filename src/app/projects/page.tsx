"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  MotionProps,
} from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  X,
  Star,
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Loader,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import { Project, projects } from "@/lib/projectsData";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjectScroll } from "@/hooks/useProjectScroll";

interface ProjectsProps {
  initialFavourites?: string[];
}

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects[0]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const nextProject = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  }, []);

  useProjectScroll(containerRef, nextProject, prevProject);

  useEffect(() => {
    setSelectedProject(projects[currentIndex]);

    // Scroll to the selected project in the list
    const scrollArea = scrollAreaRef.current;
    const selectedProjectElement = scrollArea?.querySelector(
      `[data-project-index="${currentIndex}"]`
    );

    if (scrollArea && selectedProjectElement) {
      const scrollAreaRect = scrollArea.getBoundingClientRect();
      const selectedProjectRect =
        selectedProjectElement.getBoundingClientRect();

      if (
        selectedProjectRect.top < scrollAreaRect.top ||
        selectedProjectRect.bottom > scrollAreaRect.bottom
      ) {
        selectedProjectElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }, [currentIndex]);

  const backgroundSpring = useSpring(0, { stiffness: 100, damping: 30 });
  const backgroundRotation = useTransform(backgroundSpring, [0, 1], [0, 360]);

  useEffect(() => {
    const interval = setInterval(() => {
      backgroundSpring.set(Math.random());
    }, 15000);
    return () => clearInterval(interval);
  }, [backgroundSpring]);

  const [isHovered, setIsHovered] = useState(false);

  const titleVariants = {
    initial: { opacity: 1, y: 0 },
    hover: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 10 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 },
    },
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background: `conic-gradient(from ${backgroundRotation}deg at 50% 50%, #FF6B6B, #4ECDC4, #45B7D1, #98CA32, #FB8B24, #FF6B6B)`,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="relative mb-8 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.h1
            className="text-4xl font-extralight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-300 dark:to-gray-500"
            variants={titleVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            Projects
          </motion.h1>
          <motion.span
            className="absolute top-0 left-0 text-4xl font-extralight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-300 dark:to-gray-500 whitespace-nowrap"
            variants={subtitleVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            Crafting Digital Experiences
          </motion.span>
        </div>
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 bg-green-500 ${
                  selectedProject?.status === "Completed"
                    ? "shadow-glow-green-enhanced"
                    : ""
                }`}
              ></div>
              <span className="text-xs">Completed</span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 bg-orange-500 ${
                  selectedProject?.status !== "Completed"
                    ? "shadow-glow-orange-enhanced"
                    : ""
                }`}
              ></div>
              <span className="text-xs">Work in Progress</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2" ref={containerRef}>
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.name}
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
                    {selectedProject.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 font-light">
                    {selectedProject.longDescription ||
                      selectedProject.description}
                  </p>
                  {selectedProject.screenshots &&
                    selectedProject.screenshots.length > 0 && (
                      <div
                        className="relative cursor-pointer mb-4"
                        onClick={() => setIsCarouselOpen(true)}
                      >
                        <Image
                          src={selectedProject.screenshots[0]}
                          alt={`${selectedProject.name} screenshot`}
                          width={800}
                          height={450}
                          objectFit="cover"
                          className="rounded-lg"
                        />
                        {selectedProject.screenshots.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
                            +{selectedProject.screenshots.length - 1}
                          </div>
                        )}
                      </div>
                    )}
                  <div className="flex space-x-4">
                    {selectedProject.link && (
                      <motion.a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-light text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        Explore Project
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </motion.a>
                    )}
                    {selectedProject.codeLink && (
                      <motion.a
                        href={selectedProject.codeLink}
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
          </div>
          <div className="w-full">
            <ScrollArea
              className="h-[calc(100vh-200px)] lg:h-[700px] w-full pr-4"
              ref={scrollAreaRef}
            >
              <div className="space-y-4 py-2">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.name}
                    project={project}
                    isSelected={selectedProject?.name === project.name}
                    onClick={() => {
                      setSelectedProject(project);
                      setCurrentIndex(index);
                    }}
                    data-project-index={index}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      <Dialog
        open={isCarouselOpen}
        onOpenChange={() => setIsCarouselOpen(false)}
      >
        <DialogContent className="max-w-none w-screen h-screen p-0">
          <div className="w-full h-full relative">
            {selectedProject && selectedProject.screenshots && (
              <Carousel images={selectedProject.screenshots} />
            )}
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 bg-white bg-opacity-50 hover:bg-opacity-100 transition-all duration-200"
                onClick={() => setIsCarouselOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
