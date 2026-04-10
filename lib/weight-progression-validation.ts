import type {
  WeightProgressionInput,
  WeightProgressionValidation,
} from "@/types/weight-progression";

const MAX_SETS = 5;

/**
 * Validates raw form-like values and returns either errors or a typed input.
 */
export function validateWeightProgressionInput(raw: {
  exerciseName: string;
  repLower: string;
  repUpper: string;
  workingWeight: string;
  unit: WeightProgressionInput["unit"];
  setCount: number;
  repsPerSet: string[];
  difficulty: WeightProgressionInput["difficulty"];
}): WeightProgressionValidation & { input?: WeightProgressionInput } {
  const errors: string[] = [];

  const repLower = Number.parseInt(raw.repLower.trim(), 10);
  const repUpper = Number.parseInt(raw.repUpper.trim(), 10);

  if (!Number.isFinite(repLower) || repLower < 1) {
    errors.push("Enter a lower rep bound of at least 1.");
  }
  if (!Number.isFinite(repUpper) || repUpper < 1) {
    errors.push("Enter an upper rep bound of at least 1.");
  }
  if (
    Number.isFinite(repLower) &&
    Number.isFinite(repUpper) &&
    repLower > repUpper
  ) {
    errors.push("Lower rep bound should be the same or less than the upper bound.");
  }

  const w = Number.parseFloat(raw.workingWeight.replace(/,/g, "").trim());
  if (!Number.isFinite(w) || w <= 0) {
    errors.push("Enter a working weight greater than zero.");
  }

  if (
    !Number.isInteger(raw.setCount) ||
    raw.setCount < 1 ||
    raw.setCount > MAX_SETS
  ) {
    errors.push(`Choose between 1 and ${MAX_SETS} sets.`);
  }

  const reps: number[] = [];
  for (let i = 0; i < raw.setCount; i++) {
    const cell = raw.repsPerSet[i]?.trim() ?? "";
    if (cell === "") {
      errors.push(`Enter reps for set ${i + 1}.`);
      continue;
    }
    const r = Number.parseInt(cell, 10);
    if (!Number.isFinite(r) || r < 0) {
      errors.push(`Set ${i + 1}: use a rep count of zero or more.`);
    } else {
      reps.push(r);
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const input: WeightProgressionInput = {
    exerciseName: raw.exerciseName.trim(),
    repLower,
    repUpper,
    workingWeight: w,
    unit: raw.unit,
    setCount: raw.setCount,
    repsPerSet: reps,
    difficulty: raw.difficulty,
  };

  return { ok: true, errors: [], input };
}
