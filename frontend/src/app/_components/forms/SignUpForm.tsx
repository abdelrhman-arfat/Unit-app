"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { signup } from "@/app/utils/api/Signup";
import { emailPattern } from "@/app/utils/patterns/email";
import { setUserData } from "@/app/_RTK/redux-slices/UserSlice";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";
import { Loader } from "lucide-react";
import { SignUpFormProps } from "@/app/types/SignUpFormProps";

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
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const dispatch = useAppDispatcher();
  const router = useRouter();
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setIsSignUp(true);
    await toast
      .promise(signup(email, password, name), {
        loading: "Signing up...",
        success: (res) => res?.data.message || "Signup successfully",
        error: (err) => err.response.data.message || "Signup failed",
      })
      .then((res) => {
        dispatch(setUserData(res?.data.data.data));
        router.replace("/main");
      })
      .finally(() => setIsSignUp(false));
  };
  return (
    <form onSubmit={handleSignUp} className="space-y-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          {nameLabel}
        </label>
        <input
          id="name"
          type="text"
          name="name"
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
          name="email"
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
          name="password"
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
          name="confirmPassword"
          placeholder={confirmPasswordPlaceholder}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <Button
        disabled={isSignUp}
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300"
        size="lg"
      >
        {isSignUp ? (
          <div>
            <Loader />
          </div>
        ) : (
          signUpBtn
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
