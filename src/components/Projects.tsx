"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ProjectDialog from "./ProjectDialog";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Post Lecture (WIP)",
    description: "A notes-taking React Native app.",
    details:
      "A React Native app designed to assist in reinforcing the material covered in lectures. Technologies include React Native, Expo, and TypeScript. The focus is on user experience and interaction design.",
    url: "#",
  },
  {
    title: "Finance Tracker Dashboard (Planned)",
    description: "A finance tracker dashboard idea.",
    details:
      "A finance tracker dashboard to help manage and visualize personal finances. Built with Next.js, TypeScript, TailwindCSS, and Chart.js, focusing on clean, minimalistic design with intuitive data visualization.",
    url: "#",
  },
  {
    title: "Thom Haha Portfolio",
    description: "Simple portfolio site.",
    details:
      "A simple yet elegant portfolio site for the musician Thom Haha. Built with React, Next.js, and TailwindCSS. Features sleek design, smooth animations, and responsive layout.",
    url: "#",
  },
  {
    title: "Internal Dashboard App at Spark New Zealand",
    description: "Front-end dashboard application.",
    details:
      "A front-end dashboard application for marketers at Spark New Zealand. Designed with Figma and developed using React and Next.js. Focus on professional design, user-centric features, and scalable architecture.",
    url: "#",
  },
  {
    title: "Noid | Twitter Clone",
    description: "A Twitter clone.",
    details:
      "A Twitter clone created to learn about TRPC and Clerk Auth. Technologies include Next.js, TypeScript, Clerk Auth, TailwindCSS, and TRPC. Highlights include robust functionality and authentication.",
    url: "#",
  },
];

const Projects = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openDialog = (project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <div id="projects" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-2xl font-bold">Projects</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{project.description}</p>
                  <button
                    onClick={() => openDialog(project)}
                    className="mt-4 block text-red-500 hover:underline"
                  >
                    View More
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectDialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default Projects;
