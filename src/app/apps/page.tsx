import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { independentApps } from "@/lib/projects";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Independent apps",
  description: "Five independent iPhone apps by Maxwell Young: Vape Quit Coach, Afterlight, Holdspace, Good News Bad News, and doomscroll.",
  alternates: { canonical: "https://dev.maxwellyoung.info/apps" },
};

const decisions: Record<string, string> = {
  "vape-quit-coach": "Support that stays readable during a craving.",
  afterlight: "A diary that feels like the nights it remembers.",
  holdspace: "One thing now. The rest can wait.",
  "good-news-bad-news": "A news session with an ending.",
  doomscroll: "Make scrolling an occasion to review code.",
};

export default function AppsPage() {
  return (
    <main id="main-content" className="min-h-screen text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/" className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">← All work</Link>
        <header className="mb-12 mt-8 max-w-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">Independent products · iPhone</p>
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">Small apps.<br />Considered decisions.</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">Five apps I designed, built, and published. Each starts with an everyday moment and a specific way to make it easier.</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">The App Store links show current availability and release details. Selected interface images illustrate the product design; work described as in development awaits a corresponding release.</p>
        </header>
        <div className="space-y-12 sm:space-y-16">
          {independentApps.map((app, index) => {
            const screenshot = app.slug === "afterlight" ? "/projectImages/afterlight-1.webp" : app.screenshots?.[0];
            return (
              <article key={app.slug} id={app.slug} className="grid scroll-mt-8 gap-6 border-t border-border pt-7 sm:grid-cols-[1fr_180px] sm:gap-10">
                <div className="min-w-0">
                  <p className="mb-3 text-xs tabular-nums text-muted-foreground">0{index + 1} / {app.stack?.[0]}</p>
                  <h2 className="text-2xl font-medium tracking-tight">{app.name}</h2>
                  <p className="mt-3 text-lg leading-snug">{decisions[app.slug]}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{app.longDescription}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    <a href={app.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium underline underline-offset-4 decoration-border hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">View on the App Store <ArrowUpRight size={15} aria-hidden="true" /></a>
                    {app.caseStudySlug && <Link href={`/case-study/${app.caseStudySlug}`} className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Design decisions</Link>}
                  </div>
                </div>
                {screenshot && <div className="relative mx-auto w-full max-w-[180px] self-start overflow-hidden rounded-xl border border-border bg-muted"><Image src={screenshot} alt={`${app.name} selected interface`} width={180} height={390} sizes="180px" className="h-auto w-full" /></div>}
              </article>
            );
          })}
        </div>
        <aside className="mt-16 border-t border-border pt-7 text-sm leading-relaxed text-muted-foreground">React Native and Expo support four of these apps; Holdspace uses native SwiftUI. Product scope, network use, and privacy boundaries differ by app. Availability is described here for iPhone.</aside>
      </div>
      <SiteFooter />
    </main>
  );
}
