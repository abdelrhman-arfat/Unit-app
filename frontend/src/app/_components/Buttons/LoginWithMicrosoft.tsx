import React from "react";
import { Button } from "@/components/ui/button";

const MicrosoftIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="shrink-0"
  >
    <rect x="1" y="1" width="10" height="10" fill="#F35325" />
    <rect x="13" y="1" width="10" height="10" fill="#81BC06" />
    <rect x="1" y="13" width="10" height="10" fill="#05A6F0" />
    <rect x="13" y="13" width="10" height="10" fill="#FFBA08" />
  </svg>
);

const LoginWithMicrosoft = () => {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-3 text-sm font-semibold hover:bg-muted transition-all duration-300"
    >
      <MicrosoftIcon />
      Sign in with Microsoft
    </Button>
  );
};

export default LoginWithMicrosoft;
