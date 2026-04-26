import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Camera, LineChart, ShieldCheck } from "lucide-react";
import { ProjectMedia } from "@/components/ProjectMedia";
import { getProjectBySlug } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Receipt Radar | Maxwell Young",
  description:
    "Receipt Radar is a grocery intelligence app that scans receipts, tracks spending patterns, and helps people compare prices over time.",
};

export default function ReceiptRadarPage() {
  const project = getProjectBySlug("receipt-radar");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-4xl px-6 py-14">
        <Link
          href="/#projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to projects
        </Link>

        <section className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Active build
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight">
              Receipt Radar
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              A grocery intelligence app for people who want clearer spending patterns
              and better price decisions without spreadsheet overhead.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Camera className="h-4 w-4 mt-0.5 text-accent" />
                <p className="text-sm text-muted-foreground">
                  Scan receipts and extract line items into a searchable spending history.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <LineChart className="h-4 w-4 mt-0.5 text-accent" />
                <p className="text-sm text-muted-foreground">
                  Compare prices over time by store and category to find consistent savings.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 mt-0.5 text-accent" />
                <p className="text-sm text-muted-foreground">
                  Privacy-first approach with transparent data handling and user control.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="mailto:maxwell@ninetynine.digital?subject=Receipt%20Radar%20early%20access"
                className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium hover:bg-accent/15 transition-colors"
              >
                Request early access
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.ninetynine.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors"
              >
                ninetynine digital
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card p-4">
            {project && (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
                <ProjectMedia
                  project={project}
                  variant="detail"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full border border-white/15 bg-black/45 px-3 py-2 backdrop-blur">
                  <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-white/10 bg-white/10">
                    <Image
                      src="/projectImages/receipt-radar-1.png"
                      alt="Receipt Radar icon"
                      fill
                      className="object-contain p-1.5"
                      sizes="36px"
                      priority
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">Receipt Radar</p>
                    <p className="text-xs text-white/70">Interface and launch assets in progress</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
