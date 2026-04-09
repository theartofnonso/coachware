import { distributeByWeights } from "@/lib/distribute-integers";
import type { MealRole } from "@/types/nutrition";

/**
 * Keeps fats moderate overall; biases away from immediate pre-workout digestion load.
 */
export function allocateFatsAcrossMeals(
  totalFatsG: number,
  roles: MealRole[],
  isRestDay: boolean,
): number[] {
  const rounded = Math.round(totalFatsG);
  if (roles.length === 0) {
    return [];
  }
  if (isRestDay) {
    return distributeByWeights(
      rounded,
      roles.map(() => 1),
    );
  }

  const weights = roles.map((role) => {
    if (role === "pre_workout") {
      return 0.72;
    }
    if (role === "post_workout") {
      return 0.88;
    }
    return 1.08;
  });

  return distributeByWeights(rounded, weights);
}
