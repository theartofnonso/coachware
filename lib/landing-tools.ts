/** Free tools surfaced on the landing page; extend this list as you ship more. */
export type LandingToolIcon =
  | "protein"
  | "calories"
  | "meal-timing"
  | "weight";

export interface LandingTool {
  href: string;
  title: string;
  description: string;
  icon: LandingToolIcon;
}

export const LANDING_TOOLS: LandingTool[] = [
  {
    href: "/protein-checker",
    title: "Protein checker",
    description:
      "See if a food is a strong protein choice for your calories in seconds.",
    icon: "protein",
  },
  {
    href: "/calories-calculator",
    title: "Calorie budget",
    description:
      "Estimate maintenance and a starting daily target in plain language.",
    icon: "calories",
  },
  {
    href: "/meal-timing",
    title: "Meal timing",
    description:
      "Structure calories and macros across the day around training or rest.",
    icon: "meal-timing",
  },
  {
    href: "/weight-progression",
    title: "Weight progression",
    description:
      "Decide when to hold, add reps, or change load from your last session.",
    icon: "weight",
  },
];
