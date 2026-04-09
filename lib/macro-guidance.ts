import type { Goal } from "@/types/nutrition";

export function buildProteinGuidance(
  proteinPerMeal: number[],
  keepItSimple: boolean,
): string {
  const min = Math.min(...proteinPerMeal);
  const max = Math.max(...proteinPerMeal);
  if (keepItSimple) {
    return `Spread about ${min}–${max} g protein per meal so each sitting does meaningful work for muscle and appetite.`;
  }
  return `Distribute protein as evenly as practical — here, roughly ${min}–${max} g per meal. That keeps muscle support steady across the day without leaning on one giant meal.`;
}

export function buildCarbGuidance(
  goal: Goal,
  isRestDay: boolean,
  keepItSimple: boolean,
): string {
  if (isRestDay) {
    return keepItSimple
      ? "Carbs spread fairly evenly — no need to cluster around a workout."
      : "Without a session today, carbs can spread more evenly. You still get performance benefits tomorrow from simply eating enough overall.";
  }
  switch (goal) {
    case "fat_loss":
      return keepItSimple
        ? "More carbs before and after training; lighter carbs elsewhere."
        : "We bias carbs toward the training window for energy and recovery, and keep them a little lighter away from the session when calories are tighter — a practical balance of performance and adherence.";
    case "recomposition":
      return keepItSimple
        ? "Moderate extra carbs around training; steady elsewhere."
        : "Carbs are nudged toward pre- and post-training to support hard work, while the rest of the day stays balanced so the plan feels livable.";
    case "muscle_gain":
      return keepItSimple
        ? "Strong carb focus around training to fuel volume."
        : "Training days get a clearer carb emphasis around your session to support output and recovery, without turning the whole day into a constant carb load.";
    default: {
      const _e: never = goal;
      return _e;
    }
  }
}

export function buildFatGuidance(
  isRestDay: boolean,
  keepItSimple: boolean,
): string {
  if (isRestDay) {
    return keepItSimple
      ? "Fats spread normally across meals."
      : "Fats can sit comfortably across meals today — prioritize overall consistency and foods you digest well.";
  }
  return keepItSimple
    ? "Keep fats lighter right before training; use them more in other meals."
    : "Fats stay adequate overall, but we lean them slightly away from the immediate pre-training meal so digestion does not fight your session. Other meals carry a bit more fat for satisfaction.";
}
