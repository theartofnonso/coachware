import { assessRepRangePerformance } from "@/lib/weight-progression-assessment";
import { determineProgressionDecision } from "@/lib/weight-progression-decision";
import {
  formatWeight,
  nextHeavierWeight,
  nextLighterWeight,
} from "@/lib/weight-progression-load";
import {
  buildCoachingNote,
  buildNextStep,
  buildWhyParagraphs,
  decisionHeadline,
} from "@/lib/weight-progression-narrative";
import { buildExampleProgressionPath } from "@/lib/weight-progression-sample-path";
import type {
  WeightProgressionInput,
  WeightProgressionResult,
} from "@/types/weight-progression";

/** Conservative plate jumps when exercise type is not collected from the user. */
const DEFAULT_LOAD_CATEGORY = "unsure" as const;

/**
 * Runs validation-free progression logic. Call after `validateWeightProgressionInput` succeeds.
 */
export function computeWeightProgressionResult(
  input: WeightProgressionInput,
): WeightProgressionResult {
  const assessment = assessRepRangePerformance(input);
  const raw = determineProgressionDecision(input, assessment);

  let nextHeavy: number | null = null;
  let nextLight: number | null = null;

  if (raw.decision === "increase_load" && raw.increaseConfidence !== null) {
    nextHeavy = nextHeavierWeight(
      input.workingWeight,
      input.unit,
      DEFAULT_LOAD_CATEGORY,
      raw.increaseConfidence,
    );
  }

  if (raw.decision === "reduce_load") {
    nextLight = nextLighterWeight(
      input.workingWeight,
      input.unit,
      DEFAULT_LOAD_CATEGORY,
    );
  }

  const suggestedWeight =
    raw.decision === "increase_load"
      ? nextHeavy
      : raw.decision === "reduce_load"
        ? nextLight
        : null;

  const suggestedWeightLabel =
    suggestedWeight !== null
      ? formatWeight(suggestedWeight, input.unit)
      : null;

  const whyParagraphs = buildWhyParagraphs(input, assessment, raw);

  const nextStep = buildNextStep(
    input,
    assessment,
    raw,
    nextHeavy,
    nextLight,
  );

  const examplePath = buildExampleProgressionPath(
    raw.decision,
    input,
    nextHeavy,
    nextLight,
  );

  const coachingNote = buildCoachingNote(input.difficulty);

  const exerciseLabel =
    input.exerciseName.trim().length > 0
      ? input.exerciseName.trim()
      : "this lift";

  return {
    decision: raw.decision,
    decisionHeadline: decisionHeadline(raw.decision),
    whyParagraphs,
    nextStep,
    examplePath,
    coachingNote,
    increaseConfidence:
      raw.decision === "increase_load" ? raw.increaseConfidence : null,
    suggestedWeight,
    suggestedWeightLabel,
    exerciseLabel,
  };
}
