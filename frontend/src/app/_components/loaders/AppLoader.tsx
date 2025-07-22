import { Loader2Icon } from "lucide-react";
import React from "react";

const AppLoader = ({
  size = 40,
  className = "",
  fullscreen = false,
}: {
  size?: number;
  className?: string;
  fullscreen?: boolean;
}) => {
  return (
    <div
      className={`${
        fullscreen ? "h-[calc(100vh-100px)]" : "h-full"
      } w-full flex items-center justify-center`}
    >
      <Loader2Icon
        className={`animate-spin text-indigo-600 ${className}`}
        size={size}
      />
    </div>
  );
};

export default AppLoader;
