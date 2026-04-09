import type { Goal, UserInputs } from "@/types/nutrition";

export type FixedMealCount = 3 | 4 | 5;

export function resolveMealCount(
  preference: UserInputs["mealPreference"],
  input: UserInputs,
): FixedMealCount {
  if (preference === "recommend") {
    return recommendMealCount(input);
  }
  return preference;
}

function recommendMealCount(input: UserInputs): FixedMealCount {
  const { dailyCalories, dailyProteinG, goal } = input;

  let n: FixedMealCount = 4;
  if (dailyCalories < 1400) {
    n = 3;
  } else if (dailyCalories > 2600) {
    n = 5;
  } else {
    n = 4;
  }

  const avg = (meals: FixedMealCount) => dailyProteinG / meals;

  if (goal === "muscle_gain" && dailyCalories > 2200 && n === 4) {
    n = 5;
  }
  if (goal === "fat_loss" && dailyCalories < 1600 && n === 5) {
    n = 4;
  }

  if (avg(n) > 42 && n < 5) {
    n = 5;
  }
  if (avg(n) < 22 && n > 3) {
    n = 3;
  }

  if (dailyProteinG >= 160 && n === 3 && avg(4) <= 45) {
    n = 4;
  }

  return Math.max(3, Math.min(5, n)) as FixedMealCount;
}

export function goalCarbEmphasis(goal: Goal): { pre: number; post: number; away: number } {
  switch (goal) {
    case "fat_loss":
      return { pre: 0.95, post: 1.1, away: 0.72 };
    case "recomposition":
      return { pre: 1.05, post: 1.25, away: 0.78 };
    case "muscle_gain":
      return { pre: 1.15, post: 1.35, away: 0.82 };
  }
}
