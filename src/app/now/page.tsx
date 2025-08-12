import { type Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Now",
  description: "A snapshot of my current focus.",
};

const UPDATED = "August 12, 2025";

const nowSections: Record<string, string[]> = {
  reading: [
    "Ulysses — James Joyce",
    "Swann’s Way — Marcel Proust",
    "My Struggle: Book 6 — Karl Ove Knausgård",
  ],
  building: [
    "ReceiptRadar — audit, Lottie ‘Wormy’, price scraping",
    "Portfolio revamp — projects page + case studies",
    "CineSync — UI refinements",
    "Unity XR roguelite — prototyping + learning",
    "MaxwellOS — NAS/backup plan (phase 2→3)",
  ],
  practising: [
    "Graph algorithms — Bellman–Ford, Floyd–Warshall",
    "OpenGL & shaders",
    "Forecasting (fpp3) exam prep",
    "te reo Māori (Anki)",
    "Cooking Mondays/Tuesdays · Running 5k + Apple Watch habits",
  ],
  uses: [
    "Machines/Display: MacBook Pro · ThinkPad T490 (Arch + Hyprland) · Dell 4K",
    "Input/Audio: Lofree Lite84 · Magic Mouse · Scarlett 2i2 · Yamaha HS5 · SM7dB",
    "Code/Design: Cursor · zsh · Next.js · React Native · Unity · Figma · Lottie",
  ],
};

export default function NowPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <AnimatedSection>
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-base font-semibold tracking-widest uppercase text-muted-foreground">
              now
            </h1>
            <p className="text-sm text-muted-foreground/80 mt-1">
              updated {UPDATED} · auckland, nz
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
            {Object.entries(nowSections).map(([title, items]) => (
              <section key={title}>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  {title}
                </h2>
                <ul className="list-none space-y-2 text-sm leading-relaxed">
                  {items.map((item, i) => (
                    <li key={`${title}-${i}`}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
