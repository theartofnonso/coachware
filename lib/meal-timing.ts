import type { MealRole, TrainingTime } from "@/types/nutrition";
import { formatAroundTime } from "@/lib/training-clock";

export function buildMealTimingLines(
  trainingTime: TrainingTime,
  roles: MealRole[],
  isRestDay: boolean,
  trainingStartMinutes: number | null,
): string[] {
  if (isRestDay) {
    return [
      "Rest day: forget workout windows and just space meals so you are not starving or stuffed.",
      "Keep protein fairly steady across the day. Simple usually sticks better than perfect timing.",
      "Carbs can spread out. Today is more about rhythm than performance.",
    ];
  }

  const hasPre = roles.includes("pre_workout");
  const hasPost = roles.includes("post_workout");
  const onlyPrePost =
    roles.length === 2 &&
    hasPre &&
    hasPost &&
    !roles.includes("other");

  const lines: string[] = [];

  if (trainingStartMinutes !== null) {
    const t = formatAroundTime(trainingStartMinutes);
    lines.push(
      `You said around ${t} for training. The times below are a sketch, not a stopwatch.`,
    );
  }

  switch (trainingTime) {
    case "early_morning":
      lines.push(
        "Very early? A small bite beforehand is optional. Plenty of people run on coffee or water and eat properly after.",
      );
      if (hasPost) {
        lines.push(
          "Afterwards, let your biggest carb meal land when you can sit down and refuel.",
        );
      }
      break;
    case "late_morning":
    case "afternoon":
      lines.push(
        "Try to finish a solid pre workout meal about 60 to 90 minutes before you head in, so you are fueled but not stuffed.",
      );
      if (hasPost) {
        lines.push(
          "Then get a real meal in within an hour or two after you finish. That one anchors recovery.",
        );
      }
      if (!onlyPrePost) {
        lines.push(
          "Meals away from the gym can stay protein and veg forward. Carbs do not need to be huge there unless you want them.",
        );
      } else {
        lines.push(
          "With only two meals, pack protein, carbs, and veg into both so the day still feels complete.",
        );
      }
      break;
    case "evening":
      lines.push(
        onlyPrePost
          ? "Two eating times today: one before you train, one after. Make both count."
          : "Earlier eats can be satisfying and protein forward. Save a bigger share of carbs for the meals that hug your evening session.",
      );
      if (hasPre && hasPost) {
        lines.push(
          "Before training, lean protein and carbs with lighter fat usually sit better. After, add a fuller carb portion with your protein.",
        );
      }
      break;
    default:
      break;
  }

  lines.push(
    "Close enough is good enough. Showing up consistently matters more than nailing the clock.",
  );

  return lines;
}
