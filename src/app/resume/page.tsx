"use client";

import Image from "next/image";
import { useState } from "react";
import { resumeData } from "@/lib/resumeData";
import { ExperienceItem } from "@/components/ExperienceItem";
import { EducationItem } from "@/components/EducationItem";
import { AnimatedLink } from "@/components/ui/animated-link";
import { SiteFooter } from "@/components/SiteFooter";

export default function Resume() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const { downloadResumePDF } = await import("@/lib/generateResumePDF");
      await downloadResumePDF();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main id="main-content" className="relative w-full max-w-2xl mx-auto p-6">
      <header className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div className="flex min-w-0 items-center gap-4">
          <Image
            className="flex-shrink-0 rounded-full"
            src="/profile_work.webp"
            alt="Portrait of Maxwell Young"
            width={56}
            height={56}
            sizes="56px"
            priority
          />
          <div className="min-w-0">
            <h1 className="text-xl font-medium text-foreground">
              {resumeData.name}
            </h1>
            <p className="text-sm text-muted-foreground">{resumeData.title}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {resumeData.profile}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>{resumeData.contact.location}</span>
              <AnimatedLink
                href={`mailto:${resumeData.contact.email}`}
                external
              >
                Email
              </AnimatedLink>
              <AnimatedLink
                href={`https://${resumeData.contact.github}`}
                external
              >
                GitHub
              </AnimatedLink>
              <AnimatedLink
                href={`https://${resumeData.contact.linkedin}`}
                external
              >
                LinkedIn
              </AnimatedLink>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex min-h-11 items-center whitespace-nowrap rounded-sm text-xs text-muted-foreground underline decoration-muted-foreground/30 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50"
        >
          {isDownloading ? "Generating…" : "Download PDF"}
        </button>
      </header>

      <section className="mb-10" aria-labelledby="experience-heading">
        <h2
          id="experience-heading"
          className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
        >
          Experience
        </h2>
        {resumeData.experience.map((item, index) => (
          <ExperienceItem
            key={`${item.title}-${index}`}
            title={item.title}
            company={item.company}
            companyHref={item.companyHref}
            date={item.date}
            responsibilities={item.responsibilities}
            metric={item.metric}
            summary={item.summary}
          />
        ))}
      </section>

      <section className="mb-10" aria-labelledby="selected-work-heading">
        <h2
          id="selected-work-heading"
          className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
        >
          Selected Work
        </h2>
        <div className="divide-y divide-border/60 border-y border-border/60">
          {resumeData.selectedWork.map((work) => (
            <article key={work.href} className="py-4">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="text-sm font-medium text-foreground">
                  <AnimatedLink href={work.href} external>
                    {work.name}
                  </AnimatedLink>
                  <span className="font-normal text-muted-foreground">
                    {" "}
                    · {work.descriptor}
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground">{work.date}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {work.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Education
        </h2>
        {resumeData.education.map((item, index) => (
          <EducationItem
            key={`${item.degree}-${index}`}
            degree={item.degree}
            institution={item.institution}
            institutionHref={item.institutionHref}
            date={item.date}
          />
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Skills
        </h2>
        <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {resumeData.skills.map((skill) => (
            <article key={skill.category}>
              <h3 className="resume-label">{skill.category}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {skill.items.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
