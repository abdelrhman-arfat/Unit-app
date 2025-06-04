"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";
import { setLang } from "@/app/_RTK/redux-slices/LangSlice";
import { useLangSelector } from "@/app/hooks/Selectors";

export function LangInitializer() {
  const locale = useLocale();
  const dispatch = useAppDispatcher();
  const currentLang = useLangSelector();

  useEffect(() => {
    if (locale !== currentLang) {
      dispatch(setLang(locale as "ar" | "en"));
    }
  }, [locale, currentLang, dispatch]);

  return null;
}
