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

interface Project {
  name: string;
  status: string;
  description: string;
  longDescription?: string;
  screenshots?: string[];
  link?: string;
  codeLink?: string;
  startDate?: string;
  tags?: string[];
}

const projects: Project[] = [
  {
    name: "Ivan Guzman | Writer & Cultural Strategist",
    status: "Completed",
    description:
      "A portfolio website for Ivan Guzman, a writer & cultural strategist.",
    longDescription:
      "A portfolio website for Ivan Guzman, a writer. Built with Next.js, Tailwind CSS, and Framer Motion. Managed by a Sanity CMS for a user friendly way for client to upload articles.",
    link: "https://ivan-guzman.com/",
    screenshots: ["/projectImages/ivan-1.webp"],
  },
  {
    name: "Ch'lita | Fashion Designer & Stylist Portfolio",
    status: "Completed",
    description:
      "A portfolio website for Ch'lita, a fashion designer and stylist.",
    longDescription:
      "Portfolio site for fashion stylist and designer Ch’lita, featuring work for Rosalia, The Dare and more. Built with React, Next.js, Tailwind, Framer Motion and a Sanity CMS for a user friendly way for client to upload projects. Designed with a focus on minimalism to display the work clearly and mobile first as suspected majority would be viewing on phone. Dynamic layout for expanded project imagery view.",
    link: "https://chlita.com",
    codeLink: "https://github.com/maxwellyoung/chlita",
    screenshots: [
      "/projectImages/chlita-1.webp",
      "/projectImages/chlita-2.webp",
      "/projectImages/chlita-3.webp",
      "/projectImages/chlita-4.webp",
      "/projectImages/chlita-5.webp",
    ],
  },
  {
    name: "Social Chaos",
    status: "Completed",
    description: "Picolo clone. A personalized party game for your friends",
    link: "https://chaos-phi.vercel.app",
    screenshots: ["/projectImages/chaos1.webp", "/projectImages/chaos2.webp"],
  },
  {
    name: "Rep Tracker",
    status: "Completed",
    description:
      "A minimalistic workout tracker that uses a webcam to count reps for exercises like bicep curls.",
    longDescription:
      "Rep Tracker is a fun and minimalistic workout tracking app that uses AI to track repetitions for exercises like bicep curls. The app utilizes a webcam feed to detect arm movements and count reps, with playful Nintendo and Apple-inspired design elements. Built with Next.js, TailwindCSS, Framer Motion and MediaPipe, the app focuses on delivering a fluid and engaging user experience. Future plans include adding streaks, workout logs, and integrations with Uploadthing for sharing workout progress.",
    link: "https://rep-tracker-theta.vercel.app/",
    startDate: "2024-10-09",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "MediaPipe", "AI"],
    screenshots: [
      "/projectImages/reptracker1.webp",
      "/projectImages/reptracker2.webp",
    ],
  },
  {
    name: "Metrosexual Awareness Night",
    status: "Completed",
    description:
      "Developed a flashy and engaging site for Metrosexual Awareness Night, incorporating unique stylistic and functional elements.",
    longDescription:
      "Implemented a countdown timer for the event, adding a sense of anticipation. The design features a hipster runoff pink gradient background with shooting star effects, contributing to a playful and energetic aesthetic. The site includes responsive side navigation for easy project selection, and the overall styling was updated to be more vibrant, flashy, and pink-themed.",
    link: "https://metrosexualawareness.com",
    startDate: "2024-10-11",
    tags: [
      "Web Development",
      "Responsive Design",
      "Countdown Timer",
      "CSS Animations",
      "Event Website",
    ],
    screenshots: ["/projectImages/man1.webp", "/projectImages/man2.webp"],
    codeLink: "https://github.com/maxwellyoung/man",
  },
  {
    name: "Jeremy Blake Interactive Art Experience",
    status: "Completed",
    description:
      "An interactive digital art experience inspired by the captivating works of Jeremy Blake, a trailblazing artist known for blending vibrant visuals with abstract storytelling. ",
    longDescription:
      "This project is an interactive digital art experience inspired by the works of Jeremy Blake, an American digital artist known for his dynamic, abstract color field animations. Users can navigate through abstract, color-rich landscapes, interact with dynamic elements responding to mouse movements or touch, and experience fluid transitions blending and morphing colors in Blake's signature style.",
    link: "https://jeremy-blake.vercel.app/",
    codeLink: "https://github.com/maxwellyoung/jeremy-blake",
    startDate: "2023-01-15",
    tags: ["React", "Three.js", "WebGL"],
    screenshots: ["/projectImages/blake.webp", "/projectImages/blake2.webp"],
  },
  {
    name: "CineSync",
    status: "WIP",
    description: "An AI-powered movie discovery and recommendation platform.",
    longDescription:
      "CineSync is an AI-powered movie discovery and recommendation platform built with Next.js, React, Supabase, OpenAI, Clerk and TypeScript. It helps users find their next favorite movie based on their preferences and mood. Features include personalized movie recommendations, watchlist management, friend connections for sharing recommendations, responsive design with dark mode, and more.",
    startDate: "2023-04-01",
    tags: ["Next.js", "React", "AI", "TypeScript"],
    link: "https://cinesync-peach.vercel.app/",
    screenshots: [
      "/projectImages/cinesync1.webp",
      "/projectImages/cinesync2.webp",
      "/projectImages/cinesync3.webp",
    ],
  },
  {
    name: "Tanya Bardell-Young Portfolio",
    status: "WIP",
    description:
      "A portfolio website for my mother, interior designer and color consultant Tanya Bardell-Young.",
    longDescription:
      "This project is a portfolio website for Tanya Bardell-Young, showcasing her work in interior design and color consulting. The site features a clean, minimalist design with interactive elements and a focus on showcasing Tanya's projects. Built with Next.js and styled using Tailwind CSS, it offers a responsive and engaging user experience.",
    link: "https://tanya-zeta.vercel.app/",
    codeLink: "https://github.com/maxwellyoung/tanya",
    startDate: "2023-02-10",
    tags: ["Next.js", "Tailwind CSS", "React"],
    screenshots: ["/projectImages/tanya.webp"],
  },
  {
    name: "StudentView",
    status: "WIP",
    description:
      "A companion app for students with budgeting, note-taking, and mental well-being tools.",
    longDescription:
      "StudentView is designed to be a focused version of Notion for students, encompassing budgeting, study reflections, and mental well-being tools. The app features a modular layout with both dark and light themes based on system preferences. It includes sections for tracking budgeting, study reflections, and a meditation section. Future plans involve integrating daily inspirational quotes and more user customization options.",
    link: "https://www.studentview.app/",
    startDate: "2023-03-01",
    tags: ["React", "Next.js", "Tailwind CSS"],
    screenshots: [
      "/projectImages/StudentView.jpeg",
      "/projectImages/StudentView2.webp",
    ],
  },
  {
    name: "ResumeForge",
    status: "WIP",
    description:
      "An interactive resume builder showcasing user-centric design with dynamic features.",
    longDescription:
      "ResumeForge is an interactive resume builder designed to demonstrate the power of user-centric design with dynamic features. The platform allows users to create professional, eye-catching resumes through a simple, intuitive interface. Built with modern web technologies, it offers a seamless user experience. The project is a testament to my ability to create responsive and accessible web applications that cater to the needs of a diverse user base.",
    link: "https://resume-forge-ecru.vercel.app/",
    codeLink: "https://github.com/maxwellyoung/resume-forge",
    startDate: "2023-05-01",
    tags: ["React", "Next.js", "Tailwind CSS"],
    screenshots: ["/projectImages/ResumeForge.webp"],
  },
  {
    name: "Aesop E-commerce Marketing Site (Unofficial)",
    status: "Completed",
    description:
      "An unofficial example of a marketing site for Aesop, designed with a focus on clean aesthetics and user experience.",
    longDescription:
      "This project is an unofficial marketing site concept for Aesop. It showcases products with a clean, modern design that aligns with the brand's visual identity. The site includes a prominent hero image, a section highlighting featured products, and a fully responsive layout. It was developed using Next.js and styled with Tailwind CSS to ensure a smooth user experience on all devices.",
    link: "https://aesop-omega.vercel.app/",
    codeLink: "https://github.com/maxwellyoung/aesop",
    startDate: "2023-01-01",
    tags: ["Next.js", "Tailwind CSS", "React"],
  },
  {
    name: "Internal Dashboard for Spark New Zealand",
    status: "Completed",
    description:
      "A responsive UI for B2B Sales, built with React and Next.js to enhance team efficiency.",
    longDescription: `As a Data Intelligence UI Developer at Spark New Zealand from Nov 2022 to Apr 2023:
    • Designed and developed the front end of an internal dashboard application.
    • Translated PowerBI dashboard into Figma design, integrating machine learning algorithms.
    • Implemented front-end using React and Next.js, increasing productivity by 20%.
    • Collaborated with product team and stakeholders to ensure usability.
    • Conducted user testing to refine the UI.`,
    startDate: "2022-11-01",
    tags: ["React", "Next.js", "Figma", "UI/UX"],
  },
  {
    name: "Portfolio Website",
    status: "Completed",
    description:
      "A personal portfolio website to showcase my skills, projects, and experience.",
    longDescription:
      "My portfolio website is designed to provide an engaging and informative platform to showcase my skills, projects, and professional experience. Built with Next.js and Tailwind, the site features an interactive design, project showcases, and an upcoming blog section. The website also includes links to my social media profiles, providing multiple ways for potential employers and collaborators to reach out.",
    link: "https://dev.maxwellyoung.info/",
    codeLink: "https://github.com/maxwellyoung/dev.maxwellyoung.info",
    startDate: "2023-01-01",
    tags: ["Next.js", "Tailwind CSS", "React"],
  },
  {
    name: "Music Website",
    status: "Completed",
    description:
      "A personal website showcasing my music portfolio, projects, and achievements.",
    longDescription:
      "This is a personal site dedicated to showcasing my music portfolio, projects, and achievements. It features a comprehensive collection of my work, including albums, singles, and collaborations. Built with a focus on aesthetics and functionality, the site provides visitors with an immersive experience, including lyrics, album art, and music videos.",
    link: "https://music.maxwellyoung.info",
    codeLink: "https://github.com/maxwellyoung/music_maxwell",
    startDate: "2022-01-01",
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
];

interface ProjectsProps {
  initialFavourites?: string[];
}

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

function ProjectCard({
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
      className="relative overflow-hidden rounded-lg cursor-pointer group w-full mb-4 p-4 bg-white dark:bg-neutral-800 shadow-sm"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
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

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects[0]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const scrollDelay = 800; // Reduced from 1500 to 800 ms

  const nextProject = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (
        containerRef.current &&
        containerRef.current.contains(event.target as Node)
      ) {
        event.preventDefault();
        const currentTime = Date.now();

        if (currentTime - lastScrollTime > scrollDelay) {
          const delta = event.deltaY;
          if (Math.abs(delta) > 10) {
            // Reduced threshold from 100 to 50
            if (delta > 0) {
              nextProject();
            } else {
              prevProject();
            }
            setLastScrollTime(currentTime);
          }
        }
      }
    },
    [nextProject, prevProject, lastScrollTime, scrollDelay]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel]);

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
