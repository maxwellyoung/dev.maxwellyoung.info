import { Metadata } from "next";
import { CraftHeader } from "@/components/craft/CraftHeader";
import { InteractionStudies } from "@/components/craft/InteractionStudies";
import { DesignEssays } from "@/components/craft/DesignEssays";
import { MotionSpec } from "@/components/craft/MotionSpec";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Craft | Maxwell Young",
  description:
    "Interaction studies, motion spec, and essays on UI behavior.",
  openGraph: {
    title: "Craft | Maxwell Young",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "Maxwell Young — Craft",
      },
    ],
    description:
      "Interaction studies, motion spec, and essays on UI behavior.",
  },
};

export default function CraftPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <CraftHeader />

        <div className="space-y-20 mt-16">
          <MotionSpec />
          <InteractionStudies />
          <DesignEssays />
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}
