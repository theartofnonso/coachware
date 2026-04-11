import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaymentConfirmationView } from "@/components/payment/PaymentConfirmationView";
import {
  getPaymentConfirmationCopy,
  PAYMENT_CONFIRMATION_COPY,
} from "@/lib/payment-confirmation-content";
import {
  isPaymentPlanSlug,
  PAYMENT_PLAN_SLUGS,
  type PaymentPlanSlug,
} from "@/lib/payment-plan-slugs";

type PageProps = {
  params: Promise<{ plan: string }>;
};

export function generateStaticParams(): { plan: PaymentPlanSlug }[] {
  return PAYMENT_PLAN_SLUGS.map((plan) => ({ plan }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { plan: raw } = await params;
  if (!isPaymentPlanSlug(raw)) {
    return { title: "Not found" };
  }
  const c = PAYMENT_CONFIRMATION_COPY[raw];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function PaymentConfirmedPage({ params }: PageProps) {
  const { plan: raw } = await params;
  if (!isPaymentPlanSlug(raw)) {
    notFound();
  }
  const copy = getPaymentConfirmationCopy(raw);
  return <PaymentConfirmationView copy={copy} />;
}
