import path from "path";
import { unlink } from "fs/promises";

/** Directory for uploaded files — always public/uploads. */
export function getUploadDir(): string {
  return path.join(process.cwd(), "public", "uploads");
}

/** Resolve full filesystem path for a filename (basename only, no slashes). */
export function getUploadFilePath(filename: string): string {
  const base = path.basename(filename);
  if (base !== filename || base.includes("..")) {
    throw new Error("Invalid filename");
  }
  return path.join(getUploadDir(), base);
}

/** True if url is a server upload path (/uploads/... or /api/uploads/...). */
function isServerUploadUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  const t = url.trim();
  return t.startsWith("/uploads/") || t.startsWith("/api/uploads/");
}

/** Extract basename from upload URL. Returns null if not a server upload. */
function basenameFromUploadUrl(url: string): string | null {
  if (!isServerUploadUrl(url)) return null;
  const t = url.trim();
  const rest = t.startsWith("/api/uploads/") ? t.slice("/api/uploads/".length) : t.slice("/uploads/".length);
  const base = path.basename(rest);
  return base && !base.includes("..") ? base : null;
}

/** Delete an uploaded file by its URL. No-op if not a server upload or file missing. */
export async function deleteUploadFile(url: string): Promise<void> {
  const base = basenameFromUploadUrl(url);
  if (!base) return;
  try {
    const filepath = getUploadFilePath(base);
    await unlink(filepath);
  } catch {
    // File already missing or not our path — ignore
  }
}
