"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Resume() {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const titleVariants = {
    initial: { opacity: 1 },
    hover: { opacity: 0 },
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full p-6 flex flex-col items-center fade-in">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="block text-3xl font-medium dark:text-zinc-100 text-zinc-800 font-roboto-mono">
              Maxwell Young
            </span>
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.span
                className="block text-xl font-light dark:text-zinc-400 text-zinc-600 font-roboto-mono"
                variants={titleVariants}
                initial="initial"
                transition={{ duration: 0.3 }}
              >
                Design Engineer
              </motion.span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/MaxwellYoung_CV.pdf" legacyBehavior>
              <a
                className="flex items-center px-2 md:px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-100 bg-opacity-15 bg-[#EA2D42] border border-[#EA2D42] rounded-md hover:bg-transparent hover:text-[#EA2D42] transition duration-300 ease-in-out transform hover:scale-105"
                download
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <span className="hidden md:inline ml-2 dark:text-zinc-300">
                  Download Resume
                </span>
              </a>
            </Link>
            <div
              className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setIsImageEnlarged(true)}
            >
              <Image
                className="w-18 h-18 rounded-full shadow-md"
                src="/profile_work.webp"
                alt="Profile"
                width={72}
                height={72}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative">
              <span className="block text-xs font-normal dark:text-zinc-400 text-zinc-800 font-inter uppercase tracking-wide mb-2">
                Experience
              </span>
            </div>
            <div className="mb-4">
              <div>
                <span className="block text-sm font-bold dark:text-zinc-100 text-zinc-800 font-inter">
                  Full Stack Web Developer
                </span>
              </div>
              <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter">
                Freelance
              </span>
              <span className="block text-xs font-normal dark:text-zinc-500 text-zinc-400 font-inter">
                Apr 2023 - Present, Auckland
              </span>
              <ul className="list-disc pl-5 mt-2 text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter">
                <li>
                  Developed a number of portfolio sites for designers &
                  musicians, enhancing user experience with responsive designs
                  and dynamic animations using Tailwind and Framer Motion.
                </li>
                <li>
                  Utilised Next.js to ensure high performance across devices,
                  constantly exploring new front-end technologies to stay ahead
                  of industry trends.
                </li>
                <li>
                  Developing personal finance tracker and study assistant mobile
                  apps using React Native and Expo, focusing on improving
                  personal productivity and financial management.
                </li>
                <li>
                  Committed to continuous learning through online courses,
                  workshops, and collaboration with other developers to upskill
                  in various fields.
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <div>
                <span className="block text-sm font-bold dark:text-zinc-100 text-zinc-800 font-inter mt-4">
                  Data Intelligence UI Developer
                </span>
              </div>
              <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter">
                Spark New Zealand
              </span>
              <span className="block text-xs font-normal dark:text-zinc-500 text-zinc-400 font-inter">
                Nov 2022 - Apr 2023, Auckland
              </span>
              <ul className="list-disc pl-5 mt-2 text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter">
                <li>
                  Designed and developed the front end of an internal dashboard
                  application.
                </li>
                <li>
                  Translated PowerBI dashboard into Figma design, integrating
                  machine learning algorithms.
                </li>
                <li>
                  Implemented front-end using React and Next.js, increasing
                  productivity by 20%.
                </li>
                <li>
                  Collaborated with product team and stakeholders for usability.
                </li>
                <li>Conducted user testing to refine the UI.</li>
              </ul>
            </div>
            <div className="relative">
              <span className="block text-xs font-normal  text-zinc-800 dark:text-zinc-400 font-inter uppercase tracking-wide mb-2">
                Education
              </span>
            </div>
            <div className="mb-4">
              <div>
                <span className="block text-sm font-bold  text-zinc-800 dark:text-zinc-100 font-inter">
                  B.Sc. Computer and Information Sciences (Software Development
                  and Data Science)
                </span>
              </div>
              <span className="block text-sm font-normal  text-zinc-600 dark:text-zinc-400 font-inter">
                Auckland University of Technology
              </span>
              <span className="block text-xs font-normal  text-zinc-400 dark:text-zinc-500 font-inter">
                2024 - 2026 (Expected), Auckland
              </span>
            </div>
            <div>
              <div>
                <span className="block text-sm font-bold dark:text-zinc-100 text-zinc-800 font text-zinc-800-inter mt-4">
                  Certificate - Level 6 Web Development Training Scheme
                </span>
              </div>
              <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter">
                Dev Academy Aotearoa
              </span>
              <span className="block text-xs font-normal dark:text-zinc-500 text-zinc-400 font-inter">
                2022, Wellington
              </span>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="mt-8 lg:mt-0">
              <div>
                <span className="block text-sm font-bold dark:text-zinc-400 text-zinc-600 font-inter">
                  Contact Information
                </span>
              </div>
              <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter mt-2">
                <a
                  href="mailto:maxtheyoung@gmail.com"
                  className="hover:underline transition-all duration-200 ease-in-out"
                >
                  maxtheyoung@gmail.com
                </a>
                <br />
                Auckland
              </span>
            </div>
            <div className="mt-8">
              <div>
                <span className="block text-sm font-bold dark:text-zinc-400 text-zinc-600 font-inter">
                  Web Development
                </span>
              </div>
              <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter mt-2">
                Full Stack Web Development
                <br />
                UI/UX Design
                <br />
                Responsive Web Design
              </span>
            </div>
            <div className="mt-8">
              <div>
                <span className="block text-sm font-bold dark:text-zinc-400 text-zinc-600 font-inter">
                  Collaboration & Methodologies
                </span>
              </div>
              <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter mt-2">
                Agile and Scrum Methodologies
                <br />
                Cross-functional Team Collaboration
              </span>
            </div>
            <div className="mt-8">
              <div>
                <span className="block text-sm font-bold dark:text-zinc-400 text-zinc-600 font-inter">
                  Tools & Technologies
                </span>
              </div>
              <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter mt-2">
                Database Management
                <br />
                Cloud Services (AWS, Azure)
                <br />
                Automated Testing (Jest)
                <br />
                Git & Version Control
                <br />
                TypeScript & JavaScript
                <br />
                React, React Native, Next.js
                <br />
                PHP
                <br />
                C, C++, Go
                <br />
                CSS, Tailwind
                <br />
                Figma
                <br />
                Adobe Creative Suite
                <br />
                OpenAI Integration
                <br />
                WebGL, Three.js
              </span>
            </div>
            <div className="mt-8">
              <div>
                <span className="block text-sm font-bold dark:text-zinc-400 text-zinc-600 font-inter">
                  Social
                </span>
              </div>
              <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter underline mt-2">
                <a href="https://dev.maxwellyoung.info/">
                  dev.maxwellyoung.info
                </a>
                <br />
                <a href="https://github.com/maxwellyoung">
                  github.com/maxwellyoung
                </a>
                <br />
                <a href="https://www.linkedin.com/in/maxwell-young-a55032125/">
                  linkedin.com/in/maxwellyoung
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isImageEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
            onClick={() => setIsImageEnlarged(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/profile_work.webp"
                alt="Profile"
                width={300}
                height={300}
                className="rounded-full shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
