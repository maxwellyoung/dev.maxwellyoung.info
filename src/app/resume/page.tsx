"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { resumeData } from "@/lib/resumeData";
import { ExperienceItem } from "@/components/ExperienceItem";
import { EducationItem } from "@/components/EducationItem";
import { SkillCategory } from "@/components/SkillCategory";
import { AnimatedLink } from "@/components/ui/animated-link";
import { downloadResumePDF } from "@/lib/generateResumePDF";
import { downloadResumeATSPDF } from "@/lib/generateResumeATSPDF";
import { CopyEmail } from "@/components/CopyEmail";

export default function Resume() {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [openSkillIndex, setOpenSkillIndex] = useState<number | null>(0);
  const [isDownloading, setIsDownloading] = useState<"standard" | "ats" | null>(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleDownload = async (type: "standard" | "ats") => {
    setIsDownloading(type);
    setShowDownloadMenu(false);
    try {
      if (type === "ats") {
        await downloadResumeATSPDF();
      } else {
        await downloadResumePDF();
      }
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsDownloading(null);
    }
  };

  const titleVariants = {
    initial: { opacity: 1 },
    hover: { opacity: 0 },
  };

  const closeModal = useCallback(() => setIsImageEnlarged(false), []);

  useEffect(() => {
    if (!isImageEnlarged) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isImageEnlarged, closeModal]);

  // Close dropdown on click outside
  useEffect(() => {
    if (!showDownloadMenu) return;
    const handleClick = () => setShowDownloadMenu(false);
    // Delay to avoid immediate close on open click
    const timer = setTimeout(() => {
      window.addEventListener("click", handleClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleClick);
    };
  }, [showDownloadMenu]);

  // no-op

  return (
    <div className="relative w-full p-6 flex flex-col items-center">
      {/* JSON-LD structured data */}
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
      <div className="container-grid w-full">
        {/* header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-medium text-foreground font-roboto-mono">
              {resumeData.name}
            </h1>

            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.p
                className="text-xl font-light text-muted-foreground font-roboto-mono"
                variants={titleVariants}
                initial="initial"
                animate={
                  isHovered && !prefersReducedMotion ? "hover" : "initial"
                }
                transition={{ duration: 0.2 }}
              >
                {resumeData.title}
              </motion.p>
              {/* availability chip */}
              {resumeData?.availability && (
                <span className="inline-flex items-center px-2 py-1 mt-2 text-xs rounded-full border border-accent text-accent bg-accent/10">
                  {resumeData.availability}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* PDF download dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                disabled={!!isDownloading}
                aria-label="Download resume PDF"
                aria-expanded={showDownloadMenu}
                className="flex items-center px-2 md:px-4 py-2 text-sm font-medium text-foreground border border-accent rounded-md bg-accent/15 hover:bg-transparent hover:text-accent active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <svg
                    className="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                )}
                <span className="hidden md:inline ml-2">
                  {isDownloading ? "generating..." : "download"}
                </span>
                <svg
                  className="w-4 h-4 ml-1 hidden md:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              <AnimatePresence>
                {showDownloadMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-background border border-[hsl(var(--border))] rounded-md shadow-lg z-50"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => handleDownload("standard")}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-[hsl(var(--muted))] transition-colors"
                      >
                        <span className="font-medium text-foreground">Standard</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          Narrative format, design-forward
                        </span>
                      </button>
                      <button
                        onClick={() => handleDownload("ats")}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-[hsl(var(--muted))] transition-colors"
                      >
                        <span className="font-medium text-foreground">ATS-Optimized</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          Recruiter-friendly, keyword-rich
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setIsImageEnlarged(true)}
              className="cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent rounded-full hide-print"
              aria-label="Enlarge profile image"
            >
              <Image
                className="rounded-full shadow-md w-[72px] h-[72px]"
                src="/profile_work.webp"
                alt="Portrait of Maxwell Young"
                width={72}
                height={72}
                priority
              />
            </button>
          </div>
        </header>

        {/* body */}
        <div className="grid-12">
          {/* left / main */}
          <section className="col-span-12 lg:col-span-8 order-2 lg:order-1 max-w-prose" aria-labelledby="experience-heading">
            {/* Selected work strip removed to reduce redundancy with Projects page */}
            <div className="relative">
              <h2 id="experience-heading" className="resume-label">
                Experience
              </h2>
            </div>
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

            <div className="relative mt-8">
              <h2 className="resume-label" aria-label="Education">
                Education
              </h2>
            </div>
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

          {/* right / sidebar */}
          <aside className="col-span-12 lg:col-span-4 order-1 lg:order-2 lg:border-l lg:border-[hsl(var(--border))] lg:pl-6">
            <div className="mt-8 lg:mt-0">
              <div>
                <h2 className="resume-label" aria-label="Contact">
                  Contact
                </h2>
              </div>
              <dl className="mt-2 text-sm font-normal text-muted-foreground font-inter">
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex items-center gap-2">
                    <AnimatedLink
                      href={`mailto:${resumeData.contact.email}`}
                      external
                    >
                      {resumeData.contact.email}
                    </AnimatedLink>
                    <CopyEmail email={resumeData.contact.email} showEmail={false} />
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Location</dt>
                  <dd>{resumeData.contact.location}</dd>
                </div>
              </dl>
            </div>

            {[...resumeData.skills]
              .sort((a, b) =>
                a.category === "Also Familiar"
                  ? 1
                  : b.category === "Also Familiar"
                  ? -1
                  : 0
              )
              .map((skill, index) => (
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

            <div className="mt-8">
              <div>
                <h2 className="resume-label" aria-label="Social">
                  Social
                </h2>
              </div>
              <ul className="mt-2 space-y-0.5 text-[13px] leading-6 font-normal text-muted-foreground font-inter">
                {resumeData.socials.map((social, index) => (
                  <li key={`${social.name}-${index}`}>
                    <AnimatedLink
                      href={social.url}
                      external
                      aria-label={social.name}
                    >
                      {social.name}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {isImageEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Profile image dialog"
          >
            <motion.div
              initial={{ scale: prefersReducedMotion ? 1 : 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: prefersReducedMotion ? 1 : 0.96, opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/profile_work.webp"
                alt="Portrait of Maxwell Young"
                width={300}
                height={300}
                className="rounded-full shadow-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute -top-2 -right-2 bg-background text-foreground border border-[hsl(var(--border))] rounded-full w-8 h-8 grid place-items-center hover:bg-[hsl(var(--muted))] active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                aria-label="Close dialog"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
