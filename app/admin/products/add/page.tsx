"use client";

import React, { useState, useEffect } from "react";
import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import ComponentCard from "@/components/admin/ComponentCard";
import Label from "@/components/admin/form/Label";
import Input from "@/components/admin/form/Input";
import TextArea from "@/components/admin/form/TextArea";
import ToggleSwitch from "@/components/admin/form/ToggleSwitch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { PRODUCT_CATEGORIES } from "@/lib/constants/catalog";
import { adminProductSchema } from "@/lib/utils/validators";

interface CategoryOption {
  id: string;
  name: string;
  nameEn: string;
}

export default function AddProductPage() {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [nameEn, setNameEn] = useState("");
  const [category, setCategory] = useState("angle");
  const [dimensions, setDimensions] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [weightPerMeter, setWeightPerMeter] = useState("");
  const [useDefaultData, setUseDefaultData] = useState(false);
  const [standardLengths, setStandardLengths] = useState("1, 3, 6");

  const DEFAULT_PRICE_PER_KG = "4.20";
  const DEFAULT_WEIGHT_PER_METER = "0.41";
  const [inStock, setInStock] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [material, setMaterial] = useState("");
  const [finish, setFinish] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.ok ? res.json() : [])
      .then((list: CategoryOption[]) => {
        const arr = Array.isArray(list) ? list : Object.entries(PRODUCT_CATEGORIES).map(([id, c]) => ({ id, name: c.name, nameEn: c.nameEn }));
        setCategories(arr);
        if (arr.length > 0 && !arr.some((c) => c.id === category)) setCategory(arr[0].id);
      })
      .catch(() => setCategories(Object.entries(PRODUCT_CATEGORIES).map(([id, c]) => ({ id, name: c.name, nameEn: c.nameEn }))));
  }, []);

  const generateId = () => {
    const slug = dimensions.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    return `${category}-${slug || "new"}`.replace(/--+/g, "-");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError(null);
    const parsed = adminProductSchema.safeParse({
      nameEn: nameEn.trim(),
      dimensions: dimensions.trim(),
      standardLengths: standardLengths.trim(),
      pricePerKg: pricePerKg.trim() || undefined,
      weightPerMeter: weightPerMeter.trim() || undefined,
    });
    if (!parsed.success) {
      const err: Record<string, string> = {};
      parsed.error.errors.forEach((e) => {
        const p = e.path[0];
        if (p && typeof p === "string") err[p] = e.message;
      });
      setFieldErrors(err);
      return;
    }
    setLoading(true);
    setSuccess(null);

    try {
      const id = generateId();
      const lengths = standardLengths
        .split(",")
        .map((s) => parseFloat(s.trim()))
        .filter((n) => !isNaN(n));
      if (lengths.length === 0) lengths.push(1, 3, 6);

      const pk = pricePerKg ? parseFloat(pricePerKg) : undefined;
      const wpm = parseFloat(weightPerMeter) || 0;
      const body = {
        id,
        category,
        name: nameEn || "",
        nameEn: nameEn || "",
        dimensions,
        pricePerKg: pk,
        weightPerMeter: wpm,
        pricePerMeter: pk != null && wpm > 0 ? pk * wpm : undefined,
        standardLengths: lengths,
        inStock,
        hidden,
        material: material || undefined,
        finish: finish || undefined,
        image: image || undefined,
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create product");
      }

      setSuccess("Product created successfully!");
      setNameEn("");
      setDimensions("");
      setPricePerKg("");
      setWeightPerMeter("");
      setStandardLengths("1, 3, 6");
      setImage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Add product" segments={[{ label: "Products", href: "/admin/products" }, { label: "Add" }]} />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <ComponentCard title="Product details">
          <div className="space-y-4">
            <div>
              <Label>Name (English)</Label>
              <Input
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="Angle 25x25x3mm"
                required
              />
              {fieldErrors.nameEn && <p className="mt-1 text-sm text-red-600">{fieldErrors.nameEn}</p>}
            </div>
            <div>
              <Label>Category</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-white"
              >
                {categories.length === 0 && <option value="angle">Angle</option>}
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameEn}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Dimensions (e.g. 25x25x3 or Ø20x2)</Label>
              <Input
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="25x25x3"
                required
              />
              {fieldErrors.dimensions && <p className="mt-1 text-sm text-red-600">{fieldErrors.dimensions}</p>}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Use default data</p>
                <p className="text-xs text-gray-500 mt-0.5">£4.20/kg, 0.41 kg/m — fill price and weight with defaults</p>
              </div>
              <ToggleSwitch
                enabled={useDefaultData}
                setEnabled={(on) => {
                  setUseDefaultData(on);
                  if (on) {
                    setPricePerKg(DEFAULT_PRICE_PER_KG);
                    setWeightPerMeter(DEFAULT_WEIGHT_PER_METER);
                  }
                }}
                label=""
              />
            </div>
            <div>
              <Label>Price per kg (£)</Label>
              <Input
                type="number"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(e.target.value)}
                placeholder="4.20"
                min={0}
                step={0.01}
              />
              {fieldErrors.pricePerKg && <p className="mt-1 text-sm text-red-600">{fieldErrors.pricePerKg}</p>}
              <p className="mt-1 text-xs text-gray-500">Price per m = price per kg × weight per m (kg/m)</p>
            </div>
            <div>
              <Label>Weight per m (kg/m)</Label>
              <Input
                type="number"
                value={weightPerMeter}
                onChange={(e) => setWeightPerMeter(e.target.value)}
                placeholder="0.41"
                min={0}
                step={0.01}
                required
              />
              {fieldErrors.weightPerMeter && <p className="mt-1 text-sm text-red-600">{fieldErrors.weightPerMeter}</p>}
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <Label className="text-gray-600">Price per m (calculated)</Label>
              <p className="text-lg font-semibold text-[#050544]">
                {pricePerKg && weightPerMeter && parseFloat(weightPerMeter) > 0
                  ? `£${(parseFloat(pricePerKg) * parseFloat(weightPerMeter)).toFixed(2)}`
                  : "—"}
              </p>
              <p className="text-xs text-gray-500">price per kg × weight per m</p>
            </div>
            <div>
              <Label>Standard lengths (comma-separated)</Label>
              <Input
                value={standardLengths}
                onChange={(e) => setStandardLengths(e.target.value)}
                placeholder="1, 3, 6"
              />
              {fieldErrors.standardLengths && <p className="mt-1 text-sm text-red-600">{fieldErrors.standardLengths}</p>}
            </div>
            <div>
              <Label>Material</Label>
              <Input
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="6063-T5"
              />
            </div>
            <div>
              <Label>Finish</Label>
              <Input
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                placeholder="Mill finish"
              />
            </div>
            <div>
              <ImageUpload
                label="Product image"
                value={image}
                onChange={setImage}
                hint="Drag and drop — saved as local path (/uploads/...)"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="mb-0">In stock</Label>
              <ToggleSwitch enabled={inStock} setEnabled={setInStock} label="In stock" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label>Hidden from catalog</Label>
              <ToggleSwitch enabled={hidden} setEnabled={setHidden} label="Hidden (not shown on site)" />
            </div>
          </div>
        </ComponentCard>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>

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
