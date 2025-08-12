import { type Metadata } from "next";
import { FeaturedShelves } from "@/components/FeaturedShelves";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Explore Projects",
  description: "Editorial shelves view of featured and grouped projects.",
};

export default function ExplorePage() {
  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="mx-auto w-full max-w-[960px] px-4">
        <h1 className="font-display text-2xl font-medium tracking-[0.02em] mb-8">
          Explore
        </h1>
        <FeaturedShelves source={projects} />
      </div>
    </main>
  );
}


