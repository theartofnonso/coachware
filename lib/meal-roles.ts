import type { MealRole, TrainingTime } from "@/types/nutrition";

export function assignMealRoles(
  trainingTime: TrainingTime,
  mealCount: number,
  isRestDay: boolean,
): MealRole[] {
  if (isRestDay) {
    return Array.from({ length: mealCount }, () => "meal" as const);
  }
  switch (trainingTime) {
    case "early_morning":
      return earlyMorningRoles(mealCount);
    case "late_morning":
    case "afternoon":
      return middayRoles(mealCount);
    case "evening":
      return eveningRoles(mealCount);
    case "rest_day":
      return Array.from({ length: mealCount }, () => "meal" as const);
    default: {
      const _e: never = trainingTime;
      return _e;
    }
  }
}

function earlyMorningRoles(n: number): MealRole[] {
  const base: MealRole[] = ["pre_workout", "post_workout"];
  while (base.length < n) {
    base.push("other");
  }
  return base.slice(0, n);
}

function middayRoles(n: number): MealRole[] {
  if (n === 2) {
    return ["pre_workout", "post_workout"];
  }
  if (n === 3) {
    return ["other", "pre_workout", "post_workout"];
  }
  if (n === 4) {
    return ["other", "pre_workout", "post_workout", "other"];
  }
  return ["other", "pre_workout", "post_workout", "other", "other"];
}

function eveningRoles(n: number): MealRole[] {
  if (n === 2) {
    return ["pre_workout", "post_workout"];
  }
  if (n === 3) {
    return ["other", "pre_workout", "post_workout"];
  }
  if (n === 4) {
    return ["other", "other", "pre_workout", "post_workout"];
  }
  return ["other", "other", "pre_workout", "post_workout", "other"];
}

export function buildMealDisplayLabel(
  mealIndex: number,
  role: MealRole,
  trainingTime: TrainingTime,
  isRestDay: boolean,
): string {
  const n = mealIndex + 1;
  if (isRestDay || role === "meal") {
    return `Meal ${n}`;
  }
  if (role === "other") {
    return `Meal ${n}`;
  }
  if (role === "pre_workout") {
    if (trainingTime === "early_morning") {
      return `Meal ${n}: pre workout (small)`;
    }
    return `Meal ${n}: pre workout`;
  }
  return `Meal ${n}: post workout`;
}
