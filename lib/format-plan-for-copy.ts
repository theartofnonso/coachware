import type { NutritionPlan } from "@/types/nutrition";

export function formatPlanForCopy(plan: NutritionPlan): string {
  const s = plan.summary;
  const lines: string[] = [
    "Daily structure summary",
    "—",
    `Calories: ${s.dailyCalories}`,
    `Protein: ${s.proteinG} g | Carbs: ${s.carbsG} g | Fats: ${s.fatsG} g`,
    `Meals: ${s.mealCount}`,
    `Goal: ${s.goalLabel}`,
    `Training: ${s.trainingTypeLabel} · ${s.trainingTimeLabel}`,
    "",
    "Meal timing",
    ...plan.mealTimingLines.map((l) => `• ${l}`),
    "",
    "Protein",
    plan.proteinGuidance,
    "",
    "Carbs",
    plan.carbGuidance,
    "",
    "Fats",
    plan.fatGuidance,
    "",
    "Per-meal targets",
    ...plan.meals.map(
      (m) =>
        `${m.displayLabel}: ${m.proteinG} g P · ${m.carbsG} g C · ${m.fatsG} g F`,
    ),
    "",
    "Sample structure",
    ...plan.meals.map((m) => `${m.displayLabel}: ${m.sampleStructure}`),
    "",
    "Coaching note",
    plan.coachingNote,
  ];

  if (plan.warnings.length > 0) {
    lines.push("", "Heads-up", ...plan.warnings.map((w) => `• ${w}`));
  }

  return lines.join("\n");
}
