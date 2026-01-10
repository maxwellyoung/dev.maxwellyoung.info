"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { AnimatedLink } from "@/components/ui/animated-link";

interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  heroImage?: string;
  timeline: string;
  role: string;
  team?: string;
  tools: string[];
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  challenge: string;
  approach: {
    title: string;
    description: string;
    image?: string;
  }[];
  outcome: string;
  metrics?: { label: string; value: string }[];
  learnings: string[];
  nextProject?: { slug: string; title: string };
}

// Case study data - add more as needed
const caseStudies: Record<string, CaseStudy> = {
  "vape-quit-coach": {
    slug: "vape-quit-coach",
    title: "Vape Quit Coach",
    subtitle: "Behavior change through architecture, not willpower",
    heroImage: "/projectImages/vqc-1.webp",
    timeline: "2024 — Present",
    role: "Solo Designer & Developer",
    tools: ["React Native", "Expo", "TypeScript"],
    liveUrl: "https://vapequitcoach.com",
    overview:
      "An iOS app for quitting vaping that treats addiction as a design problem rather than a moral failure. Most health apps use motivation and guilt—I built the opposite.",
    challenge:
      "Quitting apps typically rely on shame, streaks, and willpower. But willpower is a finite resource, and shame drives people away from the tools meant to help them. The challenge: design an experience that makes not vaping feel easier than vaping, without moralizing.",
    approach: [
      {
        title: "Behavioral Architecture",
        description:
          "Instead of counting days sober (which creates anxiety), the app focuses on understanding triggers and building replacement habits. The interface makes logging feel like self-discovery, not confession.",
      },
      {
        title: "Progress as Identity",
        description:
          "Traditional apps celebrate streaks—but one slip resets everything, creating shame spirals. I designed a system where progress accumulates even through setbacks. You're building a new identity, not maintaining a perfect record.",
      },
      {
        title: "Liminal Design",
        description:
          "The moments when cravings hit are liminal—between states. The UI for these moments is deliberately calm, almost meditative. No bright colors, no urgency. Just presence.",
      },
    ],
    outcome:
      "4.8 star rating on the App Store. Users consistently mention that it 'feels different' from other quit apps—less judgmental, more like a tool than a taskmaster.",
    metrics: [
      { label: "App Store Rating", value: "4.8★" },
      { label: "Solo Built", value: "100%" },
    ],
    learnings: [
      "Shame-based design is lazy design. The interface should make the right choice feel obvious, not heroic.",
      "Health apps need a different vocabulary than productivity software. You can't 'optimize' addiction recovery.",
      "Every pixel was a decision I owned. Solo projects teach you what you actually believe.",
    ],
  },
  // Add more case studies here
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const study = caseStudies[slug];

  if (!study) {
    // Return a placeholder for projects without full case studies
    return (
      <main className="min-h-screen px-6 py-24 max-w-3xl mx-auto">
        <Link
          href="/projects"
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
          <AnimatedLink href="/projects">View all projects</AnimatedLink>
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
            href="/projects"
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
        </motion.div>

        {/* Hero image */}
        {study.heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative aspect-video rounded-xl overflow-hidden border border-[hsl(var(--border))]"
          >
            <Image
              src={study.heroImage}
              alt={study.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}
      </section>

      {/* Content */}
      <section className="px-6 max-w-3xl mx-auto space-y-16 pb-24">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
        >
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            The Challenge
          </h2>
          <p className="text-lg leading-relaxed">{study.challenge}</p>
        </motion.div>

        {/* Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        {/* Next project */}
        {study.nextProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
      </section>
    </main>
  );
}
