import type { Goal, TrainingTime, TrainingType } from "@/types/nutrition";

export const GOAL_LABELS: Record<Goal, string> = {
  fat_loss: "Fat loss",
  recomposition: "Recomposition",
  muscle_gain: "Muscle gain",
};

export const TRAINING_TIME_LABELS: Record<TrainingTime, string> = {
  early_morning: "Early morning",
  late_morning: "Late morning",
  afternoon: "Afternoon",
  evening: "Evening",
  rest_day: "Rest day",
};

export const TRAINING_TYPE_LABELS: Record<TrainingType, string> = {
  lower_body: "Lower body / glute focused",
  upper_body: "Upper body",
  full_body: "Full body",
  cardio: "Cardio / conditioning",
  rest_day: "Rest day",
};
