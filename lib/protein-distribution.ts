import { distributeIntegersEvenly } from "@/lib/distribute-integers";

export function distributeProteinAcrossMeals(
  totalProteinG: number,
  mealCount: number,
): number[] {
  return distributeIntegersEvenly(Math.round(totalProteinG), mealCount);
}
