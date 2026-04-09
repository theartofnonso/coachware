export type Goal = "fat_loss" | "recomposition" | "muscle_gain";

export type MealPreference = 3 | 4 | 5 | "recommend";

export type TrainingTime =
  | "early_morning"
  | "late_morning"
  | "afternoon"
  | "evening"
  | "rest_day";

export type TrainingType =
  | "lower_body"
  | "upper_body"
  | "full_body"
  | "cardio"
  | "rest_day";

/** Relative position of each meal for timing and macro emphasis */
export type MealRole =
  | "pre_workout"
  | "post_workout"
  | "other"
  | "meal";

export interface UserInputs {
  goal: Goal;
  dailyCalories: number;
  dailyProteinG: number;
  dailyCarbsG: number;
  dailyFatsG: number;
  mealPreference: MealPreference;
  trainingTime: TrainingTime;
  trainingType: TrainingType;
  keepItSimple: boolean;
}

export interface MealSlot {
  index: number;
  role: MealRole;
  displayLabel: string;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  sampleStructure: string;
}

export interface PlanSummary {
  dailyCalories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  mealCount: number;
  trainingTimeLabel: string;
  goalLabel: string;
  trainingTypeLabel: string;
}

export interface NutritionPlan {
  summary: PlanSummary;
  isRestDay: boolean;
  keepItSimple: boolean;
  mealTimingLines: string[];
  proteinGuidance: string;
  carbGuidance: string;
  fatGuidance: string;
  meals: MealSlot[];
  coachingNote: string;
  warnings: string[];
}

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}
