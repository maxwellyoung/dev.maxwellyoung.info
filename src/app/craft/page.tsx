import { Metadata } from "next";
import { CraftHeader } from "@/components/craft/CraftHeader";
import { InteractionStudies } from "@/components/craft/InteractionStudies";
import { DesignEssays } from "@/components/craft/DesignEssays";
import { ProjectHighlights } from "@/components/craft/ProjectHighlights";
import { SpringExamples } from "@/components/craft/SpringExamples";
import { MotionSpec } from "@/components/craft/MotionSpec";
import { CraftFooter } from "@/components/craft/CraftFooter";
import { SymbolEvidence, SymbolFeedback, SymbolPrinciple, SymbolProgress, SymbolState } from "@/components/craft/CraftSymbols";

export const metadata: Metadata = {
  title: "Interaction Lab & Essays | Maxwell Young",
  description:
    "Interaction studies, design essays, and practical notes on motion and UI behavior.",
  openGraph: {
    title: "Interaction Lab & Essays | Maxwell Young",
    images: [{ url: "/meta.png", width: 1200, height: 630, alt: "Maxwell Young - Interaction Lab" }],
    description:
      "Interaction studies, design essays, and practical notes on motion and UI behavior.",
  },
};

export default function CraftPage() {
  const sections = [
    { id: "motion-spec", label: "Motion Spec", icon: SymbolPrinciple },
    { id: "interaction-studies", label: "Interaction Studies", icon: SymbolFeedback },
    { id: "spring-physics", label: "Spring Physics", icon: SymbolState },
    { id: "project-highlights", label: "Project Highlights", icon: SymbolEvidence },
    { id: "design-essays", label: "Design Essays", icon: SymbolProgress },
  ];

  return (
    <main className="craft-surface min-h-screen bg-background">
      <div className="craft-depth-field" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 items-start">
          <div>
            <CraftHeader />

            <div className="space-y-24 mt-16">
              <MotionSpec />
              <InteractionStudies />
              <SpringExamples />
              <ProjectHighlights />
              <DesignEssays />
            </div>

            <CraftFooter />
          </div>

          <aside className="hidden lg:block sticky top-20">
            <div className="rounded-xl border border-border/70 bg-card/70 backdrop-blur-sm p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Field Index
              </p>
              <nav className="space-y-1.5" aria-label="Craft sections">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="craft-focus motion-safe-transform inline-flex items-center w-full gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    >
                      <Icon className="text-accent" />
                      <span>{section.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
