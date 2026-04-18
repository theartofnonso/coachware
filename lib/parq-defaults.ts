import type { ParQFormState } from "@/types/parq";

export const PAR_Q_DEFAULT_FORM: ParQFormState = {
  personalInformation: {
    fullName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  },
  medicalHistory: {
    heartConditionDoctorRestricted: null,
    chestPainWithoutActivityPastMonth: null,
    chestPainWithActivity: null,
    dizzinessOrLossOfConsciousness: null,
    boneOrJointProblem: null,
    bloodPressureOrHeartMedication: null,
    otherReasonNotToDoPhysicalActivity: null,
  },
  lifestyle: {
    physicallyActive: null,
    specialDietOrDietaryRestrictions: null,
    specialDietDescription: "",
    smokes: null,
    sleepHoursPerNight: "",
    fitnessGoals: "",
  },
  declaration: {
    confirmed: false,
    clientSignature: "",
    date: "",
  },
};
