"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { X } from "lucide-react";

interface Project {
  name: string;
  status: string;
  description: string;
  longDescription?: string;
  screenshots?: string[];
  link?: string;
  codeLink?: string;
}

const projects: Project[] = [
  {
    name: "Tanya Bardell-Young Portfolio",
    status: "WIP",
    description:
      "A portfolio website for interior designer and color consultant Tanya Bardell-Young.",
    longDescription:
      "This project is a portfolio website for Tanya Bardell-Young, showcasing her work in interior design and color consulting. The site features a clean, minimalist design with interactive elements and a focus on showcasing Tanya's projects. Built with Next.js and styled using Tailwind CSS, it offers a responsive and engaging user experience.",
    link: "https://tanya-zeta.vercel.app/",
    codeLink: "https://github.com/maxwellyoung/tanya",
  },
  {
    name: "StudentView",
    status: "WIP",
    description:
      "A companion app for students with budgeting, note-taking, and mental well-being tools.",
    longDescription:
      "StudentView is designed to be a focused version of Notion for students, encompassing budgeting, study reflections, and mental well-being tools. The app features a modular layout with both dark and light themes based on system preferences. It includes sections for tracking budgeting, study reflections, and a meditation section. Future plans involve integrating daily inspirational quotes and more user customization options.",
    link: "https://www.studentview.app/",
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
  },

  {
    name: "Rolodex",
    status: "Idea",
    description:
      "A React component for showcasing a portfolio of projects as a three.js rolodex.",
    longDescription:
      "Rolodex is a React component designed to present a portfolio of projects in an engaging three.js rolodex format. The top card provides a description of the project, while the bottom card features a screenshot. Hover effects add visual interest, and clicking on a card navigates to a detailed page about the project or the project application itself.",
  },
  {
    name: "Noid (Twitter Clone)",
    status: "Completed",
    description:
      "A real-time messaging app built with React, Redux, Firebase, and Planetscale.",
    longDescription:
      "Noid is a Twitter clone that enables real-time messaging using a modern tech stack including React, Redux, Firebase, and Planetscale. The project aims to replicate key functionalities of Twitter, providing a platform for users to post updates, follow others, and engage in real-time conversations. Note: Currently unusable due to Planetscale removing the free plan.",
    link: "https://noid.maxwellyoung.info",
    codeLink: "https://github.com/maxwellyoung/noid",
  },
  {
    name: "Internal Dashboard for Spark New Zealand",
    status: "Completed",
    description:
      "A responsive UI for B2B Sales, built with React and Next.js to enhance team efficiency.",
    longDescription:
      "- Designed and developed the front end of an internal dashboard for Spark's marketing team.\n- Translated an existing PowerBI dashboard into a Figma design, incorporating machine learning data.\n- Implemented with React and Next.js, boosting productivity by 20%.\n- Collaborated with the product team and stakeholders for alignment and usability.\n- Conducted user testing and refined UI based on feedback.\n- Note: Unable to show images or a link as this project is internal to the company.",
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
  },
  {
    name: "CodeMaster",
    status: "WIP",
    description:
      "An AI-powered coding practice tool to help users improve their programming skills.",
    longDescription:
      "CodeMaster is an AI-powered coding practice tool designed to help users enhance their programming skills through practice. Users can input coding questions, receive similar questions to practice on, and explore a library of example coding questions. The project leverages modern UI components for a polished user experience and supports multiple difficulty levels. The platform is built with React, Next.js, Tailwind, Supabase and OpenAI.",
    link: "https://code-master-kappa.vercel.app/",
    codeLink: "https://github.com/maxwellyoung/codemaster",
  },
];

export default function ProjectsShowcase() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const statusMatch =
        selectedStatus === "All" || project.status === selectedStatus;
      const searchMatch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return statusMatch && searchMatch;
    });
    setFilteredProjects(filtered);
  }, [selectedStatus, searchQuery]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white";
      case "WIP":
        return "bg-orange-500 text-white";
      case "Idea":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="relative w-full p-6 flex flex-col items-center fade-in">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-medium dark:text-zinc-100 text-zinc-800 font-roboto-mono">
              My Projects
            </h1>
            <p className="text-xl font-light dark:text-zinc-400 text-zinc-600">
              A showcase of my work
            </p>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <ToggleGroup
            type="single"
            value={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value || "All")}
            className="flex justify-start space-x-4"
          >
            <ToggleGroupItem value="All">All</ToggleGroupItem>
            <ToggleGroupItem value="Completed">Completed</ToggleGroupItem>
            <ToggleGroupItem value="WIP">WIP</ToggleGroupItem>
            <ToggleGroupItem value="Idea">Idea</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <motion.div layout className="space-y-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full mb-4"
                >
                  <Dialog
                    open={selectedProject === project}
                    onOpenChange={() =>
                      setSelectedProject(
                        selectedProject === project ? null : project
                      )
                    }
                  >
                    <DialogTrigger asChild>
                      <div className="p-6 rounded-lg shadow-md bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-300 w-full cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2 font-roboto-mono">
                              {project.name}
                            </h2>
                            <p className="text-sm font-normal text-neutral-600 dark:text-neutral-400">
                              {project.description}
                            </p>
                          </div>
                          <Badge
                            className={`${getStatusStyles(
                              project.status
                            )} text-xs px-2 py-1 rounded-full`}
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    </DialogTrigger>
                    {selectedProject && (
                      <DialogContent className="p-0 bg-white dark:bg-neutral-800 rounded-lg text-neutral-800 dark:text-neutral-100 border-none w-full max-w-3xl max-h-[90vh] overflow-hidden">
                        <div className="flex flex-col h-full">
                          <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-neutral-700">
                            <DialogTitle className="text-2xl font-bold font-roboto-mono">
                              {selectedProject.name}
                            </DialogTitle>
                            <DialogClose className="rounded-full p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                              <X className="h-6 w-6" />
                            </DialogClose>
                          </div>
                          <ScrollArea className="flex-grow p-6">
                            <DialogDescription className="text-base font-normal text-neutral-600 dark:text-neutral-400 mb-6">
                              {selectedProject.longDescription}
                            </DialogDescription>
                            <div className="flex flex-wrap gap-4">
                              {selectedProject.link && (
                                <Button
                                  variant="outline"
                                  className="text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                  onClick={() =>
                                    window.open(
                                      selectedProject.link,
                                      "_blank",
                                      "noopener noreferrer"
                                    )
                                  }
                                >
                                  Visit project
                                </Button>
                              )}
                              {selectedProject.codeLink && (
                                <Button
                                  variant="outline"
                                  className="text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                  onClick={() =>
                                    window.open(
                                      selectedProject.codeLink,
                                      "_blank",
                                      "noopener noreferrer"
                                    )
                                  }
                                >
                                  View code
                                </Button>
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </ScrollArea>
      </div>
    </div>
  );
}
