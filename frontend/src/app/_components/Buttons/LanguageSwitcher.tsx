"use client";

import { TLanguages } from "@/app/types/Languages";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";
import { setLang } from "@/app/_RTK/redux-slices/LangSlice";
import { useLangSelector } from "@/app/hooks/Selectors";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatcher();
  const currentLang = useLangSelector();
  const handleChangingLanguage = (lang: TLanguages) => {
    if (lang !== currentLang) {
      dispatch(setLang(lang));
      router.push(pathname, { locale: lang });
    }
  };

  return (
    <div className="flex gap-3 items-center p-1 border border-indigo-300 rounded-full bg-indigo-50 shadow-md">
      {(["ar", "en"] as TLanguages[]).map((lang) => (
        <Button
          key={lang}
          variant="ghost"
          size="sm"
          onClick={() => handleChangingLanguage(lang)}
          className={cn(
            "px-2 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out",
            currentLang === lang
              ? "bg-indigo-600 text-white hover:text-white shadow-lg hover:bg-indigo-900"
              : "text-indigo-600  hover:bg-indigo-100"
          )}
        >
          {lang.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
