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

interface Project {
  name: string;
  status: string;
  description: string;
  longDescription?: string;
  screenshots?: string[];
  link?: string;
}

const projects: Project[] = [
  {
    name: "Rolodex",
    status: "Idea",
    description:
      "A React component for showcasing a portfolio of projects as a three.js rolodex.",
    longDescription:
      "Rolodex is a React component designed to present a portfolio of projects in an engaging three.js rolodex format. The top card provides a description of the project, while the bottom card features a screenshot. Hover effects add visual interest, and clicking on a card navigates to a detailed page about the project or the project application itself.",
    screenshots: [],
    link: "",
  },
  {
    name: "Noid (Twitter Clone)",
    status: "Completed",
    description:
      "A real-time messaging app built with React, Redux, Firebase, and Planetscale.",
    longDescription:
      "Noid is a Twitter clone that enables real-time messaging using a modern tech stack including React, Redux, Firebase, and Planetscale. The project aims to replicate key functionalities of Twitter, providing a platform for users to post updates, follow others, and engage in real-time conversations. Note: Currently unusable due to Planetscale removing the free plan.",
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
      "My portfolio website is designed to provide an engaging and informative platform to showcase my skills, projects, and professional experience. Built with Next.js and Tailwind, the site features an interactive design, project showcases, and a blog section. The website also includes a contact form and links to my social media profiles, providing multiple ways for potential employers and collaborators to reach out.",
    screenshots: [],
    link: "https://dev.maxwellyoung.info/",
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
  },
];

export default function Page() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "border-green-500 text-green-500";
      case "WIP":
        return "border-yellow-500 text-yellow-500";
      case "Idea":
        return "border-blue-500 text-blue-500";
      default:
        return "border-gray-500 text-gray-500";
    }
  };

  const filteredProjects =
    selectedStatus === "All"
      ? projects
      : projects.filter((project) => project.status === selectedStatus);

  return (
    <div className="min-h-screen  text-white p-4 md:p-8 flex flex-col justify-between ">
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
                  <div className="p-6 rounded-lg shadow-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-200 w-full cursor-pointer">
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
                  <DialogContent className="space-y-4 p-12 bg-zinc-800 rounded-lg text-white border-none w-full">
                    <DialogTitle className="font-medium">
                      {selectedProject.name}
                    </DialogTitle>
                    {selectedProject.longDescription && (
                      <ScrollArea className="space-y-6">
                        <DialogDescription className="text-white leading-relaxed whitespace-pre-line">
                          {selectedProject.longDescription}
                        </DialogDescription>
                      </ScrollArea>
                    )}
                    {selectedProject.screenshots &&
                      selectedProject.screenshots.length > 0 && (
                        <Carousel>
                          {selectedProject.screenshots.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt={`Screenshot ${idx + 1}`}
                            />
                          ))}
                        </Carousel>
                      )}
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Visit project
                      </a>
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
