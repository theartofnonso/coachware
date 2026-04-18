import { isPhoneLike } from "@/lib/phone-input";
import type { ParQFormState, ParQPayload, ParQYesNoField } from "@/types/parq";

const MEDICAL_KEYS = [
  "heartConditionDoctorRestricted",
  "chestPainWithoutActivityPastMonth",
  "chestPainWithActivity",
  "dizzinessOrLossOfConsciousness",
  "boneOrJointProblem",
  "bloodPressureOrHeartMedication",
  "otherReasonNotToDoPhysicalActivity",
] as const satisfies readonly (keyof ParQPayload["medicalHistory"])[];

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isBoolean(v: unknown): v is boolean {
  return v === true || v === false;
}

function parseSleepHours(raw: string): number | null {
  const t = raw.trim();
  if (!t) {
    return null;
  }
  const n = Number.parseFloat(t);
  if (!Number.isFinite(n) || n < 0 || n > 24) {
    return null;
  }
  return n;
}

function requireYesNo(
  value: ParQYesNoField,
  label: string,
  errors: string[],
): boolean | undefined {
  if (value === null) {
    errors.push(`Please answer: ${label}`);
    return undefined;
  }
  return value;
}

/**
 * Validates raw client form state and returns a payload or a list of errors.
 */
export function validateParQForm(
  form: ParQFormState,
): { ok: true; payload: ParQPayload } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const p = form.personalInformation;

  if (!isNonEmptyString(p.fullName)) {
    errors.push("Full name is required.");
  }
  if (!isNonEmptyString(p.gender)) {
    errors.push("Gender is required.");
  }
  if (!isNonEmptyString(p.dateOfBirth)) {
    errors.push("Date of birth is required.");
  }
  if (!isNonEmptyString(p.contactNumber)) {
    errors.push("Contact number is required.");
  } else if (!isPhoneLike(p.contactNumber)) {
    errors.push(
      "Contact number can only include digits and phone symbols (+, spaces, dashes, brackets).",
    );
  }
  if (!isNonEmptyString(p.emergencyContactName)) {
    errors.push("Emergency contact name is required.");
  }
  if (!isNonEmptyString(p.emergencyContactPhone)) {
    errors.push("Emergency contact phone is required.");
  } else if (!isPhoneLike(p.emergencyContactPhone)) {
    errors.push(
      "Emergency contact phone can only include digits and phone symbols (+, spaces, dashes, brackets).",
    );
  }

  const medical: Partial<ParQPayload["medicalHistory"]> = {};
  const medicalLabels: Record<(typeof MEDICAL_KEYS)[number], string> = {
    heartConditionDoctorRestricted:
      "Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?",
    chestPainWithoutActivityPastMonth:
      "In the past month, have you had chest pain when you were not doing physical activity?",
    chestPainWithActivity:
      "Do you feel pain in your chest when you do physical activity?",
    dizzinessOrLossOfConsciousness:
      "Do you lose your balance because of dizziness, or do you ever lose consciousness?",
    boneOrJointProblem:
      "Do you have a bone or joint problem that could be made worse by a change in your physical activity?",
    bloodPressureOrHeartMedication:
      "Is your doctor currently prescribing drugs for your blood pressure or heart condition?",
    otherReasonNotToDoPhysicalActivity:
      "Do you know of any other reason why you should not do physical activity?",
  };

  for (const key of MEDICAL_KEYS) {
    const v = requireYesNo(form.medicalHistory[key], medicalLabels[key], errors);
    if (v !== undefined) {
      medical[key] = v;
    }
  }

  const physicallyActive = requireYesNo(
    form.lifestyle.physicallyActive,
    "Are you physically active?",
    errors,
  );
  const specialDiet = requireYesNo(
    form.lifestyle.specialDietOrDietaryRestrictions,
    "Do you follow any special diet or have any dietary restrictions?",
    errors,
  );
  const smokes = requireYesNo(
    form.lifestyle.smokes,
    "Do you smoke?",
    errors,
  );

  let specialDietDescription = form.lifestyle.specialDietDescription.trim();
  if (specialDiet === true) {
    if (!isNonEmptyString(specialDietDescription)) {
      errors.push("Please describe your diet or dietary restrictions.");
    }
  } else {
    specialDietDescription = "";
  }

  const sleepHoursPerNight = parseSleepHours(form.lifestyle.sleepHoursPerNight);
  if (sleepHoursPerNight === null) {
    errors.push(
      "Enter average hours of sleep per night (0–24, decimals allowed).",
    );
  }

  if (!form.declaration.confirmed) {
    errors.push("Please confirm the declaration to continue.");
  }
  const sig = form.declaration.clientSignature.trim();
  if (!isNonEmptyString(sig)) {
    errors.push("Client signature is required (type your full name).");
  }
  if (!isNonEmptyString(form.declaration.date)) {
    errors.push("Date is required.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const payload: ParQPayload = {
    personalInformation: {
      fullName: p.fullName.trim(),
      gender: p.gender.trim(),
      dateOfBirth: p.dateOfBirth.trim(),
      contactNumber: p.contactNumber.trim(),
      emergencyContactName: p.emergencyContactName.trim(),
      emergencyContactPhone: p.emergencyContactPhone.trim(),
    },
    medicalHistory: medical as ParQPayload["medicalHistory"],
    lifestyle: {
      physicallyActive: physicallyActive as boolean,
      specialDietOrDietaryRestrictions: specialDiet as boolean,
      specialDietDescription,
      smokes: smokes as boolean,
      sleepHoursPerNight: sleepHoursPerNight as number,
      fitnessGoals: form.lifestyle.fitnessGoals.trim(),
    },
    declaration: {
      confirmed: true,
      clientSignature: sig,
      date: form.declaration.date.trim(),
    },
  };

  return { ok: true, payload };
}

/**
 * Validates an unknown JSON body from POST /api/par-q (same rules as the form).
 */
export function parseParQRequestBody(
  raw: unknown,
): { ok: true; payload: ParQPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Request body must be an object." };
  }
  const b = raw as Record<string, unknown>;
  const pi = b.personalInformation;
  const mh = b.medicalHistory;
  const ls = b.lifestyle;
  const dec = b.declaration;

  if (!pi || typeof pi !== "object") {
    return { ok: false, error: "Missing personalInformation." };
  }
  if (!mh || typeof mh !== "object") {
    return { ok: false, error: "Missing medicalHistory." };
  }
  if (!ls || typeof ls !== "object") {
    return { ok: false, error: "Missing lifestyle." };
  }
  if (!dec || typeof dec !== "object") {
    return { ok: false, error: "Missing declaration." };
  }

  const p = pi as Record<string, unknown>;
  const form: ParQFormState = {
    personalInformation: {
      fullName: typeof p.fullName === "string" ? p.fullName : "",
      gender: typeof p.gender === "string" ? p.gender : "",
      dateOfBirth: typeof p.dateOfBirth === "string" ? p.dateOfBirth : "",
      contactNumber: typeof p.contactNumber === "string" ? p.contactNumber : "",
      emergencyContactName:
        typeof p.emergencyContactName === "string" ? p.emergencyContactName : "",
      emergencyContactPhone:
        typeof p.emergencyContactPhone === "string"
          ? p.emergencyContactPhone
          : "",
    },
    medicalHistory: {
      heartConditionDoctorRestricted: isBoolean(
        (mh as Record<string, unknown>).heartConditionDoctorRestricted,
      )
        ? ((mh as Record<string, unknown>).heartConditionDoctorRestricted as boolean)
        : null,
      chestPainWithoutActivityPastMonth: isBoolean(
        (mh as Record<string, unknown>).chestPainWithoutActivityPastMonth,
      )
        ? ((mh as Record<string, unknown>)
            .chestPainWithoutActivityPastMonth as boolean)
        : null,
      chestPainWithActivity: isBoolean(
        (mh as Record<string, unknown>).chestPainWithActivity,
      )
        ? ((mh as Record<string, unknown>).chestPainWithActivity as boolean)
        : null,
      dizzinessOrLossOfConsciousness: isBoolean(
        (mh as Record<string, unknown>).dizzinessOrLossOfConsciousness,
      )
        ? ((mh as Record<string, unknown>).dizzinessOrLossOfConsciousness as boolean)
        : null,
      boneOrJointProblem: isBoolean(
        (mh as Record<string, unknown>).boneOrJointProblem,
      )
        ? ((mh as Record<string, unknown>).boneOrJointProblem as boolean)
        : null,
      bloodPressureOrHeartMedication: isBoolean(
        (mh as Record<string, unknown>).bloodPressureOrHeartMedication,
      )
        ? ((mh as Record<string, unknown>).bloodPressureOrHeartMedication as boolean)
        : null,
      otherReasonNotToDoPhysicalActivity: isBoolean(
        (mh as Record<string, unknown>).otherReasonNotToDoPhysicalActivity,
      )
        ? ((mh as Record<string, unknown>).otherReasonNotToDoPhysicalActivity as boolean)
        : null,
    },
    lifestyle: {
      physicallyActive: isBoolean((ls as Record<string, unknown>).physicallyActive)
        ? ((ls as Record<string, unknown>).physicallyActive as boolean)
        : null,
      specialDietOrDietaryRestrictions: isBoolean(
        (ls as Record<string, unknown>).specialDietOrDietaryRestrictions,
      )
        ? ((ls as Record<string, unknown>).specialDietOrDietaryRestrictions as boolean)
        : null,
      specialDietDescription:
        typeof (ls as Record<string, unknown>).specialDietDescription === "string"
          ? ((ls as Record<string, unknown>).specialDietDescription as string)
          : "",
      smokes: isBoolean((ls as Record<string, unknown>).smokes)
        ? ((ls as Record<string, unknown>).smokes as boolean)
        : null,
      sleepHoursPerNight:
        typeof (ls as Record<string, unknown>).sleepHoursPerNight === "number" &&
        Number.isFinite((ls as Record<string, unknown>).sleepHoursPerNight as number)
          ? String((ls as Record<string, unknown>).sleepHoursPerNight)
          : typeof (ls as Record<string, unknown>).sleepHoursPerNight === "string"
            ? ((ls as Record<string, unknown>).sleepHoursPerNight as string)
            : "",
      fitnessGoals:
        typeof (ls as Record<string, unknown>).fitnessGoals === "string"
          ? ((ls as Record<string, unknown>).fitnessGoals as string)
          : "",
    },
    declaration: {
      confirmed: (dec as Record<string, unknown>).confirmed === true,
      clientSignature:
        typeof (dec as Record<string, unknown>).clientSignature === "string"
          ? ((dec as Record<string, unknown>).clientSignature as string)
          : "",
      date:
        typeof (dec as Record<string, unknown>).date === "string"
          ? ((dec as Record<string, unknown>).date as string)
          : "",
    },
  };

  const v = validateParQForm(form);
  if (!v.ok) {
    return { ok: false, error: v.errors[0] ?? "Validation failed." };
  }
  return { ok: true, payload: v.payload };
}
