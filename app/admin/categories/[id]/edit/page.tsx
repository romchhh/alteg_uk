"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import ComponentCard from "@/components/admin/ComponentCard";
import { useAdminToast } from "@/lib/AdminToastContext";
import Label from "@/components/admin/form/Label";
import Input from "@/components/admin/form/Input";
import TextArea from "@/components/admin/form/TextArea";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface CategoryDisplay {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  image?: string;
}

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useAdminToast();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/categories/${id}`);
        if (!res.ok) {
          if (res.status === 404) setError("Category not found");
          else setError("Failed to fetch");
          setFetchLoading(false);
          return;
        }
        const cat: CategoryDisplay = await res.json();
        setName(cat.name || "");
        setNameEn(cat.nameEn || "");
        setDescription(cat.description || "");
        setImage(cat.image ?? "");
      } catch {
        setError("Failed to load category");
      } finally {
        setFetchLoading(false);
      }
    }
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || undefined,
          nameEn: nameEn || undefined,
          description: description || undefined,
          image: image.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");
      const updated: CategoryDisplay = await res.json();
      setImage(updated.image ?? "");
      setSuccess("Changes saved");
      toast.show("Changes saved", "success");
    } catch {
      setError("Failed to save");
      toast.show("Failed to save", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Edit category" segments={[{ label: "Categories", href: "/admin/categories" }, { label: "Edit" }]} />
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error && !name && !nameEn) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Edit category" segments={[{ label: "Categories", href: "/admin/categories" }, { label: "Edit" }]} />
        <p className="text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => router.push("/admin/categories")}
          className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm"
        >
          Back to categories
        </button>
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle={`Edit: ${id}`} segments={[{ label: "Categories", href: "/admin/categories" }, { label: "Edit" }]} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <ComponentCard title="Names & description" desc="Changes appear in the catalog and on the site.">
          <div className="space-y-4">
            <div>
              <Label>Category ID</Label>
              <p className="text-sm text-gray-600 font-mono">{id}</p>
            </div>
            <div>
              <Label>Name (EN)</Label>
              <Input
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Aluminium Angle"
              />
            </div>
            <div>
              <Label>Description</Label>
              <TextArea
                value={description}
                onChange={setDescription}
                rows={4}
                placeholder="Short category description"
              />
            </div>
            <div>
              <ImageUpload
                label="Category image"
                value={image}
                onChange={setImage}
                hint="Drag and drop — saved as /uploads/..."
              />
            </div>
          </div>
        </ComponentCard>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gray-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm"
          >
            Cancel
          </button>
        </div>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
