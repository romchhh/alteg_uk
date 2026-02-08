import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = "public/uploads";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    if (!filename || filename.includes("..") || path.isAbsolute(filename)) {
      return new NextResponse("Bad request", { status: 400 });
    }
    const basename = path.basename(filename);
    const filepath = path.join(process.cwd(), UPLOAD_DIR, basename);

    const buffer = await readFile(filepath);

    const ext = path.extname(basename).toLowerCase();
    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image fetch error:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}
