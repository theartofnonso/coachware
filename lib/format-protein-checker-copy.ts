import type {
  ProteinCheckerInput,
  ProteinCheckerResult,
} from "@/types/protein-checker";

export function formatProteinCheckerPlainText(
  input: ProteinCheckerInput,
  result: ProteinCheckerResult,
): string {
  const lines: string[] = [
    "Nonso Biose · Protein checker",
    "",
    "Inputs",
    `Protein: ${input.proteinGrams} g`,
    `Calories: ${input.calories}`,
  ];
  if (input.foodName) {
    lines.push(`Food: ${input.foodName}`);
  }
  lines.push(
    "",
    "Result",
    result.classificationHeadline,
    `Protein per 100 calories: ${result.densityGramsDisplay}`,
    "",
    result.explanation,
    "",
    "Suggestion",
    result.improvement,
    "",
    "Note",
    result.coachingNote,
  );
  return lines.join("\n");
}
