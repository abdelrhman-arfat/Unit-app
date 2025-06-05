import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type LoginFormProps = {
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  forgotPasswordText: string;
  loginBtn: string;
};

const LoginForm = ({
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  forgotPasswordText,
  loginBtn,
}: LoginFormProps) => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium block">
          {emailLabel}
        </label>
        <input
          id="email"
          type="email"
          placeholder={emailPlaceholder}
          required
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium block">
          {passwordLabel}
        </label>
        <input
          id="password"
          type="password"
          placeholder={passwordPlaceholder}
          required
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="flex justify-between items-center text-sm mt-2">
        <Link href="#" className="text-indigo-600 hover:underline">
          {forgotPasswordText}
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 mt-4"
        size="lg"
      >
        {loginBtn}
      </Button>
    </form>
  );
};

export default LoginForm;
