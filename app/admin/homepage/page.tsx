"use client";

import React, { useState, useEffect } from "react";
import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import ComponentCard from "@/components/admin/ComponentCard";
import Label from "@/components/admin/form/Label";
import Input from "@/components/admin/form/Input";
import TextArea from "@/components/admin/form/TextArea";

export default function HomepageAdminPage() {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/homepage");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setHeroTitle(data.heroTitle || "");
        setHeroSubtitle(data.heroSubtitle || "");
      } catch (err) {
        setError("Failed to load settings");
      } finally {
        setFetchLoading(false);
      }
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroTitle,
          heroSubtitle,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSuccess("Settings saved!");
    } catch (err) {
      setError("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Homepage" />
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Homepage" />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <ComponentCard title="Hero section" desc="Title and subtitle of the homepage">
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="ALTEG UK - Aluminium Profiles Direct from Factory"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <TextArea
                value={heroSubtitle}
                onChange={setHeroSubtitle}
                rows={3}
                placeholder="Buy aluminium angles, tubes, sheets directly from manufacturer..."
              />
            </div>
          </div>
        </ComponentCard>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        {success && (
          <p className="text-green-600">{success}</p>
        )}
        {error && (
          <p className="text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
}
