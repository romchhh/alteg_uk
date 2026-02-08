"use client";

import { useSidebar } from "@/lib/SidebarContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function AppHeader() {
  const router = useRouter();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 z-[9999] text-gray-900">
      <div className="flex items-center justify-between w-full px-4 py-3 lg:px-6">
        <button
          className="flex items-center justify-center w-10 h-10 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
          onClick={handleToggle}
          aria-label="Toggle Sidebar"
        >
          {isMobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            View site →
          </Link>
          <button
            onClick={async () => {
              if (!confirm("Log out?")) return;
              await fetch("/api/auth/logout", { method: "POST" });
              router.push("/admin/login");
              router.refresh();
            }}
            className="text-sm text-gray-600 hover:text-red-600"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
