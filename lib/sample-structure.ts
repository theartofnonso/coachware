import type { MealRole, TrainingTime } from "@/types/nutrition";

export function sampleStructureForMeal(
  role: MealRole,
  trainingTime: TrainingTime,
  isRestDay: boolean,
): string {
  if (isRestDay || role === "meal") {
    return "Think protein plus a normal carb (starch or fruit), vegetables, and a little fat so the meal feels done.";
  }

  if (role === "pre_workout") {
    if (trainingTime === "early_morning") {
      return "If you need something: lean protein and a light carb (fruit, toast, yogurt) within about 60 to 90 minutes, or skip it and train fasted if that is your thing.";
    }
    return "Lean protein, easy carbs like rice, potato, fruit, or bread, and lighter fat so you feel light on your feet.";
  }

  if (role === "post_workout") {
    return "Lean protein, a bigger scoop of carbs to refill, vegetables, and keep fat moderate here.";
  }

  return "Protein, lots of vegetables, and most of your added fats so the meal fills you up away from the gym.";
}
