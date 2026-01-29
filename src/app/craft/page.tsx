import { Metadata } from "next";
import { CraftHeader } from "@/components/craft/CraftHeader";
import { InteractionStudies } from "@/components/craft/InteractionStudies";
import { DesignEssays } from "@/components/craft/DesignEssays";
import { ProjectHighlights } from "@/components/craft/ProjectHighlights";
import { SpringExamples } from "@/components/craft/SpringExamples";
import { CraftFooter } from "@/components/craft/CraftFooter";

export const metadata: Metadata = {
  title: "Craft | Maxwell Young",
  description:
    "Interaction studies, design essays, and explorations in interface craft. Building things that feel alive through thoughtful motion and attention to detail.",
  openGraph: {
    title: "Craft | Maxwell Young",
    description:
      "Interaction studies, design essays, and explorations in interface craft. Building things that feel alive through thoughtful motion and attention to detail.",
  },
};

export default function CraftPage() {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
}