export type Goal = "fat_loss" | "recomposition" | "muscle_gain";

export type MealPreference = 2 | 3 | 4 | 5;

export type TrainingTime =
  | "early_morning"
  | "late_morning"
  | "afternoon"
  | "evening"
  | "rest_day";

/** Training today vs rest; drives pre/post structure and clock inputs. */
export type TrainingDay = "training" | "rest_day";

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
  /** Minutes from midnight (0 to 1439). Null on rest day. */
  trainingStartMinutes: number | null;
  trainingDay: TrainingDay;
}

export interface MealSlot {
  index: number;
  role: MealRole;
  displayLabel: string;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  sampleStructure: string;
  /** Approximate clock window for this meal */
  approximateWindow: string;
}

export interface PlanSummary {
  dailyCalories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  mealCount: number;
  /** e.g. "Around 6:30 PM" or "Rest day" */
  trainingClockSummary: string;
  goalLabel: string;
  trainingDayLabel: string;
}

export interface NutritionPlan {
  summary: PlanSummary;
  isRestDay: boolean;
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
