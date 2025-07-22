"use client";
import { useUserSelector } from "@/app/hooks/Selectors";
import { Link } from "@/i18n/navigation";
import React from "react";
const Logo = () => {
  const { isLoggedIn } = useUserSelector();
  return (
    <Link
      href={isLoggedIn ? "/main" : "/"}
      className=" text-xl sm:text-2xl tracking-wider md:text-3xl font-extrabold text-indigo-600 hover:text-indigo-500 transition-colors"
    >
      FCI
    </Link>
  );
};

export default Logo;
