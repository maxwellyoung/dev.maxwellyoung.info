"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../components/ui/dialog";

interface Project {
  title: string;
  description: string;
  details: string;
  screenshots: string[];
}

const projectsData: Project[] = [
  {
    title: "Finance Tracker App",
    description:
      "Developed using React Native and Expo to track expenses and monitor weekly balance, improving personal financial management for users.",
    details:
      "The Finance Tracker App allows users to input their daily expenses and categorize them. Users can view their weekly spending and balance, set budget goals, and get notifications for overspending. The app uses React Native for the frontend, Expo for ease of development and deployment, and integrates with a backend service to store user data securely.",
    screenshots: [
      "/path/to/finance-tracker1.png",
      "/path/to/finance-tracker2.png",
    ],
  },
  {
    title: "Noid (Twitter Clone)",
    description:
      "A real-time messaging app built with React, Redux, and Firebase, featuring authentication and pagination.",
    details:
      "Noid is a Twitter clone designed to provide real-time messaging and social interaction. It features user authentication using Firebase Auth, state management with Redux, and real-time data updates using Firebase Firestore. The app supports pagination for efficient data handling and includes features like tweet creation, liking, and commenting.",
    screenshots: ["/path/to/noid1.png", "/path/to/noid2.png"],
  },
  {
    title: "Calendar React Native App",
    description:
      "Built with React Native and Expo for seamless schedule management.",
    details:
      "The Calendar React Native App helps users manage their schedules efficiently. Users can create, edit, and delete events, set reminders, and view their schedules in daily, weekly, or monthly views. The app uses React Native for the frontend and integrates with various calendar APIs for syncing events across different platforms.",
    screenshots: ["/path/to/calendar1.png", "/path/to/calendar2.png"],
  },
  {
    title: "Internal Dashboard for Spark New Zealand",
    description:
      "Enhanced B2B Sales team's efficiency with a responsive UI built in React and Next.js.",
    details:
      "The Internal Dashboard for Spark New Zealand was designed to streamline the workflow of the B2B sales team. Built with React and Next.js, the dashboard provides real-time analytics, sales performance tracking, and customer management tools. It integrates with internal APIs and databases to fetch and display data dynamically, significantly improving the team's productivity and decision-making process.",
    screenshots: ["/path/to/dashboard1.png", "/path/to/dashboard2.png"],
  },
  {
    title: "Portfolio Site for Thom Haha",
    description:
      "A portfolio site for musician Thom Haha, showcasing his work and music.",
    details:
      "The Portfolio Site for Thom Haha is a visually appealing and interactive platform designed to showcase Thom Haha's music and artistic projects. Built with React, the site features a clean, modern design with sections for bio, music, videos, and upcoming events. It also includes an integrated music player and links to streaming platforms.",
    screenshots: ["/path/to/thom-haha1.png", "/path/to/thom-haha2.png"],
  },
  {
    title: "PostLecture Understanding Review App",
    description:
      "An app to help students review and understand lecture content, built with React Native and Expo.",
    details:
      "The PostLecture Understanding Review App is designed to aid students in reviewing and understanding lecture content. The app allows students to take notes, create flashcards, and set reminders for revision. Built with React Native and Expo, it features a user-friendly interface and integrates with educational APIs to fetch supplementary materials and resources.",
    screenshots: ["/path/to/postlecture1.png", "/path/to/postlecture2.png"],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div
      id="projects"
      className="min-h-screen bg-[#111110] text-white p-6 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold font-robotoMono mb-8">Projects</h2>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="mt-2 text-gray-400">{project.description}</p>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setSelectedProject(project)}
                >
                  More Info
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{selectedProject?.title}</DialogTitle>
                <DialogDescription>
                  {selectedProject?.details}
                </DialogDescription>
                {selectedProject?.screenshots.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    className="mt-4 rounded-lg"
                  />
                ))}
                <DialogClose asChild>
                  <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105">
                    Close
                  </button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
