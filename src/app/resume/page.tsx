"use client";

import Image from "next/image";
import { useState } from "react";
import { resumeData } from "@/lib/resumeData";
import { ExperienceItem } from "@/components/ExperienceItem";
import { EducationItem } from "@/components/EducationItem";
import { SkillCategory } from "@/components/SkillCategory";
import { AnimatedLink } from "@/components/ui/animated-link";
import { downloadResumePDF } from "@/lib/generateResumePDF";
import { CopyEmail } from "@/components/CopyEmail";

export default function Resume() {
  const [openSkillIndex, setOpenSkillIndex] = useState<number | null>(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadResumePDF();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Maxwell Young",
            jobTitle: "Design Engineer",
            url: "https://dev.maxwellyoung.info/",
            email: "mailto:maxwell@ninetynine.digital",
            sameAs: [
              "https://github.com/maxwellyoung",
              "https://www.linkedin.com/in/maxwell-young-a55032125/",
            ],
          }),
        }}
      />

      <header className="flex items-start justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full"
            src="/profile_work.webp"
            alt="Portrait of Maxwell Young"
            width={56}
            height={56}
            sizes="56px"
          />
          <div>
            <h1 className="text-xl font-medium text-foreground">
              {resumeData.name}
            </h1>
            <p className="text-sm text-muted-foreground">{resumeData.title}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {resumeData.profile}
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-foreground/60 transition-colors disabled:opacity-50"
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
        {resumeData.skills.map((skill, index) => (
          <SkillCategory
            key={`${skill.category}-${index}`}
            category={skill.category}
            items={skill.items}
            compact
            collapsible
            expanded={openSkillIndex === index}
            onToggle={() =>
              setOpenSkillIndex((prev) => (prev === index ? null : index))
            }
          />
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Contact
        </h2>
        <div className="text-sm text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <AnimatedLink href={`mailto:${resumeData.contact.email}`} external>
              {resumeData.contact.email}
            </AnimatedLink>
            <CopyEmail email={resumeData.contact.email} showEmail={false} />
          </div>
          <p>{resumeData.contact.location}</p>
          <div className="flex gap-4 pt-2">
            {resumeData.socials.map((social, index) => (
              <AnimatedLink
                key={`${social.name}-${index}`}
                href={social.url}
                external
              >
                {social.name}
              </AnimatedLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
