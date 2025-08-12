"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { projects } from "@/lib/projects";
import { resume } from "@/data/resume";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ProjectItem } from "@/components/ProjectItem";
import type { Project } from "@/lib/types";
// import { FeaturedListMinimal } from "@/components/FeaturedListMinimal";

const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`section-fade-in ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <main className="page grid grid-cols-1 md:grid-cols-[96px_40ch_160px_1fr] md:gap-x-16 min-h-screen items-start py-16 md:py-24 px-4 md:px-0">
      <div className="left-column md:col-start-2 space-y-12">
        <section className="space-y-4 section-fade-in is-visible">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight">
            Rigorous interfaces. Built to outlast their stack.
            <br />
            <span className="text-muted">
              Based in Tāmaki Makaurau (Auckland), working with teams globally.
            </span>
          </h1>
        </section>

        <section
          id="previously"
          className="section-fade-in is-visible"
          style={{ transitionDelay: "100ms" }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            Previously
          </h2>
          <ul className="mt-2 list-none space-y-1 text-sm">
            {resume.experience.map((role) => (
              <li key={role.company}>
                {role.title}, {role.company}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="art-column md:col-start-3 mt-12 md:mt-0">
        <ul className="space-y-4">
          {featuredProjects.map((project: Project, index: number) => (
            <ProjectItem key={project.name} project={project} index={index} />
          ))}
        </ul>
        <div className="mt-4">
          <Link href="/projects" className="underline">
            See all projects
          </Link>
        </div>
      </div>
    </main>
  );
}
