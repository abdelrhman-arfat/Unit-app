"use client";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { API_ULR } from "@/app/constants/ENV";
import { redirect } from "next/navigation";
const GoogleIcon = () => {
  return (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.38 1.37 8.33 3.12l6.18-6.18C34.44 3.16 29.63 1 24 1 14.96 1 7.27 6.55 3.94 14.08l7.29 5.66C13.04 14.48 18.18 9.5 24 9.5z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.65 0 10.4-1.86 13.87-5.05l-7.19-5.88c-2.01 1.35-4.6 2.13-7.68 2.13-5.82 0-10.96-4.98-12.77-11.23l-7.29 5.65C7.27 41.45 14.96 46 24 46z"
      />
      <path
        fill="#4A90E2"
        d="M43.61 20.74H24v8.52h11.24c-0.51 2.67-2.08 4.94-4.34 6.43l7.19 5.88C42.32 38.27 44 32.94 44 27c0-1.52-0.14-3-0.39-4.43z"
      />
      <path
        fill="#FBBC05"
        d="M11.23 26.97C10.77 25.42 10.5 23.75 10.5 22c0-1.75 0.27-3.42 0.73-4.97L3.94 11.38C2.71 14.03 2 17.02 2 20c0 2.98 0.71 5.97 1.94 8.62l7.29-5.65z"
      />
    </svg>
  );
};

const LoginWithGoogle = () => {
  const url = useMemo(() => `${API_ULR}/auth/google`, []);
  return (
    <Button
      onClick={async () => redirect(url)}
      variant="outline"
      className="w-full flex items-center justify-center gap-3 text-sm font-semibold hover:bg-muted transition-all duration-300"
    >
      <GoogleIcon />
      Sign in with Google
    </Button>
  );
};

export default LoginWithGoogle;
