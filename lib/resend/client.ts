import { Resend } from "resend";

let client: Resend | null | undefined;
let warnedMissing: boolean = false;

export function getResend(): Resend | null {
  if (client !== undefined) return client;
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    client = null;
    return null;
  }
  client = new Resend(key);
  return client;
}

/** Verified no-reply From (e.g. `Name <noreply@yourdomain.com>`). */
export function getResendFromAddress(): string | null {
  const from =
    process.env.RESEND_NOREPLY_FROM?.trim() ||
    process.env.RESEND_FROM?.trim();
  return from || null;
}

export function isResendReady(): boolean {
  return getResend() !== null && getResendFromAddress() !== null;
}

export function warnResendMissingInDev(): void {
  if (warnedMissing || process.env.NODE_ENV !== "development") return;
  warnedMissing = true;
  console.warn(
    "[resend] RESEND_API_KEY and RESEND_NOREPLY_FROM (or legacy RESEND_FROM) are not set; outbound email is skipped.",
  );
}
