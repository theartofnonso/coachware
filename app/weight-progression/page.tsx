import type { Metadata } from "next";
import { WeightProgressionTool } from "@/components/WeightProgressionTool";

export const metadata: Metadata = {
  title: "Weight progression",
  description:
    "Use rep ranges to decide when to hold weight, add reps, or increase load. Clear, coach-style guidance for everyday training.",
};

export default function WeightProgressionPage() {
  return <WeightProgressionTool />;
}
