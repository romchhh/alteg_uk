"use client";

import React from "react";

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  setEnabled: (val: boolean) => void;
}

export default function ToggleSwitch({
  label,
  enabled,
  setEnabled,
}: ToggleSwitchProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-700">
      <div className="relative">
        <div
          className={`block h-6 w-11 rounded-full transition-colors ${
            enabled
              ? "bg-gray-700"
              : "bg-gray-200"
          }`}
        />
        <div
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="sr-only"
        />
      </div>
      {label}
    </label>
  );
}
