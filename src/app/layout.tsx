import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { CSPostHogProvider } from "./providers";
import Link from "next/link";
import ArtStyleProvider from "@/components/providers/ArtStyleProvider";
import ArtStyleMenu from "@/components/ArtStyleMenu";
import LayoutDiagnostics from "@/components/LayoutDiagnostics";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PageTransitionProvider } from "@/components/providers/PageTransitionProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { CommandPalette, CommandPaletteHint } from "@/components/CommandPalette";
import { EasterEggs } from "@/components/EasterEggs";
// DotMatrix removed for cleaner backdrop

// fonts are loaded via globals.css

export const metadata: Metadata = {
  title: "Maxwell Young | Design Engineer",
  description:
    "Design engineer building software that outlasts its stack. Tools for memory, behavior change, and quiet interactions. React, TypeScript, React Native. Currently at Silk. Open to opportunities.",
  metadataBase: new URL("https://dev.maxwellyoung.info"),
  keywords: [
    "design engineer",
    "product design",
    "React",
    "TypeScript",
    "Next.js",
    "React Native",
    "frontend development",
    "Auckland",
    "New Zealand",
    "Silk",
    "ninetynine.digital",
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
    title: "Maxwell Young | Design Engineer",
    description:
      "Design engineer building software that outlasts its stack. React, TypeScript, React Native. Open to opportunities.",
    url: "https://dev.maxwellyoung.info",
    siteName: "Maxwell Young",
    locale: "en_NZ",
    type: "website",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "Maxwell Young - Design Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxwell Young | Design Engineer",
    description:
      "Design engineer building software that outlasts its stack. React, TypeScript, React Native. Open to opportunities.",
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
  maximumScale: 1,
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
        "@type": "Person",
        "@id": "https://dev.maxwellyoung.info/#person",
        name: "Maxwell Young",
        jobTitle: "Design Engineer",
        url: "https://dev.maxwellyoung.info/",
        email: "maxtheyoung@gmail.com",
        sameAs: [
          "https://github.com/maxwellyoung",
          "https://www.linkedin.com/in/maxwell-young-a55032125/",
          "https://www.ninetynine.digital",
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
      className={`${generalSans.variable} ${sentient.variable} ${inter.variable}`}
    >
      <head>
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
        <CSPostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ArtStyleProvider>
              <SmoothScrollProvider>
                <PageTransitionProvider>
                  <div className="relative z-10">{children}</div>
                </PageTransitionProvider>
              </SmoothScrollProvider>
              <CustomCursor />
              <CommandPalette />
              <CommandPaletteHint />
              <EasterEggs />
              <ArtStyleMenu />
              <LayoutDiagnostics />
            </ArtStyleProvider>
            <Analytics />
          </ThemeProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
