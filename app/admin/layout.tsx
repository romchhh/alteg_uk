import type { Metadata } from "next";
import { SidebarProvider } from "@/lib/SidebarContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import ClientLayoutShell from "@/components/admin/ClientLayoutShell";

export const metadata: Metadata = {
  title: "Admin Panel | ALTEG UK",
  description: "ALTEG UK admin panel",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </SidebarProvider>
    </ThemeProvider>
  );
}
