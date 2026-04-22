"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { AnimatedLink } from "@/components/ui/animated-link";
import { type CaseStudy, caseStudies } from "@/lib/caseStudies";
import { spring } from "@/lib/motion";
import { SiteFooter } from "@/components/SiteFooter";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { TrackedActionLink } from "@/components/TrackedActionLink";

interface CaseStudyContentProps {
  slug: string;
  study: CaseStudy | undefined;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: spring.gentle,
};

export function CaseStudyContent({ slug, study }: CaseStudyContentProps) {
  const [showAnnotations, setShowAnnotations] = useState(false);

  useEffect(() => {
    const handleToggle = (event: Event) => {
      const custom = event as CustomEvent<{ enabled?: boolean }>;
      if (typeof custom.detail?.enabled === "boolean") {
        setShowAnnotations(custom.detail.enabled);
      }
    };
    window.addEventListener(
      "toggle-case-study-annotations",
      handleToggle as EventListener
    );
    return () =>
      window.removeEventListener(
        "toggle-case-study-annotations",
        handleToggle as EventListener
      );
  }, []);

  useEffect(() => {
    if (!study) return;
    posthog.capture("case_study_viewed", {
      slug: study.slug,
      title: study.title,
      role: study.role,
    });
  }, [study]);

  if (!study) {
    // Return a placeholder for projects without full case studies
    return (
      <main className="min-h-screen px-6 py-24 max-w-3xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        <div className="text-center py-24">
          <h1 className="text-2xl font-medium mb-4">Case Study Coming Soon</h1>
          <p className="text-muted-foreground mb-8">
            This project&apos;s detailed case study is being written.
          </p>
          <AnimatedLink href="/#projects">View all projects</AnimatedLink>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative px-6 py-24 max-w-4xl mx-auto">
        <motion.div {...fadeIn}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>

          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
            {study.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">{study.subtitle}</p>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-12">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {study.timeline}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {study.role}
            </div>
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  posthog.capture("case_study_outbound_clicked", {
                    slug: study.slug,
                    target: "live_site",
                  })
                }
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live site
              </a>
            )}
            {study.githubUrl && (
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  posthog.capture("case_study_outbound_clicked", {
                    slug: study.slug,
                    target: "source_code",
                  })
                }
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                Source
              </a>
            )}
          </div>

          {/* Tools */}
          <div className="flex flex-wrap gap-2 mb-12">
            {study.tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 text-xs rounded-full bg-[hsl(var(--muted))] text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-12">
            <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                Ownership
              </p>
              <p className="text-sm text-foreground">{study.role}</p>
            </div>
            <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                Team
              </p>
              <p className="text-sm text-foreground">{study.team || "Solo / small team"}</p>
            </div>
            <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                Key Result
              </p>
              <p className="text-sm text-foreground">
                {study.metrics?.[0]?.value
                  ? `${study.metrics[0].value} ${study.metrics[0].label}`
                  : study.outcome}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hero image */}
        {study.heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring.gentle}
            className="relative aspect-video rounded-xl overflow-hidden border border-[hsl(var(--border))]"
          >
            <Image
              src={study.heroImage}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              quality={70}
              priority
            />
          </motion.div>
        )}
      </section>

      {/* Content */}
      <section className="px-6 max-w-3xl mx-auto space-y-16 pb-32">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring.gentle}
        >
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Overview
          </h2>
          <p className="text-lg leading-relaxed">{study.overview}</p>
        </motion.div>

        {/* Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring.gentle}
        >
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            The Challenge
          </h2>
          <p className="text-lg leading-relaxed">{study.challenge}</p>
        </motion.div>

        {/* Constraints */}
        {study.constraints && study.constraints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring.gentle}
          >
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Constraints
            </h2>
            <ul className="space-y-3">
              {study.constraints.map((constraint, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="text-accent">•</span>
                  <span>{constraint}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Decision log */}
        {study.decisionLog && study.decisionLog.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring.gentle}
          >
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-8">
              Decision Log
            </h2>
            <div className="space-y-6">
              {study.decisionLog.map((entry, i) => (
                <div
                  key={i}
                  data-decision-card
                  className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 p-4"
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Problem
                  </p>
                  <p className="text-foreground mb-4">{entry.problem}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Decision
                  </p>
                  <p className="text-foreground mb-4">{entry.decision}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Tradeoff
                  </p>
                  <p className="text-muted-foreground">{entry.tradeoff}</p>
                  {entry.impact && (
                    <>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-4 mb-2">
                        Impact
                      </p>
                      <p className="text-muted-foreground">{entry.impact}</p>
                    </>
                  )}
                  {showAnnotations && (
                    <p className="mt-4 text-xs text-accent">
                      Annotation: This decision balances product clarity and implementation cost.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring.gentle}
        >
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-8">
            Approach
          </h2>
          <div className="space-y-12">
            {study.approach.map((step, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {i + 1}. {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {step.image && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Outcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring.gentle}
        >
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Outcome
          </h2>
          <p className="text-lg leading-relaxed mb-8">{study.outcome}</p>

          {study.metrics && (
            <div className="grid grid-cols-3 gap-4">
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 text-center"
                >
                  <p className="text-2xl font-medium text-accent">
                    {metric.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Learnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring.gentle}
        >
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Learnings
          </h2>
          <ul className="space-y-3">
            {study.learnings.map((learning, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground">
                <span className="text-accent">→</span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Anti-patterns avoided */}
        {study.avoidedPatterns && study.avoidedPatterns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring.gentle}
          >
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Anti-Patterns Avoided
            </h2>
            <ul className="space-y-3">
              {study.avoidedPatterns.map((pattern, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="text-accent">×</span>
                  <span>{pattern}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Next iterations */}
        {study.nextIterations && study.nextIterations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring.gentle}
          >
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Next Iterations
            </h2>
            <ul className="space-y-3">
              {study.nextIterations.map((item, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="text-accent">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring.gentle}
          className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 p-6"
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Get In Touch
          </p>
          <h2 className="text-xl font-medium mb-3">
            If you want to talk about similar work, email me.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Contact is the simplest place to start.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <TrackedActionLink
              href="/contact"
              eventName="case_study_cta_clicked"
              eventProps={{ slug: study.slug, target: "contact" }}
              className="inline-flex items-center rounded-md bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity"
            >
              Contact
            </TrackedActionLink>
          </div>
        </motion.div>

        {/* Next project */}
        {study.nextProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring.gentle}
            className="pt-12 border-t border-[hsl(var(--border))]"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Next project
            </p>
            <Link
              href={`/case-study/${study.nextProject.slug}`}
              className="group inline-flex items-center gap-2 text-lg font-medium hover:text-accent transition-colors"
            >
              {study.nextProject.title}
              <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}

        {/* More case studies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring.gentle}
          className="pt-8 border-t border-[hsl(var(--border))]"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
            More case studies
          </p>
          <ul className="space-y-2">
            {Object.values(caseStudies)
              .filter((cs) => cs.slug !== slug)
              .slice(0, 4)
              .map((cs) => (
                <li key={cs.slug}>
                  <Link
                    href={`/case-study/${cs.slug}`}
                    className="group flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>{cs.title}</span>
                    <span className="text-xs text-muted-foreground">{cs.role}</span>
                  </Link>
                </li>
              ))}
          </ul>
          <div className="mt-4">
            <Link
              href="/#projects"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              View all projects
            </Link>
          </div>
        </motion.div>

        <SiteFooter />
      </section>
    </main>
  );
}
