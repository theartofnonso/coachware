/** Convert pounds to kilograms */
export function poundsToKg(lb: number): number {
  return lb * 0.45359237;
}

/** Convert feet + inches to centimetres */
export function feetInchesToCm(feet: number, inches: number): number {
  return feet * 30.48 + inches * 2.54;
}
