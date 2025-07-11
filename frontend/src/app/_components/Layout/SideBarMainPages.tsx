"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { returnDirection } from "@/app/utils/funcs/TextDirection";
import { useLangSelector } from "@/app/hooks/Selectors";
import { Menu } from "lucide-react";
import { useSidebarLinks } from "@/app/hooks/useSidebarLinks";
import LanguageSwitcher from "../Buttons/LanguageSwitcher";
import UserCard from "../cards/UserCard";

export default function ResponsiveSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lang = useLangSelector();
  const direction = returnDirection(lang);
  const isRTL = direction === "rtl";

  return (
    <div className="flex h-screen" dir={direction}>
      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "md:hidden p-4 fixed top-0 z-50",
          isRTL ? "right-0" : "left-0"
        )}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? "right" : "left"} className="w-64 p-4">
            <SidebarContent pathname={pathname} isRTL={isRTL} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar - Desktop */}
      {isRTL ? (
        <aside className="hidden md:flex w-64 bg-white border-l shadow-sm p-4">
          <SidebarContent pathname={pathname} isRTL={isRTL} />
        </aside>
      ) : (
        <aside className="hidden md:flex w-64 bg-white border-r shadow-sm p-4">
          <SidebarContent pathname={pathname} isRTL={isRTL} />
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 pt-16 md:pt-6 bg-white w-full">
        {children}
      </main>
    </div>
  );
}

function SidebarContent({
  pathname,
  isRTL,
}: {
  pathname: string;
  isRTL: boolean;
}) {
  const navItems = useSidebarLinks();

  return (
    <div className="flex flex-col w-full max-h-[90vh] justify-between">
      <div>
        {/* Logo and Language Switcher */}
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
            UNIT
          </h2>
        </div>

        <Separator className="mb-4" />

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 w-full">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname.includes(href);

            return (
              <Link href={href} key={name}>
                <div
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium cursor-pointer",
                    isActive
                      ? "bg-indigo-600 text-white shadow hover:bg-indigo-700"
                      : "hover:bg-gray-100 text-gray-700"
                  )}
                >
                  <span className="flex-1 text-start ">{name}</span>
                  <span
                    className={cn(
                      "w-5 h-5 flex-shrink-0",
                      isRTL ? "mr-2" : "ml-2"
                    )}
                  >
                    <Icon className="w-full h-full" />
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Footer */}
      <div className="mt-6 px-2">
        <Separator className="mb-3" />
        <div className="flex items-center w-full gap-4 justify-between ">
          <UserCard />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
