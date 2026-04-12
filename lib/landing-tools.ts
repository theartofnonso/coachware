/** Free tools surfaced on the landing page; extend this list as you ship more. */
export interface LandingTool {
  href: string;
  title: string;
  description: string;
}

export const LANDING_TOOLS: LandingTool[] = [
  {
    href: "/protein-checker",
    title: "Protein checker",
    description:
      "See if a food is a strong protein choice for your calories in seconds.",
  },
  {
    href: "/calories-calculator",
    title: "Calorie budget",
    description:
      "Estimate maintenance and a starting daily target in plain language.",
  },
  {
    href: "/meal-timing",
    title: "Meal timing",
    description:
      "Structure calories and macros across the day around training or rest.",
  },
  {
    href: "/weight-progression",
    title: "Weight progression",
    description:
      "Decide when to hold, add reps, or change load from your last session.",
  },
];
