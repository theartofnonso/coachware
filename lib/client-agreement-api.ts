import type {
  ClientAgreementApiResponse,
  ClientAgreementSubmitPayload,
} from "@/types/client-agreement";

export async function postClientAgreement(
  payload: ClientAgreementSubmitPayload,
): Promise<ClientAgreementApiResponse> {
  const res = await fetch("/api/client-agreement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data: unknown = await res.json().catch(() => null);
  if (!data || typeof data !== "object") {
    return { ok: false, error: "Unexpected response from server." };
  }

  const rec = data as Record<string, unknown>;
  if (rec.ok === true) {
    return {
      ok: true,
      message: typeof rec.message === "string" ? rec.message : undefined,
    };
  }
  if (rec.ok === false && typeof rec.error === "string") {
    return { ok: false, error: rec.error };
  }
  return { ok: false, error: "Something went wrong. Please try again." };
}
