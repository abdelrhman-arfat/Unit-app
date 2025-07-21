"use client";

import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {
  isRTL?: boolean;
  navItem: () => {
    name: string;
    href: string;
    icon: React.ElementType;
  }[];
};

const SidebarContent = ({ navItem }: Props) => {
  const navItems = navItem();
  const pathname = usePathname();
  console.log(JSON.stringify(navItems, null, 2));
  console.log(JSON.stringify(pathname, null, 2));
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <nav className="flex flex-col gap-2">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = new RegExp(
            `^/(en|ar)${href.replace(/^\/+/, "/")}$`
          ).test(pathname);

          return (
            <Link href={href} key={name}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium",
                  isActive
                    ? "bg-indigo-600 text-white shadow hover:bg-indigo-700"
                    : "hover:bg-gray-100 text-gray-800"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6">
        <Separator className="my-4" />
        <div className="text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} UNIT
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
