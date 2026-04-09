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
      `Daily calories should be between ${MIN_CALORIES.toLocaleString()} and ${MAX_CALORIES.toLocaleString()} for sensible planning.`,
    );
  }

  for (const [, val, name] of [
    ["protein", input.dailyProteinG, "Protein"],
    ["carbs", input.dailyCarbsG, "Carbs"],
    ["fats", input.dailyFatsG, "Fats"],
  ] as const) {
    if (!Number.isFinite(val) || val < MIN_MACRO_G || val > MAX_MACRO_G) {
      errors.push(
        `${name} should be a number between ${MIN_MACRO_G} and ${MAX_MACRO_G} grams.`,
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
      "Your macros do not line up closely with your calorie target (protein and carbs are 4 kcal/g, fats 9 kcal/g). Adjust one side so the day adds up.",
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
      "With this many meals, protein per sitting is on the low side. Fewer meals or a higher protein target may feel more satisfying.",
    );
  }
  if (avgProtein > 55) {
    warnings.push(
      "Protein per meal is quite high. If it feels heavy, consider an extra meal or spreading intake slightly differently.",
    );
  }

  if (input.dailyCarbsG < 50 && !isRestDay) {
    warnings.push(
      "Carbs are very low for a training day. You can still run this plan, but performance and recovery may feel flatter.",
    );
  }

  if (input.dailyCalories < 1200) {
    warnings.push(
      "Calories are aggressive. This structure is still practical, but energy and recovery need watching.",
    );
  }

  return warnings;
}
