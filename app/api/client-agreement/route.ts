import { parseClientAgreementRequestBody } from "@/lib/client-agreement-validation";
import { persistClientAgreementSubmission } from "@/lib/supabase/persist-leads";
import type { ClientAgreementApiResponse, ClientAgreementPayload } from "@/types/client-agreement";
import { NextResponse } from "next/server";

/**
 * POST /api/client-agreement
 *
 * Validates signed client agreement JSON, stamps acceptedAt server-side, persists to Supabase.
 */
export async function POST(
  req: Request,
): Promise<NextResponse<ClientAgreementApiResponse>> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = parseClientAgreementRequestBody(raw);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, error: parsed.error },
      { status: 400 },
    );
  }

  const payload: ClientAgreementPayload = {
    ...parsed.payload,
    agreement: {
      ...parsed.payload.agreement,
      acceptedAt: new Date().toISOString(),
    },
  };

  const saved = await persistClientAgreementSubmission({ payload });
  if (!saved.ok) {
    return NextResponse.json(
      { ok: false, error: saved.message },
      { status: saved.httpStatus },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Your agreement has been recorded.",
  });
}
