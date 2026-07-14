import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { CSPostHogProvider } from "./providers";
import { PageTransitionProvider } from "@/components/providers/PageTransitionProvider";

export const metadata: Metadata = {
  title: {
    default: "Maxwell Young — Design Engineer",
    template: "%s | Maxwell Young",
  },
  description:
    "Design engineer at Silk building accessible mobile and web interfaces with React Native, React, TypeScript, and real-device product craft.",
  metadataBase: new URL("https://dev.maxwellyoung.info"),
  authors: [{ name: "Maxwell Young" }],
  creator: "Maxwell Young",
  keywords: [
    "Maxwell Young",
    "Design Engineer",
    "React Native",
    "Next.js",
    "Product Engineering",
    "Auckland",
    "ninetynine digital",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Maxwell Young — Design Engineer",
    description:
      "Design engineer at Silk building accessible mobile and web interfaces with React Native, React, TypeScript, and real-device product craft.",
    url: "https://dev.maxwellyoung.info",
    siteName: "Maxwell Young",
    locale: "en_NZ",
    type: "website",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "Maxwell Young",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxwell Young — Design Engineer",
    description:
      "Design engineer at Silk building accessible mobile and web interfaces with React Native, React, TypeScript, and real-device product craft.",
    images: ["/meta.png"],
    creator: "@internetmaxwell",
  },
  alternates: {
    canonical: "https://dev.maxwellyoung.info",
  },
  robots: {
    index: true,
    follow: true,
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
  const shouldLoadVercelAnalytics = process.env.VERCEL_ENV === "production";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://dev.maxwellyoung.info/#person",
    name: "Maxwell Young",
    jobTitle: "Design Engineer",
    url: "https://dev.maxwellyoung.info/",
    email: "maxwell@ninetynine.digital",
    knowsAbout: [
      "Design engineering",
      "React Native",
      "Next.js",
      "Mobile product development",
      "Interface systems",
    ],
    sameAs: [
      "https://github.com/maxwellyoung",
      "https://www.linkedin.com/in/maxwell-young-a55032125/",
      "https://www.ninetynine.digital",
    ],
    worksFor: [
      { "@type": "Organization", name: "Silk", url: "https://www.silk.cx" },
      {
        "@type": "Organization",
        name: "ninetynine.digital",
        url: "https://www.ninetynine.digital",
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
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="font-sans overflow-x-hidden min-h-screen">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-sm bg-background px-4 py-2 text-foreground shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CSPostHogProvider>
            <PageTransitionProvider>
              <div className="relative z-10">{children}</div>
            </PageTransitionProvider>
            {shouldLoadVercelAnalytics && <Analytics />}
          </CSPostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
