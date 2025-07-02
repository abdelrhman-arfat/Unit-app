"use client";

import { TLanguages } from "@/app/types/Languages";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";
import { setLang } from "@/app/_RTK/redux-slices/LangSlice";
import { useLangSelector } from "@/app/hooks/Selectors";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LanguagesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-md border shadow-sm"
        >
          <LanguagesIcon className="w-5 h-5 text-indigo-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-28">
        {(["ar", "en"] as TLanguages[]).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleChangingLanguage(lang)}
            className={`cursor-pointer ${
              currentLang === lang ? "font-bold text-indigo-600" : ""
            }`}
          >
            {lang.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
