import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

interface ProjectListProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project, index: number) => void;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}

export function ProjectList({
  projects,
  selectedProject,
  onSelectProject,
  scrollAreaRef,
}: ProjectListProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <ScrollArea className="w-full h-full" ref={scrollAreaRef}>
        <div className="space-y-4 p-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              isSelected={selectedProject?.name === project.name}
              onClick={() => onSelectProject(project, index)}
              data-project-index={index}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
