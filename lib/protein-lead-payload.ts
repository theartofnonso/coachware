import { formatProteinCheckerPlainText } from "@/lib/format-protein-checker-copy";
import type {
  ProteinCheckerInput,
  ProteinCheckerResult,
} from "@/types/protein-checker";

export interface ProteinLeadPayload {
  kind: "protein-checker";
  input: ProteinCheckerInput;
  result: ProteinCheckerResult;
  plainText: string;
}

export function buildProteinLeadPayload(
  input: ProteinCheckerInput,
  result: ProteinCheckerResult,
): ProteinLeadPayload {
  return {
    kind: "protein-checker",
    input,
    result,
    plainText: formatProteinCheckerPlainText(input, result),
  };
}
