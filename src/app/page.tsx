"use client";

import Link from "next/link";
import Resume from "./resume/page";
import ProjectsShowcase from "./projects/page";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const titleVariants = {
    initial: { opacity: 1, y: 0 },
    hover: { opacity: 0, y: -20 },
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen dark:text-white text-zinc-800 p-4 md:p-8 flex flex-col justify-between">
      <main className="max-w-2xl mx-auto text-zinc-300 space-y-8 overflow-y-auto">
        <section className="flex flex-col justify-center items-left min-h-screen space-y-8 p-4 md:p-8">
          <header className="mb-12">
            <a
              href="/"
              className="text-xl glint dark:text-zinc-200 text-zinc-800 font-medium"
            >
              Maxwell Young
            </a>
            <div
              className="relative h-8"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.p
                className="text-xl font-light dark:text-zinc-400 text-zinc-500 absolute"
                variants={titleVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                transition={{ duration: 0.3 }}
              >
                Design Engineer
              </motion.p>
              <motion.p
                className="text-xl font-light dark:text-zinc-400 text-zinc-500 absolute"
                variants={subtitleVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                transition={{ duration: 0.3 }}
              >
                Ideation to Implementation
              </motion.p>
            </div>
          </header>

          <div className="leading-relaxed">
            <h2 className="font-medium mb-6 dark:text-zinc-300 text-zinc-800">
              Today
            </h2>
            <p className="dark:text-zinc-400 text-zinc-500">
              I am currently studying for a Bachelor of Computer Science at
              Auckland University of Technology, majoring in Software
              Development and Data Science.
            </p>
            <p className="dark:text-zinc-400 text-zinc-500">
              I&apos;m passionate about making software simple with intention
              and principles to elevate user experiences and solve everyday
              issues.
            </p>
            <p className="dark:text-zinc-400 text-zinc-500">
              As the founder of{" "}
              <Link
                href={"https://ninetynine.digital/"}
                target="_blank"
                className="underline hover:dark:text-zinc-300"
              >
                ninetynine digital
              </Link>
              , I am developing a number of applications for people and for my
              own education.
            </p>
          </div>

          <div className="leading-relaxed">
            <h2 className="font-medium mb-6 dark:text-zinc-300 text-zinc-800">
              Previously
            </h2>
            <p className="dark:text-zinc-400 text-zinc-500">
              I&apos;ve previously been a UI Developer at Spark New Zealand and
              graduated from the web development bootcamp Dev Academy Aotearoa.
            </p>
          </div>

          <div className="leading-relaxed">
            <h2 className="font-medium mb-6 dark:text-zinc-300 text-zinc-800">
              More
            </h2>
            <p className="dark:text-zinc-400 text-zinc-500">
              You can see my work{" "}
              <Link
                href="#projects"
                className="underline hover:dark:text-zinc-300"
              >
                here,
              </Link>{" "}
              my resume{" "}
              <Link
                href="#resume"
                target="_blank"
                className="underline hover:dark:text-zinc-300"
              >
                here
              </Link>
              , & more of my code on{" "}
              <Link
                href="https://github.com/maxwellyoung"
                target="_blank"
                className="underline hover:dark:text-zinc-300"
              >
                GitHub
              </Link>
              .
            </p>
          </div>
        </section>
        <section id="projects">
          <ProjectsShowcase />
        </section>
        <section id="resume">
          <Resume />
        </section>
      </main>
    </div>
  );
}
