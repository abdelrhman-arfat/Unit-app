"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu } from "lucide-react";
import Logo from "../common/Logo";
import LanguageSwitcher from "../Buttons/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

export default function LandingPageHeader() {
  return (
    <header className="sticky   top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" w-[90%] mx-auto flex h-20 items-center justify-between">
        {/* Logo */}
        <div className="flex  gap-4 items-center">
          <Logo />
          <LanguageSwitcher />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-base cursor-pointer  dark:hover:bg-indigo-950/30"
            >
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="ghost"
              className="text-base cursor-pointer  dark:hover:bg-indigo-950/30"
            >
              About
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="text-base cursor-pointer  dark:hover:bg-indigo-950/30"
            >
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="text-base cursor-pointer bg-indigo-600 hover:bg-indigo-700">
              Register
            </Button>
          </Link>
        </nav>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Button variant="ghost" aria-label="Open menu" className="p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6 w-[300px]">
            <ScrollArea className="h-full py-6">
              <div className="flex flex-col space-y-4">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full  justify-start text-base"
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="ghost"
                    className="w-full  justify-start text-base"
                  >
                    About
                  </Button>
                </Link>
                <div className="h-px bg-border my-2"></div>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full  justify-start text-base"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="w-full  justify-start text-base bg-indigo-600 hover:bg-indigo-700">
                    Register
                  </Button>
                </Link>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
