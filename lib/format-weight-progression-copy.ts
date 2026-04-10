import type { WeightProgressionResult } from "@/types/weight-progression";

export function formatWeightProgressionForCopy(
  result: WeightProgressionResult,
): string {
  const lines: string[] = [
    "Progression decision",
    result.decisionHeadline,
  ];

  if (result.suggestedWeightLabel !== null) {
    lines.push("", "Suggested load to try", result.suggestedWeightLabel);
  }

  lines.push(
    "",
    "Why this call",
    ...result.whyParagraphs.map((p) => `• ${p}`),
    "",
    "Suggested next step",
    result.nextStep,
    "",
    "Example progression path",
    ...result.examplePath.map((s) => `• ${s.label}: ${s.detail}`),
    "",
    "Coaching note",
    result.coachingNote,
  );

  return lines.join("\n");
}
