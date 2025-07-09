import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/lib/projectsData";

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
    <div className="w-full">
      <ScrollArea
        className="h-[calc(100vh-200px)] lg:h-[700px] w-full pr-4"
        ref={scrollAreaRef}
      >
        <div className="space-y-4 py-2">
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
