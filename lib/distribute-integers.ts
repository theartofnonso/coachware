/**
 * Split `total` into `count` non-negative integers that sum exactly to `total`.
 * Remainder is distributed one unit at a time to the lowest indices (stable, deterministic).
 */
export function distributeIntegersEvenly(total: number, count: number): number[] {
  if (count <= 0) {
    return [];
  }
  const safeTotal = Math.max(0, Math.round(total));
  const base = Math.floor(safeTotal / count);
  const remainder = safeTotal - base * count;
  return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0));
}

/**
 * Split `total` across `weights` (non-negative). Uses largest-remainder method, then
 * nudges to fix rounding so the sum matches `total` exactly.
 */
export function distributeByWeights(total: number, weights: number[]): number[] {
  if (weights.length === 0) {
    return [];
  }
  const safeTotal = Math.max(0, Math.round(total));
  const sumW = weights.reduce((a, b) => a + b, 0);
  if (sumW <= 0) {
    return distributeIntegersEvenly(safeTotal, weights.length);
  }

  const raw = weights.map((w) => (safeTotal * w) / sumW);
  const floors = raw.map((r) => Math.floor(r));
  const assigned = floors.reduce((a, b) => a + b, 0);
  const remainders = raw.map((r, i) => ({ i, frac: r - floors[i] }));
  remainders.sort((a, b) => b.frac - a.frac);

  const result = [...floors];
  let deficit = safeTotal - assigned;
  let idx = 0;
  while (deficit > 0 && idx < remainders.length) {
    result[remainders[idx].i] += 1;
    deficit -= 1;
    idx += 1;
  }

  let surplus = result.reduce((a, b) => a + b, 0) - safeTotal;
  let r = result.length - 1;
  while (surplus > 0 && r >= 0) {
    const take = Math.min(surplus, result[r]);
    result[r] -= take;
    surplus -= take;
    r -= 1;
  }

  return result;
}
