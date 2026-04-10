import { feetInchesToCm, poundsToKg } from "@/lib/calories-units";
import type {
  CaloriesActivityLevel,
  CaloriesCalculatorInput,
  CaloriesGoal,
  CaloriesSex,
} from "@/types/calories-calculator";

export type HeightMode = "cm" | "ft_in";

export interface CaloriesFormRaw {
  sex: CaloriesSex;
  age: string;
  heightMode: HeightMode;
  heightCm: string;
  heightFeet: string;
  heightInches: string;
  weight: string;
  weightUnit: "kg" | "lb";
  activityLevel: CaloriesActivityLevel;
  goal: CaloriesGoal;
  trainingDaysPerWeek: string;
}

const ACTIVITY_LEVELS: CaloriesActivityLevel[] = [
  "sedentary",
  "light",
  "moderate",
  "very",
];

const GOALS: CaloriesGoal[] = [
  "fat_loss",
  "recomposition",
  "muscle_gain",
];

function parsePositiveInt(s: string, maxLen = 3): number | null {
  const t = s.trim();
  if (t === "") {
    return null;
  }
  const n = Number.parseInt(t, 10);
  if (!Number.isFinite(n) || n < 0 || String(n).length > maxLen + 2) {
    return null;
  }
  return n;
}

function parsePositiveNumber(s: string): number | null {
  const t = s.trim();
  if (t === "") {
    return null;
  }
  const n = Number.parseFloat(t);
  if (!Number.isFinite(n) || n <= 0) {
    return null;
  }
  return n;
}

export function validateCaloriesForm(
  raw: CaloriesFormRaw,
): { ok: true; input: CaloriesCalculatorInput } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (raw.sex !== "male" && raw.sex !== "female") {
    errors.push("Choose male or female for the estimate.");
  }

  const age = parsePositiveInt(raw.age, 3);
  if (age === null) {
    errors.push("Enter your age in whole years.");
  } else if (age < 14 || age > 100) {
    errors.push("Age should be between 14 and 100 for this estimate.");
  }

  let heightCm: number | null = null;
  if (raw.heightMode === "cm") {
    const h = parsePositiveNumber(raw.heightCm);
    if (h === null) {
      errors.push("Enter your height in centimetres.");
    } else if (h < 120 || h > 230) {
      errors.push("Height should be between 120 and 230 cm.");
    } else {
      heightCm = Math.round(h * 10) / 10;
    }
  } else {
    const ft = parsePositiveInt(raw.heightFeet, 1);
    const inch = parsePositiveInt(raw.heightInches, 2);
    if (ft === null || inch === null) {
      errors.push("Enter height in feet and inches.");
    } else if (inch > 11) {
      errors.push("Inches must be between 0 and 11.");
    } else if (ft < 3 || ft > 8) {
      errors.push("Feet should be between 3 and 8 for this estimate.");
    } else {
      heightCm = Math.round(feetInchesToCm(ft, inch) * 10) / 10;
      if (heightCm < 120 || heightCm > 230) {
        errors.push("That height is outside the range this tool supports.");
      }
    }
  }

  const w = parsePositiveNumber(raw.weight);
  if (w === null) {
    errors.push("Enter your weight.");
  } else {
    const kg =
      raw.weightUnit === "kg" ? w : poundsToKg(w);
    if (kg < 30 || kg > 250) {
      errors.push(
        raw.weightUnit === "kg"
          ? "Weight should be between 30 and 250 kg."
          : "Weight should be roughly between 66 and 550 lb for this tool.",
      );
    } else if (heightCm !== null) {
      const bmi = kg / Math.pow(heightCm / 100, 2);
      if (bmi < 14 || bmi > 60) {
        errors.push(
          "Those height and weight values look unusual together. Double-check the numbers.",
        );
      }
    }
  }

  if (!ACTIVITY_LEVELS.includes(raw.activityLevel)) {
    errors.push("Choose an activity level.");
  }

  if (!GOALS.includes(raw.goal)) {
    errors.push("Choose a goal.");
  }

  let trainingDaysPerWeek: number | null = null;
  const td = raw.trainingDaysPerWeek.trim();
  if (td !== "") {
    const n = parsePositiveInt(td, 1);
    if (n === null || n > 7) {
      errors.push("Training days should be a whole number from 0 to 7, or leave blank.");
    } else {
      trainingDaysPerWeek = n;
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const weightKg =
    raw.weightUnit === "kg"
      ? (parsePositiveNumber(raw.weight) as number)
      : poundsToKg(parsePositiveNumber(raw.weight) as number);

  const input: CaloriesCalculatorInput = {
    sex: raw.sex,
    ageYears: age as number,
    heightCm: heightCm as number,
    weightKg: Math.round(weightKg * 10) / 10,
    activityLevel: raw.activityLevel,
    goal: raw.goal,
    trainingDaysPerWeek,
  };

  return { ok: true, input };
}
