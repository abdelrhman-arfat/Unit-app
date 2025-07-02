// components/ResponsiveSidebarLayout.tsx
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  BookOpenText,
  HelpCircle,
  CheckSquare,
  CalendarDays,
  Menu,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Main", href: "/main", icon: Home },
  { name: "Summaries", href: "/summaries", icon: BookOpenText },
  { name: "Quiz", href: "/quiz", icon: HelpCircle },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Events", href: "/events", icon: CalendarDays },
];
export default function ResponsiveSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Mobile Toggle */}
      <div className="md:hidden p-4 fixed top-0 left-0 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <SidebarContent pathname={pathname} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar - Visible on md+ */}
      <aside className="hidden md:flex w-64 bg-white border-r shadow-sm p-4">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 pt-16 md:pt-6 bg-white w-full">
        {children}
      </main>
    </div>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col w-full">
      {/* App Name */}
      <h2 className="text-2xl font-bold text-indigo-600 mb-2 px-2">
        Unit Platform
      </h2>
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
                  <Icon className="w-4 h-4 mr-2" />
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
