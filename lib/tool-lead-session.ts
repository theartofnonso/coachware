const STORAGE_KEY = "coachware-tool-lead-unlocks";

export interface StoredLeadUnlock {
  firstName: string;
  email: string;
}

function readMap(): Record<string, StoredLeadUnlock> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    return parsed as Record<string, StoredLeadUnlock>;
  } catch {
    return {};
  }
}

function writeMap(map: Record<string, StoredLeadUnlock>): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* quota or private mode */
  }
}

export function readLeadUnlock(contentKey: string): StoredLeadUnlock | null {
  const map = readMap();
  const v = map[contentKey];
  if (
    !v ||
    typeof v.firstName !== "string" ||
    typeof v.email !== "string" ||
    v.firstName.trim() === "" ||
    v.email.trim() === ""
  ) {
    return null;
  }
  return { firstName: v.firstName.trim(), email: v.email.trim() };
}

export function writeLeadUnlock(
  contentKey: string,
  lead: StoredLeadUnlock,
): void {
  const map = readMap();
  map[contentKey] = {
    firstName: lead.firstName.trim(),
    email: lead.email.trim(),
  };
  writeMap(map);
}
