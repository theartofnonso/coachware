import {
  GOAL_LABELS,
  TRAINING_TIME_LABELS,
  TRAINING_TYPE_LABELS,
} from "@/constants/labels";
import { allocateCarbsAcrossMeals } from "@/lib/carb-allocation";
import { buildCoachingNote } from "@/lib/coaching-note";
import { allocateFatsAcrossMeals } from "@/lib/fat-allocation";
import { buildCarbGuidance, buildFatGuidance, buildProteinGuidance } from "@/lib/macro-guidance";
import { assignMealRoles, buildMealDisplayLabel } from "@/lib/meal-roles";
import { buildMealTimingLines } from "@/lib/meal-timing";
import { distributeProteinAcrossMeals } from "@/lib/protein-distribution";
import { resolveMealCount } from "@/lib/recommend-meals";
import { sampleStructureForMeal } from "@/lib/sample-structure";
import { collectSoftWarnings } from "@/lib/validation";
import type { NutritionPlan, UserInputs } from "@/types/nutrition";

export function generateNutritionPlan(input: UserInputs): NutritionPlan {
  const isRestDay =
    input.trainingTime === "rest_day" || input.trainingType === "rest_day";
  const mealCount = resolveMealCount(input.mealPreference, input);
  const roles = assignMealRoles(input.trainingTime, mealCount, isRestDay);

  const protein = distributeProteinAcrossMeals(input.dailyProteinG, mealCount);
  const carbs = allocateCarbsAcrossMeals(
    input.dailyCarbsG,
    roles,
    input.goal,
    isRestDay,
  );
  const fats = allocateFatsAcrossMeals(input.dailyFatsG, roles, isRestDay);

  const meals = roles.map((role, index) => ({
    index,
    role,
    displayLabel: buildMealDisplayLabel(
      index,
      role,
      input.trainingTime,
      isRestDay,
    ),
    proteinG: protein[index] ?? 0,
    carbsG: carbs[index] ?? 0,
    fatsG: fats[index] ?? 0,
    sampleStructure: sampleStructureForMeal(
      role,
      input.trainingTime,
      input.keepItSimple,
      isRestDay,
    ),
  }));

  const proteinGuidance = buildProteinGuidance(protein, input.keepItSimple);
  const carbGuidance = buildCarbGuidance(
    input.goal,
    isRestDay,
    input.keepItSimple,
  );
  const fatGuidance = buildFatGuidance(isRestDay, input.keepItSimple);
  const mealTimingLines = buildMealTimingLines(
    input.trainingTime,
    input.trainingType,
    roles,
    isRestDay,
    input.keepItSimple,
  );
  const coachingNote = buildCoachingNote(
    input.goal,
    input.trainingTime,
    input.trainingType,
    isRestDay,
    input.keepItSimple,
  );

  const warnings = collectSoftWarnings(input, mealCount, isRestDay);

  return {
    summary: {
      dailyCalories: Math.round(input.dailyCalories),
      proteinG: Math.round(input.dailyProteinG),
      carbsG: Math.round(input.dailyCarbsG),
      fatsG: Math.round(input.dailyFatsG),
      mealCount,
      trainingTimeLabel: TRAINING_TIME_LABELS[input.trainingTime],
      goalLabel: GOAL_LABELS[input.goal],
      trainingTypeLabel: TRAINING_TYPE_LABELS[input.trainingType],
    },
    isRestDay,
    keepItSimple: input.keepItSimple,
    mealTimingLines,
    proteinGuidance,
    carbGuidance,
    fatGuidance,
    meals,
    coachingNote,
    warnings,
  };
}
