const defaultAccountPath = "/mi-cuenta";

export function getSafeNextPath(value: FormDataEntryValue | string | null) {
  if (typeof value !== "string") {
    return defaultAccountPath;
  }

  const next = value.trim();

  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return defaultAccountPath;
  }

  if (next.startsWith("/admin")) {
    return defaultAccountPath;
  }

  return next;
}
