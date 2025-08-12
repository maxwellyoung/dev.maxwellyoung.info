import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";
import { Marquee } from "@/components/Marquee";
import { CaseIntro } from "@/components/CaseIntro";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen py-16 md:py-24">
      <article className="mx-auto w-full max-w-[var(--content-width)] px-4 space-y-8">
        <CaseIntro project={project} />
        {project.tags && project.tags.length > 0 && (
          <Marquee items={project.tags} className="-mt-4" />
        )}

        {project.longDescription && (
          <div className="space-y-4 text-neutral-300">
            <p>{project.longDescription}</p>
          </div>
        )}

        {(project.links?.live ||
          project.links?.repo ||
          project.links?.video) && (
          <div className="flex flex-wrap gap-4 text-sm">
            {project.links?.live && (
              <Link
                href={project.links.live}
                target="_blank"
                className="underline"
              >
                View Live
              </Link>
            )}
            {project.links?.repo && (
              <Link
                href={project.links.repo}
                target="_blank"
                className="underline"
              >
                View Code
              </Link>
            )}
            {project.links?.video && (
              <Link
                href={project.links.video}
                target="_blank"
                className="underline"
              >
                Watch Demo
              </Link>
            )}
          </div>
        )}

        {project.screenshots && (
          <div className="space-y-4">
            {project.screenshots.map((src) => (
              <figure key={src}>
                <Image
                  src={src}
                  alt={project.name}
                  width={1200}
                  height={900}
                  className="w-full rounded-sm object-cover"
                />
              </figure>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
