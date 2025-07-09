import React from "react";

const EventCardLoader = () => {
  return (
    <div className="flex flex-col items-center gap-6 mt-4">
      <div className=" w-full min-w-[300px] sm:w-[675px] md:max-w-[800px] rounded-2xl bg-white shadow-md animate-pulse overflow-hidden">
        {/* Image Skeleton */}
        <div className="h-48 w-full bg-gray-200" />

        {/* Content Skeleton */}
        <div className="p-5 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4" /> {/* title */}
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          {/* Calendar row */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
          {/* Button link */}
          <div className="h-4 bg-gray-300 rounded w-1/4 mt-3" />
        </div>
      </div>
    </div>
  );
};
export default EventCardLoader;
