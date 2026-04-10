import { GOAL_LABELS } from "@/constants/labels";
import type {
  CaloriesActivityLevel,
  CaloriesCalculatorInput,
  CaloriesCalculatorResult,
} from "@/types/calories-calculator";

const ACTIVITY_LABEL: Record<CaloriesActivityLevel, string> = {
  sedentary: "Mostly sitting / not very active",
  light: "Lightly active",
  moderate: "Moderately active",
  very: "Very active",
};

function activityLine(level: CaloriesActivityLevel): string {
  return ACTIVITY_LABEL[level];
}

export function formatCaloriesCalculatorPlainText(
  input: CaloriesCalculatorInput,
  result: CaloriesCalculatorResult,
): string {
  const lines: string[] = [
    "Nonso Biose · calories calculator",
    "",
    "Your inputs",
    `Sex: ${input.sex === "male" ? "Male" : "Female"}`,
    `Age: ${input.ageYears}`,
    `Height: ${input.heightCm} cm`,
    `Weight: ${input.weightKg} kg`,
    `Activity: ${activityLine(input.activityLevel)}`,
    `Goal: ${GOAL_LABELS[input.goal]}`,
  ];
  if (input.trainingDaysPerWeek !== null) {
    lines.push(`Training days per week: ${input.trainingDaysPerWeek}`);
  }
  lines.push(
    "",
    "Results",
    `Estimated maintenance: ${result.maintenanceCalories} kcal/day`,
    `Recommended starting target (${GOAL_LABELS[result.goal]}): ${result.recommendedCalories} kcal/day`,
    `Reference, fat loss style target: ${result.fatLossTarget} kcal/day`,
    `Reference, balance / maintenance style target: ${result.balanceTarget} kcal/day`,
    `Reference, muscle gain style target: ${result.muscleGainTarget} kcal/day`,
    "",
    ...result.explanationParagraphs.map((p) => p),
    "",
    "Coaching note",
    result.coachingNote,
  );
  if (result.clampMessage) {
    lines.push("", "Note", result.clampMessage);
  }
  return lines.join("\n");
}
