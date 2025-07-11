import React from "react";

const TitleOfSection = ({ title }: { title: string }) => {
  return (
    <div className="relative max-w-3xl mx-auto mb-12 text-center">
      <h1 className="text-2xl md:text-4xl font-bold text-indigo-700 tracking-tight leading-tight">
        {title}
      </h1>
    </div>
  );
};

export default TitleOfSection;
