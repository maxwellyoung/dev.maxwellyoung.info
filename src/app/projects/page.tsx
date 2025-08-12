import { type Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Archive",
  description: "A selection of projects by Maxwell Young.",
};

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort((a, b) => {
    const aTime = a.startDate ? new Date(a.startDate).getTime() : 0;
    const bTime = b.startDate ? new Date(b.startDate).getTime() : 0;
    return bTime - aTime;
  });

  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="mx-auto w-full max-w-[var(--content-width)] px-4">
        <h1 className="font-display text-2xl font-medium tracking-[0.02em] mb-8">
          Projects
        </h1>
        <ul className="divide-y divide-[var(--surface)]">
          {sortedProjects.map((project) => (
            <li key={project.slug} className="py-4">
              <a
                href={`/projects/${project.slug}`}
                className="project-link inline-block"
              >
                {project.name}
              </a>
              <div className="mt-1 text-sm text-muted">
                {project.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
