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

const appIntroductions: Record<string, {
  action: string;
  image: string;
  width: number;
  height: number;
  caption: string;
  iconField?: string;
}> = {
  "vape-quit-coach": {
    action: "Track your quit progress. Take one day at a time.",
    image: "/projectImages/vqc-icon.png",
    width: 512,
    height: 512,
    caption: "Quit tracking and everyday support.",
    iconField: "bg-[#191221]",
  },
  afterlight: {
    action: "Log a concert. Keep the night with you.",
    image: "/projectImages/afterlight-icon.png",
    width: 1024,
    height: 1024,
    caption: "A diary for the nights you want to keep.",
    iconField: "bg-[#12110f]",
  },
  holdspace: {
    action: "Save a thought or link. Return to one thing at a time.",
    image: "/projectImages/holdspace-1.webp",
    width: 1206,
    height: 2622,
    caption: "One item now, the rest waiting. Shown under its original Still name.",
  },
  "good-news-bad-news": {
    action: "Read a small news pack. Open the stories behind it.",
    image: "/projectImages/good-news-bad-news-4.webp",
    width: 1320,
    height: 2868,
    caption: "A reading archive, with saved packs arranged by date.",
  },
  doomscroll: {
    action: "Open a code prompt. Review it at your own pace.",
    image: "/projectImages/doomscroll-2.webp",
    width: 800,
    height: 1736,
    caption: "A gesture guide for reviewing code cards.",
  },
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
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Icons and selected earlier interfaces show each app’s identity. The App Store has current release details; features described as in development await release.</p>
        </header>
        <div className="space-y-12 sm:space-y-16">
          {independentApps.map((app, index) => {
            const introduction = appIntroductions[app.slug];
            return (
              <article key={app.slug} id={app.slug} aria-labelledby={`${app.slug}-title`} className="grid scroll-mt-8 gap-5 border-t border-border pt-7 sm:grid-cols-[1fr_180px] sm:grid-rows-[min-content_1fr] sm:gap-x-10">
                <div className="min-w-0">
                  <p className="mb-3 text-xs tabular-nums text-muted-foreground">0{index + 1}</p>
                  <h2 id={`${app.slug}-title`} className="text-2xl font-medium tracking-tight">{app.name}</h2>
                  <p className="mt-3 max-w-md text-lg leading-snug">{introduction.action}</p>
                </div>
                <figure className="mx-auto w-full max-w-[240px] self-start sm:col-start-2 sm:row-span-2 sm:max-w-[180px]">
                  <div className={`overflow-hidden rounded-xl border border-border ${introduction.iconField ?? "bg-muted"}`}>
                    <Image src={introduction.image} alt={introduction.iconField ? `${app.name} app icon` : `${app.name}: ${introduction.caption}`} width={introduction.width} height={introduction.height} sizes="(max-width: 640px) 240px, 180px" className={introduction.iconField ? "h-auto w-full p-8" : "h-auto w-full"} />
                  </div>
                  <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">{introduction.caption}</figcaption>
                </figure>
                <div className="min-w-0 sm:col-start-1 sm:row-start-2">
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    <a href={app.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium underline underline-offset-4 decoration-border hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">View on the App Store <ArrowUpRight size={15} aria-hidden="true" /></a>
                    {app.caseStudySlug && <Link href={`/case-study/${app.caseStudySlug}`} className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Design decisions</Link>}
                  </div>
                  <details className="mt-3 border-t border-border pt-2">
                    <summary className="min-h-11 cursor-pointer py-3 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">About {app.name}</summary>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{app.longDescription}</p>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Built with {app.stack?.join(", ")}.</p>
                  </details>
                </div>
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
