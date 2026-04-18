import type { Metadata } from "next";
import { ParQForm } from "@/components/par-q/ParQForm";

export const metadata: Metadata = {
  title: "PAR-Q",
  description:
    "Physical Activity Readiness Questionnaire — share your details and health history safely before starting coaching.",
};

export default function ParQPage() {
  return <ParQForm />;
}
