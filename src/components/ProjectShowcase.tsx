import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { ProjectShowcaseCard } from "@/components/ProjectShowcaseCard";

type Props = {
  items?: Project[];
};

export function ProjectShowcase({ items }: Props) {
  const featured = (items ?? projects)
    .filter((p) => p.featured)
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  return (
    <section className="section-fade-in is-visible">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {featured.map((p) => (
          <ProjectShowcaseCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
