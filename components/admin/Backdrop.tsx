"use client";

import { useSidebar } from "@/lib/SidebarContext";
import React, { useEffect } from "react";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/utils/bodyScrollLock";

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  useEffect(() => {
    if (isMobileOpen) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
    return () => unlockBodyScroll();
  }, [isMobileOpen]);

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;
