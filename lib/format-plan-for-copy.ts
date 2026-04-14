import type { NutritionPlan } from "@/types/nutrition";

export function formatPlanForCopy(plan: NutritionPlan): string {
  const s = plan.summary;
  const lines: string[] = [
    "Your day at a glance",
    `Calories: ${s.dailyCalories}`,
    `Protein: ${s.proteinG} g | Carbs: ${s.carbsG} g | Fats: ${s.fatsG} g`,
    `Meals: ${s.mealCount}`,
    `Goal: ${s.goalLabel}`,
    `Today: ${s.trainingDayLabel}, ${s.trainingClockSummary}`,
    "",
    "How to pace your meals",
    ...plan.mealTimingLines.map((l) => `• ${l}`),
    "",
    "Rough meal times",
    ...plan.meals.map((m) => `• ${m.displayLabel}: ${m.approximateWindow}`),
    "",
    "Protein per meal",
    plan.proteinGuidance,
    ...plan.meals.map((m) => `• ${m.displayLabel}: ${m.proteinG} g`),
    "",
    "Carbs per meal",
    plan.carbGuidance,
    ...plan.meals.map((m) => `• ${m.displayLabel}: ${m.carbsG} g`),
    "",
    "Fats per meal",
    plan.fatGuidance,
    ...plan.meals.map((m) => `• ${m.displayLabel}: ${m.fatsG} g`),
    "",
    "What a plate could look like",
    ...plan.meals.map((m) => `• ${m.displayLabel}: ${m.sampleStructure}`),
    "",
    "Why I set it up this way",
    plan.coachingNote,
  ];

  if (plan.warnings.length > 0) {
    lines.push("", "Worth knowing", ...plan.warnings.map((w) => `• ${w}`));
  }

  return lines.join("\n");
}
