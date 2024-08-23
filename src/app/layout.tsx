import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Maxwell Young | Developer Portfolio",
  description:
    "Explore the development portfolio of Maxwell Young, showcasing modern web development projects and skills.",
  keywords:
    "Maxwell Young, web developer, software engineer, portfolio, Next.js, React, Tailwind CSS",
  authors: [{ name: "Maxwell Young" }],
  openGraph: {
    title: "Maxwell Young | Developer Portfolio",
    description:
      "Explore the development portfolio of Maxwell Young, showcasing modern web development projects and skills.",
    url: "https://dev.maxwellyoung.info",
    type: "website",
    images: [
      {
        url: "https://dev.maxwellyoung.info/profile_work.webp",
        width: 1200,
        height: 630,
        alt: "Maxwell Young Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxwell Young | Developer Portfolio",
    description:
      "Explore the development portfolio of Maxwell Young, showcasing modern web development projects and skills.",
    site: "@internetmaxwell",
    creator: "@internetmaxwell",
    images: [
      {
        url: "https://dev.maxwellyoung.info/profile_work.webp",
        alt: "Maxwell Young Portfolio",
      },
    ],
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        {/* Preload fonts */}
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/RobotoMono.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta
          name="description"
          content="Explore the development portfolio of Maxwell Young, showcasing modern web development projects and skills."
        />
        <meta
          name="keywords"
          content="Maxwell Young, web developer, software engineer, portfolio, Next.js, React, Tailwind CSS"
        />
        <meta name="author" content="Maxwell Young" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Maxwell Young | Developer Portfolio"
        />
        <meta
          property="og:description"
          content="Explore the development portfolio of Maxwell Young, showcasing modern web development projects and skills."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dev.maxwellyoung.info" />
        <meta
          property="og:image"
          content="https://dev.maxwellyoung.info/profile_work.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Maxwell Young | Developer Portfolio"
        />
        <meta
          name="twitter:description"
          content="Explore the development portfolio of Maxwell Young, showcasing modern web development projects and skills."
        />
        <meta name="twitter:site" content="@internetmaxwell" />
        <meta name="twitter:creator" content="@internetmaxwell" />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/profile_work.webp"
        />
        <link rel="canonical" href="https://dev.maxwellyoung.info" />
      </head>
      <body
        className={`${inter.className} ${robotoMono.variable} dark:bg-neutral-900 bg-neutral-50 text-zinc-300 dark:text-white`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
