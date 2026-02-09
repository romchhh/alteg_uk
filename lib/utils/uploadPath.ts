import path from "path";

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
