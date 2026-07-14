import { Metadata } from "next";
import { CraftHeader } from "@/components/craft/CraftHeader";
import { InteractionStudies } from "@/components/craft/InteractionStudies";
import { DesignEssays } from "@/components/craft/DesignEssays";
import { MotionSpec } from "@/components/craft/MotionSpec";
import { CraftReferences } from "@/components/craft/CraftReferences";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Interaction Craft and Motion Studies",
  description:
    "Interaction studies, motion specifications, design references, and essays showing how Maxwell Young approaches accessible interface behavior.",
  openGraph: {
    title: "Interaction Craft and Motion Studies | Maxwell Young",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "Maxwell Young — Craft",
      },
    ],
    description:
      "Interaction studies, motion specifications, design references, and essays on accessible interface behavior.",
  },
};

export default function CraftPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <CraftHeader />

        <div className="space-y-20 mt-16">
          <MotionSpec />
          <CraftReferences />
          <InteractionStudies />
          <DesignEssays />
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}
