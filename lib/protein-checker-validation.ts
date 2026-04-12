import type { ProteinCheckerInput } from "@/types/protein-checker";

export interface ProteinFormRaw {
  proteinGrams: string;
  calories: string;
  foodName: string;
}

function parsePositiveNumber(s: string): number | null {
  const t = s.trim();
  if (t === "") {
    return null;
  }
  const n = Number.parseFloat(t);
  if (!Number.isFinite(n)) {
    return null;
  }
  return n;
}

export function validateProteinCheckerForm(
  raw: ProteinFormRaw,
): { ok: true; input: ProteinCheckerInput } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  const protein = parsePositiveNumber(raw.proteinGrams);
  const calories = parsePositiveNumber(raw.calories);

  if (protein === null) {
    errors.push("Enter protein in grams.");
  } else if (protein <= 0) {
    errors.push("Protein must be greater than zero.");
  } else if (protein > 500) {
    errors.push("That protein amount looks unrealistically high for one check. Double-check the number.");
  }

  if (calories === null) {
    errors.push("Enter calories.");
  } else if (calories <= 0) {
    errors.push("Calories must be greater than zero.");
  } else if (calories > 50_000) {
    errors.push("That calorie amount is too high for this tool. Use a single serving or meal.");
  }

  if (errors.length > 0 || protein === null || calories === null) {
    return { ok: false, errors };
  }

  const foodTrim = raw.foodName.trim();
  const foodName = foodTrim === "" ? null : foodTrim.slice(0, 120);

  return {
    ok: true,
    input: {
      proteinGrams: Math.round(protein * 100) / 100,
      calories: Math.round(calories * 100) / 100,
      foodName,
    },
  };
}
