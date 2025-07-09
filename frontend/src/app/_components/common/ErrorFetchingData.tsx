"use client";

import { useTranslations } from "next-intl";
import React from "react";

const ErrorFetchingData = () => {
  const t = useTranslations("ErrorFetchingData");

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8 flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4 text-red-500">⚠️</div>
        <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
          {t("title")}
        </h1>
        <p className="text-gray-500 mb-6">{t("message")}</p>
      </div>
    </div>
  );
};

export default ErrorFetchingData;
