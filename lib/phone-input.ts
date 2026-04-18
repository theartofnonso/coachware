/**
 * Strips letters and symbols that don't belong in a typical phone field.
 * Allows digits and + - ( ) . space for international and formatted numbers.
 */
export function filterPhoneInput(raw: string): string {
  return raw.replace(/[^\d+\-().\s]/g, "");
}

/** True if trimmed value has at least one digit and only allowed phone characters. */
export function isPhoneLike(value: string): boolean {
  const t = value.trim();
  if (!t) {
    return false;
  }
  if (!/^[\d+\-().\s]+$/.test(t)) {
    return false;
  }
  return /\d/.test(t);
}
