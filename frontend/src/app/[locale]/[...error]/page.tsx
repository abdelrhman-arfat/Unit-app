import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function ErrorPage() {
  const t = await getTranslations("error");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-[10rem] font-extrabold leading-none select-none mb-6">
        404
      </h1>
      <h2 className="text-3xl font-semibold mb-4">{t("title")}</h2>
      <p className="max-w-md text-center text-lg mb-8 text-neutral-400">
        {t("description")}
      </p>
      <Link href="/">
        <Button className="bg-indigo-500 text-white hover:bg-indigo-700 transition-colors px-8 py-3 font-semibold shadow-lg shadow-indigo-500/40">
          {t("button")}
        </Button>
      </Link>
    </main>
  );
}
