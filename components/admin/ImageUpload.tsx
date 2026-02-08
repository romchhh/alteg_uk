"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}

export function ImageUpload({ value, onChange, label = "Image", hint }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${drag ? "border-gray-800 bg-gray-50" : "border-gray-300 hover:border-gray-400"}
          ${uploading ? "pointer-events-none opacity-70" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleChange}
        />
        {uploading ? (
          <p className="text-sm text-gray-500">Uploading...</p>
        ) : value ? (
          <div className="space-y-2">
            <div className="relative mx-auto w-32 h-32 rounded overflow-hidden bg-gray-100">
              <Image
                src={value}
                alt=""
                fill
                className="object-cover"
                sizes="128px"
                unoptimized={value.startsWith("http")}
              />
            </div>
            <p className="text-xs text-gray-600 truncate max-w-full">{value}</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="text-xs text-red-600 hover:underline"
            >
              Remove image
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              Drag image here or click to select
            </p>
            <p className="text-xs text-gray-400 mt-1">JPEG, PNG, GIF, WebP, up to 5 MB</p>
          </>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
