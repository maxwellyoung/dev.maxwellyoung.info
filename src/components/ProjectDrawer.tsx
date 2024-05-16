import React from "react";
import { Drawer, DrawerContent, DrawerOverlay } from "./ui/drawer";
import { motion } from "framer-motion";

interface ProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    details: string;
    url: string;
  };
}

const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerOverlay className="fixed inset-0 bg-black opacity-30" />
      <DrawerContent
        as={motion.div}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-0 w-4/5 max-w-md bg-white p-8 shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">{project.title}</h2>
        <p className="mb-4">{project.description}</p>
        <p className="mb-4">{project.details}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Project
        </a>
        <button
          onClick={onClose}
          className="mt-4 rounded bg-gray-800 px-4 py-2 text-white"
        >
          Close
        </button>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectDrawer;
