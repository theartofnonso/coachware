import type { Goal } from "@/types/nutrition";

export function buildProteinGuidance(proteinPerMeal: number[]): string {
  const min = Math.min(...proteinPerMeal);
  const max = Math.max(...proteinPerMeal);
  return `I split protein as evenly as I could. Think roughly ${min} to ${max} g per meal so muscle support stays steady and you are not banking everything on one huge plate.`;
}

export function buildCarbGuidance(goal: Goal, isRestDay: boolean): string {
  if (isRestDay) {
    return "No workout today, so carbs can wander across meals. Eating enough still sets you up for tomorrow.";
  }
  switch (goal) {
    case "fat_loss":
      return "Carbs hug your session for energy and recovery, then ease off a bit the rest of the day when calories are tighter. That is the compromise between gym performance and sticking to the plan.";
    case "recomposition":
      return "Carbs get a little extra before and after you train, while the rest of the day stays balanced so nothing feels extreme.";
    case "muscle_gain":
      return "Training days get a clearer bump of carbs around your workout so you can push and recover, without grazing carbs all day long.";
    default: {
      const _e: never = goal;
      return _e;
    }
  }
}

export function buildFatGuidance(isRestDay: boolean): string {
  if (isRestDay) {
    return "Fat can sit wherever it keeps you happy today. Pick foods you digest well and repeat what works.";
  }
  return "Overall fat stays enough for health and taste, but I ease up right before you train so digestion is not competing with your workout. Other meals can carry a bit more for fullness.";
}
