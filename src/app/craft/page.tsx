import { Metadata } from "next";
import { CraftHeader } from "@/components/craft/CraftHeader";
import { InteractionStudies } from "@/components/craft/InteractionStudies";
import { DesignEssays } from "@/components/craft/DesignEssays";
import { ProjectHighlights } from "@/components/craft/ProjectHighlights";
import { SpringExamples } from "@/components/craft/SpringExamples";
import { CraftFooter } from "@/components/craft/CraftFooter";

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
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <CraftHeader />

        <div className="space-y-24 mt-16">
          <InteractionStudies />
          <SpringExamples />
          <ProjectHighlights />
          <DesignEssays />
        </div>

        <CraftFooter />
      </div>
    </main>
  );
}