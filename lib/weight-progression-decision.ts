import type {
  IncreaseConfidence,
  ProgressionDecisionKind,
  RepRangeAssessment,
  WeightProgressionInput,
} from "@/types/weight-progression";

export interface RawDecision {
  decision: ProgressionDecisionKind;
  increaseConfidence: IncreaseConfidence | null;
}

/**
 * Deterministic progression choice from reps, range, and optional difficulty.
 */
export function determineProgressionDecision(
  input: WeightProgressionInput,
  a: RepRangeAssessment,
): RawDecision {
  const d = input.difficulty;

  if (d === "form_breakdown") {
    if (a.setsBelowLower >= 2 || a.minRep < a.repLower) {
      return { decision: "reduce_load", increaseConfidence: null };
    }
    return { decision: "stay_same", increaseConfidence: null };
  }

  if (a.setsBelowLower >= 2) {
    return { decision: "reduce_load", increaseConfidence: null };
  }

  if (a.minRep < a.repLower - 1) {
    return { decision: "reduce_load", increaseConfidence: null };
  }

  if (d === "very_hard") {
    if (a.barelyInRange || a.largeDropoff) {
      return { decision: "stay_same", increaseConfidence: null };
    }
    if (a.allAtOrAboveTop) {
      return { decision: "stay_same", increaseConfidence: null };
    }
  }

  if (a.allAtOrAboveTop) {
    const strong =
      d === "easy" ||
      a.massivelyAboveRange ||
      a.setsStrictlyAboveTop === a.setCount;
    return {
      decision: "increase_load",
      increaseConfidence: strong ? "strong" : "standard",
    };
  }

  if (a.allInRange && !a.allAtOrAboveTop) {
    return { decision: "add_reps", increaseConfidence: null };
  }

  if (a.setsBelowLower === 1) {
    if (a.minRep >= a.repLower - 1) {
      return { decision: "add_reps", increaseConfidence: null };
    }
    return { decision: "reduce_load", increaseConfidence: null };
  }

  if (a.setsBelowLower === 0 && !a.allInRange) {
    if (a.minRep >= a.repLower) {
      return { decision: "add_reps", increaseConfidence: null };
    }
  }

  if (a.minRep < a.repLower) {
    return { decision: "stay_same", increaseConfidence: null };
  }

  return { decision: "add_reps", increaseConfidence: null };
}
