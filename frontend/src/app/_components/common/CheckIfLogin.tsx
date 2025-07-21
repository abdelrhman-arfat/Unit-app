"use client";

import { useUserSelector } from "@/app/hooks/Selectors";
import { Link } from "@/i18n/navigation";
import React from "react";

const CheckIfLogin = ({
  children,
  isLogging = false,
}: {
  children: React.ReactNode;
  isLogging?: boolean;
}) => {
  const user = useUserSelector();
  if (user.isLoggedIn === isLogging) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-lg bg-white border border-indigo-100 shadow-2xl rounded-3xl p-10 text-center transition-all animate-fade-in">
        <div className="flex flex-col items-center gap-5">
          <svg
            className="w-12 h-12 text-indigo-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c.966 0 1.75-.784 1.75-1.75S12.966 7.5 12 7.5 10.25 8.284 10.25 9.25 11.034 11 12 11zm0 0v2m0 4h.01M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
            />
          </svg>

          <h2 className="text-2xl font-bold text-indigo-700">
            {!isLogging ? "You're already logged in" : "You're not logged in"}
          </h2>

          <p className="text-gray-500 text-sm max-w-xs">
            {!isLogging
              ? "We are redirecting you to your dashboard. If it doesn't happen automatically, click the button below."
              : "Please log in to continue."}
          </p>

          <Link
            href={!isLogging ? "/main" : "/login"}
            className="mt-2 inline-block px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md transition-all duration-200"
          >
            {!isLogging ? "Dashboard" : "Log in"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckIfLogin;
