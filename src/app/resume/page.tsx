"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { resumeData } from "@/lib/resumeData";
import { ExperienceItem } from "@/components/ExperienceItem";
import { EducationItem } from "@/components/EducationItem";
import { SkillCategory } from "@/components/SkillCategory";

export default function Resume() {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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

  return (
    <div className="relative w-full py-6">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Maxwell Young",
              jobTitle: "Design Engineer",
              url: "https://dev.maxwellyoung.info/",
              email: "mailto:maxtheyoung@gmail.com",
              sameAs: [
                "https://github.com/maxwellyoung",
                "https://www.linkedin.com/in/maxwell-young-a55032125/",
              ],
            }),
          }}
        />
      </Head>
      <div className="container-grid w-full">
        {/* header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-medium dark:text-zinc-100 text-zinc-800 font-roboto-mono">
              {resumeData.name}
            </h1>

            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.p
                className="text-xl font-light dark:text-zinc-400 text-zinc-600 font-roboto-mono"
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
                <span className="inline-flex items-center px-2 py-1 mt-2 text-xs rounded-full border border-[#EA2D42] text-[#EA2D42] bg-[#EA2D42]/10">
                  {resumeData.availability}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* use a plain anchor for download */}
            <a
              href="/MaxwellYoung_CV.pdf"
              download
              aria-label="Download resume PDF"
              className="flex items-center px-2 md:px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-100 border border-[#EA2D42] rounded-md bg-[#EA2D42]/15 hover:bg-transparent hover:text-[#EA2D42] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#EA2D42] focus:ring-offset-2"
            >
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
              <span className="hidden md:inline ml-2">download resume</span>
            </a>

            <button
              type="button"
              onClick={() => setIsImageEnlarged(true)}
              className="cursor-pointer transition duration-200 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 rounded-full hide-print"
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
        <div className="grid-12 gap-y-8">
          {/* left / main */}
          <main className="col-span-12 lg:col-span-8 order-2 lg:order-1 max-w-prose">
            {/* Selected work strip */}
            {resumeData?.selectedWork && resumeData.selectedWork.length > 0 && (
              <ul className="mt-2 mb-6 text-sm underline">
                {resumeData.selectedWork.map((work, idx) => (
                  <li key={`${work.title}-${idx}`}>
                    <Link href={work.href}>{work.title}</Link>
                  </li>
                ))}
              </ul>
            )}
            <div className="relative">
              <span className="resume-label">Experience</span>
            </div>
            {resumeData.experience.map((item, index) => (
              <ExperienceItem
                key={`${item.title}-${index}`}
                title={item.title}
                company={item.company}
                date={item.date}
                responsibilities={item.responsibilities}
                metric={item.metric}
              />
            ))}

            <div className="relative mt-8">
              <span className="resume-label">Education</span>
            </div>
            {resumeData.education.map((item, index) => (
              <EducationItem
                key={`${item.degree}-${index}`}
                degree={item.degree}
                institution={item.institution}
                date={item.date}
              />
            ))}
          </main>

          {/* right / sidebar */}
          <aside className="col-span-12 lg:col-span-4 order-1 lg:order-2">
            <div className="mt-8 lg:mt-0">
              <div>
                <span className="resume-label">Contact</span>
              </div>
              <address className="not-italic block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter mt-2">
                <a
                  href={`mailto:${resumeData.contact.email}`}
                  className="hover:underline"
                >
                  {resumeData.contact.email}
                </a>
                <br />
                {resumeData.contact.location}
                <br />
                <Link href={resumeData.contact.website} className="underline">
                  {resumeData.contact.website.replace(/^https?:\/\//, "")}
                </Link>
              </address>
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
                />
              ))}

            <div className="mt-8">
              <div>
                <span className="resume-label">Social</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter underline">
                {resumeData.socials.map((social, index) => (
                  <li key={`${social.name}-${index}`}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      {social.name}
                    </a>
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
                className="absolute -top-2 -right-2 bg-zinc-900 text-white rounded-full w-8 h-8 grid place-items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-200"
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
