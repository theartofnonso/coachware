/** URL segment under `/payment/confirmed/[plan]`. Use as Stripe Checkout `success_url` path. */
export const PAYMENT_PLAN_SLUGS = [
  "intro",
  "solo",
  "coaching-2",
  "coaching-3",
] as const;

export type PaymentPlanSlug = (typeof PAYMENT_PLAN_SLUGS)[number];

export function isPaymentPlanSlug(v: string): v is PaymentPlanSlug {
  return (PAYMENT_PLAN_SLUGS as readonly string[]).includes(v);
}

export function paymentConfirmationPath(plan: PaymentPlanSlug): string {
  return `/payment/confirmed/${plan}`;
}
