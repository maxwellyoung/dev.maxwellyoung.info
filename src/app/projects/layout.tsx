import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Maxwell Young",
  description:
    "A curated collection of projects by Maxwell Young - design engineer building apps, tools, and experiments at the intersection of design and code.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
