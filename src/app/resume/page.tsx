import { resume } from "@/data/resume";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ResumePage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="font-display text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
          {resume.name}
        </h1>
        <p className="text-neutral-400">{resume.title}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-400">
          <a
            href={`mailto:${resume.contact.email}`}
            className="hover:text-neutral-200"
          >
            {resume.contact.email}
          </a>
          <Link
            href={resume.contact.website}
            className="hover:text-neutral-200"
          >
            Website
          </Link>
          <Link href={resume.contact.github} className="hover:text-neutral-200">
            GitHub
          </Link>
          <Link
            href={resume.contact.linkedin}
            className="hover:text-neutral-200"
          >
            LinkedIn
          </Link>
        </div>
      </header>

      <Section title="Experience">
        {resume.experience.map((role) => (
          <div key={role.company} className="mb-6">
            <h3 className="font-semibold text-neutral-200">{role.title}</h3>
            <p className="text-sm text-neutral-400">
              {role.company} · {role.date}
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-neutral-300">
              {role.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Education">
        {resume.education.map((edu) => (
          <div key={edu.institution} className="mb-4">
            <h3 className="font-semibold text-neutral-200">{edu.degree}</h3>
            <p className="text-sm text-neutral-400">
              {edu.institution} · {edu.date}
            </p>
          </div>
        ))}
      </Section>

      <Section title="Stack">
        {resume.stack.map((techSection) => (
          <div key={techSection.title} className="mb-6">
            <h3 className="font-semibold text-neutral-200">
              {techSection.title}
            </h3>
            <ul className="mt-2 list-disc list-inside space-y-1 text-neutral-300">
              {techSection.items.map((item) => (
                <li key={item.name}>
                  <span className="font-medium">{item.name}</span> —{" "}
                  {item.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Competencies">
        {resume.competencies.map((skillCat) => (
          <div key={skillCat.category} className="mb-4">
            <h3 className="font-semibold text-neutral-200">
              {skillCat.category}
            </h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {skillCat.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h2 className="font-display text-xl font-semibold text-neutral-200 mb-4">
      {title}
    </h2>
    {children}
  </section>
);
