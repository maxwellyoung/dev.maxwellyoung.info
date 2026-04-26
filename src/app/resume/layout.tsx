import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Maxwell Young",
  description: "Resume of Maxwell Young, Design Engineer.",
  alternates: {
    canonical: "https://dev.maxwellyoung.info/resume",
  },
  openGraph: {
    title: "Resume — Maxwell Young",
    description: "Resume of Maxwell Young, Design Engineer.",
    url: "https://dev.maxwellyoung.info/resume",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Resume — Maxwell Young",
    description: "Resume of Maxwell Young, Design Engineer.",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
