import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Build muscle, lose fat, and stay consistent for life. Coaching, training, nutrition, and free tools from Nonso Biose.",
};

export default function HomePage() {
  return <LandingPage />;
}
