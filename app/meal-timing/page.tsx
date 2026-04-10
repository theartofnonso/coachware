import type { Metadata } from "next";
import { NutritionTool } from "@/components/NutritionTool";

export const metadata: Metadata = {
  title: "Meal timing",
  description:
    "Turn calories and macros into practical meal timing around training and rest days.",
};

export default function MealTimingPage() {
  return <NutritionTool />;
}
