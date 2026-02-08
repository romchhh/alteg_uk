"use client";

import { useSidebar } from "@/lib/SidebarContext";
import AppSidebar from "@/components/admin/AppSidebar";
import AppHeader from "@/components/admin/AppHeader";
import Backdrop from "@/components/admin/Backdrop";
import { AdminToastProvider } from "@/lib/AdminToastContext";
import { usePathname } from "next/navigation";
import React from "react";

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminToastProvider>
    <div className="min-h-screen xl:flex bg-white">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out bg-white ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-7xl md:p-6 text-gray-900">{children}</div>
      </div>
    </div>
    </AdminToastProvider>
  );
}
