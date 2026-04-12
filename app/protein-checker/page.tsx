import type { Metadata } from "next";
import { ProteinCheckerTool } from "@/components/ProteinCheckerTool";

export const metadata: Metadata = {
  title: "Protein checker",
  description:
    "Check grams of protein per 100 calories for any food. Quick, coach-style guidance for better choices.",
};

export default function ProteinCheckerPage() {
  return <ProteinCheckerTool />;
}
