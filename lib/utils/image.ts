/**
 * Only server-saved images (public/uploads) are used. External URLs are ignored.
 * Returns the URL to display an uploaded image, or empty string if not a server upload.
 * For Next.js Image optimization, use direct /uploads/ path (Next.js will optimize automatically).
 * For API routes or other cases, use /api/uploads/.
 */
export function getUploadImageSrc(url: string, useDirectPath: boolean = false): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  // Use direct path for Next.js Image optimization (converts to WebP automatically)
  if (useDirectPath) {
    if (trimmed.startsWith("/uploads/")) return trimmed;
    if (trimmed.startsWith("/api/uploads/")) return "/uploads/" + trimmed.slice("/api/uploads/".length);
    return "";
  }
  // Use API route for other cases (with caching headers)
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
