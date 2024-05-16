import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

// Define the props type for ProjectDialog
type ProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    details: string;
    url: string;
  };
};

const ProjectDialog = ({ isOpen, onClose, project }: ProjectDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 m-auto max-w-lg p-8"
        >
          <Dialog.Content className="rounded-lg bg-white p-8">
            <Dialog.Title className="text-xl font-bold">
              {project.title}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-700">
              {project.description}
            </Dialog.Description>
            <div className="mt-4">{project.details}</div>
            <a
              href={project.url}
              className="mt-4 block text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
            <button
              onClick={onClose}
              className="mt-4 block text-red-500 hover:underline"
            >
              Close
            </button>
          </Dialog.Content>
        </motion.div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProjectDialog;
