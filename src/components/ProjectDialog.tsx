import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog";
import { motion } from "framer-motion";

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    details: string;
    url: string;
  };
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
      <DialogContent
        as={motion.div}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-8 shadow-lg"
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
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
