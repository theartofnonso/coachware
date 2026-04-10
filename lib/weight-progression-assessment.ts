import type {
  RepRangeAssessment,
  WeightProgressionInput,
} from "@/types/weight-progression";

function inRange(rep: number, lower: number, upper: number): boolean {
  return rep >= lower && rep <= upper;
}

/**
 * Summarises how performed reps sit against the user's target rep range.
 */
export function assessRepRangePerformance(
  input: Pick<
    WeightProgressionInput,
    "repLower" | "repUpper" | "repsPerSet" | "setCount"
  >,
): RepRangeAssessment {
  const { repLower, repUpper, repsPerSet } = input;
  const reps = repsPerSet.slice(0, input.setCount);

  let setsBelowLower = 0;
  let setsInRange = 0;
  let setsStrictlyAboveTop = 0;
  let setsAtOrAboveTop = 0;

  for (const r of reps) {
    if (r < repLower) {
      setsBelowLower += 1;
    } else if (r > repUpper) {
      setsStrictlyAboveTop += 1;
      setsAtOrAboveTop += 1;
    } else {
      setsInRange += 1;
      if (r >= repUpper) {
        setsAtOrAboveTop += 1;
      }
    }
  }

  const minRep = Math.min(...reps);
  const maxRep = Math.max(...reps);
  const sumRep = reps.reduce((a, b) => a + b, 0);
  const avgRep = sumRep / reps.length;

  const allInRange = reps.every((r) => inRange(r, repLower, repUpper));
  const allAtOrAboveTop = reps.every((r) => r >= repUpper);

  const barelyInRange =
    allInRange && minRep <= repLower + 1 && maxRep <= repUpper;

  const massivelyAboveRange = reps.every((r) => r > repUpper);

  const first = reps[0] ?? 0;
  const last = reps[reps.length - 1] ?? 0;
  const largeDropoff =
    reps.length >= 2 && first - last >= 2 && last < repUpper;

  return {
    repLower,
    repUpper,
    reps,
    setCount: reps.length,
    minRep,
    maxRep,
    sumRep,
    avgRep,
    setsBelowLower,
    setsInRange,
    setsStrictlyAboveTop,
    setsAtOrAboveTop,
    allInRange,
    allAtOrAboveTop,
    barelyInRange,
    massivelyAboveRange,
    largeDropoff,
  };
}
