import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
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
    default: "Coachware",
    template: "%s · Coachware",
  },
  description:
    "Practical tools for meal timing around training and simple weight progression using rep ranges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className={inter.className}>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
