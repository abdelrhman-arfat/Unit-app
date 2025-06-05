import React from "react";
import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";
import Link from "next/link";
import SignUpForm from "@/app/_components/forms/SignUpForm";
import LoginWithMicrosoft from "@/app/_components/Buttons/LoginWithMicrosoft";
import { getTranslations } from "next-intl/server";
import Logo from "@/app/_components/common/Logo";

const SignupPage = async () => {
  const t = await getTranslations("SignUpPage");

  return (
    <div className="w-full sm:max-w-md space-y-6 p-4 sm:p-6 rounded-md shadow animate-fade-up">
      <div>
        <Logo />
      </div>

      <div className="space-y-2">
        <Heading size="xl">{t("signUpTitle")}</Heading>
        <Paragraph className="text-muted-foreground text-lg">
          {t("welcomeText")}
        </Paragraph>
      </div>

      <SignUpForm
        nameLabel={t("nameLabel")}
        namePlaceholder={t("namePlaceholder")}
        emailLabel={t("emailLabel")}
        emailPlaceholder={t("emailPlaceholder")}
        passwordLabel={t("passwordLabel")}
        passwordPlaceholder={t("passwordPlaceholder")}
        confirmPasswordLabel={t("confirmPasswordLabel")}
        confirmPasswordPlaceholder={t("confirmPasswordPlaceholder")}
        signUpBtn={t("signUpBtn")}
      />
      <LoginWithMicrosoft />

      <div className="text-center text-sm">
        {t("alreadyAccount")}{" "}
        <Link
          href="/login"
          className="text-indigo-600 hover:underline font-medium"
        >
          {t("logIn")}
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
