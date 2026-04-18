/** JSON body persisted and sent to POST /api/par-q */
export interface ParQPayload {
  personalInformation: {
    fullName: string;
    gender: string;
    dateOfBirth: string;
    contactNumber: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  };
  medicalHistory: {
    heartConditionDoctorRestricted: boolean;
    chestPainWithoutActivityPastMonth: boolean;
    chestPainWithActivity: boolean;
    dizzinessOrLossOfConsciousness: boolean;
    boneOrJointProblem: boolean;
    bloodPressureOrHeartMedication: boolean;
    otherReasonNotToDoPhysicalActivity: boolean;
  };
  lifestyle: {
    physicallyActive: boolean;
    specialDietOrDietaryRestrictions: boolean;
    specialDietDescription: string;
    smokes: boolean;
    sleepHoursPerNight: number | null;
    fitnessGoals: string;
  };
  declaration: {
    confirmed: boolean;
    clientSignature: string;
    date: string;
  };
}

export type ParQYesNoField = boolean | null;

export interface ParQFormState {
  personalInformation: {
    fullName: string;
    gender: string;
    dateOfBirth: string;
    contactNumber: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  };
  medicalHistory: {
    heartConditionDoctorRestricted: ParQYesNoField;
    chestPainWithoutActivityPastMonth: ParQYesNoField;
    chestPainWithActivity: ParQYesNoField;
    dizzinessOrLossOfConsciousness: ParQYesNoField;
    boneOrJointProblem: ParQYesNoField;
    bloodPressureOrHeartMedication: ParQYesNoField;
    otherReasonNotToDoPhysicalActivity: ParQYesNoField;
  };
  lifestyle: {
    physicallyActive: ParQYesNoField;
    specialDietOrDietaryRestrictions: ParQYesNoField;
    specialDietDescription: string;
    smokes: ParQYesNoField;
    sleepHoursPerNight: string;
    fitnessGoals: string;
  };
  declaration: {
    confirmed: boolean;
    clientSignature: string;
    date: string;
  };
}

export type ParQApiResponse =
  | { ok: true; message?: string }
  | { ok: false; error: string };
