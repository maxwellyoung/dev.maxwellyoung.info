import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Maxwell Young",
  description: "Development portfolio of Maxwell Young",
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
      </head>
      <body
        className={`${inter.className} ${robotoMono.variable} bg-neutral-900`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
