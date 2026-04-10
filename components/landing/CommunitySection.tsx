"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ui } from "@/components/ui";
import { LANDING_COMMUNITY } from "@/lib/landing-content";
import {
  validateLeadEmail,
  validateLeadFirstName,
} from "@/lib/tool-lead-validation";
import type { CommunitySignupResponse } from "@/types/community";

export function CommunitySection() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fnErr = validateLeadFirstName(firstName);
    const emErr = validateLeadEmail(email);
    setFirstNameError(fnErr);
    setEmailError(emErr);
    if (fnErr || emErr) {
      return;
    }
    setSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
        }),
      });
      const data = (await res.json()) as CommunitySignupResponse;
      if (!res.ok || !data.ok) {
        setApiError(
          !data.ok ? data.error : "Something went wrong. Please try again.",
        );
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      setFirstName("");
      setEmail("");
    } catch {
      setApiError("Network error. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <section
      id="community"
      className={ui.landingSection}
      aria-labelledby="community-heading"
    >
      <p className={ui.landingSectionKicker}>Community</p>
      <h2 id="community-heading" className={ui.landingSectionTitle}>
        {LANDING_COMMUNITY.heading}
      </h2>
      <p className={`${ui.landingBody} mt-6 max-w-2xl`}>
        {LANDING_COMMUNITY.supporting}
      </p>

      {success ? (
        <p
          className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-zinc-700"
          role="status"
        >
          {LANDING_COMMUNITY.successMessage}
        </p>
      ) : (
        <form
          className="mt-10 max-w-md space-y-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={ui.field}>
            <label className={ui.label} htmlFor="community-first-name">
              First name
            </label>
            <input
              id="community-first-name"
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
                firstNameError ? "community-first-name-error" : undefined
              }
            />
            {firstNameError && (
              <p id="community-first-name-error" className={ui.hint} role="alert">
                {firstNameError}
              </p>
            )}
          </div>
          <div className={ui.field}>
            <label className={ui.label} htmlFor="community-email">
              Email
            </label>
            <input
              id="community-email"
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
              aria-describedby={emailError ? "community-email-error" : undefined}
            />
            {emailError && (
              <p id="community-email-error" className={ui.hint} role="alert">
                {emailError}
              </p>
            )}
          </div>
          {apiError && (
            <div className={ui.errorBox} role="alert">
              {apiError}
            </div>
          )}
          <button
            type="submit"
            className={ui.btnPrimary}
            disabled={submitting}
          >
            {submitting ? "Sending…" : LANDING_COMMUNITY.submitLabel}
          </button>
        </form>
      )}
    </section>
  );
}
