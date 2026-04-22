import type { Metadata } from "next";
import { PaymentConfirmationView } from "@/components/payment/PaymentConfirmationView";
import { getPaymentConfirmationCopy } from "@/lib/payment-confirmation-content";

export const metadata: Metadata = {
  title: "Coaching confirmed",
  description:
    "Your coaching membership is confirmed. Here is what happens next with onboarding and training.",
  robots: { index: false, follow: false },
};

export default function PaymentConfirmedGenericPage() {
  const copy = getPaymentConfirmationCopy("coaching-2");
  return <PaymentConfirmationView copy={copy} />;
}
