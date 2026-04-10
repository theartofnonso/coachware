import { ToolRouteLoading } from "@/components/ToolRouteLoading";

export default function CaloriesCalculatorLoading() {
  return (
    <ToolRouteLoading
      kicker="Nutrition"
      title="Find your calorie budget"
      lede="Get a simple estimate for how much to eat based on your body, activity, and goal."
      cardTitle="Loading"
      cardBody="Opening the calories calculator."
    />
  );
}
