"use client";

import type { FormEvent } from "react";
import { useCallback, useState } from "react";
import { ui } from "@/components/ui";
import { postClientAgreement } from "@/lib/client-agreement-api";
import { CLIENT_AGREEMENT_DEFAULT_FORM } from "@/lib/client-agreement-defaults";
import {
  CLIENT_AGREEMENT_BRAND,
  CLIENT_AGREEMENT_SECTIONS,
} from "@/lib/client-agreement-content";
import { validateClientAgreementForm } from "@/lib/client-agreement-validation";
import { filterPhoneInput } from "@/lib/phone-input";
import type { ClientAgreementFormState } from "@/types/client-agreement";

const ca = {
  card: "mb-4 rounded-lg border border-zinc-200 bg-white px-4 py-4 sm:px-5 sm:py-5",
  cardTitle: "mb-3 text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-500",
  field: "mb-3 last:mb-0",
  label: "mb-1.5 block text-sm font-medium text-zinc-950",
  sectionTitle: "mb-2 font-serif text-lg font-semibold tracking-[-0.02em] text-zinc-950 sm:text-xl",
  hint: "mt-1 text-[0.8125rem] leading-snug text-zinc-500",
} as const;

export function ClientAgreementForm() {
  const [form, setForm] = useState<ClientAgreementFormState>(
    CLIENT_AGREEMENT_DEFAULT_FORM,
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = useCallback(() => {
    setForm(CLIENT_AGREEMENT_DEFAULT_FORM);
    setErrors([]);
    setApiError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setApiError(null);
    const v = validateClientAgreementForm(form);
    if (!v.ok) {
      setErrors(v.errors);
      return;
    }
    setErrors([]);
    setLoading(true);
    const res = await postClientAgreement(v.payload);
    setLoading(false);
    if (!res.ok) {
      setApiError(res.error);
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className={ui.page}>
        <div className={ui.inner}>
          <header className={ui.header}>
            <p className={ui.kicker}>Agreement</p>
            <h1 className={ui.title}>Thank you</h1>
            <p className={ui.lede}>
              Your signed Client Agreement is on record. If anything needs
              updating later, get in touch and we can arrange a fresh version.
            </p>
          </header>
          <div className={ca.card}>
            <p className={ui.bodyText}>
              Keep a copy of the terms for your files. You can review them
              again on this page anytime.
            </p>
            <div className={`${ui.actions} mt-5`}>
              <button
                type="button"
                className={ui.btnSecondary}
                onClick={handleReset}
              >
                Sign another agreement
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={ui.page}>
      <div className={ui.inner}>
        <header className={ui.header}>
          <p className={ui.kicker}>Coaching</p>
          <h1 className={ui.title}>Client Agreement</h1>
          <p className={ui.lede}>
            Please read the terms below carefully before starting coaching with{" "}
            {CLIENT_AGREEMENT_BRAND}. By signing, you confirm that you understand
            and accept these coaching terms. This is a practical agreement, not a
            substitute for legal advice on your specific situation.
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className={ca.card}>
            <h2 className={ca.cardTitle}>Your details</h2>
            <div className={ca.field}>
              <label className={ca.label} htmlFor="ca-full-name">
                Full name
              </label>
              <input
                id="ca-full-name"
                type="text"
                className={ui.input}
                name="fullName"
                autoComplete="name"
                autoCapitalize="words"
                inputMode="text"
                enterKeyHint="next"
                value={form.clientInformation.fullName}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    clientInformation: {
                      ...prev.clientInformation,
                      fullName: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className={ca.field}>
              <label className={ca.label} htmlFor="ca-email">
                Email
              </label>
              <input
                id="ca-email"
                type="email"
                className={ui.input}
                name="email"
                autoComplete="email"
                inputMode="email"
                enterKeyHint="next"
                value={form.clientInformation.email}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    clientInformation: {
                      ...prev.clientInformation,
                      email: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className={ca.field}>
              <label className={ca.label} htmlFor="ca-phone">
                Phone number
              </label>
              <input
                id="ca-phone"
                type="tel"
                className={ui.input}
                name="phoneNumber"
                autoComplete="tel"
                inputMode="tel"
                enterKeyHint="next"
                value={form.clientInformation.phoneNumber}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    clientInformation: {
                      ...prev.clientInformation,
                      phoneNumber: filterPhoneInput(e.target.value),
                    },
                  }))
                }
              />
            </div>
            <div className={ca.field}>
              <label className={ca.label} htmlFor="ca-address">
                Address <span className="font-normal text-zinc-500">(optional)</span>
              </label>
              <input
                id="ca-address"
                type="text"
                className={ui.input}
                name="address"
                autoComplete="street-address"
                inputMode="text"
                enterKeyHint="next"
                value={form.clientInformation.address}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    clientInformation: {
                      ...prev.clientInformation,
                      address: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className={ca.field}>
              <label className={ca.label} htmlFor="ca-dob">
                Date of birth
              </label>
              <input
                id="ca-dob"
                type="date"
                className={ui.input}
                name="bday"
                autoComplete="bday"
                enterKeyHint="next"
                value={form.clientInformation.dateOfBirth}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    clientInformation: {
                      ...prev.clientInformation,
                      dateOfBirth: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className={ca.card}>
            <h2 className={ca.cardTitle}>Terms</h2>
            <div className="space-y-8">
              {CLIENT_AGREEMENT_SECTIONS.map((section) => (
                <section key={section.id} aria-labelledby={`ca-sec-${section.id}`}>
                  <h3 id={`ca-sec-${section.id}`} className={ca.sectionTitle}>
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.paragraphs.map((para, i) => (
                      <p
                        key={`${section.id}-${i}`}
                        className="m-0 text-[0.9375rem] leading-relaxed text-zinc-700"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className={ca.card}>
            <h2 className={ca.cardTitle}>Optional — photos &amp; testimonials</h2>
            <p className={`${ui.bodyText} mb-4 text-zinc-600`}>
              These are separate from the core agreement. You can decline without
              affecting your coaching.
            </p>
            <div className={ca.field}>
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  className={ui.radioInput}
                  checked={form.optionalConsents.progressPhotosConsent}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      optionalConsents: {
                        ...prev.optionalConsents,
                        progressPhotosConsent: e.target.checked,
                      },
                    }))
                  }
                />
                <span className={ui.radioText}>
                  I agree that progress photos may be used as discussed (e.g.
                  private coaching review or marketing only if we agree that in
                  writing).
                </span>
              </label>
            </div>
            <div className={ca.field}>
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  className={ui.radioInput}
                  checked={form.optionalConsents.testimonialConsent}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      optionalConsents: {
                        ...prev.optionalConsents,
                        testimonialConsent: e.target.checked,
                      },
                    }))
                  }
                />
                <span className={ui.radioText}>
                  I agree I may be asked to provide a short testimonial, and I can
                  decline at any time.
                </span>
              </label>
            </div>
          </div>

          <div className={ca.card}>
            <h2 className={ca.cardTitle}>Sign</h2>
            <div className={ca.field}>
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  className={ui.radioInput}
                  checked={form.agreementAccepted}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      agreementAccepted: e.target.checked,
                    }))
                  }
                />
                <span className={ui.radioText}>
                  I have read and agree to the Client Agreement
                </span>
              </label>
            </div>
            <div className={ca.field}>
              <label className={ca.label} htmlFor="ca-signature">
                Signature (type your full name)
              </label>
              <input
                id="ca-signature"
                type="text"
                className={ui.input}
                name="signature"
                autoComplete="name"
                autoCapitalize="words"
                inputMode="text"
                enterKeyHint="next"
                value={form.signature}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, signature: e.target.value }))
                }
              />
            </div>
            <div className={ca.field}>
              <label className={ca.label} htmlFor="ca-signed-name">
                Confirm your full legal name
              </label>
              <input
                id="ca-signed-name"
                type="text"
                className={ui.input}
                name="signedName"
                autoComplete="off"
                autoCapitalize="words"
                inputMode="text"
                enterKeyHint="next"
                value={form.signedName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, signedName: e.target.value }))
                }
              />
              <p className={ca.hint}>Must match the full name you entered above.</p>
            </div>
            <div className={ca.field}>
              <label className={ca.label} htmlFor="ca-sign-date">
                Date
              </label>
              <input
                id="ca-sign-date"
                type="date"
                className={ui.input}
                name="signatureDate"
                enterKeyHint="done"
                value={form.signatureDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, signatureDate: e.target.value }))
                }
              />
            </div>
          </div>

          {errors.length > 0 && (
            <div className={`${ui.errorBox} mb-4`} role="alert">
              <strong>Please check the form</strong>
              <ul className="mt-1.5 list-disc pl-[1.1rem] font-normal">
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {apiError && (
            <div className={`${ui.errorBox} mb-4`} role="alert">
              {apiError}
            </div>
          )}

          <div className={ui.actions}>
            <button
              type="submit"
              className={ui.btnPrimary}
              disabled={loading}
            >
              {loading ? "Submitting…" : "Sign agreement"}
            </button>
            <button
              type="button"
              className={ui.btnGhost}
              disabled={loading}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
