import { type Metadata } from "next";
import { projects } from "@/lib/projects";
import { ShowcaseClient } from "@/components/ShowcaseClient";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Combined explore + projects experience.",
};

export default function ShowcasePage() {
  return <ShowcaseClient source={projects} />;
}
