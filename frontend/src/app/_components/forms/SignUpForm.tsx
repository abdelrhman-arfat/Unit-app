import React from "react";
import { Button } from "@/components/ui/button";

type SignUpFormProps = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  signUpBtn: string;
};

const SignUpForm = ({
  nameLabel,
  namePlaceholder,
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  confirmPasswordLabel,
  confirmPasswordPlaceholder,
  signUpBtn,
}: SignUpFormProps) => {
  return (
    <form className="space-y-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          {nameLabel}
        </label>
        <input
          id="name"
          type="text"
          placeholder={namePlaceholder}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          {emailLabel}
        </label>
        <input
          id="email"
          type="email"
          placeholder={emailPlaceholder}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          {passwordLabel}
        </label>
        <input
          id="password"
          type="password"
          placeholder={passwordPlaceholder}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          {confirmPasswordLabel}
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder={confirmPasswordPlaceholder}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300"
        size="lg"
      >
        {signUpBtn}
      </Button>
    </form>
  );
};

export default SignUpForm;
