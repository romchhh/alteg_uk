/**
 * Only server-saved images (public/uploads) are used. External URLs are ignored.
 * Returns the URL to display an uploaded image, or empty string if not a server upload.
 */
export function getUploadImageSrc(url: string): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("/uploads/")) return "/api/uploads/" + trimmed.slice("/uploads/".length);
  if (trimmed.startsWith("/api/uploads/")) return trimmed;
  return "";
}

/** True if the value is a server upload path (to be served from public/uploads). */
export function isServerUploadUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  const t = url.trim();
  return t.startsWith("/uploads/") || t.startsWith("/api/uploads/");
}
