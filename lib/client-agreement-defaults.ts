import type { ClientAgreementFormState } from "@/types/client-agreement";

export const CLIENT_AGREEMENT_DEFAULT_FORM: ClientAgreementFormState = {
  clientInformation: {
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
  },
  agreementAccepted: false,
  signature: "",
  signedName: "",
  signatureDate: "",
  optionalConsents: {
    progressPhotosConsent: false,
    testimonialConsent: false,
  },
};
