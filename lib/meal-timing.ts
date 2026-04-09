import type { MealRole, TrainingTime, TrainingType } from "@/types/nutrition";

export function buildMealTimingLines(
  trainingTime: TrainingTime,
  trainingType: TrainingType,
  roles: MealRole[],
  isRestDay: boolean,
  keepItSimple: boolean,
): string[] {
  if (isRestDay) {
    return keepItSimple
      ? [
          "Space meals evenly so hunger stays predictable.",
          "Keep protein steady across the day.",
        ]
      : [
          "On a rest day, skip workout windows and aim for evenly spaced meals.",
          "Spread protein fairly evenly — it makes adherence easier than chasing perfect timing.",
          "Carbs can sit more evenly across meals since performance timing matters less today.",
        ];
  }

  const hasPre = roles.includes("pre_workout");
  const hasPost = roles.includes("post_workout");
  const typeHint =
    trainingType === "cardio"
      ? "conditioning"
      : trainingType === "lower_body"
        ? "lower-body"
        : trainingType === "upper_body"
          ? "upper-body"
          : trainingType === "full_body"
            ? "full-body"
            : "training";

  const lines: string[] = [];

  switch (trainingTime) {
    case "early_morning":
      lines.push(
        keepItSimple
          ? "Optional small bite before training; prioritize food after."
          : "If you train very early, a small pre-training snack is optional — many people do well with coffee or water and a strong post-training meal.",
      );
      if (hasPost) {
        lines.push(
          keepItSimple
            ? "Eat your biggest carb meal after training."
            : "Place your most carb-forward meal in the hours after training to recover from your session.",
        );
      }
      break;
    case "late_morning":
    case "afternoon":
      lines.push(
        keepItSimple
          ? `Pre-training meal about 60–90 minutes before ${typeHint}.`
          : `Aim to finish a balanced pre-training meal about 60–90 minutes before ${typeHint} so you feel fueled but not overly full.`,
      );
      if (hasPost) {
        lines.push(
          keepItSimple
            ? "Eat again within 1–2 hours after training."
            : "Follow with a solid meal within about 1–2 hours after you finish — that is your recovery anchor.",
        );
      }
      lines.push(
        keepItSimple
          ? "Earlier meals: protein, vegetables, moderate carbs."
          : "Meals further from training stay protein-rich with vegetables; carbs need not be huge there unless you prefer them.",
      );
      break;
    case "evening":
      lines.push(
        keepItSimple
          ? "Front-load protein; put more carbs near your evening session."
          : "Earlier in the day, keep meals satisfying and protein-forward. Shift a larger share of carbs into the meals that bookend your evening session.",
      );
      if (hasPre && hasPost) {
        lines.push(
          keepItSimple
            ? "Pre-training: lighter fats. Post-training: carbs + protein."
            : "Pre-training, favor lean protein and carbs with lighter fats. Post-training, pair protein with a fuller carb portion.",
        );
      }
      break;
    default:
      break;
  }

  if (!keepItSimple && !isRestDay) {
    lines.push(
      "You do not need minute-perfect timing — consistency beats perfection.",
    );
  }

  return lines;
}
