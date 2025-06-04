import React from "react";

interface HeadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
}

export const Heading = ({
  size = "md",
  className = "",
  children,
}: HeadingProps) => {
  const sizes = {
    sm: "text-lg font-semibold",
    md: "text-xl font-semibold",
    lg: "text-2xl font-bold",
    xl: "text-3xl font-bold",
  };
  return <h2 className={`${sizes[size]} ${className}`}>{children}</h2>;
};
