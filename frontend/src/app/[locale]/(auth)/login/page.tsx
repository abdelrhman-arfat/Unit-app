import React from "react";
import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";
import Link from "next/link";
import LoginForm from "@/app/_components/forms/LoginForm";
import Logo from "@/app/_components/common/Logo";
import { getTranslations } from "next-intl/server";
import LoginWithGoogle from "@/app/_components/Buttons/LoginWithGoogle";

const LoginPage = async () => {
  const t = await getTranslations("LoginPage");

  return (
    <div className="w-full  shadow-sm p-5 max-w-md space-y-8 animate-fade-up">
      <div>
        <Logo />
      </div>

      <div className="space-y-3">
        <Heading size="xl">{t("loginTitle")}</Heading>
        <Paragraph className="text-muted-foreground text-lg">
          {t("welcomeText")}
        </Paragraph>
      </div>

      <LoginForm
        emailLabel={t("emailLabel")}
        emailPlaceholder={t("emailPlaceholder")}
        passwordLabel={t("passwordLabel")}
        passwordPlaceholder={t("passwordPlaceholder")}
        forgotPasswordText={t("forgotPassword")}
        loginBtn={t("loginBtn")}
      />
      <LoginWithGoogle />

      <div className="text-center text-sm pt-4 space-x-1">
        <span>{t("noAccount")}</span>
        <Link
          href="/sign-up"
          className="text-indigo-600 hover:underline font-medium"
        >
          {t("signUp")}
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
