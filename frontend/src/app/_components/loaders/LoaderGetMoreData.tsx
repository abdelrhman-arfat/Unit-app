import { Loader2 } from "lucide-react";
import React from "react";

const LoaderGetMoreData = ({ name }: { name: string }) => {
  return (
    <div className="w-full py-4 flex justify-center">
      <div className="flex items-center gap-2 text-indigo-600">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium animate-pulse">
          Loading more {name}...
        </span>
      </div>
    </div>
  );
};

export default LoaderGetMoreData;
