import { ToolRouteLoading } from "@/components/ToolRouteLoading";

export default function ProteinCheckerLoading() {
  return (
    <ToolRouteLoading
      kicker="Nutrition"
      title="Protein checker"
      lede="See if a food is a strong protein choice for the calories."
      cardTitle="Loading"
      cardBody="Opening the protein checker."
    />
  );
}
