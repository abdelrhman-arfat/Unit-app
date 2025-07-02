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

export default function ResponsiveSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lang = useLangSelector();
  const direction = returnDirection(lang); // "ltr" or "rtl"
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
    <div className="flex flex-col w-full">
      {/* App Name */}
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2 px-2">UNIT</h2>
        <LanguageSwitcher />
      </div>

      <Separator className="mb-2" />

      {/* Nav Links */}
      <nav className="flex flex-col gap-0.5 w-full">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname.includes(href);
          return (
            <Link href={href} key={name} passHref legacyBehavior>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start rounded-md text-sm font-medium transition-colors px-3 py-2",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-indigo-600 hover:text-white text-indigo-600"
                )}
              >
                <span className="flex items-center w-full">
                  <Icon className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                  {name}
                </span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
