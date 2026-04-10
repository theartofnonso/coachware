import type { Goal } from "@/types/nutrition";

export type CaloriesSex = "male" | "female";

export type CaloriesActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very";

/** Same three goals as meal timing: fat loss, balance / maintenance, muscle gain */
export type CaloriesGoal = Goal;

/** Parsed, validated inputs used for computation */
export interface CaloriesCalculatorInput {
  sex: CaloriesSex;
  ageYears: number;
  heightCm: number;
  weightKg: number;
  activityLevel: CaloriesActivityLevel;
  goal: CaloriesGoal;
  /** Optional 0 to 7; used lightly in coaching copy only */
  trainingDaysPerWeek: number | null;
}

export interface CaloriesCalculatorResult {
  maintenanceCalories: number;
  recommendedCalories: number;
  goal: CaloriesGoal;
  fatLossTarget: number;
  balanceTarget: number;
  muscleGainTarget: number;
  explanationParagraphs: string[];
  coachingNote: string;
  wasClamped: boolean;
  clampMessage: string | null;
}
