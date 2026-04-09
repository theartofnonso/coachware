import type { Goal, TrainingTime, TrainingType } from "@/types/nutrition";
import { GOAL_LABELS, TRAINING_TIME_LABELS, TRAINING_TYPE_LABELS } from "@/constants/labels";

export function buildCoachingNote(
  goal: Goal,
  trainingTime: TrainingTime,
  trainingType: TrainingType,
  isRestDay: boolean,
  keepItSimple: boolean,
): string {
  const goalLabel = GOAL_LABELS[goal];
  const timeLabel = TRAINING_TIME_LABELS[trainingTime];
  const typeLabel = TRAINING_TYPE_LABELS[trainingType];

  if (keepItSimple) {
    if (isRestDay) {
      return `Rest day plan for ${goalLabel.toLowerCase()}: even meals, steady protein, no workout timing — simple to repeat.`;
    }
    return `${goalLabel} with ${typeLabel.toLowerCase()} in the ${timeLabel.toLowerCase()}: carbs cluster around training; protein stays steady meal to meal.`;
  }

  if (isRestDay) {
    return `For ${goalLabel.toLowerCase()} on a rest day, the priority is an even rhythm: protein spread across meals, carbs distributed without a workout window, and fats where they help you feel satisfied. That keeps recovery and appetite predictable.`;
  }

  const performanceLine =
    goal === "muscle_gain"
      ? "We leaned into carbs around your session so you have fuel for quality work and a clear recovery meal."
      : goal === "fat_loss"
        ? "Carbs still hug training for how you feel in the gym, while the rest of the day stays a little leaner to support your deficit."
        : "Carbs are biased toward training for performance, without making the whole day feel like a constant refeed.";

  const timingLine =
    trainingTime === "evening"
      ? "Evening training means reserving carbohydrate emphasis for the meals that flank your session, while earlier eating stays protein-forward."
      : trainingTime === "early_morning"
        ? "Early sessions often feel best with a light optional pre-training bite and a strong post-training meal — that is where we placed carbohydrate emphasis."
        : "Your training sits mid-day, so breakfast stays balanced, pre-training fuel sits about an hour out, and the meal after training carries recovery weight.";

  const sessionBit =
    trainingTime === "rest_day" ? "" : ` (${timeLabel.toLowerCase()})`;

  return `You are aiming for ${goalLabel.toLowerCase()} with ${typeLabel.toLowerCase()}${sessionBit}. ${performanceLine} ${timingLine} Protein stays evenly distributed so muscle support is steady, not dependent on one huge dinner. Small adjustments beat perfect spreadsheets — run this for a week, notice energy and hunger, then tweak portions, not the whole structure.`;
}
