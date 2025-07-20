"use client";
import React from "react";
import TopNavbar from "../ui/TopNavbar";
import SidebarContent from "../ui/SidebarContent";
import { cn } from "@/lib/utils";
import { useAdminSideBar } from "@/app/hooks/useAdminSideBar";
import { returnDirection } from "@/app/utils/funcs/TextDirection";
import { useLangSelector } from "@/app/hooks/Selectors";
export default function SidebarAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = useLangSelector();
  const direction = returnDirection(lang);
  const isRTL = direction === "rtl";

  const navItem = useAdminSideBar();
  return (
    <div className="flex flex-col h-screen bg-gray-50" dir={direction}>
      <TopNavbar isRTL={isRTL} />

      <div className="flex flex-1 pt-16">
        {/* Sidebar - Desktop */}
        <aside
          className={cn(
            "hidden md:flex fixed top-16 bottom-0 w-64 bg-white border-r shadow-sm p-4 overflow-y-auto",
            isRTL ? "right-0 md:border-r-0 md:border-l" : "left-0"
          )}
        >
          <SidebarContent navItem={navItem} isRTL={isRTL} />
        </aside>

        {/* Main content */}
        <main
          className={cn(
            "flex-1 p-6 overflow-y-auto",
            "md:ml-64",
            isRTL && "md:ml-0 md:mr-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
