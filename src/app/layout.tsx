import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { CSPostHogProvider } from "./providers";
import Link from "next/link";
import ArtStyleProvider from "@/components/providers/ArtStyleProvider";
import ArtStyleMenu from "@/components/ArtStyleMenu";
import LayoutDiagnostics from "@/components/LayoutDiagnostics";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PageTransitionProvider } from "@/components/providers/PageTransitionProvider";
import { CommandPalette, CommandPaletteHint } from "@/components/CommandPalette";
import { EasterEggs } from "@/components/EasterEggs";
// DotMatrix removed for cleaner backdrop

// fonts are loaded via globals.css

export const metadata: Metadata = {
  title: "Maxwell Young | Design Engineer | Auckland, NZ",
  description:
    "Design engineer at Silk. React, React Native, TypeScript. 3+ years shipping apps. Previously Spark NZ. Open to roles in Auckland or remote.",
  metadataBase: new URL("https://dev.maxwellyoung.info"),
  keywords: [
    // Job-hunting keywords
    "design engineer Auckland",
    "frontend developer New Zealand",
    "React Native developer NZ",
    "mobile developer Auckland",
    "TypeScript developer",
    "frontend engineer hire",
    // Technical skills
    "React",
    "React Native",
    "TypeScript",
    "Next.js",
    "Expo",
    "Node.js",
    "Tailwind CSS",
    // Context
    "Silk",
    "Spark New Zealand",
    "ninetynine.digital",
    "portfolio",
    "software engineer",
  ],
  authors: [{ name: "Maxwell Young" }],
  creator: "Maxwell Young",
  publisher: "Maxwell Young",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Maxwell Young | Design Engineer | Auckland, NZ",
    description:
      "Frontend & mobile engineer. React, React Native, TypeScript. 4.8★ solo iOS app. Currently at Silk. Available for roles in Auckland or remote.",
    url: "https://dev.maxwellyoung.info",
    siteName: "Maxwell Young - Portfolio",
    locale: "en_NZ",
    type: "website",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "Maxwell Young - Design Engineer based in Auckland, New Zealand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxwell Young | Design Engineer | Auckland",
    description:
      "Frontend & mobile engineer. React, React Native, TypeScript. 4.8★ solo iOS app. Available for roles.",
    images: ["/meta.png"],
    creator: "@internetmaxwell",
  },
  alternates: {
    canonical: "https://dev.maxwellyoung.info",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E0E0E",
};

const generalSans = localFont({
  src: [
    { path: "../../public/fonts/GeneralSans-Variable.woff2", style: "normal" },
    {
      path: "../../public/fonts/GeneralSans-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const sentient = localFont({
  src: [
    { path: "../../public/fonts/Sentient-Variable.woff2", style: "normal" },
    {
      path: "../../public/fonts/Sentient-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-sentient",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://dev.maxwellyoung.info/",
        url: "https://dev.maxwellyoung.info/",
        name: "Maxwell Young | Design Engineer",
        description:
          "Design engineer at Silk. React, React Native, TypeScript. 3+ years shipping apps. Previously Spark NZ. Open to roles in Auckland or remote.",
        datePublished: "2024-01-01",
        dateModified: "2026-02-05",
        mainEntity: {
          "@id": "https://dev.maxwellyoung.info/#person",
        },
        author: {
          "@id": "https://dev.maxwellyoung.info/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://dev.maxwellyoung.info/#person",
        name: "Maxwell Young",
        givenName: "Maxwell",
        familyName: "Young",
        jobTitle: "Design Engineer",
        url: "https://dev.maxwellyoung.info/",
        email: "maxwell@ninetynine.digital",
        image: "https://dev.maxwellyoung.info/profile_work.webp",
        sameAs: [
          "https://github.com/maxwellyoung",
          "https://www.linkedin.com/in/maxwell-young-a55032125/",
          "https://www.ninetynine.digital",
        ],
        knowsAbout: [
          "React",
          "React Native",
          "TypeScript",
          "Next.js",
          "UI/UX Design",
          "Mobile Development",
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Auckland University of Technology",
        },
        worksFor: [
          {
            "@type": "Organization",
            name: "Silk",
            url: "https://www.silk.cx",
          },
          {
            "@type": "Organization",
            "@id": "https://www.ninetynine.digital/#organization",
            name: "ninetynine.digital",
            url: "https://www.ninetynine.digital",
            founder: {
              "@id": "https://dev.maxwellyoung.info/#person",
            },
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://www.ninetynine.digital/#organization",
        name: "ninetynine.digital",
        url: "https://www.ninetynine.digital",
        description:
          "Independent studio crafting enduring digital products. Custom portfolios for artists and writers, consumer applications, and creative web experiences.",
        founder: {
          "@id": "https://dev.maxwellyoung.info/#person",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${generalSans.variable} ${sentient.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="font-sans overflow-x-hidden min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CSPostHogProvider>
            <ArtStyleProvider>
              <SmoothScrollProvider>
                <PageTransitionProvider>
                  <div className="relative z-10">{children}</div>
                </PageTransitionProvider>
              </SmoothScrollProvider>
              <CommandPalette />
              <CommandPaletteHint />
              <EasterEggs />
              <ArtStyleMenu />
              <LayoutDiagnostics />
            </ArtStyleProvider>
            <Analytics />
          </CSPostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
