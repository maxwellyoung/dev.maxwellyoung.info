import { type Metadata } from "next";
import { projects } from "@/lib/projects";
import { ExploreClient } from "@/components/ExploreClient";

export const metadata: Metadata = {
  title: "Explore Projects",
  description: "Editorial shelves view of featured and grouped projects.",
};

export default function ExplorePage() {
  return <ExploreClient source={projects} />;
}
