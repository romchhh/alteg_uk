import path from "path";

/**
 * Directory for uploaded files. Use UPLOADS_DIR env for production
 * so uploads persist (e.g. /var/data/alteg/uploads) and survive deploys.
 */
export function getUploadDir(): string {
  const fromEnv = process.env.UPLOADS_DIR;
  if (fromEnv && path.isAbsolute(fromEnv)) {
    return fromEnv;
  }
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
