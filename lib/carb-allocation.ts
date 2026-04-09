import { goalCarbEmphasis } from "@/lib/recommend-meals";
import { distributeByWeights } from "@/lib/distribute-integers";
import type { Goal, MealRole } from "@/types/nutrition";

export function allocateCarbsAcrossMeals(
  totalCarbsG: number,
  roles: MealRole[],
  goal: Goal,
  isRestDay: boolean,
): number[] {
  const rounded = Math.round(totalCarbsG);
  if (roles.length === 0) {
    return [];
  }
  if (isRestDay) {
    return distributeByWeights(
      rounded,
      roles.map(() => 1),
    );
  }

  const emphasis = goalCarbEmphasis(goal);
  const weights = roles.map((role) => {
    if (role === "pre_workout") {
      return emphasis.pre;
    }
    if (role === "post_workout") {
      return emphasis.post;
    }
    return emphasis.away;
  });

  return distributeByWeights(rounded, weights);
}
