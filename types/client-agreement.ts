export interface ClientAgreementSubmitPayload {
  clientInformation: {
    fullName: string;
    email: string;
    phoneNumber: string;
    /** Empty string when not provided */
    address: string;
    dateOfBirth: string;
  };
  agreement: {
    accepted: true;
    signature: string;
    signedName: string;
    /** Client-selected signing date (YYYY-MM-DD) */
    signatureDate: string;
  };
  optionalConsents: {
    progressPhotosConsent: boolean;
    testimonialConsent: boolean;
  };
  documentMeta: {
    documentType: "client_agreement";
    version: string;
  };
}

/** Stored record: server sets agreement.acceptedAt when persisting. */
export type ClientAgreementPayload = ClientAgreementSubmitPayload & {
  agreement: ClientAgreementSubmitPayload["agreement"] & {
    acceptedAt: string;
  };
};

export interface ClientAgreementFormState {
  clientInformation: {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
  };
  agreementAccepted: boolean;
  signature: string;
  signedName: string;
  signatureDate: string;
  optionalConsents: {
    progressPhotosConsent: boolean;
    testimonialConsent: boolean;
  };
}

export type ClientAgreementApiResponse =
  | { ok: true; message?: string }
  | { ok: false; error: string };
