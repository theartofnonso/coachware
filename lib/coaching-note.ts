import type { Goal, TrainingTime } from "@/types/nutrition";
import { GOAL_LABELS, TRAINING_TIME_LABELS } from "@/constants/labels";
import { formatAroundTime } from "@/lib/training-clock";

export function buildCoachingNote(
  goal: Goal,
  trainingPhase: TrainingTime,
  isRestDay: boolean,
  trainingStartMinutes: number | null,
): string {
  const goalLabel = GOAL_LABELS[goal];
  const phaseLabel = TRAINING_TIME_LABELS[trainingPhase];

  if (isRestDay) {
    return `For ${goalLabel.toLowerCase()} on a rest day, think steady rhythm: protein spread through the day, carbs without a workout story, and enough fat that meals feel satisfying. That keeps hunger and recovery kinder.`;
  }

  const performanceLine =
    goal === "muscle_gain"
      ? "I tucked extra carbs around your session so you have juice to train and something solid to land on after."
      : goal === "fat_loss"
        ? "Carbs still cluster near training so the gym feels okay, while the rest of the day stays a little lighter for your deficit."
        : "Carbs lean toward your workout for performance, without making every meal a carb fest.";

  const timingLine =
    trainingPhase === "evening"
      ? "Evening sessions mean more carb love in the meals that wrap your workout, with steadier protein earlier."
      : trainingPhase === "early_morning"
        ? "Early birds often do fine with a tiny optional bite beforehand and a real meal after. That is where I stacked carbs."
        : "Midday training means breakfast stays normal, you eat before you go in, and the meal after carries most of the recovery weight.";

  const clockLine =
    trainingStartMinutes !== null
      ? `I penciled times around ${formatAroundTime(trainingStartMinutes)}. Slide them if your real start moves. `
      : "";

  const sessionBit =
    trainingPhase === "rest_day" ? "" : ` (${phaseLabel.toLowerCase()})`;

  return `${clockLine}You told me ${goalLabel.toLowerCase()} on a training day${sessionBit}. ${performanceLine} ${timingLine} Protein stays spread out so you are not living off one giant dinner. Try this rhythm for a week, notice how you feel, then tweak portions before you rewrite the whole plan.`;
}
