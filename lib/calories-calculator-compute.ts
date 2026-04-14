import type {
  CaloriesActivityLevel,
  CaloriesCalculatorInput,
  CaloriesCalculatorResult,
  CaloriesSex,
} from "@/types/calories-calculator";

const ACTIVITY_MULTIPLIER: Record<CaloriesActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
};

const FAT_LOSS_FACTOR = 0.85; // ~15% deficit
const RECOMP_FACTOR = 0.95; // small deficit
const MUSCLE_GAIN_FACTOR = 1.08; // ~8% surplus
const MAX_DISPLAY_CALORIES = 8000;

function calorieFloorForSex(sex: CaloriesSex): number {
  return sex === "female" ? 1200 : 1500;
}

/**
 * Mifflin-St Jeor BMR (kcal/day).
 */
export function computeBmrKcal(input: {
  sex: CaloriesSex;
  ageYears: number;
  weightKg: number;
  heightCm: number;
}): number {
  const { sex, ageYears, weightKg, heightCm } = input;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return sex === "male" ? base + 5 : base - 161;
}

export function activityMultiplier(level: CaloriesActivityLevel): number {
  return ACTIVITY_MULTIPLIER[level];
}

export function computeTdeeKcal(input: CaloriesCalculatorInput): number {
  const bmr = computeBmrKcal(input);
  const mult = activityMultiplier(input.activityLevel);
  return Math.round(bmr * mult);
}

function clampCalories(
  value: number,
  min: number,
  max: number,
): { value: number; clamped: boolean } {
  if (value < min) {
    return { value: min, clamped: true };
  }
  if (value > max) {
    return { value: max, clamped: true };
  }
  return { value, clamped: false };
}

function buildExplanationParagraphs(
  input: CaloriesCalculatorInput,
  result: Omit<
    CaloriesCalculatorResult,
    "explanationParagraphs" | "coachingNote"
  >,
): string[] {
  const paragraphs: string[] = [];
  const { goal, maintenanceCalories, recommendedCalories } = result;
  const training = input.trainingDaysPerWeek;

  paragraphs.push(
    "Here is a clear daily calorie budget to work from. I round the numbers so they are easy to remember and log.",
  );

  if (goal === "fat_loss") {
    paragraphs.push(
      "For fat loss I trimmed calories a little, not a lot, so the plan still feels livable. If things move slowly on the scale, small weekly tweaks usually beat one huge cut.",
    );
  } else if (goal === "recomposition") {
    paragraphs.push(
      "For balance and maintenance I kept you close to what you burn, with a small dip. That tends to work when you want to stay steady or shift slowly while you keep training.",
    );
  } else if (goal === "muscle_gain") {
    paragraphs.push(
      "For muscle gain I added a modest bump, enough to support training without stacking calories higher than you need. How you train and recover still matters as much as the number.",
    );
  }

  if (
    training !== null &&
    training >= 0 &&
    training <= 7 &&
    training >= 4
  ) {
    paragraphs.push(
      `You told me you train about ${training} day${training === 1 ? "" : "s"} a week. If energy, sleep, or recovery feel off, a small food tweak often beats obsessing over a perfect calculator readout.`,
    );
  }

  if (result.wasClamped && result.clampMessage) {
    paragraphs.push(result.clampMessage);
  }

  paragraphs.push(
    `About ${maintenanceCalories} kcal per day is my best guess at what you would need to stay near your current weight with the activity you described.`,
  );

  paragraphs.push(
    `Given what you picked as your focus, I'd start you around ${recommendedCalories} kcal per day.`,
  );

  return paragraphs;
}

const COACHING_NOTE =
  "I'd treat this as a starting line, not a rule carved in stone. The best target is the one that fits your real life. Adjust as you go based on energy, training, sleep, and what the scale does over a few weeks.";

export function computeCaloriesResult(
  input: CaloriesCalculatorInput,
): CaloriesCalculatorResult {
  const tdee = computeTdeeKcal(input);
  const maintenance = clampCalories(
    tdee,
    calorieFloorForSex(input.sex),
    MAX_DISPLAY_CALORIES,
  ).value;

  const floor = calorieFloorForSex(input.sex);
  const fatLossRaw = Math.round(maintenance * FAT_LOSS_FACTOR);
  const recompRaw = Math.round(maintenance * RECOMP_FACTOR);
  const muscleRaw = Math.round(maintenance * MUSCLE_GAIN_FACTOR);

  const fatC = clampCalories(fatLossRaw, floor, MAX_DISPLAY_CALORIES);
  const recompC = clampCalories(recompRaw, floor, MAX_DISPLAY_CALORIES);
  let muscleVal = muscleRaw;
  if (muscleVal < Math.round(maintenance * 1.03)) {
    muscleVal = Math.round(maintenance * 1.05);
  }
  muscleVal = Math.min(muscleVal, Math.round(maintenance * 1.12));
  muscleVal = Math.min(muscleVal, MAX_DISPLAY_CALORIES);

  let recommended: number;
  let wasClamped = false;
  let clampMessage: string | null = null;

  switch (input.goal) {
    case "fat_loss":
      recommended = fatC.value;
      if (fatC.clamped) {
        wasClamped = true;
        clampMessage =
          "The maths wanted to take you lower than I'm comfortable suggesting, so I lifted your target to a safer floor. If your clinician gave you different numbers, follow them.";
      }
      break;
    case "recomposition":
      recommended = recompC.value;
      if (recompC.clamped) {
        wasClamped = true;
        clampMessage =
          "The maths wanted to take you lower than I'm comfortable suggesting, so I lifted your target to a safer floor. If your clinician gave you different numbers, follow them.";
      }
      break;
    case "muscle_gain":
      recommended = muscleVal;
      break;
  }

  const base: Omit<
    CaloriesCalculatorResult,
    "explanationParagraphs" | "coachingNote"
  > = {
    maintenanceCalories: maintenance,
    recommendedCalories: recommended,
    goal: input.goal,
    fatLossTarget: fatC.value,
    balanceTarget: recompC.value,
    muscleGainTarget: muscleVal,
    wasClamped,
    clampMessage,
  };

  return {
    ...base,
    explanationParagraphs: buildExplanationParagraphs(input, base),
    coachingNote: COACHING_NOTE,
  };
}
