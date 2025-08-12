import type { Project } from "@/lib/projects";

type CaseIntroProps = {
  project: Project;
};

export function CaseIntro({ project }: CaseIntroProps) {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr] gap-4">
        <h1 className="font-display text-3xl font-medium tracking-[0.02em]">
          {project.name}
        </h1>
        <p className="text-muted max-w-prose">{project.description}</p>
      </div>
      <div className="mt-6 flex items-center gap-3 text-xs tracking-[0.08em] text-muted">
        {project.role && <span>{project.role}</span>}
        {project.stack && <span>· {project.stack.join(" / ")}</span>}
        {project.client && <span>· {project.client}</span>}
      </div>
      <div className="mt-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted">
        <span>Scroll</span>
        <span className="inline-block h-px w-12 bg-[var(--surface)]" />
      </div>
    </section>
  );
}
