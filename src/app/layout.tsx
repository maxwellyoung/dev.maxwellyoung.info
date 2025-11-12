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
// DotMatrix removed for cleaner backdrop

// fonts are loaded via globals.css

export const metadata: Metadata = {
  title: "Maxwell Young | Design Engineer",
  description: "Portfolio of Maxwell Young, a Design Engineer",
  metadataBase: new URL("https://dev.maxwellyoung.info"),
  openGraph: {
    title: "Maxwell Young | Design Engineer",
    description: "Portfolio of Maxwell Young, a Design Engineer",
    url: "https://dev.maxwellyoung.info",
    siteName: "Maxwell Young",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "Maxwell Young - Design Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxwell Young | Design Engineer",
    description: "Portfolio of Maxwell Young, a Design Engineer",
    images: ["/meta.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
              <div className="relative z-10">{children}</div>
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
