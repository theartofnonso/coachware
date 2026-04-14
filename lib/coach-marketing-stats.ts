import { unstable_cache } from "next/cache";
import { getSupabaseServiceRole } from "@/lib/supabase/service-role";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type CoachMarketingStatsOk = {
  success: true;
  coachId: string;
  clientsCount: number;
  sessionsCount: number;
  totalHours: number;
};

export type CoachMarketingStatsErr = {
  success: false;
  message: string;
};

export type CoachMarketingStatsResult =
  | CoachMarketingStatsOk
  | CoachMarketingStatsErr;

export function isValidCoachIdUuid(value: string): boolean {
  return UUID_RE.test(value.trim());
}

function roundHoursFromMs(totalMs: number): number {
  return Math.round((totalMs / 3_600_000) * 100) / 100;
}

async function fetchFromRemoteApi(
  coachId: string,
): Promise<CoachMarketingStatsResult> {
  const base = process.env.COACH_MARKETING_STATS_API_BASE?.trim();
  if (!base) {
    return {
      success: false,
      message: "Failed to fetch coach metrics",
    };
  }

  const url = `${base.replace(/\/$/, "")}/coach-marketing-stats`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coachId }),
      cache: "no-store",
    });
  } catch {
    return { success: false, message: "Failed to fetch coach metrics" };
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    return { success: false, message: "Failed to fetch coach metrics" };
  }

  if (!res.ok || typeof json !== "object" || json === null) {
    return { success: false, message: "Failed to fetch coach metrics" };
  }

  const o = json as Record<string, unknown>;
  if (o.success !== true) {
    return {
      success: false,
      message:
        typeof o.message === "string"
          ? o.message
          : "Failed to fetch coach metrics",
    };
  }

  const id = typeof o.coachId === "string" ? o.coachId : coachId;
  return {
    success: true,
    coachId: id,
    clientsCount: Number(o.clientsCount) || 0,
    sessionsCount: Number(o.sessionsCount) || 0,
    totalHours: Number(o.totalHours) || 0,
  };
}

/**
 * Expects tables: `coach_clients` (coach_id, user_id), `workout_sessions` (user_id, start_time, end_time).
 */
async function fetchFromSupabase(
  coachId: string,
): Promise<CoachMarketingStatsResult> {
  const supabase = getSupabaseServiceRole();
  if (!supabase) {
    return { success: false, message: "Failed to fetch coach metrics" };
  }

  const { data: clients, error: clientsError } = await supabase
    .from("coach_clients")
    .select("user_id")
    .eq("coach_id", coachId);

  if (clientsError) {
    console.error("[coach-marketing-stats] coach_clients", clientsError);
    return { success: false, message: "Failed to fetch coach metrics" };
  }

  const clientsCount = clients?.length ?? 0;
  const userIds = [
    ...new Set(
      (clients ?? [])
        .map((r: { user_id?: string | null }) => r.user_id)
        .filter((id): id is string => typeof id === "string" && id.length > 0),
    ),
  ];

  if (userIds.length === 0) {
    return {
      success: true,
      coachId,
      clientsCount,
      sessionsCount: 0,
      totalHours: 0,
    };
  }

  const pageSize = 1000;
  let offset = 0;
  let sessionsCount = 0;
  let totalMs = 0;
  let firstPage = true;

  while (true) {
    const { data: rows, error: sessionsError, count } = await supabase
      .from("workout_sessions")
      .select("start_time, end_time", {
        count: firstPage ? "exact" : undefined,
      })
      .in("user_id", userIds)
      .range(offset, offset + pageSize - 1);

    if (sessionsError) {
      console.error("[coach-marketing-stats] workout_sessions", sessionsError);
      return { success: false, message: "Failed to fetch coach metrics" };
    }

    if (firstPage && typeof count === "number") {
      sessionsCount = count;
    }
    firstPage = false;

    if (!rows?.length) {
      break;
    }

    for (const row of rows as {
      start_time?: string | null;
      end_time?: string | null;
    }[]) {
      if (!row.start_time || !row.end_time) {
        continue;
      }
      const a = new Date(row.start_time).getTime();
      const b = new Date(row.end_time).getTime();
      if (Number.isFinite(a) && Number.isFinite(b) && b > a) {
        totalMs += b - a;
      }
    }

    if (rows.length < pageSize) {
      break;
    }
    offset += pageSize;
  }

  return {
    success: true,
    coachId,
    clientsCount,
    sessionsCount,
    totalHours: roundHoursFromMs(totalMs),
  };
}

async function computeCoachMarketingStats(
  coachId: string,
): Promise<CoachMarketingStatsResult> {
  const trimmed = coachId.trim();
  if (!isValidCoachIdUuid(trimmed)) {
    return { success: false, message: "coachId must be a valid UUID" };
  }

  const useRemote = Boolean(
    process.env.COACH_MARKETING_STATS_API_BASE?.trim(),
  );
  if (useRemote) {
    return fetchFromRemoteApi(trimmed);
  }

  return fetchFromSupabase(trimmed);
}

const getCoachMarketingStatsCached = unstable_cache(
  async (coachId: string) => computeCoachMarketingStats(coachId),
  ["coach-marketing-stats"],
  { revalidate: 300 },
);

export async function getCoachMarketingStats(
  coachId: string,
): Promise<CoachMarketingStatsResult> {
  return getCoachMarketingStatsCached(coachId);
}

/** Uncached — use in Route Handlers when you need fresh data. */
export async function getCoachMarketingStatsUncached(
  coachId: string,
): Promise<CoachMarketingStatsResult> {
  return computeCoachMarketingStats(coachId);
}
