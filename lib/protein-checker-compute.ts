import type {
  ProteinCheckerInput,
  ProteinCheckerResult,
  ProteinDensityLevel,
} from "@/types/protein-checker";

const COACHING_NOTE =
  "Use this as a quick guide, not a rulebook. You don't need perfect foods. Just aim to make better protein choices more often.";

function classifyLevel(density: number): ProteinDensityLevel {
  if (density >= 10) {
    return "high";
  }
  if (density >= 5) {
    return "moderate";
  }
  return "low";
}

function headlineForLevel(level: ProteinDensityLevel): string {
  switch (level) {
    case "high":
      return "High Protein";
    case "moderate":
      return "Moderate Protein";
    default:
      return "Low Protein";
  }
}

function emojiForLevel(level: ProteinDensityLevel): string {
  switch (level) {
    case "high":
      return "✅";
    case "moderate":
      return "⚖️";
    default:
      return "❌";
  }
}

function explanationForLevel(level: ProteinDensityLevel): string {
  switch (level) {
    case "high":
      return "Great protein choice. It supports fat loss and muscle building.";
    case "moderate":
      return "Decent, but can be improved for better results.";
    default:
      return "Low protein for the calories. Not ideal if your goal is fat loss or muscle gain.";
  }
}

function improvementForLevel(level: ProteinDensityLevel): string {
  switch (level) {
    case "high":
      return "No change needed. This is already a strong protein choice.";
    case "moderate":
      return "To improve this, add a lean protein like egg whites, chicken, or Greek yogurt.";
    default:
      return "For a better protein option, choose lean sources like chicken, Greek yogurt, cottage cheese, or turkey.";
  }
}

/**
 * Protein density = (protein g / calories) × 100 → grams protein per 100 calories.
 */
export function computeProteinDensity(input: ProteinCheckerInput): number {
  return (input.proteinGrams / input.calories) * 100;
}

export function computeProteinCheckerResult(
  input: ProteinCheckerInput,
): ProteinCheckerResult {
  const proteinDensity = computeProteinDensity(input);
  const level = classifyLevel(proteinDensity);
  const rounded = Math.round(proteinDensity * 10) / 10;
  const densityGramsDisplay =
    rounded % 1 === 0 ? `${rounded}g` : `${rounded.toFixed(1)}g`;

  return {
    proteinDensity,
    level,
    classificationHeadline: `${emojiForLevel(level)} ${headlineForLevel(level)}`,
    densityGramsDisplay,
    explanation: explanationForLevel(level),
    improvement: improvementForLevel(level),
    coachingNote: COACHING_NOTE,
  };
}
