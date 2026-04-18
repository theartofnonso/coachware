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
  tertiaryCta?: { label: string; href: string };
};

/** Shared flow after every plan: PAR-Q, client agreement, app onboarding, then training. */
const POST_PAYMENT_NEXT_STEPS: readonly TimelineStep[] = [
  {
    phase: "Health readiness (PAR-Q)",
    description:
      "Complete the short Physical Activity Readiness Questionnaire. It helps me see whether you are ready to train and if anything needs medical clearance before we push volume or intensity.",
    cta: { label: "Complete PAR-Q", href: "/par-q" },
  },
  {
    phase: "Client agreement",
    description:
      "Read and sign the coaching terms (payments, cancellations, no-shows, refunds, health disclosure, liability, and scope). It keeps expectations clear on both sides.",
    cta: { label: "Client agreement", href: "/client-agreement" },
  },
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

const POST_PAYMENT_CTAS = {
  primaryCta: { label: "Back to home", href: "/" },
} as const;

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
    paragraphs: [],
    nextStepsTitle: "What happens next",
    nextSteps: POST_PAYMENT_NEXT_STEPS,
    ...POST_PAYMENT_CTAS,
  },
  solo: {
    metaTitle: "Solo plan confirmed",
    metaDescription:
      "Your Solo membership is confirmed. Onboarding and training are next.",
    kicker: "Payment received",
    headline: "Welcome to Solo",
    paragraphs: [],
    nextStepsTitle: "What happens next",
    nextSteps: POST_PAYMENT_NEXT_STEPS,
    ...POST_PAYMENT_CTAS,
  },
  "coaching-2": {
    metaTitle: "Coaching confirmed (2 sessions per week)",
    metaDescription:
      "Your coaching membership is confirmed. Onboarding and training are next.",
    kicker: "Payment received",
    headline: "Coaching is live (2 sessions per week)",
    paragraphs: [],
    nextStepsTitle: "What happens next",
    nextSteps: POST_PAYMENT_NEXT_STEPS,
    ...POST_PAYMENT_CTAS,
  },
  "coaching-3": {
    metaTitle: "Coaching confirmed (3 sessions per week)",
    metaDescription:
      "Your coaching membership is confirmed. Onboarding and training are next.",
    kicker: "Payment received",
    headline: "Coaching is live (3 sessions per week)",
    paragraphs: [],
    nextStepsTitle: "What happens next",
    nextSteps: POST_PAYMENT_NEXT_STEPS,
    ...POST_PAYMENT_CTAS,
  },
};

export function getPaymentConfirmationCopy(
  plan: PaymentPlanSlug,
): PaymentConfirmationCopy {
  return PAYMENT_CONFIRMATION_COPY[plan];
}
