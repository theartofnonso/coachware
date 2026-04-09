import type { Goal, TrainingDay, TrainingTime } from "@/types/nutrition";

export const GOAL_LABELS: Record<Goal, string> = {
  fat_loss: "Fat loss",
  recomposition: "Balance / maintenance",
  muscle_gain: "Muscle gain",
};

export const GOAL_HINTS: Record<Goal, string> = {
  fat_loss:
    "Eating in a deficit. We still put extra carbs near your workout so you have gas in the tank.",
  recomposition:
    "Mostly holding steady or changing slowly. Carbs sit a bit closer to training, normal elsewhere.",
  muscle_gain:
    "Building or pushing hard in the gym. Carbs lean toward before and after you train.",
};

export const TRAINING_TIME_LABELS: Record<TrainingTime, string> = {
  early_morning: "Early morning",
  late_morning: "Late morning",
  afternoon: "Afternoon",
  evening: "Evening",
  rest_day: "Rest day",
};

export const TRAINING_DAY_LABELS: Record<TrainingDay, string> = {
  training: "Workout day",
  rest_day: "Rest day",
};
