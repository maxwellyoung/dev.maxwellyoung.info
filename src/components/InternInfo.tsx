"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { resumeData } from "@/lib/resumeData";
import { projects as allProjects } from "@/lib/projects";

export default function InternInfo() {
  const contacts = [
    { label: "email", href: `mailto:${resumeData.contact.email}` },
    { label: "website", href: resumeData.contact.website },
    { label: "github", href: resumeData.contact.github },
    { label: "linkedin", href: resumeData.contact.linkedin },
    { label: "cv (pdf)", href: "/MaxwellYoung_CV.pdf" },
  ];
  const skills = (resumeData.skills?.flatMap((s) => s.items) || []).slice(
    0,
    12
  );
  const projects = allProjects.slice(0, 6);

  return (
    <div className="relative z-10 mx-auto max-w-2xl w-full space-y-10">
      <header className="pt-16">
        <GlassCard className="p-6">
          <h1 className="text-3xl font-semibold text-white">
            {resumeData.name}
          </h1>
          <p className="text-white/80 mt-1">{resumeData.title}</p>
          <p className="text-white/70 mt-1">
            available Nov–Feb (Auckland / remote)
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="rounded-full ring-1 ring-inset ring-white/10 bg-white/5 px-3 py-1 text-white/90 hover:bg-white/8"
              >
                {c.label}
              </a>
            ))}
          </div>
        </GlassCard>
      </header>

      <section>
        <h2 className="text-sm uppercase tracking-wide text-white/70">
          skills
        </h2>
        <GlassCard className="p-4 mt-3">
          <ul className="flex flex-wrap gap-2 text-sm text-white/90">
            {skills.map((s) => (
              <li
                key={s}
                className="rounded-full ring-1 ring-white/10 px-3 py-1 bg-white/5"
              >
                {s}
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wide text-white/70">
          selected work
        </h2>
        <div className="mt-3 space-y-4">
          {projects.map((p) => (
            <GlassCard key={p.name} className="p-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-white font-medium leading-tight">
                  {p.name}
                </h3>
                {p.link && (
                  <a
                    className="text-sm text-white/90 underline"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    visit site →
                  </a>
                )}
              </div>
              {p.description && (
                <p className="text-white/70 text-sm mt-1">{p.description}</p>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      <footer className="pb-16">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {/** Email copy button with animated feedback */}
          <EmailCopyButton email={resumeData.contact.email} />
          <span className="text-white/70">
            Auckland, NZ • Available Nov–Feb
          </span>
        </div>
      </footer>
    </div>
  );
}

function EmailCopyButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={false}
      whileTap={{ scale: 0.97 }}
      animate={{ scale: copied ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.4 }}
      className="rounded-full bg-white text-neutral-900 px-3 py-1 font-medium hover:bg-neutral-200"
      aria-label={copied ? "Email copied" : "Copy email address"}
      title={copied ? "Copied" : "Copy email"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            copied
          </motion.span>
        ) : (
          <motion.span
            key="email"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            email me
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
