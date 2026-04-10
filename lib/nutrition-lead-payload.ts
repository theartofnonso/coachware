import { formatPlanForCopy } from "@/lib/format-plan-for-copy";
import type { NutritionPlan } from "@/types/nutrition";

/** Serializable bundle for /api/tool-lead */
export interface NutritionLeadPayload {
  kind: "nutrition-timing";
  plan: NutritionPlan;
  plainText: string;
}

export function buildNutritionLeadPayload(
  plan: NutritionPlan,
): NutritionLeadPayload {
  return {
    kind: "nutrition-timing",
    plan,
    plainText: formatPlanForCopy(plan),
  };
}
