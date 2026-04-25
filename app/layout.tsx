import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: {
    default: "Nonso Biose",
    template: "%s · Nonso Biose",
  },
  description:
    "Online coaching and practical tools for training, meal timing, and calorie guidance. Calm, structured, built for real life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className={inter.className}>
        <GoogleAnalytics />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
