export type WeightUnit = "kg" | "lb";

/** Optional perceived difficulty / form quality */
export type DifficultyOption =
  | "easy"
  | "challenging"
  | "very_hard"
  | "form_breakdown"
  | null;

export type ProgressionDecisionKind =
  | "stay_same"
  | "add_reps"
  | "increase_load"
  | "reduce_load";

export type IncreaseConfidence = "standard" | "strong";

/** Parsed, validated input for progression logic */
export interface WeightProgressionInput {
  exerciseName: string;
  repLower: number;
  repUpper: number;
  workingWeight: number;
  unit: WeightUnit;
  setCount: number;
  repsPerSet: number[];
  difficulty: DifficultyOption;
}

/** Metrics derived from reps vs target range */
export interface RepRangeAssessment {
  repLower: number;
  repUpper: number;
  reps: readonly number[];
  setCount: number;
  minRep: number;
  maxRep: number;
  sumRep: number;
  avgRep: number;
  setsBelowLower: number;
  setsInRange: number;
  setsStrictlyAboveTop: number;
  setsAtOrAboveTop: number;
  allInRange: boolean;
  allAtOrAboveTop: boolean;
  barelyInRange: boolean;
  massivelyAboveRange: boolean;
  largeDropoff: boolean;
}

export interface ProgressionExampleStep {
  label: string;
  detail: string;
}

export interface WeightProgressionResult {
  decision: ProgressionDecisionKind;
  decisionHeadline: string;
  whyParagraphs: string[];
  nextStep: string;
  examplePath: ProgressionExampleStep[];
  coachingNote: string;
  increaseConfidence: IncreaseConfidence | null;
  /** Suggested load in the user's unit (increase or reduce); null when stay/add_reps without numeric change */
  suggestedWeight: number | null;
  /** Same as suggestedWeight, formatted for display and copy */
  suggestedWeightLabel: string | null;
  /** Human-readable exercise label for copy */
  exerciseLabel: string;
}

export interface WeightProgressionValidation {
  ok: boolean;
  errors: string[];
}
