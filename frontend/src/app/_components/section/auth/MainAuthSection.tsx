"use client";
import { useLangSelector } from "@/app/hooks/Selectors";
import { returnDirection } from "@/app/utils/funcs/TextDirection";
import React from "react";
import CheckIfLogin from "../../common/CheckIfLogin";
const MainAuthSection = ({ children }: { children: React.ReactNode }) => {
  const lang = useLangSelector();
  const dir = returnDirection(lang);

  return (
    <CheckIfLogin>
      <section
        className={`min-h-screen py-20 px-2 sm:px-6 md:px-12 flex items-center justify-center ${
          dir === "rtl" ? "text-right" : "text-left"
        }`}
      >
        {children}
      </section>
    </CheckIfLogin>
  );
};

export default MainAuthSection;
