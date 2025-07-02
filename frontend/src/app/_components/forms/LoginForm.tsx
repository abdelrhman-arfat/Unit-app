"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { emailPattern } from "@/app/utils/patterns/email";
import { login } from "@/app/utils/api/Login";
import { Loader } from "lucide-react";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";
import { setUserData } from "@/app/_RTK/redux-slices/UserSlice";
import { useRouter } from "@/i18n/navigation";
import { LoginFormProps } from "@/app/types/LoginFormProps";

const LoginForm = ({
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  forgotPasswordText,
  loginBtn,
}: LoginFormProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const dispatch = useAppDispatcher();
  const router = useRouter();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      toast.error("Please enter email and password");
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
    setIsLogin(true);

    toast
      .promise(login({ email, password }), {
        loading: "Logging in...",
        success: (res) => res?.data.message || "Login successfully",
        error: (err) => err.response.data.message || "Login failed",
      })
      .then((res) => {
        dispatch(setUserData(res?.data.data.data));
        router.replace("/main");
      })
      .finally(() => setIsLogin(false));
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium block">
          {emailLabel}
        </label>
        <input
          id="email"
          type="email"
          name="email"
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
          name="password"
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
        disabled={isLogin}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 mt-4"
        size="lg"
      >
        {isLogin ? (
          <div>
            <Loader className="animate-spin mr-2" />
          </div>
        ) : (
          loginBtn
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
