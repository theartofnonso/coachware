import { formatCaloriesCalculatorPlainText } from "@/lib/format-calories-calculator-copy";
import type {
  CaloriesCalculatorInput,
  CaloriesCalculatorResult,
} from "@/types/calories-calculator";

export interface CaloriesLeadPayload {
  kind: "calories-calculator";
  input: CaloriesCalculatorInput;
  result: CaloriesCalculatorResult;
  plainText: string;
}

export function buildCaloriesLeadPayload(
  input: CaloriesCalculatorInput,
  result: CaloriesCalculatorResult,
): CaloriesLeadPayload {
  return {
    kind: "calories-calculator",
    input,
    result,
    plainText: formatCaloriesCalculatorPlainText(input, result),
  };
}
