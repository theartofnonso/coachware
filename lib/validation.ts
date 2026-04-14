import type { UserInputs, ValidationResult } from "@/types/nutrition";

const MIN_CALORIES = 800;
const MAX_CALORIES = 12000;
const MIN_MACRO_G = 0;
const MAX_MACRO_G = 800;

function macroCalories(p: number, c: number, f: number): number {
  return p * 4 + c * 4 + f * 9;
}

export function validateInputs(input: UserInputs): ValidationResult {
  const errors: string[] = [];

  if (
    !Number.isFinite(input.dailyCalories) ||
    input.dailyCalories < MIN_CALORIES ||
    input.dailyCalories > MAX_CALORIES
  ) {
    errors.push(
      `Calories work best between ${MIN_CALORIES.toLocaleString()} and ${MAX_CALORIES.toLocaleString()} for this tool. Adjust if you meant something else.`,
    );
  }

  for (const [, val, name] of [
    ["protein", input.dailyProteinG, "Protein"],
    ["carbs", input.dailyCarbsG, "Carbs"],
    ["fats", input.dailyFatsG, "Fats"],
  ] as const) {
    if (!Number.isFinite(val) || val < MIN_MACRO_G || val > MAX_MACRO_G) {
      errors.push(
        `${name} needs to be a number between ${MIN_MACRO_G} and ${MAX_MACRO_G} grams.`,
      );
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const fromMacros = macroCalories(
    input.dailyProteinG,
    input.dailyCarbsG,
    input.dailyFatsG,
  );
  const ratio = fromMacros / input.dailyCalories;
  if (ratio < 0.75 || ratio > 1.2) {
    errors.push(
      "Those macros don't quite match the calories you entered (protein and carbs are 4 cal per gram, fat is 9). Nudge one side until it feels closer.",
    );
  }

  const isRestDay = input.trainingDay === "rest_day";
  if (
    !isRestDay &&
    (input.trainingStartMinutes === null ||
      input.trainingStartMinutes < 0 ||
      input.trainingStartMinutes > 1439)
  ) {
    errors.push(
      "Pop in roughly when you train so I can sketch meal times on the clock.",
    );
  }

  return errors.length === 0 ? { ok: true, errors: [] } : { ok: false, errors };
}

export function collectSoftWarnings(
  input: UserInputs,
  mealCount: number,
  isRestDay: boolean,
): string[] {
  const warnings: string[] = [];
  const avgProtein = input.dailyProteinG / mealCount;

  if (avgProtein < 20) {
    warnings.push(
      "Protein per meal is on the low side with this many sittings. Fewer meals or a higher protein target might feel better.",
    );
  }
  if (avgProtein > 55) {
    warnings.push(
      "That is a lot of protein per meal. If it feels heavy, try one more meal or spread things out a bit.",
    );
  }

  if (input.dailyCarbsG < 50 && !isRestDay) {
    warnings.push(
      "Carbs are pretty low for a workout day. This layout still works, but you might feel a bit flatter in training.",
    );
  }

  if (input.dailyCalories < 1200) {
    warnings.push(
      "Calories are on the sharp side. The layout still helps, just keep an eye on energy and recovery.",
    );
  }

  return warnings;
}
