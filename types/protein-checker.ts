export type ProteinDensityLevel = "high" | "moderate" | "low";

export interface ProteinCheckerInput {
  proteinGrams: number;
  calories: number;
  /** Optional label for display and email only */
  foodName: string | null;
}

export interface ProteinCheckerResult {
  /** Grams of protein per 100 calories */
  proteinDensity: number;
  level: ProteinDensityLevel;
  /** Short label with emoji for UI */
  classificationHeadline: string;
  /** e.g. "8.3g" for "Protein per 100 calories: 8.3g" */
  densityGramsDisplay: string;
  explanation: string;
  improvement: string;
  coachingNote: string;
}
