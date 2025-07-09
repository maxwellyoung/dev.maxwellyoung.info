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
import { ProjectDetails } from "@/components/ProjectDetails";
import { ProjectList } from "@/components/ProjectList";

interface ProjectsProps {
  initialFavourites?: string[];
}

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
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
            <ProjectDetails
              project={selectedProject}
              onCarouselOpen={() => setIsCarouselOpen(true)}
            />
          </div>
          <ProjectList
            projects={projects}
            selectedProject={selectedProject}
            onSelectProject={(project, index) => {
              setSelectedProject(project);
              setCurrentIndex(index);
            }}
            scrollAreaRef={scrollAreaRef}
          />
        </div>
      </div>
      <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen}>
        <DialogContent
          className="max-w-none w-screen h-screen p-0"
          hideCloseButton
        >
          {selectedProject && selectedProject.screenshots && (
            <Carousel
              images={selectedProject.screenshots}
              onClose={() => setIsCarouselOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
