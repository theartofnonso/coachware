"use client";

import type { FormEvent } from "react";
import { ui } from "@/components/ui";
import {
  validateLeadEmail,
  validateLeadFirstName,
} from "@/lib/tool-lead-validation";
import { useState } from "react";

type Props = {
  onSubmit: (data: { firstName: string; email: string }) => Promise<void>;
  loading: boolean;
  apiError: string | null;
  submitLabel?: string;
};

export function LeadCaptureForm({
  onSubmit,
  loading,
  apiError,
  submitLabel = "Unlock full result",
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fnErr = validateLeadFirstName(firstName);
    const emErr = validateLeadEmail(email);
    setFirstNameError(fnErr);
    setEmailError(emErr);
    if (fnErr || emErr) {
      return;
    }
    await onSubmit({
      firstName: firstName.trim(),
      email: email.trim(),
    });
  }

  return (
    <form className={ui.leadPanel} onSubmit={handleSubmit} noValidate>
      <h3 className={ui.leadPanelTitle}>Unlock the rest from me</h3>
      <p className={ui.leadPanelHint}>
        Enter your details to unlock my full recommendation and send a copy
        to your email.
      </p>

      <div className={ui.field}>
        <label className={ui.label} htmlFor="lead-first-name">
          First name
        </label>
        <input
          id="lead-first-name"
          name="firstName"
          type="text"
          autoComplete="given-name"
          className={ui.input}
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setFirstNameError(null);
          }}
          aria-invalid={firstNameError !== null}
          aria-describedby={
            firstNameError ? "lead-first-name-error" : undefined
          }
        />
        {firstNameError && (
          <p id="lead-first-name-error" className={ui.fieldError} role="alert">
            {firstNameError}
          </p>
        )}
      </div>

      <div className={ui.field}>
        <label className={ui.label} htmlFor="lead-email">
          Email
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          className={ui.input}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(null);
          }}
          aria-invalid={emailError !== null}
          aria-describedby={emailError ? "lead-email-error" : undefined}
        />
        {emailError && (
          <p id="lead-email-error" className={ui.fieldError} role="alert">
            {emailError}
          </p>
        )}
      </div>

      {apiError && (
        <div className={`${ui.errorBox} mb-4`} role="alert">
          {apiError}
        </div>
      )}

      <button
        type="submit"
        className={ui.btnPrimary}
        disabled={loading}
      >
        {loading ? "Working…" : submitLabel}
      </button>
    </form>
  );
}
