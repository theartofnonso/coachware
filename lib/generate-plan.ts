import { GOAL_LABELS, TRAINING_DAY_LABELS } from "@/constants/labels";
import { allocateCarbsAcrossMeals } from "@/lib/carb-allocation";
import { buildCoachingNote } from "@/lib/coaching-note";
import { allocateFatsAcrossMeals } from "@/lib/fat-allocation";
import { buildApproximateMealWindowLines } from "@/lib/meal-clock-windows";
import { buildCarbGuidance, buildFatGuidance, buildProteinGuidance } from "@/lib/macro-guidance";
import { assignMealRoles, buildMealDisplayLabel } from "@/lib/meal-roles";
import { buildMealTimingLines } from "@/lib/meal-timing";
import { distributeProteinAcrossMeals } from "@/lib/protein-distribution";
import { sampleStructureForMeal } from "@/lib/sample-structure";
import { deriveTrainingPhase, formatAroundTime } from "@/lib/training-clock";
import { collectSoftWarnings } from "@/lib/validation";
import type { NutritionPlan, UserInputs } from "@/types/nutrition";

export function generateNutritionPlan(input: UserInputs): NutritionPlan {
  const isRestDay = input.trainingDay === "rest_day";
  const trainingPhase = isRestDay
    ? "rest_day"
    : deriveTrainingPhase(input.trainingStartMinutes ?? 12 * 60);

  const mealCount = input.mealPreference;
  const roles = assignMealRoles(trainingPhase, mealCount, isRestDay);

  const protein = distributeProteinAcrossMeals(input.dailyProteinG, mealCount);
  const carbs = allocateCarbsAcrossMeals(
    input.dailyCarbsG,
    roles,
    input.goal,
    isRestDay,
  );
  const fats = allocateFatsAcrossMeals(input.dailyFatsG, roles, isRestDay);

  const windowLines = buildApproximateMealWindowLines(
    input.trainingStartMinutes ?? 12 * 60,
    roles,
    isRestDay,
  );

  const meals = roles.map((role, index) => ({
    index,
    role,
    displayLabel: buildMealDisplayLabel(
      index,
      role,
      trainingPhase,
      isRestDay,
    ),
    proteinG: protein[index] ?? 0,
    carbsG: carbs[index] ?? 0,
    fatsG: fats[index] ?? 0,
    sampleStructure: sampleStructureForMeal(role, trainingPhase, isRestDay),
    approximateWindow: windowLines[index] ?? "",
  }));

  const proteinGuidance = buildProteinGuidance(protein);
  const carbGuidance = buildCarbGuidance(input.goal, isRestDay);
  const fatGuidance = buildFatGuidance(isRestDay);
  const mealTimingLines = buildMealTimingLines(
    trainingPhase,
    roles,
    isRestDay,
    input.trainingStartMinutes,
  );
  const coachingNote = buildCoachingNote(
    input.goal,
    trainingPhase,
    isRestDay,
    input.trainingStartMinutes,
  );

  const warnings = collectSoftWarnings(input, mealCount, isRestDay);

  const trainingClockSummary = isRestDay
    ? "No workout today"
    : input.trainingStartMinutes !== null
      ? `Around ${formatAroundTime(input.trainingStartMinutes)}`
      : "Add a train time";

  return {
    summary: {
      dailyCalories: Math.round(input.dailyCalories),
      proteinG: Math.round(input.dailyProteinG),
      carbsG: Math.round(input.dailyCarbsG),
      fatsG: Math.round(input.dailyFatsG),
      mealCount,
      trainingClockSummary,
      goalLabel: GOAL_LABELS[input.goal],
      trainingDayLabel: TRAINING_DAY_LABELS[input.trainingDay],
    },
    isRestDay,
    mealTimingLines,
    proteinGuidance,
    carbGuidance,
    fatGuidance,
    meals,
    coachingNote,
    warnings,
  };
}
