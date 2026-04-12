const DEVICE_KEY = "coachware-device-lead";
/** Legacy: per-result keys in sessionStorage */
const LEGACY_SESSION_KEY = "coachware-tool-lead-unlocks";

export interface StoredLeadUnlock {
  firstName: string;
  email: string;
}

function isValidLead(v: unknown): v is StoredLeadUnlock {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.firstName === "string" &&
    typeof o.email === "string" &&
    o.firstName.trim() !== "" &&
    o.email.trim() !== ""
  );
}

/**
 * One name + email per browser. Used to unlock all tools and all result variants
 * without asking again on the same device.
 */
export function readDeviceLead(): StoredLeadUnlock | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const migrated = migrateLegacySessionStorage();
    if (migrated) {
      return migrated;
    }

    const raw = window.localStorage.getItem(DEVICE_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!isValidLead(parsed)) {
      return null;
    }
    return {
      firstName: parsed.firstName.trim(),
      email: parsed.email.trim(),
    };
  } catch {
    return null;
  }
}

function migrateLegacySessionStorage(): StoredLeadUnlock | null {
  try {
    const raw = window.sessionStorage.getItem(LEGACY_SESSION_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    const map = parsed as Record<string, unknown>;
    for (const value of Object.values(map)) {
      if (isValidLead(value)) {
        const lead = {
          firstName: value.firstName.trim(),
          email: value.email.trim(),
        };
        writeDeviceLead(lead);
        window.sessionStorage.removeItem(LEGACY_SESSION_KEY);
        return lead;
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function writeDeviceLead(lead: StoredLeadUnlock): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(
      DEVICE_KEY,
      JSON.stringify({
        firstName: lead.firstName.trim(),
        email: lead.email.trim(),
      }),
    );
  } catch {
    /* quota or private mode */
  }
}
