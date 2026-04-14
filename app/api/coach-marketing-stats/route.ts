import {
  getCoachMarketingStatsUncached,
  isValidCoachIdUuid,
} from "@/lib/coach-marketing-stats";
import { NextResponse } from "next/server";

function jsonResponse(body: unknown, status: number) {
  return NextResponse.json(body, { status });
}

function parseCoachIdFromBody(raw: unknown): string | null {
  if (typeof raw !== "object" || raw === null) {
    return null;
  }
  const coachId = (raw as Record<string, unknown>).coachId;
  return typeof coachId === "string" ? coachId : null;
}

/**
 * POST /api/coach-marketing-stats
 * Body: { "coachId": "uuid" }
 */
export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return jsonResponse(
      { success: false, message: "coachId is required" },
      400,
    );
  }

  const coachId = parseCoachIdFromBody(raw);
  if (coachId === null || coachId.trim() === "") {
    return jsonResponse(
      { success: false, message: "coachId is required" },
      400,
    );
  }
  if (!isValidCoachIdUuid(coachId)) {
    return jsonResponse(
      { success: false, message: "coachId must be a valid UUID" },
      400,
    );
  }

  const result = await getCoachMarketingStatsUncached(coachId);
  if (!result.success) {
    return jsonResponse(
      { success: false, message: "Failed to fetch coach metrics" },
      500,
    );
  }

  return jsonResponse(
    {
      success: true,
      coachId: result.coachId,
      clientsCount: result.clientsCount,
      sessionsCount: result.sessionsCount,
      totalHours: result.totalHours,
    },
    200,
  );
}

/**
 * GET /api/coach-marketing-stats?coachId=uuid
 * If coachId is omitted, uses COACH_MARKETING_COACH_ID when set.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const fromQuery = url.searchParams.get("coachId");
  const fromEnv = process.env.COACH_MARKETING_COACH_ID?.trim();
  const coachId = fromQuery?.trim() || fromEnv || "";

  if (coachId === "") {
    return jsonResponse(
      { success: false, message: "coachId is required" },
      400,
    );
  }
  if (!isValidCoachIdUuid(coachId)) {
    return jsonResponse(
      { success: false, message: "coachId must be a valid UUID" },
      400,
    );
  }

  const result = await getCoachMarketingStatsUncached(coachId);
  if (!result.success) {
    return jsonResponse(
      { success: false, message: "Failed to fetch coach metrics" },
      500,
    );
  }

  return jsonResponse(
    {
      success: true,
      coachId: result.coachId,
      clientsCount: result.clientsCount,
      sessionsCount: result.sessionsCount,
      totalHours: result.totalHours,
    },
    200,
  );
}
