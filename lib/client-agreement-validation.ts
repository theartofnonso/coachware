import { isPhoneLike } from "@/lib/phone-input";
import { validateLeadEmail } from "@/lib/tool-lead-validation";
import type {
  ClientAgreementFormState,
  ClientAgreementSubmitPayload,
} from "@/types/client-agreement";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isBoolean(v: unknown): v is boolean {
  return v === true || v === false;
}

function normalizeName(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Validates form state and returns the payload shape (without acceptedAt — server adds it).
 */
export function validateClientAgreementForm(
  form: ClientAgreementFormState,
): { ok: true; payload: ClientAgreementSubmitPayload } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const c = form.clientInformation;

  if (!isNonEmptyString(c.fullName)) {
    errors.push("Full name is required.");
  }
  const emErr = validateLeadEmail(c.email);
  if (emErr) {
    errors.push(emErr);
  }
  if (!isNonEmptyString(c.phoneNumber)) {
    errors.push("Phone number is required.");
  } else if (!isPhoneLike(c.phoneNumber)) {
    errors.push(
      "Phone number can only include digits and phone symbols (+, spaces, dashes, brackets).",
    );
  }
  if (!isNonEmptyString(c.dateOfBirth)) {
    errors.push("Date of birth is required.");
  }

  if (!form.agreementAccepted) {
    errors.push("Please confirm you have read and agree to the Client Agreement.");
  }
  const sig = form.signature.trim();
  if (!isNonEmptyString(sig)) {
    errors.push("Signature is required (type your name).");
  }
  const legal = form.signedName.trim();
  if (!isNonEmptyString(legal)) {
    errors.push("Please type your full name to confirm your signature.");
  }
  if (
    isNonEmptyString(c.fullName) &&
    isNonEmptyString(legal) &&
    normalizeName(c.fullName) !== normalizeName(legal)
  ) {
    errors.push("Your confirming name should match the full name you entered above.");
  }
  if (!isNonEmptyString(form.signatureDate)) {
    errors.push("Date is required.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const payload = {
    clientInformation: {
      fullName: c.fullName.trim(),
      email: c.email.trim().toLowerCase(),
      phoneNumber: c.phoneNumber.trim(),
      address: c.address.trim(),
      dateOfBirth: c.dateOfBirth.trim(),
    },
    agreement: {
      accepted: true as const,
      signature: sig,
      signedName: legal,
      signatureDate: form.signatureDate.trim(),
    },
    optionalConsents: {
      progressPhotosConsent: form.optionalConsents.progressPhotosConsent,
      testimonialConsent: form.optionalConsents.testimonialConsent,
    },
    documentMeta: {
      documentType: "client_agreement" as const,
      version: "1.0",
    },
  };

  return { ok: true, payload };
}

export function parseClientAgreementRequestBody(
  raw: unknown,
): { ok: true; payload: ClientAgreementSubmitPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Request body must be an object." };
  }
  const b = raw as Record<string, unknown>;
  const ci = b.clientInformation;
  const ag = b.agreement;
  const oc = b.optionalConsents;
  const dm = b.documentMeta;

  if (!ci || typeof ci !== "object") {
    return { ok: false, error: "Missing clientInformation." };
  }
  if (!ag || typeof ag !== "object") {
    return { ok: false, error: "Missing agreement." };
  }
  if (!oc || typeof oc !== "object") {
    return { ok: false, error: "Missing optionalConsents." };
  }
  if (!dm || typeof dm !== "object") {
    return { ok: false, error: "Missing documentMeta." };
  }
  const docEarly = dm as Record<string, unknown>;
  if (
    docEarly.documentType !== "client_agreement" ||
    docEarly.version !== "1.0"
  ) {
    return { ok: false, error: "Invalid document version." };
  }

  const p = ci as Record<string, unknown>;
  const form: ClientAgreementFormState = {
    clientInformation: {
      fullName: typeof p.fullName === "string" ? p.fullName : "",
      email: typeof p.email === "string" ? p.email : "",
      phoneNumber: typeof p.phoneNumber === "string" ? p.phoneNumber : "",
      address: typeof p.address === "string" ? p.address : "",
      dateOfBirth: typeof p.dateOfBirth === "string" ? p.dateOfBirth : "",
    },
    agreementAccepted: (ag as Record<string, unknown>).accepted === true,
    signature:
      typeof (ag as Record<string, unknown>).signature === "string"
        ? ((ag as Record<string, unknown>).signature as string)
        : "",
    signedName:
      typeof (ag as Record<string, unknown>).signedName === "string"
        ? ((ag as Record<string, unknown>).signedName as string)
        : "",
    signatureDate:
      typeof (ag as Record<string, unknown>).signatureDate === "string"
        ? ((ag as Record<string, unknown>).signatureDate as string)
        : "",
    optionalConsents: {
      progressPhotosConsent: isBoolean(
        (oc as Record<string, unknown>).progressPhotosConsent,
      )
        ? ((oc as Record<string, unknown>).progressPhotosConsent as boolean)
        : false,
      testimonialConsent: isBoolean(
        (oc as Record<string, unknown>).testimonialConsent,
      )
        ? ((oc as Record<string, unknown>).testimonialConsent as boolean)
        : false,
    },
  };

  const v = validateClientAgreementForm(form);
  if (!v.ok) {
    return { ok: false, error: v.errors[0] ?? "Validation failed." };
  }

  return { ok: true, payload: v.payload };
}
