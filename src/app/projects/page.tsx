"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Carousel } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
      "- Designed and developed the front end of an internal dashboard for Spark's marketing team.\n- Translated an existing PowerBI dashboard into a Figma design, incorporating machine learning data.\n- Implemented with React and Next.js, boosting productivity by 20%.\n- Collaborated with product team and stakeholders for alignment and usability.\n- Conducted user testing and refined UI based on feedback.\n- Note: Unable to show images or a link as this project is internal to the company.",
  },
  {
    name: "Post Lecture",
    status: "WIP",
    description:
      "A web application for capturing, organizing, and reviewing lecture notes.",
    longDescription:
      "Post Lecture is an innovative tool for students and educators to enhance the academic experience. It supports real-time note-taking, organization by subject and topic, and integration of multimedia resources. Features include collaborative note-taking, personalized study schedules, and intelligent search, making all learning materials easily accessible and reviewable, fostering an interactive and engaging learning environment.",
  },
  {
    name: "Portfolio Website",
    status: "Completed",
    description:
      "A personal portfolio website to showcase my skills, projects, and experience.",
    longDescription:
      "My portfolio website is designed to provide an engaging and informative platform to showcase my skills, projects, and professional experience. Built with Next.js and Tailwind, the site features an interactive design, project showcases, and an upcoming blog section. The website also includes  links to my social media profiles, providing multiple ways for potential employers and collaborators to reach out.",
    screenshots: [],
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
    screenshots: [],
    link: "https://music.maxwellyoung.info",
    codeLink: "https://github.com/maxwellyoung/music_maxwell",
  },
];

export default function Page() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "border-green-500 text-green-500 bg-zinc-50 dark:bg-zinc-800";
      case "WIP":
        return "border-yellow-500 text-yellow-500 bg-zinc-50 dark:bg-zinc-800";
      case "Idea":
        return "border-blue-500 text-blue-500 bg-zinc-50 dark:bg-zinc-800";
      default:
        return "border-gray-500 text-gray-500 bg-zinc-50 dark:bg-zinc-800";
    }
  };

  const filteredProjects =
    selectedStatus === "All"
      ? projects
      : projects.filter((project) => project.status === selectedStatus);

  return (
    <div className="min-h-screen fade-in dark:text-zinc-100 text-zinc-800 p-4 md:p-8 flex flex-col justify-between ">
      <main className="max-w-2xl  mx-auto space-y-8 overflow-y-auto">
        <ToggleGroup
          type="single"
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value || "All")}
          className="flex justify-center space-x-4 mb-4"
        >
          <ToggleGroupItem value="All">All</ToggleGroupItem>
          <ToggleGroupItem value="Completed">Completed</ToggleGroupItem>
          <ToggleGroupItem value="WIP">WIP</ToggleGroupItem>
          <ToggleGroupItem value="Idea">Idea</ToggleGroupItem>
        </ToggleGroup>

        <ScrollArea className="p-6 space-y-6 ">
          {filteredProjects.map((project, index) => (
            <div key={index} className="w-full space-y-4 mb-4">
              <Dialog
                open={selectedProject === project}
                onOpenChange={() =>
                  setSelectedProject(
                    selectedProject === project ? null : project
                  )
                }
              >
                <DialogTrigger asChild>
                  <div className="p-6 rounded-lg shadow-md dark:bg-zinc-800 bg-zinc-100 dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-all duration-200 w-full cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2>{project.name}</h2>
                        <p className="text-base leading-relaxed text-zinc-400 mb-4">
                          {project.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getStatusStyles(
                          project.status
                        )} font-medium ml-4`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </DialogTrigger>
                {selectedProject && (
                  <DialogContent className="p-8 dark:bg-zinc-800 bg-zinc-100 rounded-lg dark:text-zinc-100 text-zinc-800 border-none w-full">
                    <DialogTitle>{selectedProject.name}</DialogTitle>
                    <Separator />
                    {selectedProject.longDescription && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-[4fr,1fr] gap-4">
                          <ScrollArea className="col-span-2 md:col-span-1">
                            <DialogDescription className="dark:text-zinc-100 text-zinc-800 leading-relaxed whitespace-pre-line">
                              {selectedProject.longDescription}
                            </DialogDescription>
                          </ScrollArea>
                          <div className="col-span-2 md:col-span-1 flex flex-col justify-start">
                            <div className="flex justify-end items-start">
                              <Badge
                                variant="outline"
                                className={`${getStatusStyles(
                                  selectedProject.status
                                )} font-medium`}
                              >
                                {selectedProject.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-4 mt-6">
                          {selectedProject.link && (
                            <Button
                              variant="ghost"
                              className="dark:text-zinc-100 dark:bg-zinc-600 text-zinc-100 hover:bg-zinc-500 dark:hover:bg-zinc-500 hover:text-zinc-100 bg-zinc-600"
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
                              variant="ghost"
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
                      </div>
                    )}
                    {selectedProject.screenshots &&
                      selectedProject.screenshots.length > 0 && (
                        <Carousel className="mt-6">
                          {selectedProject.screenshots.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt={`Screenshot ${idx + 1}`}
                            />
                          ))}
                        </Carousel>
                      )}
                  </DialogContent>
                )}
              </Dialog>
            </div>
          ))}
        </ScrollArea>
      </main>
    </div>
  );
}
