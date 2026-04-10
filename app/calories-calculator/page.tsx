import type { Metadata } from "next";
import { CaloriesCalculatorTool } from "@/components/CaloriesCalculatorTool";

export const metadata: Metadata = {
  title: "Calories calculator",
  description:
    "Estimate maintenance calories and a practical daily target for fat loss, balance / maintenance, or muscle gain. Plain coach style, no fluff.",
};

export default function CaloriesCalculatorPage() {
  return <CaloriesCalculatorTool />;
}
