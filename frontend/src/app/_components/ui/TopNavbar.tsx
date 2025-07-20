"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import LanguageSwitcher from "../Buttons/LanguageSwitcher";
import UserCard from "../cards/UserCard";
import { useSidebarLinks } from "@/app/hooks/useSidebarLinks";
import SidebarContent from "./SidebarContent";

type Props = {
  isRTL: boolean;
};

const TopNavbar = ({ isRTL }: Props) => {
  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white fixed top-0 w-full z-50">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? "right" : "left"} className="w-64 p-4">
              <SidebarContent navItem={useSidebarLinks} isRTL={isRTL} />
            </SheetContent>
          </Sheet>
        </div>
        <h1 className="text-xl font-bold text-indigo-600 tracking-tight">
          UNIT
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <UserCard />
      </div>
    </header>
  );
};

export default TopNavbar;
