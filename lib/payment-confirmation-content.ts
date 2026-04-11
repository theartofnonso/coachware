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

export const PAYMENT_CONFIRMATION_COPY: Record<
  PaymentPlanSlug,
  PaymentConfirmationCopy
> = {
  intro: {
    metaTitle: "Intro offer confirmed",
    metaDescription:
      "Your intro sessions are booked in. Here is what happens next.",
    kicker: "Payment received",
    headline: "You are in for the intro",
    paragraphs: [
      "Your payment went through. That buys two proper sessions with me, not a generic programme in your inbox.",
      "We use that time to see how you move, what you want, and whether we actually work well together. No pressure to sign up for more until we have both said yes.",
      "I am on this. You will hear from me soon to sort times. If you already booked through a link, I will still confirm details so nothing sits in limbo.",
    ],
    nextStepsTitle: "What happens next",
    nextSteps: [
      {
        phase: "First contact",
        description:
          "Watch for a message from me (email or DM, whichever you used to pay).",
      },
      {
        phase: "Your two sessions",
        description: "We lock in your two intro sessions at times that work.",
      },
      {
        phase: "After the intros",
        description:
          "If we both want to continue, we pick the right monthly tier together.",
      },
    ],
    primaryCta: { label: "Back to home", href: "/" },
  },
  solo: {
    metaTitle: "Solo plan confirmed",
    metaDescription:
      "Your Solo membership is confirmed. Here is how onboarding works.",
    kicker: "Payment received",
    headline: "Welcome to Solo",
    paragraphs: [
      "You are on Solo. That means you train on your own schedule, but you are not guessing sets, reps, or what to eat in broad terms.",
      "I write the plan and set simple calorie and protein targets you can hit without living in an app. Once a month we touch base so the plan stays honest when work, travel, or motivation wobbles.",
    ],
    nextStepsTitle: "What happens next",
    nextSteps: [
      {
        phase: "Onboarding",
        description:
          "I send a short form or a few questions so the plan matches your schedule and equipment.",
      },
      {
        phase: "Your plan",
        description:
          "You get your personalised training plan and calorie plus protein targets.",
      },
      {
        phase: "Check-ins",
        description:
          "We agree how your monthly check-in works (message or call).",
      },
    ],
    primaryCta: { label: "Back to home", href: "/" },
  },
  "coaching-1": {
    metaTitle: "Coaching confirmed (1 session per week)",
    metaDescription:
      "Your coaching membership at one session per week is confirmed.",
    kicker: "Payment received",
    headline: "Coaching is live (1 session per week)",
    paragraphs: [
      "You chose one session with me each week. That is enough time in the room to coach technique, load, and intent, without asking you to live at the gym.",
      "You still get the full Solo setup (written plan and nutrition targets). The weekly check-in is where we tweak things so the other days you train alone still line up with what we decided together.",
    ],
    nextStepsTitle: "What happens next",
    nextSteps: [
      {
        phase: "Sessions locked in",
        description:
          "I confirm your usual weekly slot and gym location if we have not already.",
      },
      {
        phase: "Plan and targets",
        description:
          "You get your written plan and nutrition targets, same as Solo, tuned to your goals.",
      },
      {
        phase: "From week one",
        description:
          "Weekly check-ins start straight away so small issues do not turn into stalls.",
      },
    ],
    primaryCta: { label: "Back to home", href: "/" },
  },
  "coaching-2": {
    metaTitle: "Coaching confirmed (2 sessions per week)",
    metaDescription:
      "Your coaching membership at two sessions per week is confirmed.",
    kicker: "Payment received",
    headline: "Coaching is live (2 sessions per week)",
    paragraphs: [
      "Two sessions a week with me is a strong middle ground. We can actually progress lifts, fix habits, and catch problems before they turn into plateaus.",
      "Solo still covers your written programme and targets. The days you train solo should feel like an extension of what we did in person, not a different sport.",
    ],
    nextStepsTitle: "What happens next",
    nextSteps: [
      {
        phase: "Diary and slots",
        description:
          "We confirm your two weekly slots and any flexibility you need for travel or shifts.",
      },
      {
        phase: "First sessions",
        description:
          "We baseline movement and preferences, and build a plan you can trust on the other days.",
      },
      {
        phase: "Each week",
        description:
          "Check-ins keep the programme honest as strength and energy change.",
      },
    ],
    primaryCta: { label: "Back to home", href: "/" },
  },
  "coaching-3": {
    metaTitle: "Coaching confirmed (3 sessions per week)",
    metaDescription:
      "Your coaching membership at three sessions per week is confirmed.",
    kicker: "Payment received",
    headline: "Coaching is live (3 sessions per week)",
    paragraphs: [
      "Three sessions a week with me is a serious commitment. It suits people who want the fastest sane progress and are happy to hand most of the thinking to someone else in the gym.",
      "You still get the same written plan and nutrition framework as Solo. Weekly check-ins matter more here because volume, recovery, and food need to stay in sync when we are on the floor this often.",
    ],
    nextStepsTitle: "What happens next",
    nextSteps: [
      {
        phase: "A schedule you can keep",
        description:
          "We map three weekly slots you can actually hold, not just ideal-week fantasies.",
      },
      {
        phase: "Early weeks",
        description:
          "We prioritise consistency and recovery so the volume feels sustainable.",
      },
      {
        phase: "Every week",
        description:
          "Check-ins fine tune volume and food so training and life do not fight each other.",
      },
    ],
    primaryCta: { label: "Back to home", href: "/" },
  },
};

export function getPaymentConfirmationCopy(
  plan: PaymentPlanSlug,
): PaymentConfirmationCopy {
  return PAYMENT_CONFIRMATION_COPY[plan];
}
