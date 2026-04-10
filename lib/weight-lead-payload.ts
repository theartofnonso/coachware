import { formatWeightProgressionForCopy } from "@/lib/format-weight-progression-copy";
import type { WeightProgressionResult } from "@/types/weight-progression";

export interface WeightLeadPayload {
  kind: "weight-progression";
  result: WeightProgressionResult;
  plainText: string;
}

export function buildWeightLeadPayload(
  result: WeightProgressionResult,
): WeightLeadPayload {
  return {
    kind: "weight-progression",
    result,
    plainText: formatWeightProgressionForCopy(result),
  };
}
