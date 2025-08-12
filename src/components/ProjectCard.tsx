import Image from "next/image";
import type { Project } from "@/lib/projects";
import type { HTMLAttributes } from "react";

type ProjectCardProps = {
  project: Project;
  isSelected?: boolean;
  onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

export function ProjectCard({
  project,
  isSelected,
  onClick,
  ...rest
}: ProjectCardProps) {
  const thumb = project.thumb || project.screenshots?.[0];

  return (
    <div
      className={`flex flex-col space-y-4 rounded-sm border bg-card text-card-foreground shadow-sm p-4 ${
        isSelected ? "ring-2 ring-foreground" : ""
      }`}
      onClick={onClick}
      {...rest}
    >
      {thumb && (
        <Image
          src={thumb}
          alt={`${project.name} screenshot`}
          width={400}
          height={225}
          className="rounded-sm opacity-90 object-cover"
        />
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        {project.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {project.description}
          </p>
        )}
        <div className="text-xs text-muted-foreground mt-3 space-y-1">
          {project.role && (
            <p>
              <span className="font-semibold">Role:</span> {project.role}
            </p>
          )}
          {project.stack && project.stack.length > 0 && (
            <p>
              <span className="font-semibold">Tech:</span>{" "}
              {project.stack.join(", ")}
            </p>
          )}
          {project.startDate && (
            <p>
              <span className="font-semibold">Year:</span>{" "}
              {new Date(project.startDate).getFullYear()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
