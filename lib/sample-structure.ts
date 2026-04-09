import type { MealRole, TrainingTime } from "@/types/nutrition";

export function sampleStructureForMeal(
  role: MealRole,
  trainingTime: TrainingTime,
  keepItSimple: boolean,
  isRestDay: boolean,
): string {
  if (isRestDay || role === "meal") {
    return keepItSimple
      ? "Protein + carbs + vegetables"
      : "Protein anchor, a sensible carb portion (starch or fruit), vegetables, and a little fat for satisfaction.";
  }

  if (role === "pre_workout") {
    if (trainingTime === "early_morning") {
      return keepItSimple
        ? "Small: protein + easy carbs"
        : "Something small if you need it: lean protein plus a light, easy carb (fruit, toast, or yogurt) 60–90 minutes out — or train fasted if that suits you.";
    }
    return keepItSimple
      ? "Lean protein + easy carbs"
      : "Lean protein with easy-to-digest carbs (rice, potato, fruit, or bread) and lighter fats so you feel ready to move.";
  }

  if (role === "post_workout") {
    return keepItSimple
      ? "Lean protein + more carbs"
      : "Lean protein with a larger carb portion to refill fuel, plus vegetables; keep fats moderate here.";
  }

  return keepItSimple
    ? "Protein + vegetables + fats"
    : "Protein with plenty of vegetables and most of your added fats — filling and steady away from the session.";
}
