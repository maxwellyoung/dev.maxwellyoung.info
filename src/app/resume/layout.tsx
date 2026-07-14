import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Maxwell Young",
  description:
    "Resume for Maxwell Young, an Auckland design engineer building accessible mobile and web interfaces with React Native, React, and TypeScript.",
  alternates: {
    canonical: "https://dev.maxwellyoung.info/resume",
  },
  openGraph: {
    title: "Resume — Maxwell Young",
    description:
      "Experience, selected work, education, and technical skills for Auckland design engineer Maxwell Young.",
    url: "https://dev.maxwellyoung.info/resume",
    type: "profile",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "Maxwell Young — Design Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume — Maxwell Young",
    description:
      "Experience, selected work, education, and technical skills for Auckland design engineer Maxwell Young.",
    images: ["/meta.png"],
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
