import type { PaymentPlanSlug } from "@/lib/payment-plan-slugs";
import type { TimelineStep } from "@/components/TimelineList";

export type PaymentConfirmationCopy = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  headline: string;
  paragraphs: readonly string[];
  nextStepsTitle?: string;
  nextSteps?: readonly TimelineStep[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

/** Same two steps after every plan: we already know each other; this is setup then training. */
const POST_PAYMENT_NEXT_STEPS: readonly TimelineStep[] = [
  {
    phase: "Onboarding",
    description:
      "I get you set up on the coaching app so your personalised plan, sessions, and check-ins sit in one place.",
  },
  {
    phase: "Programming and training",
    description:
      "I build your personalised training plan and nutrition targets from what we already covered. Nothing is fixed forever; we tweak as you progress or life shifts. Training commences from there.",
  },
];

export const PAYMENT_CONFIRMATION_COPY: Record<
  PaymentPlanSlug,
  PaymentConfirmationCopy
> = {
  intro: {
    metaTitle: "Payment confirmed",
    metaDescription:
      "Your payment is through. Here is what happens next with onboarding and training.",
    kicker: "Payment received",
    headline: "You are all set",
    paragraphs: [
      "Your payment went through. Thank you.",
      "We have already talked things through, so from here it is about getting you on the app, your personalised plan in place, and training underway.",
    ],
    nextStepsTitle: "What happens next",
    nextSteps: POST_PAYMENT_NEXT_STEPS,
    primaryCta: { label: "Back to home", href: "/" },
  },
  solo: {
    metaTitle: "Solo plan confirmed",
    metaDescription:
      "Your Solo membership is confirmed. Onboarding and training are next.",
    kicker: "Payment received",
    headline: "Welcome to Solo",
    paragraphs: [
      "Your Solo membership is active. You train on your own schedule with a personalised plan and targets from me.",
      "We have already aligned on direction, so next I onboard you on the app, we dial in your plan, and you start training.",
    ],
    nextStepsTitle: "What happens next",
    nextSteps: POST_PAYMENT_NEXT_STEPS,
    primaryCta: { label: "Back to home", href: "/" },
  },
  "coaching-2": {
    metaTitle: "Coaching confirmed (2 sessions per week)",
    metaDescription:
      "Your coaching membership is confirmed. Onboarding and training are next.",
    kicker: "Payment received",
    headline: "Coaching is live (2 sessions per week)",
    paragraphs: [
      "Your coaching membership is active at two sessions per week, with a full personalised plan and targets behind you on the other days.",
      "We have already aligned on how this works, so next I get you on the app, we set up your plan in the app, and training is in motion.",
    ],
    nextStepsTitle: "What happens next",
    nextSteps: POST_PAYMENT_NEXT_STEPS,
    primaryCta: { label: "Back to home", href: "/" },
  },
  "coaching-3": {
    metaTitle: "Coaching confirmed (3 sessions per week)",
    metaDescription:
      "Your coaching membership is confirmed. Onboarding and training are next.",
    kicker: "Payment received",
    headline: "Coaching is live (3 sessions per week)",
    paragraphs: [
      "Your coaching membership is active at three sessions per week. Volume, recovery, and food stay tight when we are on the floor this often.",
      "We have already mapped how this fits your week, so next is app onboarding, your personalised plan ready to run, and training commences.",
    ],
    nextStepsTitle: "What happens next",
    nextSteps: POST_PAYMENT_NEXT_STEPS,
    primaryCta: { label: "Back to home", href: "/" },
  },
};

export function getPaymentConfirmationCopy(
  plan: PaymentPlanSlug,
): PaymentConfirmationCopy {
  return PAYMENT_CONFIRMATION_COPY[plan];
}
