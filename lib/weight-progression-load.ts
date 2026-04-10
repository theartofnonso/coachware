import type { IncreaseConfidence, WeightUnit } from "@/types/weight-progression";

/** Used only for suggested load steps; callers may pass a fixed conservative category. */
type ExerciseCategory =
  | "lower_compound"
  | "upper_compound"
  | "isolation"
  | "unsure";

function incrementKg(
  category: ExerciseCategory,
  confidence: IncreaseConfidence,
): number {
  const strong = confidence === "strong";
  switch (category) {
    case "lower_compound":
      return strong ? 5 : 2.5;
    case "upper_compound":
      return strong ? 2.5 : 2.5;
    case "isolation":
      return strong ? 2.5 : 1.25;
    case "unsure":
      return strong ? 2.5 : 1.25;
    default: {
      const _e: never = category;
      return _e;
    }
  }
}

function incrementLb(
  category: ExerciseCategory,
  confidence: IncreaseConfidence,
): number {
  const strong = confidence === "strong";
  switch (category) {
    case "lower_compound":
      return strong ? 10 : 5;
    case "upper_compound":
      return strong ? 5 : 5;
    case "isolation":
      return 2.5;
    case "unsure":
      return strong ? 5 : 2.5;
    default: {
      const _e: never = category;
      return _e;
    }
  }
}

export function roundWorkingWeight(w: number, unit: WeightUnit): number {
  if (unit === "kg") {
    return Math.round(w * 2) / 2;
  }
  return Math.round(w * 2) / 2;
}

export function nextHeavierWeight(
  current: number,
  unit: WeightUnit,
  category: ExerciseCategory,
  confidence: IncreaseConfidence,
): number {
  const inc =
    unit === "kg"
      ? incrementKg(category, confidence)
      : incrementLb(category, confidence);
  return roundWorkingWeight(current + inc, unit);
}

export function nextLighterWeight(
  current: number,
  unit: WeightUnit,
  category: ExerciseCategory,
): number {
  const inc =
    unit === "kg"
      ? incrementKg(category, "standard")
      : incrementLb(category, "standard");
  const raw = current - inc;
  const minStep = unit === "kg" ? 1 : 2.5;
  const rounded = roundWorkingWeight(raw, unit);
  if (rounded >= minStep) {
    return rounded;
  }
  const fallback = roundWorkingWeight(current * 0.9, unit);
  return Math.max(minStep, fallback);
}

export function formatWeight(value: number, unit: WeightUnit): string {
  const v = Number.isInteger(value) ? String(value) : value.toFixed(1);
  return unit === "kg" ? `${v} kg` : `${v} lb`;
}
