/**
 * Restricts input to a positive decimal: digits and at most one "." (e.g. calories, kg).
 */
export function filterPositiveDecimalInput(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const dot = cleaned.indexOf(".");
  if (dot === -1) {
    return cleaned;
  }
  const intPart = cleaned.slice(0, dot);
  const decPart = cleaned.slice(dot + 1).replace(/\./g, "");
  return intPart + "." + decPart;
}

/**
 * Restricts input to whole digits only (e.g. reps, rep-range bounds).
 */
export function filterPositiveIntInput(raw: string): string {
  return raw.replace(/\D/g, "");
}
