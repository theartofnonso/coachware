"use client";

import type { FormEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { ui } from "@/components/ui";
import { PAR_Q_DEFAULT_FORM } from "@/lib/parq-defaults";
import { filterPhoneInput } from "@/lib/phone-input";
import { postParQ } from "@/lib/parq-api";
import { validateParQForm } from "@/lib/parq-validation";
import type { ParQFormState } from "@/types/parq";
import { ParQYesNoRadios } from "@/components/par-q/ParQYesNoRadios";

/** Tighter vertical rhythm for PAR-Q only */
const parq = {
  card: "mb-4 rounded-lg border border-zinc-200 bg-white px-4 py-4 sm:px-5 sm:py-5",
  cardTitle: "mb-3 text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-500",
  field: "mb-3 last:mb-0",
  label: "mb-1.5 block text-sm font-medium text-zinc-950",
  grid2: "grid grid-cols-1 gap-2.5 sm:grid-cols-2",
  hint: "mt-1 text-[0.8125rem] leading-snug text-zinc-500",
  textarea: `${ui.input} min-h-[4.5rem] resize-y`,
} as const;

export function ParQForm() {
  const [form, setForm] = useState<ParQFormState>(PAR_Q_DEFAULT_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const showDietDescribe =
    form.lifestyle.specialDietOrDietaryRestrictions === true;

  const medicalNotice = useMemo(() => {
    const keys = [
      "heartConditionDoctorRestricted",
      "chestPainWithoutActivityPastMonth",
      "chestPainWithActivity",
      "dizzinessOrLossOfConsciousness",
      "boneOrJointProblem",
      "bloodPressureOrHeartMedication",
      "otherReasonNotToDoPhysicalActivity",
    ] as const;
    return keys.some((k) => form.medicalHistory[k] === true);
  }, [form.medicalHistory]);

  function setPersonal<K extends keyof ParQFormState["personalInformation"]>(
    key: K,
    value: ParQFormState["personalInformation"][K],
  ) {
    setForm((prev) => ({
      ...prev,
      personalInformation: { ...prev.personalInformation, [key]: value },
    }));
  }

  function setMedical<K extends keyof ParQFormState["medicalHistory"]>(
    key: K,
    value: ParQFormState["medicalHistory"][K],
  ) {
    setForm((prev) => ({
      ...prev,
      medicalHistory: { ...prev.medicalHistory, [key]: value },
    }));
  }

  function setLifestyle<K extends keyof ParQFormState["lifestyle"]>(
    key: K,
    value: ParQFormState["lifestyle"][K],
  ) {
    setForm((prev) => ({
      ...prev,
      lifestyle: { ...prev.lifestyle, [key]: value },
    }));
  }

  const handleReset = useCallback(() => {
    setForm(PAR_Q_DEFAULT_FORM);
    setErrors([]);
    setApiError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setApiError(null);
    const v = validateParQForm(form);
    if (!v.ok) {
      setErrors(v.errors);
      return;
    }
    setErrors([]);

    setLoading(true);
    const res = await postParQ(v.payload);
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
            <p className={ui.kicker}>Health &amp; readiness</p>
            <h1 className={ui.title}>Thank you</h1>
            <p className={ui.lede}>
              I&apos;ve submitted my Physical Activity Readiness Questionnaire.
              If I indicated any medical concerns, you may want to follow up
              before I start a new programme.
            </p>
          </header>
          <div className={ui.card}>
            <p className={ui.bodyText}>
              I can complete another questionnaire below if I need to update my
              details.
            </p>
            <div className={`${ui.actions} mt-5`}>
              <button
                type="button"
                className={ui.btnSecondary}
                onClick={handleReset}
              >
                Submit another
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
          <p className={ui.kicker}>Health &amp; readiness</p>
          <h1 className={ui.title}>Physical Activity Readiness (PAR-Q)</h1>
          <p className={ui.lede}>
            This is a standard readiness check: it helps me see whether you&apos;re
            in a good place to start or change how you exercise. It asks about
            your health and day-to-day habits, nothing to overthink. Please
            answer honestly so I can coach you safely and plan around what you
            need.
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className={parq.card}>
            <h2 className={parq.cardTitle}>1. Personal information</h2>
            <div className={parq.field}>
              <label className={parq.label} htmlFor="parq-full-name">
                Full name
              </label>
              <input
                id="parq-full-name"
                type="text"
                className={ui.input}
                name="fullName"
                autoComplete="name"
                autoCapitalize="words"
                inputMode="text"
                enterKeyHint="next"
                value={form.personalInformation.fullName}
                onChange={(e) => setPersonal("fullName", e.target.value)}
              />
            </div>
            <div className={parq.field}>
              <label className={parq.label} htmlFor="parq-gender">
                Gender
              </label>
              <select
                id="parq-gender"
                className={ui.select}
                name="gender"
                autoComplete="sex"
                value={form.personalInformation.gender}
                onChange={(e) => setPersonal("gender", e.target.value)}
              >
                <option value="">Select…</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className={parq.field}>
              <label className={parq.label} htmlFor="parq-dob">
                Date of birth
              </label>
              <input
                id="parq-dob"
                type="date"
                className={ui.input}
                name="bday"
                autoComplete="bday"
                enterKeyHint="next"
                value={form.personalInformation.dateOfBirth}
                onChange={(e) => setPersonal("dateOfBirth", e.target.value)}
              />
            </div>
            <div className={parq.field}>
              <label className={parq.label} htmlFor="parq-contact">
                Contact number
              </label>
              <input
                id="parq-contact"
                type="tel"
                className={ui.input}
                name="contactNumber"
                autoComplete="tel"
                inputMode="tel"
                enterKeyHint="next"
                value={form.personalInformation.contactNumber}
                onChange={(e) =>
                  setPersonal("contactNumber", filterPhoneInput(e.target.value))
                }
              />
            </div>
            <div className={parq.grid2}>
              <div className={parq.field}>
                <label className={parq.label} htmlFor="parq-emergency-name">
                  Emergency contact name
                </label>
                <input
                  id="parq-emergency-name"
                  type="text"
                  className={ui.input}
                  name="emergencyContactName"
                  autoComplete="name"
                  autoCapitalize="words"
                  inputMode="text"
                  enterKeyHint="next"
                  value={form.personalInformation.emergencyContactName}
                  onChange={(e) =>
                    setPersonal("emergencyContactName", e.target.value)
                  }
                />
              </div>
              <div className={parq.field}>
                <label className={parq.label} htmlFor="parq-emergency-phone">
                  Emergency contact phone number
                </label>
                <input
                  id="parq-emergency-phone"
                  type="tel"
                  className={ui.input}
                  name="emergencyContactPhone"
                  autoComplete="tel"
                  inputMode="tel"
                  enterKeyHint="next"
                  value={form.personalInformation.emergencyContactPhone}
                  onChange={(e) =>
                    setPersonal(
                      "emergencyContactPhone",
                      filterPhoneInput(e.target.value),
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className={parq.card}>
            <h2 className={parq.cardTitle}>2. Medical history</h2>
            <p className={`${ui.bodyText} mb-3 text-zinc-600`}>
              Please answer Yes or No to the following.
            </p>
            <ParQYesNoRadios
              name="mh-heart"
              legend="Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?"
              value={form.medicalHistory.heartConditionDoctorRestricted}
              onChange={(next) =>
                setMedical("heartConditionDoctorRestricted", next)
              }
            />
            <ParQYesNoRadios
              name="mh-chest-rest"
              legend="In the past month, have you had chest pain when you were not doing physical activity?"
              value={form.medicalHistory.chestPainWithoutActivityPastMonth}
              onChange={(next) =>
                setMedical("chestPainWithoutActivityPastMonth", next)
              }
            />
            <ParQYesNoRadios
              name="mh-chest-activity"
              legend="Do you feel pain in your chest when you do physical activity?"
              value={form.medicalHistory.chestPainWithActivity}
              onChange={(next) => setMedical("chestPainWithActivity", next)}
            />
            <ParQYesNoRadios
              name="mh-dizziness"
              legend="Do you lose your balance because of dizziness, or do you ever lose consciousness?"
              value={form.medicalHistory.dizzinessOrLossOfConsciousness}
              onChange={(next) =>
                setMedical("dizzinessOrLossOfConsciousness", next)
              }
            />
            <ParQYesNoRadios
              name="mh-joint"
              legend='Do you have a bone or joint problem (for example, back, knee, or hip) that could be made worse by a change in your physical activity?'
              value={form.medicalHistory.boneOrJointProblem}
              onChange={(next) => setMedical("boneOrJointProblem", next)}
            />
            <ParQYesNoRadios
              name="mh-meds"
              legend="Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?"
              value={form.medicalHistory.bloodPressureOrHeartMedication}
              onChange={(next) =>
                setMedical("bloodPressureOrHeartMedication", next)
              }
            />
            <ParQYesNoRadios
              name="mh-other"
              legend="Do you know of any other reason why you should not do physical activity?"
              value={form.medicalHistory.otherReasonNotToDoPhysicalActivity}
              onChange={(next) =>
                setMedical("otherReasonNotToDoPhysicalActivity", next)
              }
            />
          </div>

          <div className={parq.card}>
            <h2 className={parq.cardTitle}>3. Lifestyle &amp; physical activity</h2>
            <ParQYesNoRadios
              name="ls-active"
              legend="Are you physically active?"
              value={form.lifestyle.physicallyActive}
              onChange={(next) => setLifestyle("physicallyActive", next)}
            />
            <ParQYesNoRadios
              name="ls-diet"
              legend="Do you follow any special diet or have any dietary restrictions?"
              value={form.lifestyle.specialDietOrDietaryRestrictions}
              onChange={(next) =>
                setLifestyle("specialDietOrDietaryRestrictions", next)
              }
            />
            {showDietDescribe && (
              <div className={parq.field}>
                <label className={parq.label} htmlFor="parq-diet-desc">
                  If yes, please describe
                </label>
                <textarea
                  id="parq-diet-desc"
                  className={parq.textarea}
                  name="dietDescription"
                  autoComplete="off"
                  inputMode="text"
                  enterKeyHint="enter"
                  value={form.lifestyle.specialDietDescription}
                  onChange={(e) =>
                    setLifestyle("specialDietDescription", e.target.value)
                  }
                />
              </div>
            )}
            <ParQYesNoRadios
              name="ls-smoke"
              legend="Do you smoke?"
              value={form.lifestyle.smokes}
              onChange={(next) => setLifestyle("smokes", next)}
            />
            <div className={parq.field}>
              <label className={parq.label} htmlFor="parq-sleep">
                On average, how many hours of sleep do you get per night?
              </label>
              <input
                id="parq-sleep"
                type="number"
                className={ui.input}
                name="sleepHoursPerNight"
                inputMode="decimal"
                autoComplete="off"
                min={0}
                max={24}
                step={0.5}
                enterKeyHint="next"
                value={form.lifestyle.sleepHoursPerNight}
                onChange={(e) =>
                  setLifestyle("sleepHoursPerNight", e.target.value)
                }
              />
              <p className={parq.hint}>
                0–24 hours. Use the stepper or type a value (half-hour steps
                are fine).
              </p>
            </div>
            <div className={parq.field}>
              <label className={parq.label} htmlFor="parq-goals">
                Do you have any specific fitness goals?
              </label>
              <textarea
                id="parq-goals"
                className={parq.textarea}
                name="fitnessGoals"
                autoComplete="off"
                inputMode="text"
                enterKeyHint="enter"
                value={form.lifestyle.fitnessGoals}
                onChange={(e) => setLifestyle("fitnessGoals", e.target.value)}
              />
            </div>
          </div>

          <div className={parq.card}>
            <h2 className={parq.cardTitle}>4. Declaration</h2>
            <p className={`${ui.bodyText} mb-3`}>
              I have read, understood, and completed this questionnaire. All
              questions were answered honestly and to the best of my ability. If
              I have answered &quot;Yes&quot; to any of the questions above, I
              have consulted my doctor before engaging in physical activity or
              will do so before beginning a new programme.
            </p>
            <div className={parq.field}>
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={form.declaration.confirmed}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      declaration: {
                        ...prev.declaration,
                        confirmed: e.target.checked,
                      },
                    }))
                  }
                  className={ui.radioInput}
                />
                <span className={ui.radioText}>I confirm the above declaration</span>
              </label>
            </div>
            <div className={parq.field}>
              <label className={parq.label} htmlFor="parq-signature">
                Client signature (type your full name)
              </label>
              <input
                id="parq-signature"
                type="text"
                className={ui.input}
                name="clientSignature"
                autoComplete="name"
                autoCapitalize="words"
                inputMode="text"
                enterKeyHint="next"
                value={form.declaration.clientSignature}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    declaration: {
                      ...prev.declaration,
                      clientSignature: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className={parq.field}>
              <label className={parq.label} htmlFor="parq-declaration-date">
                Date
              </label>
              <input
                id="parq-declaration-date"
                type="date"
                className={ui.input}
                name="declarationDate"
                enterKeyHint="done"
                value={form.declaration.date}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    declaration: { ...prev.declaration, date: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          {medicalNotice && (
            <div
              className="mb-4 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-800"
              role="status"
            >
              You answered yes to one or more medical readiness questions. You
              may need medical clearance before beginning a new exercise
              programme.
            </div>
          )}

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
              {loading ? "Submitting…" : "Submit"}
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
