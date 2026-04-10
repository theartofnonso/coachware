import { formatWeight } from "@/lib/weight-progression-load";
import type { RawDecision } from "@/lib/weight-progression-decision";
import type {
  DifficultyOption,
  ProgressionDecisionKind,
  RepRangeAssessment,
  WeightProgressionInput,
} from "@/types/weight-progression";

function exerciseLabel(name: string): string {
  const t = name.trim();
  return t.length > 0 ? t : "this lift";
}

export function decisionHeadline(decision: ProgressionDecisionKind): string {
  switch (decision) {
    case "stay_same":
      return "Stay at this weight";
    case "add_reps":
      return "Add reps before increasing weight";
    case "increase_load":
      return "Increase the weight next session";
    case "reduce_load":
      return "Reduce the weight slightly and rebuild";
    default: {
      const _e: never = decision;
      return _e;
    }
  }
}

export function buildWhyParagraphs(
  input: WeightProgressionInput,
  a: RepRangeAssessment,
  raw: RawDecision,
): string[] {
  const ex = exerciseLabel(input.exerciseName);
  const rangePhrase = `${a.repLower} to ${a.repUpper} reps`;
  const repList = a.reps.join(", ");
  const d = input.difficulty;

  const parts: string[] = [];

  parts.push(
    `For ${ex}, your target range is ${rangePhrase}. You logged ${repList} across ${a.setCount} set${a.setCount === 1 ? "" : "s"}.`,
  );

  if (d === "form_breakdown") {
    parts.push(
      "Form broke down, so load is not the priority. Clean up the pattern first, even if the reps looked okay on paper.",
    );
  }

  if (raw.decision === "reduce_load") {
    if (a.setsBelowLower >= 2) {
      parts.push(
        `Several sets sat below ${a.repLower}. That usually means the weight is ahead of what you can repeat with control.`,
      );
    } else if (d === "form_breakdown") {
      parts.push(
        "We are nudging load down so you can own each rep without compensating.",
      );
    } else {
      parts.push(
        "Reps dipped enough below your floor that a slightly lighter weight will let you practice the range you actually want.",
      );
    }
    return parts;
  }

  if (raw.decision === "increase_load") {
    if (a.massivelyAboveRange || a.setsStrictlyAboveTop === a.setCount) {
      parts.push(
        `You lived above the top of ${rangePhrase} on every set. That is a clear signal the weight is sitting light for this target.`,
      );
    } else {
      parts.push(
        `You hit the top of ${rangePhrase} across your sets with no red flags, so you have room to progress next session.`,
      );
    }
    if (d === "easy") {
      parts.push("It also felt easy, so the next step can be a bit more decisive.");
    }
    return parts;
  }

  if (raw.decision === "add_reps") {
    parts.push(
      `You are mostly inside ${rangePhrase}, but not every set is parked near the top yet. Earn another rep or two at this load before chasing a heavier bar.`,
    );
    if (a.largeDropoff) {
      parts.push(
        "Reps dropped off from your first set to your last, so build the back sets up before you add weight.",
      );
    }
    return parts;
  }

  // stay_same
  if (d === "form_breakdown") {
    parts.push(
      "Keep practicing at this weight until reps look the same from start to finish.",
    );
    return parts;
  }

  if (d === "very_hard") {
    parts.push(
      "It felt very hard, so even if reps looked acceptable, another session at the same load will tell you if it was a one off day or a real limit.",
    );
  } else if (a.barelyInRange) {
    parts.push(
      `You touched the range, but you are still hugging the bottom. Stay put until the same weight feels less like a fight.`,
    );
  } else if (a.largeDropoff) {
    parts.push(
      "Fatigue showed up set to set. Consolidate here until the last set looks more like the first.",
    );
  } else {
    parts.push(
      "Nothing here says you must go heavier yet. Repeat, tidy up quality, then revisit progression.",
    );
  }

  return parts;
}

export function buildNextStep(
  input: WeightProgressionInput,
  a: RepRangeAssessment,
  raw: RawDecision,
  suggestedNext: number | null,
  suggestedLighter: number | null,
): string {
  const w = formatWeight(input.workingWeight, input.unit);
  const L = a.repLower;
  const U = a.repUpper;
  const ex = exerciseLabel(input.exerciseName);

  switch (raw.decision) {
    case "increase_load":
      if (suggestedNext !== null) {
        return `Next session on ${ex}, try ${formatWeight(
          suggestedNext,
          input.unit,
        )} and aim to land back near ${L} on each set. Let reps drift up again over the next few weeks.`;
      }
      return `Next session, take a small jump that matches your gym's plates, then aim back toward ${L} to ${U} reps per set.`;

    case "add_reps":
      return `Next session, keep ${w} and try to add about one rep on your weakest set while holding the others steady. Stay inside ${L} to ${U} until every set can kiss the top end.`;

    case "reduce_load":
      if (suggestedLighter !== null) {
        return `Next session, use about ${formatWeight(
          suggestedLighter,
          input.unit,
        )} on ${ex} and rebuild ${L} to ${U} reps with clean sets. Climb back toward your old load only when every set feels repeatable.`;
      }
      return `Next session, take a small step down on ${ex}, own ${L} to ${U} reps, then work back up in tidy jumps.`;

    case "stay_same":
    default:
      if (input.difficulty === "form_breakdown") {
        return `Next session, repeat ${w} (or lighter if needed) on ${ex} and stop each set before form slips. Progress only when the whole set looks the same from rep one to the last.`;
      }
      return `Next session, repeat ${w} on ${ex} and chase the same ${L} to ${U} target with smoother sets. When that feels steady for two sessions in a row, run this check again.`;
  }
}

export function buildCoachingNote(difficulty: DifficultyOption): string {
  const base =
    "Rep ranges help you progress without guessing. First earn the right to go heavier by owning the current weight with good reps and good form.";

  if (difficulty === "form_breakdown") {
    return `${base} If technique falls apart, treat that as a full stop on adding load until the pattern looks repeatable.`;
  }

  if (difficulty === "very_hard") {
    return `${base} If a session felt brutal, repeating the same weight is often smarter than forcing a new personal best.`;
  }

  return `${base} Small, boring jumps beat big jumps that steal your positions.`;
}
