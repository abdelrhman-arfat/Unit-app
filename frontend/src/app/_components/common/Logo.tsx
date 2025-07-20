import { Link } from "@/i18n/navigation";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className=" text-xl sm:text-2xl tracking-wider md:text-3xl font-extrabold text-indigo-600 hover:text-indigo-500 transition-colors"
    >
      FCI
    </Link>
  );
};

export default Logo;
