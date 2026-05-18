import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "Selected product engineering, mobile app, and interface system work by Maxwell Young.",
  alternates: {
    canonical: "https://dev.maxwellyoung.info/projects",
  },
  openGraph: {
    title: "Projects & Case Studies | Maxwell Young",
    description:
      "Selected product engineering, mobile app, and interface system work by Maxwell Young.",
    url: "https://dev.maxwellyoung.info/projects",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "Selected work by Maxwell Young",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Case Studies | Maxwell Young",
    description:
      "Selected product engineering, mobile app, and interface system work by Maxwell Young.",
    images: ["/meta.png"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
