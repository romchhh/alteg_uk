"use client";

import React, { useId, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { getUploadImageSrc, isServerUploadUrl } from "@/lib/utils/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  /** Notify parent when upload starts/finishes so Save can be disabled during upload */
  onUploadingChange?: (uploading: boolean) => void;
}

export function ImageUpload({ value, onChange, label = "Image", hint, onUploadingChange }: ImageUploadProps) {
  const fileInputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    onUploadingChange?.(uploading);
  }, [uploading, onUploadingChange]);

  useEffect(() => {
    setImageLoadError(false);
  }, [value]);

  const uploadFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) uploadFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      )}
      {value != null && value.trim() !== "" ? (
        <div className="space-y-3">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            {isServerUploadUrl(value) ? (
              !imageLoadError ? (
                <Image
                  src={getUploadImageSrc(value)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="128px"
                  unoptimized
                  onError={() => setImageLoadError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">Image unavailable</div>
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-500 text-center px-2">Only server uploads. Upload a new image or remove.</div>
            )}
          </div>
          <p className="text-xs text-gray-600 truncate max-w-full">{value}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange("");
              }}
              className="text-xs text-red-600 hover:underline"
            >
              Remove image
            </button>
            <span className="text-xs text-gray-400">or replace with file below. Click Save to apply.</span>
          </div>
        </div>
      ) : null}
      <label
        htmlFor={fileInputId}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        className={`
          relative block border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors mt-2
          ${drag ? "border-gray-800 bg-gray-50" : "border-gray-300 hover:border-gray-400"}
          ${uploading ? "pointer-events-none opacity-70" : ""}
        `}
      >
        <input
          id={fileInputId}
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {uploading ? (
          <p className="text-sm text-gray-500">Uploading...</p>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              {value ? "Drop new image or click to replace" : "Drag image here or click to select file"}
            </p>
            <p className="text-xs text-gray-400 mt-1">JPEG, PNG, GIF, WebP, up to 5 MB. Click Save after uploading to apply.</p>
          </>
        )}
      </label>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
