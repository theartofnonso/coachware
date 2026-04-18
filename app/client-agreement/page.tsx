import type { Metadata } from "next";
import { ClientAgreementForm } from "@/components/client-agreement/ClientAgreementForm";

export const metadata: Metadata = {
  title: "Client Agreement",
  description:
    "Read and sign the coaching terms — payments, cancellations, health disclosure, and scope — before you start.",
};

export default function ClientAgreementPage() {
  return <ClientAgreementForm />;
}
