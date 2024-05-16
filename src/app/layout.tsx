import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Maxwell Young - Developer Portfolio",
  description:
    "The portfolio of Maxwell Young, a passionate developer and designer.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
