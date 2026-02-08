/**
 * Returns the URL to use for displaying an uploaded image.
 * Old records may store /uploads/filename; we serve them via /api/uploads/filename
 * so they work without rebuild. New uploads are already stored as /api/uploads/filename.
 */
export function getUploadImageSrc(url: string): string {
  if (!url || typeof url !== "string") return url;
  if (url.startsWith("/uploads/")) return "/api/uploads/" + url.slice("/uploads/".length);
  return url;
}
