const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLeadFirstName(raw: string): string | null {
  const t = raw.trim();
  if (t.length === 0) {
    return "Please enter your first name.";
  }
  if (t.length > 80) {
    return "First name is too long.";
  }
  return null;
}

export function validateLeadEmail(raw: string): string | null {
  const t = raw.trim();
  if (t.length === 0) {
    return "Please enter your email.";
  }
  if (t.length > 254 || !EMAIL_RE.test(t)) {
    return "Please enter a valid email address.";
  }
  return null;
}
